const path = require('path')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const formatDate = require('date-fns/format')
const maxDate = require('date-fns/max')
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItClass = require("markdown-it-class");
const markdownItKatex = require("markdown-it-katex");
const markdownItAttrs = require("markdown-it-attrs");

const markdownLibrary = markdownIt({
  html: true,
  linkify: true
})

markdownLibrary.use(markdownItAttrs, {
  leftDelimiter: '{',
  rightDelimiter: '}',
  allowedAttributes: ['id', 'class', /^data-\.+=$/]
});

markdownLibrary.use(markdownItAnchor, {
  permalink: true,
  permalinkClass: "direct-link",
  permalinkSymbol: "#"
});

markdownLibrary.use(markdownItKatex);

markdownLibrary.use(markdownItClass, {
  h1: ["font-bold text-3xl my-4"],
  h2: ["font-bold text-2xl my-4"],
  h3: ["font-bold text-xl my-4"],
  h4: ["font-bold text-lg my-4"],
  h5: ["font-bold text-base my-4"],
  a: ["text-blue-600 visited:text-indigo-600 my-4"],
  p: ["my-4"],
  code: ["bg-rose-100 text-rose-500 rounded p-1"],
  table: ["w-full my-4"],
  th: ["text-left p-2 border-b border-gray-200 bg-gray-50"],
  td: ["text-left p-2 border-b border-gray-200"],
  ul: ["pl-4 list-disc my-4"],
  ol: ["pl-4 list-decimal my-4"],
  li: ["my-2"],
  blockquote: ["border-l-4 border-indigo-500 bg-indigo-50 px-2"],
  img: ["mx-auto"],
});

module.exports = (eleventyConfig) => {
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight)

  // Passthroughs
	eleventyConfig.addPassthroughCopy({ 'src/js': 'js' })
	eleventyConfig.addPassthroughCopy({ 'src/images': 'images' })

  // Collections
  eleventyConfig.addCollection('parents', collection => (
    collection
    .getFilteredByTag('parents')
    .slice()
    .sort((a, b) => a.data.order - b.data.order)
  ))

  eleventyConfig.addCollection('notes', collection => (
    collection
    .getFilteredByTag('notes')
    .slice()
    .sort((a, b) => {
      if (a.data.title > b.data.title) return 1;
      if (a.data.title < b.data.title) return -1;
      return 0;
    })
    .map(note => {
      const lastUpdatedDate = maxDate(
        collection
          .getFilteredByTag(note.data.tagID)
          .map(noteCollection => noteCollection.date)
      )
      note.lastUpdatedDate = lastUpdatedDate;
      return note;
    })
  ))

  // Shortcodes
  eleventyConfig.addShortcode('isActiveLink', function (url) {
    if (url === this.page.url) return true
    if (url !== '/' && this.page.url.includes(url)) return true
    return false
  })

  // Filters
  eleventyConfig.addFilter('formatDate', date => formatDate(date, 'P KK:mma z'))
  eleventyConfig.addFilter('minusOne', num => num - 1)
  eleventyConfig.addFilter('sortSkillsByDescRate', skills =>
    skills
    .map(skill => ({
      ...skill,
      items: skill.items.slice().sort((skillA, skillB) => skillB.rating - skillA.rating)
    }))
    .filter(skill => skill.items.length > 0)
  )

  // Libraries
  eleventyConfig.setLibrary('md', markdownLibrary)

	return {
		dir: {
			input: path.resolve(__dirname, 'src'),
			output: path.resolve(__dirname, 'dist'),
			includes: 'templates',
		},
	}
}
