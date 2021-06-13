
import * as Axios from 'boot/axios'

const state = ()=>({
    transactions: [],
    meta: {},
    load:false,
    imagePath: Axios.pathImage(),
    pending:0,
    settlement:0,
    expire:0,
    failed:0,
})
const mutations ={
    setData(state,payload) {
      state.transactions = payload.data,
      state.meta = payload
    },
    setCount(state, payload) {
      state.pending = payload.pending,
      state.settlement = payload.settlement,
      state.expire = payload.expire,
      state.failed = payload.failed
    }
    
}
const actions ={
    getAllTrans(ctx, payload) {
        return new Promise((resolve, reject) => {
          Axios.http().get(`/admin/get_transaksi`, payload)
          .then((resp) => {
            console.log('All trans', resp.data)
            ctx.commit('setData', resp.data.result)
            ctx.commit('setCount', resp.data)
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
  transactions(state) { return state.transactions},
  meta(state) { return state.meta},
  pending(state){return state.pending},
  settlement(state){return state.settlement},
  expire(state){return state.expire},
  failed(state){return state.failed},
}

export default{
  namespaced : true,
  state,
  mutations,
  actions,
  getters
}

