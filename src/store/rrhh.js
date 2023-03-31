import axios from "axios";
import {
  api_cargo,
  api_clasificacion_persona_nomvalue, api_client,
  api_persona,
  api_tipo_cargo_nomvalue,
  api_tipo_contrato_nomvalue,
  api_tipo_licencia_nomvalue,
  api_tipo_persona, api_tipo_plaza_nomvalue, api_type_position, api_worker,
} from "@/urls";
import router from "@/router";
import {notificationError, notificationSuccess} from "@/utils";

export const rrhhStore = {
  state: () => ({
    workerList: [],
    personList: [],
    typeContractList: [],
    typeLicenseList: [],
    typePersonList: [],
    typePositionsList: [],
    positionsList: [],
    typeWorkplaceList: [],
    classificationPersonList: [],
  }),
  mutations: {
    SET_PERSON_LIST(state, data) {
      state.personList = data
    },
    SET_CLASSIFICATION_PERSON(state, data) {
      state.classificationPersonList = data
    },
    SET_WORKERS_LIST(state, data) {
      state.workerList = data
    },
    SET_TYPE_CONTRACT(state, data) {
      state.typeContractList = data
    },
    SET_TYPE_LICENSE(state, data) {
      state.typeLicenseList = data
    },
    SET_TYPE_PERSON(state, data) {
      state.typePersonList = data
    },
    SET_TYPE_POSITIONS(state, data) {
      state.typePositionsList = data
    },
    SET_POSITIONS(state, data) {
      state.positionsList = data
    },
    SET_TYPE_WORKPLACE(state, data) {
      state.typeWorkplaceList = data
    }

  },
  actions: {
    FETCH_CLIENT({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY");
        let url = query ? `${api_client}${query}` : api_client
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data)
          })
          .catch((err) => {
            notificationError('Ha ocurrido un error al obtener los clientes', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })
    },
    SAVE_CLIENT({commit}, client) {
      commit("SET_OVERLAY");
      axios.post(`${api_client}`, client)
        .then(async () => {
          notificationSuccess('Cliente agregada correctamente')
          if (!client.is_service) {
           await router.push({name: 'listClient'})
          }
        }, (err => {
          notificationError('Ha ocurrido un error al agregar el cliente', err.response)
        })).finally(() => {
        commit("SET_OVERLAY", false);
      });
    },
    EDIT_CLIENT({commit}, client) {
      commit("SET_OVERLAY");
      axios.put(`${api_client}${client.id}/`, client)
        .then(() => {
          notificationSuccess('Cliente editada correctamente')
          router.push({name: 'listClient'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al editar el cliente', err.response)
        })).finally(() => {
        commit("SET_OVERLAY", false);
      });
    },
    FETCH_TYPE_CONTRACT({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY");
        let url = query ? `${api_tipo_contrato_nomvalue}${query}` : api_tipo_contrato_nomvalue
        axios.get(`${url}`)
          .then(response => {
            commit('SET_TYPE_CONTRACT', response.data);
            resolve(response.data)
          })
          .catch((err) => {
            notificationError('Ha ocurrido un error al obtener los tipos de contrato', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })
    },
    FETCH_TYPE_LICENSE({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY");
        let url = query ? `${api_tipo_licencia_nomvalue}${query}` : api_tipo_licencia_nomvalue
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data)
            commit('SET_TYPE_LICENSE', response.data)
          })
          .catch((err) => {
            notificationError('Ha ocurrido un error al obtener los tipos de licencia', err.response)
          }).finally(() => {
          commit("SET_OVERLAY", false);
        });
      })
    },
    FETCH_TYPE_PERSON({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY");
        let url = query ? `${api_tipo_persona}${query}` : api_tipo_persona
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data)
            commit('SET_TYPE_PERSON', response.data)
          })
          .catch((err) => {
            notificationError('Ha ocurrido un error al obtener los tipos de persona', err.response)
          }).finally(() => {
          commit("SET_OVERLAY", false);
        });
      })
    },
    SAVE_PERSON({commit}, person) {
      commit("SET_OVERLAY");
      let isClient = person.isClient;
      delete person.isClient;
      return new Promise(resolve => {
        axios.post(`${api_persona}`, person)
          .then((response) => {
            notificationSuccess('Persona agregada correctamente')
            console.log('asdasdasda',response.data);
            resolve(response.data);
            if (!isClient){
              router.push({name: 'listPerson'}).then(() => {})
            }
          }, (err => {
            notificationError('Ha ocurrido un error al agregar la persona', err.response)
          })).finally(() => {
          commit("SET_OVERLAY", false);
        });
      })

    },
    EDIT_PERSON({commit}, person) {
      commit("SET_OVERLAY");
      axios.put(`${api_persona}${person.id}/`, person)
        .then(() => {
          notificationSuccess('Persona editada correctamente')
          router.push({name: 'listPerson'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al editar la persona', err.response)
        })).finally(() => {
        commit("SET_OVERLAY", false);
      });
    },
    SAVE_TYPE_PERSON({commit}, object) {
      commit("SET_OVERLAY");
      axios.post(`${api_tipo_persona}`, object)
        .then(() => {
          notificationSuccess('Tipo de persona agregado correctamnete')
          router.push({name: 'listTypePerson'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al agregar el tipo de persona', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    EDIT_TYPE_PERSON({commit}, object) {
      commit("SET_OVERLAY");
      axios.put(`${api_tipo_persona}${object.id}/`, object)
        .then(() => {
          notificationSuccess('Tipo de persona editado correctamnete')
          router.push({name: 'listTypePerson'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al editar el tipo de persona', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    FETCH_POSITIONS({commit}, query) {
      commit("SET_OVERLAY");
      let url = query ? `${api_cargo}${query}` : api_cargo
      return new Promise(resolve => {
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data)
            commit('SET_POSITIONS', response.data)
          })
          .catch((err) => {
            notificationError('Ha ocurrido un error al obtener los cargos', err.response)
          }).finally(() => {
          commit("SET_OVERLAY", false);
        });
      })
    },
    SAVE_POSITION({commit}, object) {
      commit("SET_OVERLAY");
      axios.post(`${api_cargo}`, object)
        .then(() => {
          notificationSuccess('Cargo agregado correctamnete')
          router.push({name: 'listPosition'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al agregar el cargo', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    EDIT_POSITION({commit}, object) {
      commit("SET_OVERLAY");
      axios.put(`${api_cargo}`, object)
        .then(() => {
          notificationSuccess('Cargo editado correctamnete')
          router.push({name: 'listPosition'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al editar el cargo', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    FETCH_TYPE_POSITIONS({commit}, query) {
      commit("SET_OVERLAY");
      let url = query ? `${api_tipo_cargo_nomvalue}${query}` : api_tipo_cargo_nomvalue
      return new Promise(resolve => {
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data)
            commit('SET_TYPE_POSITIONS', response.data)
          })
          .catch((err) => {
            notificationError('Ha ocurrido un error al obtener los tipos de cargo', err.response)
          }).finally(() => {
          commit("SET_OVERLAY", false);
        });
      })
    },
    SAVE_TYPE_POSITION({commit}, object) {
      commit("SET_OVERLAY");
      axios.post(`${api_type_position}`, object)
        .then(() => {
          notificationSuccess('Tipo de Cargo agregado correctamnete')
          router.push({name: 'listPosition'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al agregar el cargo', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    EDIT_TYPE_POSITION({commit}, object) {
      commit("SET_OVERLAY");
      axios.post(`${api_cargo}`, object)
        .then(() => {
          notificationSuccess('Cargo agregado correctamnete')
          router.push({name: 'listPosition'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al agregar el cargo', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    FETCH_TYPE_WORKPLACE({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY");
        let url = query ? `${api_tipo_plaza_nomvalue}${query}` : api_tipo_plaza_nomvalue
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data)
            commit('SET_TYPE_WORKPLACE', response.data)
          })
          .catch((err) => {
            notificationError('Ha ocurrido un error al obtener los tipos de plazas', err.response)
          }).finally(() => {
          commit("SET_OVERLAY", false);
        });
      })
    },
    FETCH_PERSON_LIST({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY");
        let url = query ? `${api_persona}${query}` : api_persona
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data)
            commit('SET_PERSON_LIST', response.data)
          })
          .catch((err) => {
            notificationError('Ha ocurrido un error al obtener las personas', err.response)
          }).finally(() => {
          commit("SET_OVERLAY", false);
        });
      })
    },
    FETCH_WORKER_LIST({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY");
        let url = query ? `${api_worker}${query}` : api_worker
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data)
            commit('SET_WORKERS_LIST', response.data)
          })
          .catch((err) => {
            notificationError('Ha ocurrido un error al obtener las trabajadores', err.response)
          }).finally(() => {
          commit("SET_OVERLAY", false);
        });
      })
    },
    FETCH_CLASSIFICATION_PERSON({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY");
        let url = query ? `${api_clasificacion_persona_nomvalue}${query}` : api_clasificacion_persona_nomvalue
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data)
            commit('SET_CLASSIFICATION_PERSON', response.data)
          })
          .catch((err) => {
            notificationError('Ha ocurrido un error al obtener las clasificaciones', err.response)
          }).finally(() => {
          commit("SET_OVERLAY", false);
        });
      })
    },
  },
  getters: {
    GET_WORKER_LIST(state) {
      return state.workerList
    },
    GET_CLASSIFICATION_PERSON(state) {
      return state.classificationPersonList
    },
    GET_PERSON_LIST(state) {
      return state.personList
    },
    GET_TYPE_CONTRACT(state) {
      return state.typeContractList
    },
    GET_TYPE_LICENSE(state) {
      return state.typeLicenseList
    },
    GET_TYPE_PERSON(state) {
      return state.typePersonList
    },
    GET_TYPE_POSITION(state) {
      return state.typePositionsList
    },
    GET_TYPE_WORKPLACE(state) {
      return state.typeWorkplaceList
    }
  }
}
