import axios from "axios";
import {
    api_users
} from "@/urls";
import router from "@/router";
import {exitsKey, getStorage, notificationError, notificationSuccess, saveStorage} from "@/utils";

export const userStore = {
    state: () => ({
        userList: [],
        user: exitsKey('user') ? getStorage('user') : {}

    }),
    mutations: {
        SET_USER_LIST(state, data) {
            state.userList = data
        },
        SET_USER(state, data) {
            saveStorage('user', data)
            state.user = data
        }

    },
    actions: {
        SAVE_USER({commit}, user) {
            commit("SET_OVERLAY");
            axios.post(`${api_users}`, user)
                .then(() => {
                    notificationSuccess('Usuario agregado correctamente')
                    router.push({name: 'ListUsers'}).then(() => {
                    });
                }, (err => {
                    notificationError('Ha ocurrido un error al agregar el user', err.response)
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        EDIT_USER({commit}, user) {
            commit("SET_OVERLAY");
            axios.put(`${api_users}${user.id}/`, user)
                .then(() => {
                    notificationSuccess('Usuario editado correctamente')
                    router.push({name: 'ListUsers'}).then(() => {
                    });
                }, (err => {
                    notificationError('Ha ocurrido un error al editar la Usuario', err.response)
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        FETCH_USER_LIST({commit}) {
            return new Promise(resolve => {
                commit("SET_OVERLAY");
                axios.get(`${api_users}`)
                    .then(response => {
                        resolve(response.data)
                        commit('SET_USER_LIST', response.data)
                    })
                    .catch((err) => {
                        notificationError('Ha ocurrido un error al obtener los usuarios', err.response)
                    }).finally(() => {
                    commit("SET_OVERLAY", false);
                });
            })
        }
    },
    getters: {
        GET_USER_LIST(state) {
            return state.userList
        },
        GET_USER(state) {
            return state.user
        }
    }
}

