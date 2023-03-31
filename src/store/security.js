import {api_token, api_token_refresh, api_users} from "@/urls";
import axios from "axios";
import router from "../router";
import {clearStorage, exitsKey, getStorage, notificationError, saveStorage} from "@/utils";

export const securityStore = {
  state: () => ({
    auth: localStorage.getItem('auth'),
    permissions: exitsKey('permissions')? getStorage('permissions'):[],
    modules: exitsKey('modules')? getStorage('modules'):[],

    // enterprise list user authenticated
    enterprises_user: [],
    // others authentication data
    enterprise_auth: null,
    enterprise_name: localStorage.getItem('enterprise_name'),
    enterprise_id: localStorage.getItem('enterprise_id'),
    user_id: localStorage.getItem('user_id'),

    // token de autenticacion
    jwt: localStorage.getItem('token'),
    jwt_refresh: localStorage.getItem('refresh'),
    endpoints: {
      obtainJWT: `${api_token}`,
      refreshJWT: `${api_token_refresh}`
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`

    },
  }),
  mutations: {
    UPDATE_TOKEN(state, newToken) {
      localStorage.setItem('token', newToken);
      state.jwt = newToken;
    },

    LOGOUT(state) {
      state.auth = false;
      clearStorage();
      router.push({name: 'login'}).catch(() => {
      })
    },

    LOGIN(state) {
      state.auth = true;
    },

    LOGIN_ENTERPRISE(state, enterprise) {
      state.dialog = false;
      state.auth = true;
      state.enterprise_auth = enterprise
    },

    MODAL_LOGIN(state) {
      state.dialog = true;
    },

    DIALOG_SWAP_ENTERPRISE(state) {
      state.dialog = !state.dialog;
    },
    SET_ENTERPRISE_USER(state, enterprises) {
      state.enterprises_user = enterprises;
    },

    SAVE_USER_ID(state, id) {
      state.user_id = id;
    },
  },
  actions: {
    GET_USER({commit}) {
      commit('SET_OVERLAY')
      axios.get(`${api_users}me/`)
        .then(response => {
          const user = response.data;
          let permissions = [];
          let modules = [];
          for (const item of user.groups) {
            for (const perm of item.custom_permissions) {
              if (permissions.indexOf(perm)===-1){
                permissions.push(perm);
              }
            }
            for (const mod of item.modules) {
              if (modules.indexOf(mod)===-1){
                modules.push(mod);
              }
            }
          }
          saveStorage('permissions', permissions)
          saveStorage('modules', modules)
          let fullName = user.first_name + ' ' + user.last_name;
          saveStorage('user', user)
          saveStorage('fullName', fullName, false)
          saveStorage('avatar', user.avatar, false)
          })
        .catch(err => {
          router.push('login')
          notificationError('Usuario no encontrado', err.response)
        });
    },
    REFRESH_TOKEN({commit}) {
      const payload = {
        refresh: this.state.jwt_refresh
      };
      axios.post(`${api_token_refresh}`, payload)
        .then((response) => {
          commit('UPDATE_TOKEN', response.data.access);
        })
        .catch((error) => {
          console.log(error)
        })
    },
    LOGIN_ENTERPRISE_ACTION({commit}, enterprise) {
      router.replace('home').catch(() => {
      });
      commit('LOGIN_ENTERPRISE', enterprise);
    },
  },
  getters: {
    GET_ENTERPRISE_AUTH(state) {
      return {
        user_id: state.user_id,
        enterprise_name: state.enterprise_name,
        enterprise_id: state.enterprise_id
      }
    },
    GET_PERMISSIONS(state) {
      return {
        permissions: state.permissions,
        modules: state.modules
      }
    },
    GET_DIALOG_MODAL(state) {
      return state.dialog
    }
  }
};
