import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

<<<<<<< HEAD
const _24f997e4 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
=======
const _70a3ea24 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages\\index" */).then(m => m.default || m)
const _722e99e7 = () => import('..\\pages\\demo\\liu.vue' /* webpackChunkName: "pages\\demo\\liu" */).then(m => m.default || m)
const _61862fd6 = () => import('..\\pages\\demo\\yihao.vue' /* webpackChunkName: "pages\\demo\\yihao" */).then(m => m.default || m)
>>>>>>> 17b3c96c4143ab85f098fe45f7a62d056a950536



const scrollBehavior = (to, from, savedPosition) => {
  // SavedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // If no children detected
    if (to.matched.length < 2) {
      // Scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // If one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // If link has anchor, scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
<<<<<<< HEAD
			component: _24f997e4,
			name: "index"
=======
			component: _70a3ea24,
			name: "index"
		},
		{
			path: "/demo/liu",
			component: _722e99e7,
			name: "demo-liu"
		},
		{
			path: "/demo/yihao",
			component: _61862fd6,
			name: "demo-yihao"
>>>>>>> 17b3c96c4143ab85f098fe45f7a62d056a950536
		}
    ],
    fallback: false
  })
}
