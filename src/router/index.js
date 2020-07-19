import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    //使用按需加载
    component: () => import('../views/home/Home.vue'),
    //配置二级路由
    children: [
      //路由重定向
      { path: '', redirect: '/index' },
      {
        path: '/index', component: () => import("../components/index/Index.vue"),
      },
      {
        path: '/order', component: () => import("../components/order/Order.vue"),
      },
      {
        path: '/me', component: () => import("../components/me/Me.vue"),

      },

      {
        name: 'address',
        path: '/address', component: () => import("../components/address/Address.vue"),
      },
      {
        path: '/city', component: () => import("../components/city/City.vue")
      },
      {
        path: '/search', component: () => import('../components/search/Search.vue')
      },
      {
        path: '/goods', component: () => import('../components/goods/Goods.vue'),
        children: [
          { path: '/goods', redirect: '/goods/foods' },
          { path: 'foods', component: () => import('../components/foods/Foods.vue') },
          { path: 'evaluate', component: () => import('../components/evaluate/Evaluate.vue') },
          { path: 'merchant', component: () => import('../components/merchant/Merchant.vue') }
        ]
      },

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/myaddress',
    name: 'myaddress',
    component: () => import('../components/myAddress/MyAddress.vue')
  },
  {
    path: '/addaddress',
    name: 'addaddress',
    component: () => import('../components/addAddress/AddAddress.vue')
  },
  {
    path: '/settle',
    name: 'settle',
    component: () => import('../components/settle/Settle.vue')
  },
  {
    path: '/remark',
    name: 'remark',
    component: () => import('../components/remark/ReMark.vue')
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('../components/pay/Pay.vue')
  },
  {
    path: '/orderinfo',
    name: 'orderinfo',
    component: () => import('../components/orderInfo/OrderInfo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
//使用路由前置守卫
router.beforeEach((to, from, next) => {
  //定义一个变量用来存储登录状态
  const isLogin = localStorage.ele_Login ? true : false;
  //判断要去的路径是否为登录路径
  if (to.path === '/login') {
    //放行
    next();
  }
  else {
    //判断用户是否为登录状态？
    isLogin ? next() : next('/login?redirect=' + to.path);
  }

});

export default router
