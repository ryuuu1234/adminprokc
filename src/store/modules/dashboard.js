
import * as Axios from 'boot/axios'

const state = ()=>({
    widget:{}
})
const mutations ={

    setWidget(state,payload) {
        state.widget = payload
    }
}
const actions ={
  getWidget(context) {
      return new Promise((resolve, reject)=> {
          Axios.http().get(`/admin/get_widget`)
          .then((resp)=>{
                console.log('widget', resp.data)
                context.commit('setWidget', resp.data)
                resolve(resp)
          })
          .catch((err) => {
              console.log(err.message)
              reject(err)
          })
      })
  }
}
const getters ={
    widget(state) {
        return state.widget
    }
}

export default{
  namespaced : true,
  state,
  mutations,
  actions,
  getters
}

