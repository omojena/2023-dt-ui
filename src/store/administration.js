import axios from "axios";
import {api_incidencia, api_tarea, api_tipo_incidencia_nomvalue, api_type_task_nomvalue} from "@/urls";
import {notificationError, notificationSuccess} from "@/utils";
import router from "@/router";

export const administrationStore = {
  state: () => ({
    listIncidents: [],
    listTasks: [],
    listTypeIncidents: [],
    listTypeTask: []
  }),
  mutations: {
    SET_INCIDENTS(state, data) {
      state.listIncidents = data
    },
    SET_TYPE_INCIDENTS(state, data) {
      state.listTypeIncidents = data
    },
    SET_TASK(state, data) {
      state.listTasks = data
    },

    SET_TYPE_TASK(state, data) {
      state.listTypeTask = data
    },

  },
  actions: {
    FETCH_INCIDENTS({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY");
        let url = query ? `${api_incidencia}${query}` : api_incidencia
        axios.get(`${url}`)
          .then(response => {
            commit('SET_INCIDENTS', response.data);
            resolve(response.data)
          })
          .catch(err => {
            notificationError('Ha ocurrido un error al obtener los tipos de devolución', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })
    },
    SAVE_INCIDENTS({commit}, object) {
      axios.post(`${api_incidencia}`, object)
        .then(() => {
          notificationSuccess(`Incidencia agregada ${object.nombre} correctamnete`)
          router.push({name: 'listIncidents'}).then(() => {
          });
        }, (err => {
          notificationError(`Ha ocurrido un error al agregar la incidencia`, err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    EDIT_INCIDENTS({commit}, object) {
      axios.put(`${api_incidencia}${object.id}/`, object)
        .then(() => {
          notificationSuccess(`Incidencia editada ${object.nombre} correctamnete`)
          router.push({name: 'listIncidents'}).then(() => {
          });
        }, (err => {
          notificationError(`Ha ocurrido un error al editar la incidencia`, err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    FETCH_TYPE_INCIDENTS({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY");
        let url = query ? `${api_tipo_incidencia_nomvalue}${query}` : api_tipo_incidencia_nomvalue
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data);
            commit('SET_TYPE_INCIDENTS', response.data)
          })
          .catch((err) => {
            notificationError(`Ha ocurrido un error al obtener los tipos de incidencias`, err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })
    },
    FETCH_TASK({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY");
        let url = query ? `${api_tarea}${query}` : api_tarea
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data);
            commit('SET_TASK', response.data)
          })
          .catch((err) => {
            notificationError(`Ha ocurrido un error al las tareas`, err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })
    },
    SAVE_TASK({commit}, object) {
      axios.post(`${api_tarea}`, object)
        .then(() => {
          notificationSuccess(`Tarea agregada ${object.nombre} correctamnete`)
          router.push({name: 'listTasks'}).then(() => {
          });
        }, (err => {
          notificationError(`Ha ocurrido un error al agregar la tarea`, err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    EDIT_TASK({commit}, object) {
      axios.put(`${api_tarea}${object.id}/`, object)
        .then(() => {
          notificationSuccess(`Tarea editada ${object.nombre} correctamnete`)
          router.push({name: 'listTasks'}).then(() => {
          });
        }, (err => {
          notificationError(`Ha ocurrido un error al editar la Tarea`, err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    FETCH_TYPE_TASK({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY");
        let url = query ? `${api_type_task_nomvalue}${query}` : api_type_task_nomvalue
        axios.get(`${url}`)
          .then(response => {
            resolve(response.data);
            commit('SET_TYPE_TASK', response.data)
          })
          .catch((err) => {
            notificationError(`Ha ocurrido un error al los tipos de tarea`, err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })
    }
  },
  getters: {
    GET_INCIDENTS(state) {
      return state.listIncidents
    },
    GET_TASK(state) {
      return state.listTasks
    },
    GET_TYPE_INCIDENTS(state) {
      return state.listTypeIncidents
    },
    GET_TYPE_TASK(state) {
      return state.listTypeTask
    },
  }
}
