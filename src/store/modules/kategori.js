
import * as Axios from 'boot/axios'

const state = ()=>({
    kategories:[],
    meta: {},
    name:''
})
const mutations ={
    setKategori(state, payload) {
        state.kategories = payload.data,
        state.meta = payload
    },

    setName(state, payload) {
        state.name = payload
    }
}
const actions ={

    getKategories(ctx, payload) {
        return new Promise((resolve, reject)=> {
            Axios.http().get('/admin/get_all_kategories',payload)
            .then((resp)=> {
                console.log('kategori_store', resp.data)
                ctx.commit('setKategori', resp.data.result)
                resolve(resp.data.result)
            })
            .catch((err)=> {
                console.log(err)
                reject(err)
            })
        })
    },

    addKategories(ctx, payload) {
        return new Promise((resolve, reject)=> {
            Axios.http().post('/admin/store_kategories', payload)
            .then((resp)=> {
                console.log(resp)
                resolve(resp)
            })
            .catch((err)=> {
                console.log(resp)
                reject(err)
            })
        })
    },
    updKategories(ctx, payload) {
        return new Promise((resolve, reject)=> {
            Axios.http().post('/admin/update_kategories', payload)
            .then((resp)=> {
                console.log(resp)
                resolve(resp)
            })
            .catch((err)=> {
                console.log(resp)
                reject(err)
            })
        })
    },
    removeKategories(ctx, payload) {
        return new Promise((resolve, reject)=> {
            Axios.http().post('/admin/remove_kategories', payload)
            .then((resp)=> {
                console.log(resp)
                resolve(resp)
            })
            .catch((err)=> {
                console.log(resp)
                reject(err)
            })
        })
    },

    edit(ctx, payload){
        console.log(payload)
    }
  
}
const getters ={
    kategories(state) {
        return state.kategories
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

