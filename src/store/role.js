import axios from "axios";
import router from "@/router";
import {api_permisos, api_permissions, api_roles} from "@/urls";
import {notificationError, notificationSuccess} from "@/utils";

export const rolesStore = {
    state: () => ({
        roleList: [],

    }),
    mutations: {
        SET_ROLE_LIST(state, data) {
            state.roleList = data
        },

    },
    actions: {
        SAVE_ROLE({commit}, role) {
            commit("SET_OVERLAY");
            axios.post(`${api_roles}`, role)
                .then(() => {
                    notificationSuccess(`Rol ${role.name} agregado correctamente`)
                    router.push({name: 'ListRoles'}).then(() => {
                    });
                }, (err => {
                    notificationError('Ha ocurrido un error al agregar el Rol', err.response)
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        EDIT_ROLE({commit}, rol) {
            commit("SET_OVERLAY");
            axios.put(`${api_roles}${rol.id}/`, rol)
                .then(() => {
                    notificationSuccess(`Rol ${rol.name} editado correctamente`)
                    router.push({name: 'ListRoles'}).then(() => {
                    });
                }, (err => {
                    notificationError('Ha ocurrido un error al editar la Rol', err.response)
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        FETCH_ROLE_LIST({commit}, query) {
            return new Promise(resolve => {
                commit("SET_OVERLAY");
                let url = query ? `${api_roles}${query}`: api_roles
                axios.get(`${url}`)
                    .then(response => {
                        resolve(response.data)
                        commit('SET_ROLE_LIST', response.data)
                    })
                    .catch((err) => {
                        notificationError('Ha ocurrido un error al obtener los roles', err.response)
                    }).finally(() => {
                    commit("SET_OVERLAY", false);
                });
            })
        },
        FETCH_PERMISSIONS_LIST({commit}, query) {
            return new Promise(resolve => {
                commit("SET_OVERLAY");
                let url = query ? `${api_permisos}${query}`: api_permisos
                axios.get(`${url}`)
                  .then(response => {
                      resolve(response.data)
                  })
                  .catch((err) => {
                      notificationError('Ha ocurrido un error al obtener los permisos', err.response)
                  }).finally(() => {
                    commit("SET_OVERLAY", false);
                });
            })
        },
        FETCH_PERMISSIONS_LIST_All({commit}) {
            return new Promise(resolve => {
                commit("SET_OVERLAY");
                axios.get(`${api_permissions}`)
                  .then(response => {
                      resolve(response.data)
                  })
                  .catch((err) => {
                      notificationError('Ha ocurrido un error al obtener los permisos', err.response)
                  }).finally(() => {
                    commit("SET_OVERLAY", false);
                });
            })
        }
    },
    getters: {
        GET_ROLE_LIST(state) {
            return state.roleList
        },
    }
}
