import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		browser: {
			hydrate: true,
			router: false
		},
		prerender: {
			enabled: true
		},
		adapter: adapter({
			pages: 'build', // path to public directory
			assets: 'build', // path to public directory
			fallback: null
		})
	}
};

export default config;
