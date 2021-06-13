import Vue from 'vue'
import VueRouter from 'vue-router'
import { LocalStorage } from "quasar";

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // The route navigation guard
  Router.beforeEach((to, from, next) => {
    const isLoggedIn = LocalStorage.getItem("token");
    const hanyaVisitor = to.matched.some(record => record.meta.visitor)
    const authorize = to.matched.some(record => record.meta.auth)

    if (authorize) { // jika dia berada di meta requiresAuth
      if (!isLoggedIn) { // tapi dia tidak login
          next({ path: "/auth" }) // balik ke login
      } else {
          next() // pastikan ada else next di setiap if
      }
    } else {
        next()
    } 
    
    if (hanyaVisitor) { // jika dia berada di meta requiresVisitor
        if (isLoggedIn) { // tapi dia sudah login
            next({ path: "/" }) // balik ke dahsboard
        } else {
            next() // di ijinkan
        }    
    } else {
        next()
    }
  });

  Router.onError(error => {
    Notify.create({
      caption:
        "Halaman tidak dapat dimuat, periksa kembali jaringan anda, kemudian refresh halaman",
      message: "Terjadi kesalahan",
      color: "red",
      position: "top-right"
    });
  });

  return Router
}
