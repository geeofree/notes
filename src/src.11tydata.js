module.exports = {
	layout: 'base.html',
	date: process.env.NODE_ENV === 'production' ? 'git Last Modified' : 'Created',
  env: process.env.NODE_ENV
}
