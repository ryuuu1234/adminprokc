
import * as Axios from 'boot/axios'

const state = ()=>({
    form: {
      name:null,
      alamat:null,
      no_cs:null,
      wa_cs:null,
    },
    icon:null,
    urlPath: Axios.pathImage(),
    app:{},
})
const mutations ={
  setForm(state, payload) {
    state.form.name = payload.name,
    state.form.alamat = payload.alamat,
    state.form.no_cs = payload.no_cs,
    state.form.wa_cs = payload.wa_cs
  },
  icon(state, payload){
    state.icon = payload
  },
  name(state, payload){
    state.form.name = payload
  },
  alamat(state, payload){
    state.form.alamat = payload
  },
  no_cs(state, payload){
    state.form.no_cs = payload
  },
  wa_cs(state, payload){
    state.form.wa_cs = payload
  },
  setApp(state,payload){
    state.app = payload
  }
}
const actions ={
  getApp(ctx) {
      return new Promise((resolve, reject) => {
        Axios.http().get('/admin/get_app')
        .then((resp)=>{
          console.log('app',resp.data.result)
          ctx.commit('setForm', resp.data.result)
          ctx.commit('icon', resp.data.result.icon)
          ctx.commit('setApp', resp.data.result)
          resolve(resp)
        })
        .catch((err)=> {
          console.log(err)
          reject(err)
        })
      })
  },
  updateData(ctx, payload) {
    return new Promise((resolve, reject)=> {
      Axios.http().post('/admin/update_app', payload)
      .then((resp)=> {
        console.log('post', resp.data.result)
        resolve(resp)
      })
      .catch((err)=> {
        console.log(err)
        reject(err)
      })
    })
  },

  uploadImage(ctx, payload){
    return new Promise((resolve, reject)=> {
      Axios.http().post('/admin/update_icon', payload)
      .then((resp)=> {
        console.log('post', resp.data.result)
        resolve(resp)
      })
      .catch((err)=> {
        console.log(err)
        reject(err)
      })
    })
  }
}
const getters ={
  form(state) {
    return state.form
  },

  urlPath(state){
    return state.urlPath
  },

  app(state) {
    return state.app
  }
  
}

export default{
  namespaced : true,
  state,
  mutations,
  actions,
  getters
}

