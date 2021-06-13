
import * as Axios from 'boot/axios'

const state = ()=>({
  users: [],
  meta: {},
  load:false,
  imagePath: Axios.pathImage()
})
const mutations ={
  setData(state,payload) {
    state.users = payload.data,
    state.meta = payload
  }
}
const actions ={
  getAllUser(ctx, payload) {
    return new Promise((resolve, reject) => {
      // let search = typeof payload != 'undefined' ? payload : ''
      // let sorting = ctx.state.desc ? 'DESC' : 'ASC';
      // let params = {
      //     params: {
      //         page: ctx.state.page,
      //         per_page: ctx.state.per_page,
      //         q: search,
      //         sortby: ctx.state.sortBy,
      //         sorting: sorting
      //     }
      // };
      Axios.http().get(`/admin/get_users`, payload)
      .then((resp) => {
        console.log('All User', resp.data.result)
        ctx.commit('setData', resp.data.result)
        resolve(resp.data.result)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },

  changeStatusUser({}, payload) {
    return new Promise((resolve, reject)=> {
      let params = {
          params: {
              id: payload,
          }
      };
      Axios.http().get(`/admin/kick_back_user`, params)
      .then(resp => {
        console.log('kicked',resp)
        resolve(resp)
      })
      .catch(err => {
        console.log(err.message)
        reject(err)
      })
    })
  }
}
const getters ={
  users(state) {
    return state.users
  },
  meta(state) {
    return state.meta
  },
  urlPath(state) {
    return state.imagePath
}
}

export default{
  namespaced : true,
  state,
  mutations,
  actions,
  getters
}

