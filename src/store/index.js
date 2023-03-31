import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import VueAxios from 'vue-axios'
import {api_get_estado_by_workflow, api_get_attributes, api_atributos, api_nomvalue} from "@/urls";
import {ToastProgrammatic as Toast} from 'buefy'
// MODULES//
import {accountingStore} from "./accounting";
import {administrationStore} from "./administration";
import {enterpriseStore} from "./enterprise";
import {rrhhStore} from "./rrhh";
import {securityStore} from "./security";
import {servicesStore} from "./services";
import {warehouseStore} from "./warehouse";
import {userStore} from "./users";
import {rolesStore} from "./role";
import {menuStore} from "./menu";
import router from "@/router";
import {api_municipality, api_province} from "@/urls";
import {notification, notificationError, notificationSuccess} from "@/utils";
import {TYPE_ERROR} from "@/enum";


Vue.use(VueAxios, axios);
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        is_login: true,
        current_page: null,
        service: false,
        id_service: 0,
        toast: {
            duration: 5000,
            message: null,
            position: 'is-top-right',
            type: null
        },
        status_error: null,
        hide_action_attr: true,
        lang_swap: localStorage.getItem('lang'),
        modal_delete: false,
        modal_workflow: false,
        workflow: null,
        object_delete: null,
        url_delete: null,
        url_get_data: null,
        url_update_data: null,
        attributes_render: {fields: []},
        custom_attributes: [],
        custom_movement_warehouse: [],
        attributes_list: [
            {name: "Direccion Particular", type: "text", id: 0},
            {name: "Cooreo Personal", type: "correo", id: 1},
            {name: "Foto de Carnet", type: "imagen", id: 2},
            {name: "Tipos de Incidencias", type: "select_all", id: 3},
            {name: "Pago en Linea", type: "qr_code", id: 4},
            {name: "Etiqueta de Producto", type: "bar_code", id: 5},
            {name: "Tipo de Bicicletas", type: "select", id: 6}
        ],
        data_after_delete: [],
        //var for list workflow states
        workflow_sates: [],
        fk_workflow: localStorage.getItem('fk_workflow'),
        // global var authentication
        menu: true,
        auth_error: null,
        // control var authentication modal
        dialog: false,
        overlay: false,
        province_list: [],
        municipality_list: []

    },
    getters: {
        GET_IS_LOGIN(state) {
            return state.is_login
        },
        GET_CURRENT_PAGE(state) {
            return state.current_page
        },
        GET_PROVINCE_LIST(state) {
            return state.province_list
        },
        GET_MUNICIPALITY_LIST(state) {
            return state.municipality_list
        },
        GET_LOADING(state) {
            return state.overlay
        },
        GET_DATA_AFTER_DELETE(state) {
            return state.data_after_delete
        },
        GET_ATTRIBUTES_RENDER(state) {
            return state.attributes_render
        },
        GET_CUSTOM_ATTRIBUTES(state) {
            return state.custom_attributes
        },
        GET_CUSTOM_MOVEMENT_WAREHOUSE(state) {
            return state.custom_movement_warehouse
        },

        GET_ATTRIBUTES_LIST(state) {
            return state.attributes_list
        },

    },
    mutations: {
        SET_IS_LOGIN(state, value = true) {
            state.is_login = value
        },
        SET_CURRENT_PAGE(state, val) {
            state.current_page = val
        },
        SET_MUNICIPALITY_LIST(state, data) {
            state.municipality_list = data
        },
        SET_PROVINCE_LIST(state, data) {
            state.province_list = data
        },
        SET_DIALOG(state, val) {
            state.dialog = val
        },
        SET_URL_UPDATE_VALUES(state, val) {
            state.url_update_data = val
        },

        SET_ID_SERVICE(state, val) {
            state.id_service = val
        },

        MODE_SERVICE(state, value) {
            state.service = value
        },

        SET_HIDE_ACTION_ATTR(state, val) {
            state.hide_action_attr = val
        },

        SET_LANGUAGE(state, lang) {
            state.lang_swap = lang
        },

        OPEN_MODAL_DELETE(state, name,) {
            state.modal_delete = true;
            state.object_delete = name;

        },
        CLOSE_MODAL_DELETE(state) {
            state.modal_delete = false;
            state.object_delete = '';
            state.url_delete = '';
            state.url_get_data = '';
            localStorage.removeItem('uri_delete');
            localStorage.removeItem('uri_get_data');
        },

        OPEN_MODAL_WORKFLOW(state, workflow) {
            state.workflow = workflow;
        },
        CLOSE_MODAL_WORKFLOW(state) {
            state.workflow = null;
        },
        LOAD_URL_DELETE(state, uri_delete) {
            state.url_delete = uri_delete;
            localStorage.setItem('uri_delete', uri_delete);
        },
        LOAD_URL_DATA(state, uri_get_data) {
            state.url_get_data = uri_get_data;
            localStorage.setItem('uri_get_data', uri_get_data);
        },
        UPDATE_STATE_WORKFLOW(state, states) {
            state.workflow_sates = states
        },
        SET_ATTRIBUTES_NOM_TYPE(state, data) {
            state.attributes_render = data
        },
        SET_ATTRIBUTES_LIST(state, data) {
            state.attributes_list = data.length ? data : []
        },
        SET_OVERLAY(state, value = false) {
            state.overlay = value;
        },
        SET_TOAST(state, value) {
            state.toast.message = value.message;
            state.toast.type = value.type;
            state.toast.duration = value.duration || 5000;
            state.toast.position = value.position || 'is-top-right';
            Toast.open(this.state.toast)
        },
        SET_STATUS_ERROR(state, response) {
            console.log(response);
            state.status_error = status;

        },
        SET_DATA_AFTER_DELETE(state, data) {
            state.data_after_delete = data
        },
        SET_CUSTOM_ATTRIBUTES(state, attributes = []) {
            state.custom_attributes = attributes.length ? attributes : []
        },
        SET_CUSTOM_MOVEMENT_WAREHOUSE(state, mov) {
            state.custom_movement_warehouse = mov.length ? mov : []
        },


    },
    actions: {
        GO_TO({commit}, routerName) {
            router.push({name: routerName}).then(() => {
                if (routerName === 'login') {
                    commit('SET_IS_LOGIN', true)
                }
            }).catch(() => {
            })
        },
        GO_BACK() {
            router.go(-1)
        },

        //Metodos para obtener los estados de los workflows
        GET_STATES_WORKFLOW({commit}) {
            commit('SET_OVERLAY', true);
            let fk_workflow = localStorage.getItem('fk_workflow');
            let estados = [];
            axios.get(`${api_get_estado_by_workflow}${fk_workflow}/`)
                .then(result => {
                    commit('SET_OVERLAY', false);
                    result.data.forEach(data => {
                        estados.push({
                            id: data.id,
                            text: `${data.nombre}`,
                            descripcion: data.descripcion,
                            icon: 'mdi-chevron-right',
                        },)
                    });
                    commit('UPDATE_STATE_WORKFLOW', estados)
                }, (err => {
                    notificationError('Ha ocurrido un error al obtener los estados', err.response)
                }));
        },
        GET_ATTRIBUTES_NOM_TYPE({commit}, id) {
            commit('SET_OVERLAY');
            axios.get(`${api_get_attributes}${id}/`)
                .then(response => {
                    commit('SET_ATTRIBUTES_NOM_TYPE', response.data)
                }).catch(() => {
                commit('SET_TOAST', {
                    type: 'is-danger',
                    message: 'Ha ocurrido un error al obtener los atributos'
                });
            }).finally(() => {
                commit('SET_OVERLAY', false);
            })
        },
        GET_ATTRIBUTES_LIST_ACTION({commit}) {
            commit('SET_OVERLAY', true);
            axios.get(`${api_atributos}`)
                .then(response => {
                    commit('SET_ATTRIBUTES_LIST', response.data)
                }).catch(() => {
                notificationError('Ha ocurrido un error al obtener los atributos')
            }).finally(() => {
                commit('SET_OVERLAY', false);
            })
        },
        TOAST_MESSAGE() {
            Toast.open(this.state.toast)
        },
        CONFIRM_DELETE() {
            return new Promise((resolve, reject) => {
                axios.delete(this.state.url_delete)
                    .then(() => {
                        axios.get(this.state.url_get_data)
                            .then(response => {
                                resolve(response.data);
                            });
                    })
                    .catch((error) => {
                        axios.get(this.state.url_get_data)
                            .then(response => {
                                resolve(response.data);
                            });
                        reject({error: error.message});
                        notification('No puede eliminar este elemento, existen dependencias asociadas a el', TYPE_ERROR.WARNING)
                    });
            })
        },
        UPDATE_VALUES({commit}, url) {
            return new Promise((resolve) => {
                commit("SET_OVERLAY")
                axios.get(url)
                    .then(response => {
                        resolve(response.data)
                    }).catch((err) => {
                    notificationError('Ha ocurrido un error al obtener los valore', err.response)
                }).finally(() => {
                    commit("SET_OVERLAY", false)
                });
            });
        },
        SAVE_NOM_VALUE({commit}, object) {
            commit("SET_OVERLAY");
            axios.post(`${api_nomvalue}`, object)
                .then(() => {
                    notificationSuccess('Registro agregado correctamente')
                    router.push({name: object.successUrl}).catch(() => {
                    });
                }, (err => {
                    notificationError('Ha ocurrido un error al guardar los datos', err.response)
                }))
                .finally(() => {
                    commit("SET_OVERLAY", false)
                });
        },
        EDIT_NOM_VALUE({commit}, object) {
            commit("SET_OVERLAY");
            axios.put(`${api_nomvalue}${object.id}/`, object)
                .then(() => {
                    notificationSuccess('Registro editado correctamente')
                    router.push({name: object.successUrl}).catch(() => {
                    });
                }, (err => {
                    notificationError('Ha ocurrido un error al guardar los datos', err.response)
                }))
                .finally(() => {
                    commit("SET_OVERLAY", false)
                });
        },
        FETCH_MUNICIPALITY_LIST({commit}, id) {
            commit('SET_OVERLAY')
            let url = id ? `${api_municipality}?province=${id}` : api_municipality
            return new Promise(resolve => {
                axios.get(url).then(response => {
                    resolve(response.data.results)
                    commit('SET_MUNICIPALITY_LIST', response.data.results)
                }).catch((err) => {
                    notificationError('Ha ocurrido un error al obtener los municipios', err.response)
                })
                    .finally(() => {
                        commit('SET_OVERLAY', false)
                    })
            })
        },
        FETCH_PROVINCE_LIST({commit}, query) {
            commit('SET_OVERLAY')
            return new Promise(resolve => {
                let url = query ? `${api_province}${query}` : api_province
                axios.get(url).then(response => {
                    resolve(response.data.results)
                    commit('SET_PROVINCE_LIST', response.data.results)
                }).catch((err) => {
                    notificationError('Ha ocurrido un error al obtener las provincias', err.response)
                })
                    .finally(() => {
                        commit('SET_OVERLAY', false)
                    })
            })
        },
        FETCH_PROVINCE({commit}, id) {
            commit('SET_OVERLAY')
            return new Promise(resolve => {
                axios.get(`${api_province}${id}/`).then(response => {
                    resolve(response.data)
                }).catch((err) => {
                    notificationError('Ha ocurrido un error al obtener la provincia', err.response)
                })
                    .finally(() => {
                        commit('SET_OVERLAY', false)
                    })
            })
        },
    },
    modules: {
        accountingStore,
        administrationStore,
        enterpriseStore,
        rrhhStore,
        securityStore,
        servicesStore,
        warehouseStore,
        rolesStore,
        userStore,
        menuStore
    }
})
