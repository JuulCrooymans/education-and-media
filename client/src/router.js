import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import {
	authGuard
} from "./auth/authGuard"

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'home',
			component: Home,
			beforeEnter: authGuard
		},
		{
			path: '/users',
			name: 'users',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/Studenten.vue'),
			beforeEnter: authGuard
		},
		{
			path: '/users/:id',
			component: () => import('./views/Student.vue'),
			beforeEnter: authGuard
		},
		{
			path: '/trajecten',
			component: () => import('./views/Courses.vue'),
			beforeEnter: authGuard
		},
		{
			path: '/trajecten/:course/minors',
			component: () => import('./views/Minors.vue'),
			beforeEnter: authGuard
		},
		{
			path: '/trajecten/:course/minors/:minor/projects',
			component: () => import('./views/Projects.vue'),
			beforeEnter: authGuard
		},
		{
			path: '/trajecten/:course/minors/:minor/projects/:project',
			component: () => import('./views/ProjectPage.vue'),
			beforeEnter: authGuard
		},
		{
			path: '*',
			component: () => import('./components/404.vue'),
			beforeEnter: authGuard
		}
	]
})