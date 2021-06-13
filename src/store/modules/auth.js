
import * as Axios from 'boot/axios'
import { firebaseAuth , GoogleProvider} from 'boot/firebase'
import { LocalStorage } from 'quasar'

import { Notify } from 'quasar'
const state = ()=>({
    token:LocalStorage.getItem("token") === null ? null : LocalStorage.getItem("token"),
    user:{},
    imagePath: Axios.pathImage(),

    temp_email:LocalStorage.getItem("email") === null ? null : LocalStorage.getItem("email"),
    otp:null
})
const mutations ={
    setToken(state, payload) {
        state.token = payload
    },
    setUser(state, payload) {
        state.user = payload
    },
    removeUser(state) {
        (state.user = {}), (state.token = null);
    },
    setTemp(state, payload){
        state.temp_email = payload
    },
    setOtp(state, payload){
        state.otp = payload
    }
}
const actions ={

    loginWithEmail(context, payload) {
        return new Promise((resolve, reject) => {
          Axios.http()
            .post("/auth/login", payload)
            .then((res) => {
              Notify.create({
                message: "Login success",
              });
              console.log("login res", res);
              LocalStorage.set("token", res.data.token);
              context.commit("setToken", res.data.token);
              resolve(res);
            })
            .catch(err => {
                let status = err.response.status
                if (status === 422) {
                    let msg = err.response.data.errors.email[0];
                    Notify.create({
                        message: msg,
                    });
                }
              console.log("error ", err.response);
              reject(err);
            });
        });
    },

    updateStatus({}, payload){
        return new Promise((resolve, reject)=> {
            Axios.http().get('/auth/register/update-status', payload)
            .then((resp)=> {
                console.log(resp)
                resolve(resp)
            })
            .catch((err)=> {
                console.log(err)
            })
        })
    },

    loginWithGoogle(context, payload) {
        return new Promise((resolve, reject) => {
            Axios.http().post(`auth/social_login`, payload)
            .then((resp)=> {
                console.log('resp login social post', resp)
                LocalStorage.set("token", resp.data);
                context.commit("setToken", resp.data);
                resolve(resp);
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
        })

    },

    getUser(context) {
        return new Promise((resolve, reject) => {
          Axios.http().get("/me")
            .then(res => {
              console.log("user ", res.data.data);
              context.commit("setUser", res.data.data);
              // location.reload();
              resolve(res.data.data);
            })
            .catch(err => {
              Notify.create({
                message: "failed to get user data",
                color: "negative",
                position: "top"
              });
    
              reject(err);
            });
        });
    },

    registerFirebase(ctx, payload){
        return new Promise((resolve, reject) => {
            firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then((resp)=> {
                
                console.log(resp.user)
                // setelah success alihkan page ke verifikasi email
                ctx.commit('setTemp', resp.user.email)
                resolve(resp)
            })
            .catch((err)=> {
                var msg = err.message
                Notify.create({
                    message: 'Soory, Terjadi kesalahan'
                })
                console.log(err)
                reject(err)
            })
        })
    },

    registerToServer(ctx, payload){
        return new Promise((resolve, reject) => {
            Axios.http().post(`/auth/register`,payload)
            .then((resp)=> {
                
                console.log(resp)
                LocalStorage.set("email", resp.data.data.email)
                ctx.commit('setTemp', resp.data.data.email)
                resolve(resp)
            })
            .catch((err)=> {
                let status = err.response.status
                if (status === 422) {
                    let msg = err.response.data.errors.email[0];
                    Notify.create({
                        message: msg,
                    });
                }
                console.log(err)
                reject(err)
            })
        })
    },

    sendMail(ctx, payload){
        return new Promise((resolve, reject) => {
            Axios.http().get(`/auth/register/send-email`,payload)
            .then((resp)=> {
                
                console.log('otp',resp.data.otp)
                // LocalStorage.set("email", resp.data.data.email)
                ctx.commit('setOtp', resp.data.otp)
                resolve(resp)
            })
            .catch((err)=> {
                var msg = err.message
                Notify.create({
                    message: 'Sorry, Terjadi kesalahan'
                })
                console.log(err)
                reject(err)
            })
        })
    },

    logout(context) {
        return new Promise((resolve, reject) => {
          Axios.http()
            .get("/auth/logout").then(res => {
              context.commit("removeUser");
              Axios.delToken();
              resolve(res);
            })
            .catch(error => {
                console.log('logout', error)
                reject(error)
            })
        });
      },
}
const getters ={
    isAuth(state) {
        return state.token != null
    },
    user(state) {
        return state.user
    },
    urlPath(state) {
        return state.imagePath
    },
    temp_email(state){
        return state.temp_email
    },
    otp(state){
        return state.otp
    }
}

export default{
  namespaced : true,
  state,
  mutations,
  actions,
  getters
}

