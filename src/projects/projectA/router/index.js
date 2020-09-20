import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import Test from "../views/test.vue";
import Test3 from "../views/test3.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/test",
    name: "test",
    component: Test,
    children: [
      {
        path: "/test/:id",
        name: "test3",
        component: Test3,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  routes
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 路由权限控制
// router.beforeEach((to, from, next) => {
// 	if (to.matched.some(record => record.meta.requiresAuth)) {
// 		// this route requires auth, check if logged in
// 		// if not, redirect to login page.
// 		if (!auth.loggedIn()) { //通过状态管理来判断用户是否登录
// 			next({
// 				path: '/login',
// 				query: {
// 					redirect: to.fullPath
// 				}
// 			})
// 		} else {
// 			next();
// 		}
// 	} else {
// 		next() // 确保一定要调用 next();
// 	}
// })

export default router;
