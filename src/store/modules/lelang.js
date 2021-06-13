
import * as Axios from 'boot/axios'

const state = ()=>({
    lelangs: [],
    meta: {},
    load:false,
    imagePath: Axios.pathImage()
})
const mutations ={
    setData(state,payload) {
        state.lelangs = payload.data,
        state.meta = payload
      }
    
}
const actions ={
    getAllLelang(ctx, payload) {
        return new Promise((resolve, reject) => {
          Axios.http().get(`/admin/get_lelang`, payload)
          .then((resp) => {
            console.log('All Lelang', resp.data.result)
            ctx.commit('setData', resp.data.result)
            resolve(resp.data.result)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
        })
      },
}
const getters ={
    lelangs(state) {
        return state.lelangs
    },
    meta(state) {
        return state.meta
    }
}

export default{
  namespaced : true,
  state,
  mutations,
  actions,
  getters
}

