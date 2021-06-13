import Vue from "vue";
import axios from "axios";

import { LocalStorage } from "quasar";

Vue.prototype.$axios = axios;

export function server() {
  // const server = "https://server.pro-kc.com/public";
  const server = 'http://jwt-auth.test'
  // const server = "http://server-prokc.test:8080";
  return server;
}
export function pathImage() {
  // const pathImage = `https://pro-kc.com/server/storage/app/public/`;
  const pathImage = 'http://jwt-auth.test/storage/'
  // const pathImage = `http://server-prokc.test:8080//storage/`;
  return pathImage;
}

export function http() {
  return axios.create({
    baseURL: server() + "/api",
    headers: {
      Authorization: "Bearer " + getAccessToken()
    }
  });
}
export function httpFile() {
  return axios.create({
    baseURL: server() + "/api",
    headers: {
      Authorization: "Bearer " + getAccessToken(),
      "Content-Type": "multipart/form-data"
    }
  });
}

function getAccessToken() {
  const token = LocalStorage.getAll().token;
  return token;
}

export function setToken(data) {
  LocalStorage.set("token", data);
}

export function delToken() {
  LocalStorage.clear();
}
