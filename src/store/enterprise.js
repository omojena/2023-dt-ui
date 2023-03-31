import axios from "axios";
import {api_area, api_clasificacion_empresa_nomvalue, api_tipo_empresa_nomvalue} from "@/urls";
import router from "@/router";
import {notificationError, notificationSuccess} from "@/utils";

export const enterpriseStore = {
    state: () => ({
        listArea: [],
        listClassificationEnterprise: [],
        listTypeEnterprise: [],
        listEnterpriseUser: [],
        classification_enterprise:null,
    }),
    mutations: {
        SET_AREAS(state, data) {
            state.listArea = data
        },
        SET_CLASSIFICATION_ENTERPRISE(state, data) {
            state.listClassificationEnterprise = data
        },
        SET_TYPE_ENTERPRISE(state, data) {
            state.listTypeEnterprise = data
        },
        SET_ENTERPRISE_USER(state, data) {
            state.listEnterpriseUser = data;
        }
    },
    actions: {
        FETCH_AREAS({commit}, query) {
            return new Promise(resolve => {
                commit("SET_OVERLAY", false)
                let url = query ? `${api_area}${query}`: api_area
                axios.get(`${url}`)
                    .then(response => {
                        resolve(response.data)
                        commit('SET_AREAS',response.data )
                    })
                    .catch(err => {
                        notificationError('Ha ocurrido un error al obtener las areas', err.response)
                    })
                    .finally(()=>{
                        commit("SET_OVERLAY", false)
                    });
            })

        },
        SAVE_AREA({commit}, area_object){
            commit("SET_OVERLAY")
            axios.post(`${api_area}`, area_object)
                .then(() => {
                    notificationSuccess(`Area ${area_object.nombre} agregada correctamente`)
                    router.push({name: 'listArea'}).then(() => {});
                }, (err => {
                    notificationError('Ha ocurrido un error al agregar el area', err.response)
                }))
                .finally(()=>{
                commit("SET_OVERLAY", false)
            });
        },
        EDIT_AREA({commit}, area_object){
            commit("SET_OVERLAY")
            axios.put(`${api_area}${area_object.id}/`, area_object)
                .then(() => {
                    notificationSuccess(`Area ${area_object.nombre} editada correctamente`)
                    router.push({name: 'listArea'}).then(() => {});
                }, (err => {
                    notificationError('Ha ocurrido un error al editar el area', err.response)
                }))
                .finally(()=>{
                commit("SET_OVERLAY", false)
            });
        },
        FETCH_TYPE_ENTERPRISE({commit}) {
            commit("SET_OVERLAY")
            axios.get(api_tipo_empresa_nomvalue)
                .then(response => {
                    commit('SET_TYPE_ENTERPRISE', response.data)
                })
                .catch(err => {
                    notificationError('Ha ocurrido un error al obtener los tipos de empresa', err.response)
                })
                .finally(()=>{
                commit("SET_OVERLAY", false)
            });
        },
        FETCH_CLASSIFICATION_ENTERPRISE({commit}) {
            commit("SET_OVERLAY")
            axios.get(api_clasificacion_empresa_nomvalue)
                .then(response => {
                    commit('SET_CLASSIFICATION_ENTERPRISE', response.data)
                })
                .catch(err => {
                    notificationError('Ha ocurrido un error al obtener las clasificaciones', err.response)
                })
                .finally(()=>{
                commit("SET_OVERLAY", false)
            });
        },
    },
    getters: {
        GET_AREAS(state) {
            return state.listArea
        },
        GET_CLASSIFICATION_ENTERPRISE(state) {
            return state.listClassificationEnterprise
        },
        GET_TYPE_ENTERPRISE(state) {
            return state.listTypeEnterprise
        },
        GET_ENTERPRISE_USER_LIST(state) {
            return state.listEnterpriseUser
        },
    }
};
