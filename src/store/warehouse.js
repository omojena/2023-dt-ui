import axios from "axios";
import {
    api_aft,
    api_almacen,
    api_get_type_insumo, api_get_type_product,
    api_insumos, api_objeto_almacen_area,
    api_producto
} from "@/urls";
import router from "@/router";
import {api_attributenomtype, api_attributenomvalue, api_movimiento_objeto_almacen, api_movimientos} from "../urls";
import {notificationError, notificationSuccess} from "@/utils";

export const warehouseStore = {
    state: () => ({
        aftList: {},
        aftTypeList: [],
        productList: [],
        productTypeList: [],
        suppliesList: [],
        suppliesTypeList: [],
        warehouseList: [],
        moveList: []
    }),
    mutations: {
        SET_AFT_LIST(state, data) {
            let dessertsAFI = [];
            let dessertsAFT = [];
            let dessertsAFB = [];
            data.forEach(item => {
                switch (item.tipo_activo) {
                    case 'AFT':
                        dessertsAFT.push(item)
                        break;
                    case 'AFI':
                        dessertsAFI.push(item)
                        break;
                    case 'AFB':
                        dessertsAFB.push(item)
                        break;
                }
            })
            state.aftList = {
                dessertsAFT: dessertsAFT,
                dessertsAFI: dessertsAFI,
                dessertsAFB: dessertsAFB,
                records: data.length
            }

        },
        SET_AFT_TYPE_LIST(state, data) {
            state.aftTypeList = data
        },
        SET_PRODUCTS_LIST(state, data) {
            state.productList = data
        },
        SET_PRODUCTS_TYPE_LIST(state, data) {
            state.productTypeList = data
        },
        SET_SUPPLIES_LIST(state, data) {
            state.suppliesList = data
        },
        SET_SUPPLIES_TYPE_LIST(state, data) {
            state.suppliesTypeList = data
        },
        SET_WAREHOUSE_LIST(state, data) {
            state.warehouseList = data
        },
        SET_MOVE_LIST(state, data) {
            state.moveList = data
        }
    },
    actions: {
        FETCH_WAREHOUSE({commit}, query) {
            commit("SET_OVERLAY");
            return new Promise(resolve => {
                let url = query ? `${api_almacen}${query}`: api_almacen
                axios.get(`${url}`)
                    .then(response => {
                        commit('SET_WAREHOUSE_LIST', response.data)
                        resolve(response.data)
                    })
                    .catch((err) => {
                        notificationError('Ha ocurrido un error al obtener los almacenes', err.response)
                    }).finally(() => {
                    commit("SET_OVERLAY", false);
                });
            })
        },
        SAVE_WAREHOUSE({commit}, object) {
            commit("SET_OVERLAY");
            axios.post(`${api_almacen}`, object)
                .then(() => {
                    notificationSuccess(`Almacen <b>"${object.nombre}"</b> agregado correctamente`)
                    router.push({name: 'listWarehouse'}).then(() => {
                    });
                }, (err => {
                    notificationError(`Ha ocurrido un error al agregar el almacen <b>"${object.nombre}"</b>`, err.response)
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        EDIT_WAREHOUSE({commit}, object) {
            commit("SET_OVERLAY");
            axios.put(`${api_almacen}${object.id}/`, object)
                .then(() => {
                    notificationSuccess(`Almacen <b>"${object.nombre}"</b> editado correctamente`)
                    router.push({name: 'listWarehouse'}).then(() => {
                    });
                }, (err => {
                    notificationError(`Ha ocurrido un error al editar el almacen <b>"${object.nombre}"</b>`, err.response)
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        FETCH_AFT({commit}, query) {
            return new Promise(resolve => {
                let url = query ? `${api_aft}${query}`: api_aft
                axios.get(`${url}`)
                    .then(response => {
                        // commit('SET_AFT_LIST', response.data)
                        resolve(response.data);
                    })
                    .catch((err) => {
                        console.log(err);
                        notificationError('Ha ocurrido un error al obtener los activos', err.response)
                    }).finally(() => {
                    commit("SET_OVERLAY", false);
                });
            })
        },

        FETCH_OBJECT_WAREHOUSE_AREA({commit}, id) {
            return new Promise(resolve => {
                axios.get(`${api_objeto_almacen_area}?id_warehouse=${id}`)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    }).finally(() => {
                    commit("SET_OVERLAY", false);
                });
            })
        },
        SAVE_TYPE_PRODUCT({commit}, object) {
            commit("SET_OVERLAY");
            axios.post(`${api_attributenomvalue}`, object)
                .then(() => {
                    notificationSuccess(`Tipo de producto <b>"${object.nombre}"</b> agregado correctamente`)
                    router.push({name: 'listTypeProduct'}).then(() => {
                    });
                }, (err => {
                    notificationError(`Ha ocurrido un error al agregar el tipo de producto <b>"${object.nombre}"</b>`, err.response)
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        EDIT_TYPE_PRODUCT({commit}, object) {
            commit("SET_OVERLAY");
            axios.put(`${api_attributenomtype}${object.id}/`, object)
                .then(() => {
                    notificationSuccess(`Tipo de producto <b>"${object.nombre}"</b> editado correctamente`)
                    router.push({name: 'listTypeProduct'}).then(() => {
                    });
                }, (err => {
                    commit('SET_TOAST', {
                        type: 'is-danger',
                        message: `Ha ocurrido un error al editar el tipo de producto <b>"${object.nombre}"</b>`
                    });
                    commit('SET_STATUS_ERROR', err.response.status);
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        SAVE_AFT({commit}, aft) {
            commit("SET_OVERLAY");
            axios.post(`${api_aft}`, aft)
                .then(() => {
                    notificationSuccess(`Activo Fijo <b>"${aft.nombre}"</b> agregado correctamente`)
                    router.push({name: 'listAft'}).then(() => {
                    });
                }, (err => {
                    notificationError(`Ha ocurrido un error al agregar el Activo Fijo <b>"${aft.nombre}"</b>`, err.response)
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        EDIT_AFT({commit}, aft) {
            commit("SET_OVERLAY");
            axios.put(`${api_aft}${aft.id}/`, aft)
                .then(() => {
                    notificationSuccess(`Activo ${aft.nombre} Fijo editado correctamente`)
                    router.push({name: 'listAft'}).then(() => {
                    });
                }, (err => {
                    notificationError(`Ha ocurrido un error al editar el Activo Fijo <b>"${aft.nombre}"</b>`, err.response)
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        FETCH_PRODUCT({commit}, query) {
            commit("SET_OVERLAY");
            return new Promise(resolve => {
                let url = query ? `${api_producto}${query}`: api_producto
                axios.get(`${url}`)
                    .then(response => {
                        resolve(response.data)
                        commit('SET_PRODUCTS_LIST', response.data)
                    })
                    .catch((err) => {
                        notificationError('Ha ocurrido un error al obtener los productos', err.response)
                    }).finally(() => {
                    commit("SET_OVERLAY", false);
                });
            })
        },
        FETCH_TYPE_PRODUCT({commit}, query) {
            return new Promise(resolve => {
                let url = query ? `${api_get_type_product}${query}`: api_get_type_product
                axios.get(`${url}`)
                    .then(response => {
                        resolve(response.data)
                        commit('SET_PRODUCTS_TYPE_LIST', response.data)
                    })
                    .catch((err) => {
                        notificationError('Ha ocurrido un error al obtener los tipos producto', err.response)
                    }).finally(() => {
                    commit("SET_OVERLAY", false);
                });
            })
        },
        SAVE_PRODUCT({commit}, product) {
            commit("SET_OVERLAY");
            axios.post(`${api_producto}`, product)
                .then(() => {
                    notificationSuccess(`Producto <b>"${product.nombre}"</b> agregado correctamente`)
                    router.push({name: 'listProducts'}).then(() => {
                    });
                }, (err => {
                    notificationError(`Ha ocurrido un error al agregar el Producto <b>"${product.nombre}"</b>`, err.response)
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        EDIT_PRODUCT({commit}, product) {
            commit("SET_OVERLAY");
            axios.put(`${api_producto}${product.id}/`, product)
                .then(() => {
                    notificationSuccess(`Producto ${product.nombre} editado correctamente`)
                    router.push({name: 'listProducts'}).then(() => {
                    });
                }, (err => {
                    notificationError(`Ha ocurrido un error al editar el Producto <b>"${product.nombre}"</b>`, err.response)
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        FETCH_SUPPLIES({commit}, query) {
            return new Promise(resolve => {
                let url = query ? `${api_insumos}${query}`: api_insumos
                axios.get(`${url}`)
                    .then(response => {
                        resolve(response.data)
                        console.log(response.data);
                        commit('SET_SUPPLIES_LIST', response.data)
                    })
                    .catch((err) => {
                        notificationError('Ha ocurrido un error al obtener los insumos', err.response)
                    }).finally(() => {
                    commit("SET_OVERLAY", false);
                });
            })
        },
        SAVE_SUPPLIES({commit}, object) {
            commit("SET_OVERLAY");
            axios.post(`${api_insumos}`, object)
                .then(() => {
                    notificationSuccess(`Insumo <b>"${object.nombre}"</b> agregado correctamente`)
                    router.push({name: 'listSupplies'}).then(() => {
                    });
                }, (err => {
                    notificationError(`Ha ocurrido un error al agregar el Insumo <b>"${object.nombre}"</b>`, err.response)
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        EDIT_SUPPLIES({commit}, object) {
            commit("SET_OVERLAY");
            axios.put(`${api_insumos}${object.id}/`, object)
                .then(() => {
                    notificationSuccess(`Insumo ${object.nombre} editado correctamente`)
                    router.push({name: 'listSupplies'}).then(() => {
                    });
                }, (err => {
                    notificationError(`Ha ocurrido un error al editar el Insumo <b>"${object.nombre}"</b>`, err.response)
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        FETCH_TYPE_SUPPLIES({commit}, query) {
            commit("SET_OVERLAY");
            return new Promise(resolve => {
                let url = query ? `${api_get_type_insumo}${query}`:api_get_type_insumo
                axios.get(`${url}`)
                    .then(response => {
                        resolve(response.data)
                        commit('SET_SUPPLIES_TYPE_LIST', response.data)
                    })
                    .catch((err) => {
                        notificationError('Ha ocurrido un error al obtener los tipos insumos', err.response)
                    }).finally(() => {
                    commit("SET_OVERLAY", false);
                });
            })
        },
        SAVE_TYPE_SUPPLIES({commit}, object) {
            commit("SET_OVERLAY");
            axios.post(`${api_attributenomvalue}`, object)
                .then(() => {
                    notificationSuccess(`Tipo de insumo <b>"${object.nombre}"</b> agregado correctamente`)
                    router.push({name: 'listTypSupplies'}).then(() => {
                    });
                }, (err => {
                    notificationSuccess(`Ha ocurrido un error al agregar el tipo de insumo <b>"${object.nombre}"</b>`, err.response)
                    commit('SET_STATUS_ERROR', err.response.status);
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        EDIT_TYPE_SUPPLIES({commit}, object) {
            commit("SET_OVERLAY");
            axios.put(`${api_attributenomtype}${object.id}/`, object)
                .then(() => {
                    notificationSuccess(`Tipo de insumo <b>"${object.nombre}"</b>  editado correctamente`)
                    router.push({name: 'listTypSupplies'}).then(() => {
                    });
                }, (err => {
                    notificationError(`Ha ocurrido un error al editar el tipo de insumo <b>"${object.nombre}"</b>`, err.response)
                })).finally(() => {
                commit("SET_OVERLAY", false);
            });
        },
        FETCH_MOVE({commit}, query) {
            commit("SET_OVERLAY");
            return new Promise(resolve => {
                let url = query.oa ? `${api_movimientos}${query.oa}`: api_movimientos
                axios.get(`${url}`)
                    .then(response => {
                        commit('SET_MOVE_LIST', response.data);
                        resolve(response.data)
                    })
                    .catch((err) => {
                        notificationError('Ha ocurrido un error al obtener los movimientos', err.response)
                    }).finally(() => {
                    commit("SET_OVERLAY", false);
                });
            })
        },
        SAVE_MOVE({commit}, object) {
            commit("SET_OVERLAY");
            return new Promise(resolve => {
                axios.post(`${api_movimiento_objeto_almacen}`, object)
                  .then(() => {
                      notificationSuccess(`Se ha agregado un movimiento correctamente`);
                      if (object.flag) {
                          resolve(router.push({name: 'listMovement'}))
                      }else {
                          resolve(object.id)
                      }
                  }, (err => {
                      notificationError(`Ha ocurrido un error al agregar el movimiento `, err.response)
                  })).finally(() => {
                    commit("SET_OVERLAY", false);
                });
            })

        },
    },
    getters: {
        GET_AFT_LIST(state) {
            return state.aftList
        },
        GET_AFT_TYPE_LIST(state) {
            return state.aftTypeList
        },
        GET_PRODUCTS_LIST(state) {
            return state.productList
        },
        GET_PRODUCTS_TYPE_LIST(state) {
            return state.productTypeList
        },
        GET_SUPPLIES_LIST(state) {
            return state.suppliesList
        },
        GET_SUPPLIES_TYPE_LIST(state) {
            return state.suppliesTypeList
        },
        GET_WAREHOUSE_LIST(state) {
            return state.warehouseList
        },
        GET_MOVE_LIST(state) {
            return state.moveList
        },

    }
}
