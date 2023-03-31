import axios from "axios";
import {
  api_change_status_service, api_distribution_zone, api_messenger_provider,
  api_oferta_agrupada,
  api_oferta_simple,
  api_open_service, api_service_messenger,
  api_rental_service,
  api_service_taller, api_stats_open_service, api_tipo_devolucion_nomvalue
} from "@/urls";
import router from "@/router";
import {api_tipo_oferta_nomvalue} from "@/urls";
import {notificationError, notificationSuccess} from "@/utils";

export const servicesStore = {
  state: () => ({
    type_service_list: [],
    type_offer_list: [],
    type_refund_list: [],
    services_list: [],
    offers_list: [],
    offers_list_simples: [],
    offers_list_group: [],
    bicycle_stock_list: []
  }),
  mutations: {
    SET_BICYCLE_STOCK_LIST(state, data) {
      state.bicycle_stock_list = data ? data : [];
    },
    SET_TYPE_SERVICE_STORE(state, data) {
      state.type_service_list = data ? data : [];
    },
    SET_SERVICE(state, data) {
      state.services_list = data ? data : [];
    },
    SET_OFFERS(state, data) {
      state.offers_list = data ? data : [];
    },
    SET_OFFERS_SIMPLES(state, data) {
      state.offers_list_simples = data ? data : [];
    },
    SET_OFFERS_GROUP(state, data) {
      state.offers_list_group = data ? data : [];
    },
    SET_TYPE_OFFER(state, data) {
      state.type_offer_list = data ? data : [];
    },
    SET_TYPE_REFUND(state, data) {
      state.type_refund_list = data ? data : [];
    },
    ADD_TYPE_SERVICE(state, typeService) {
      state.type_service_list.push(typeService)
    },

  },
  actions: {
    FETCH_STATS_OPEN_SERVICE({commit}, query = null) {
      commit('SET_OVERLAY')
      let url = query ? `${api_stats_open_service}${query}` : api_stats_open_service;
      return new Promise(resolve => {
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            notificationError('Ha ocurrido un error al obtener las estadisticas', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })

    },
    FETCH_RENT_SERVICES({commit}, query) {
      commit('SET_OVERLAY')
      let url = query ? `${api_rental_service}${query}` : api_rental_service;
      return new Promise(resolve => {
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data);
            commit('SET_SERVICE', response.data)
          })
          .catch(err => {
            notificationError('Ha ocurrido un error al obtener los servicios', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })

    },
    FETCH_TALLER_SERVICES({commit}, query) {
      commit('SET_OVERLAY')
      let url = query ? `${api_service_taller}${query}` : api_service_taller;
      return new Promise(resolve => {
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            notificationError('Ha ocurrido un error al obtener los servicios', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })

    },
    FETCH_MESSENGER_SERVICES({commit}, query) {
      commit('SET_OVERLAY')
      let url = query ? `${api_service_messenger}${query}` : api_service_messenger;
      return new Promise(resolve => {
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            notificationError('Ha ocurrido un error al obtener los servicios', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })

    },
    FETCH_ALL_SERVICES({commit}, query) {
      commit('SET_OVERLAY')
      let url = query ? `${api_open_service}${query}` : api_open_service;
      return new Promise(resolve => {
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data);
            commit('SET_SERVICE', response.data)
          })
          .catch(err => {
            notificationError('Ha ocurrido un error al obtener los servicios', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })

    },
    SAVE_SERVICE_TALLER({commit}, object) {
      commit('SET_OVERLAY')
      axios.post(`${api_service_taller}`, object)
        .then(() => {
          notificationSuccess('Servicio de Taller agregado correctamente')
          router.push({name: 'allServices'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al agregar el servicio taller', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    EDIT_SERVICE_TALLER({commit}, object) {
      axios.put(`${api_service_taller}${object.id}/`, object)
        .then(() => {
          notificationSuccess('Servicios de taller editado correctamnete')
          router.push({name: 'allServices'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al editar el servicio de taller', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    SAVE_SERVICE_RENT({commit}, object) {
      commit('SET_OVERLAY')
      return new Promise(resolve => {
        axios.post(`${api_rental_service}`, object)
          .then((response) => {
            notificationSuccess('Servicio de renta agregado correctamente')
            resolve(response.data)
          }, (err => {
            notificationError('Ha ocurrido un error al agregar el servicio renta', err.response)
          }))
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })

    },
    SAVE_MESSENGER_PROVIDER({commit}, object) {
      commit('SET_OVERLAY')
      axios.post(`${api_messenger_provider}`, object)
        .then(() => {
          notificationSuccess('Proveedor agregado correctamente')
          router.push({name: 'listMessengerProvider'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al agregar el proveedor', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    EDIT_MESSENGER_PROVIDER({commit}, object) {
      commit('SET_OVERLAY')
      axios.put(`${api_messenger_provider}`, object)
        .then(() => {
          notificationSuccess('Proveedor editado correctamente')
          router.push({name: 'listMessengerProvider'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al editar el proveedor', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    SAVE_SERVICE_MESSENGER({commit}, object) {
      commit('SET_OVERLAY')
      axios.post(`${api_service_messenger}`, object)
        .then(() => {
          notificationSuccess('Servicio de mensajeria agregado correctamente')
          router.push({name: 'allServices'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al agregar el servicio mensajeria', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    EDIT_SERVICE_RENT({commit}, object) {
      return new Promise(resolve => {
        axios.put(`${api_rental_service}${object.id}/`, object)
          .then(() => {
            notificationSuccess('Servicios de renta editada correctamnete')
            router.push({name: 'allServices'}).then(() => {
            });
            resolve(true)
          }, (err => {
            notificationError('Ha ocurrido un error al editar el servicio de renta', err.response)
          }))
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })

    },
    EDIT_SERVICE_MESSENGER({commit}, object) {
      return new Promise(resolve => {
        axios.put(`${api_service_messenger}${object.id}/`, object)
            .then(() => {
              notificationSuccess('Servicios de mensajeria editada correctamnete')
              router.push({name: 'allServices'}).then(() => {
              });
              resolve(true)
            }, (err => {
              notificationError('Ha ocurrido un error al editar el servicio de mensajeria', err.response)
            }))
            .finally(() => {
              commit("SET_OVERLAY", false);
            });
      })

    },
    PARTIAL_UPDATE_SERVICE({commit, state}, object) {
      return new Promise(resolve => {
        axios.post(api_change_status_service, object)
          .then(() => {
            notificationSuccess('Servicio editado correctamnete')
            resolve(state.services_list)
            router.push({name: 'allServices'}).then(() => {
            });
          }, (err => {
            notificationError('Ha ocurrido un error al editar el servicio', err.response)
          }))
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })

    },
    FETCH_SIMPLE_OFFERS({commit}, query) {
      commit('SET_OVERLAY')
      return new Promise(resolve => {
        let url = query ? `${api_oferta_simple}${query}`:api_oferta_simple
        axios.get(`${url}`)
          .then(response => {
            commit('SET_OFFERS_SIMPLES', response.data);
            resolve(response.data)
          })
          .catch(err => {
            notificationError('Ha ocurrido un error al obtener las Ofertas', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })
    },
    FETCH_MESSENGER_PROVIDER_LIST({commit}, query = null) {
      commit('SET_OVERLAY')
      return new Promise(resolve => {
        let url = query ? `${api_messenger_provider}${query}` : api_messenger_provider
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            notificationError('Ha ocurrido un error al obtener los Provedores', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })
    },
    FETCH_DISTRIBUTION_ZONE_LIST({commit}, query) {
      commit('SET_OVERLAY')
      return new Promise(resolve => {
        let url = query ? `${api_distribution_zone}${query}` : api_distribution_zone
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            notificationError('Ha ocurrido un error al obtener las zonas de distribucion', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })
    },
    SAVE_DISTRIBUTION_ZONE({commit}, object) {
      commit('SET_OVERLAY')
      axios.post(`${api_distribution_zone}`, object)
        .then(() => {
          notificationSuccess('Zona de distribucion agregada correctamente')
          router.push({name: 'listDistributionZone'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al agregar la zona de distribucion', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    EDIT_DISTRIBUTION_ZONE({commit}, object) {
      commit('SET_OVERLAY')
      axios.put(`${api_distribution_zone}`, object)
        .then(() => {
          notificationSuccess('Zona de distribucion editada correctamente')
          router.push({name: 'listDistributionZone'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al editar la zona de distribucion', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    FETCH_GROUP_OFFERS({commit}) {
      commit('SET_OVERLAY')
      return new Promise(resolve => {
        axios.get(`${api_oferta_agrupada}`)
          .then(response => {
            commit('SET_OFFERS_GROUP', response.data);
            resolve(response.data)
          })
          .catch(err => {
            notificationError('Ha ocurrido un error al obtener las Ofertas', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })
    },
    FETCH_ALL_OFFERS({commit, dispatch, state}) {
      commit('SET_OVERLAY')
      return new Promise(resolve => {
        dispatch('FETCH_SIMPLE_OFFERS');
        dispatch('FETCH_GROUP_OFFERS');
        let all = state.offers_list_simples.concat(state.offers_list_group);
        commit('SET_OFFERS', all);
        resolve(all)
      })

    },
    SAVE_OFFER({commit}, object) {
      commit('SET_OVERLAY')
      let url = object.type === 'simple' ? api_oferta_simple : api_oferta_agrupada
      axios.post(url, object)
        .then(() => {
          notificationSuccess(`Oferta ${object.nombre} agregada correctamente`)
          router.push({name: 'listOffers'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al agregar el la oferta', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    EDIT_OFFER({commit}, object) {
      let url = object.type === 'simple' ? api_oferta_simple : api_oferta_agrupada
      axios.put(`${url}${object.id}/`, object)
        .then(() => {
          notificationSuccess(`Oferta ${object.nombre} editada correctamnete`)
          router.push({name: 'listOffers'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al editar la oferta', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },

    FETCH_TYPE_OFFER_LIST({commit}) {
      commit('SET_OVERLAY')
      return new Promise(resolve => {
        axios.get(`${api_tipo_oferta_nomvalue}`)
          .then(response => {
            commit('SET_TYPE_OFFER', response.data)
            resolve(response.data)
          })
          .catch(err => {
            notificationError('Ha ocurrido un error al obtener los tipos de oferta', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })
    },
    FETCH_TYPE_REFUND({commit}, query) {
      commit('SET_OVERLAY')
      return new Promise(resolve => {
        let url = query ? `${api_tipo_devolucion_nomvalue}${query}` : api_tipo_devolucion_nomvalue
        axios.get(`${url}`)
          .then(response => {
            commit('SET_TYPE_REFUND', response.data)
            resolve(response.data)
          })
          .catch(err => {
            notificationError('Ha ocurrido un error al obtener los tipos de devolucion', err.response)
          }).finally(() => {
          commit("SET_OVERLAY", false);
        });
      })
    },
  },
  getters: {
    GET_BICYCLE_STOCK_LIST(state) {
      return state.bicycle_stock_list
    },
    GET_TYPE_SERVICE_STORE(state) {
      return state.type_service_list
    },
    GET_TYPE_OFFER_LIST(state) {
      return state.type_offer_list
    },
    GET_TYPE_REFUND_LIST(state) {
      return state.type_refund_list
    },
    GET_SERVICE_LIST_STORE(state) {
      return state.services_list
    },
    GET_OFFERS(state) {
      return state.offers_list
    },
    GET_OFFERS_SIMPLE(state) {
      return state.offers_list_simples
    },
    GET_OFFERS_GROUPED(state) {
      return state.offers_list_group
    }
  }
};
