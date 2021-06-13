
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name:'dashboard', component: () => import(/* webpackChunkName: "dashboard" */ 'pages/Dashboard.vue') },
      { path: '/data-user', name:'data.user', component: () => import(/* webpackChunkName: "user-page" */ 'pages/UserPage.vue') },
      { path: '/data-lelang', name:'data.lelang', component: () => import(/* webpackChunkName: "lelang-page" */ 'pages/LelangPage.vue')},
      { path: '/data-transaksi', name:'data.transaksi', component: () => import(/* webpackChunkName: "transaksi-page" */ 'pages/TransaksiPage.vue')},
      { path: '/pengaturan', name:'pengaturan', component: () => import(/* webpackChunkName: "pengaturan-page" */ 'pages/PengaturanPage.vue')},
    ],

    meta: {
      auth: true
    }
  },

  {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name:'login', component: () => import(/* webpackChunkName: "login-page" */ 'pages/LoginPage.vue') },
      { path: '/register', component: () => import(/* webpackChunkName: "register-page" */ 'pages/RegisterPage.vue') },
      { path: '/verification_email', component: () => import(/* webpackChunkName: "verification-page" */ 'pages/VerificationPage.vue') },
    ],
    meta: {
      visitor: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
