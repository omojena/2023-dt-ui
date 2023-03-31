import axios from "axios";
import {api_cuenta, api_tipo_gasto, api_tipo_ingreso, api_tipo_moneda_nomvalue} from "@/urls";
import router from "@/router";
import {api_tipo_pago_nomvalue} from "@/urls";
import {notificationError, notificationSuccess} from "@/utils";

export const accountingStore = {
  state: () => ({
    accounts: [],
    typeCash: [],
    typeExpenses: [],
    typeIncome: [],
    typePay: []
  }),
  mutations: {
    SET_ACCOUNTS(state, data) {
      state.accounts = data
    },
    SET_TYPE_CASH(state, typeCash) {
      state.typeCash = typeCash
    },
    SET_TYPE_EXPENSES(state, typeExpenses) {
      state.typeExpenses = typeExpenses
    },
    SET_TYPE_INCOME(state, typeIncome) {
      state.typeIncome = typeIncome
    },
    SET_TYPE_PAY(state, typePay) {
      state.typePay = typePay
    },
  },
  actions: {
    FETCH_ACCOUNTS({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY")
        let url = query ? `${api_cuenta}${query}` : api_cuenta
        axios.get(`${url}`)
          .then(response => {
            commit('SET_ACCOUNTS', response.data);
            resolve(response.data)
          })
          .catch(err => {
            notificationError('Ha ocurrido un error al obtener las cuentas', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })

    },
    SAVE_ACCOUNT({commit}, account) {
      commit("SET_OVERLAY");
      axios.post(`${api_cuenta}`, account)
        .then(() => {
          notificationSuccess(`Cuenta ${account.nombre} agregada correctamente`)
          router.push({name: 'listAccounts'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al agregar la cuenta', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    EDIT_ACCOUNT({commit}, account) {
      commit("SET_OVERLAY");
      axios.put(`${api_cuenta}${account.id}/`, account)
        .then(() => {
          notificationSuccess(`Cuenta ${account.nombre} editada correctamente`)
          router.push({name: 'listAccounts'}).then(() => {
          });
        }, (err => {
          notificationError('Ha ocurrido un error al editar la cuenta', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    FETCH_TYPE_CASH({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY", false);
        let url = query ? `${api_tipo_moneda_nomvalue}${query}` : api_tipo_moneda_nomvalue
        axios.get(`${url}`)
          .then(response => {
            commit('SET_TYPE_CASH', response.data);
            resolve(response.data);
          }).catch((err) => {
          notificationError('Ha ocurrido un error al obtener los tipos de moneda', err.response)
        })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })

    },
    FETCH_TYPE_EXPENSE({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY");
        let url = query ? `${api_tipo_gasto}${query}` : api_tipo_gasto
        axios.get(url)
          .then(response => {
            commit('SET_TYPE_EXPENSES', response.data);
            resolve(response.data);
          })
          .catch((err) => {
            notificationError('Ha ocurrido un error al obtener los tipos de gastos', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })

    },
    SAVE_TYPE_EXPENSE({commit}, object) {
      commit("SET_OVERLAY");
      axios.post(`${api_tipo_gasto}`, object)
        .then(() => {
          notificationSuccess(`Tipo de gasto ${object.nombre} agregado correctamente`)
          router.push({name: 'listTypeExpenses'}).catch(() => {
          })
        }, (err => {
          notificationError('Ha ocurrido un error al guardar el tipo de gasto', err.response)
        })).finally(() => {
        commit("SET_OVERLAY", false);
      });
    },
    EDIT_TYPE_EXPENSE({commit}, object) {
      commit("SET_OVERLAY");
      axios.put(`${api_tipo_gasto}${object.id}/`, object)
        .then(() => {
          notificationSuccess(`Tipo de gasto ${object.nombre} editado correctamente`)
          router.push({name: 'listTypeExpenses'}).catch(() => {
          })
        }, (err => {
          notificationError('Ha ocurrido un error al editar el tipo de gasto', err.response)
        })).finally(() => {
        commit("SET_OVERLAY", false);
      });
    },
    FETCH_TYPE_INCOME({commit}, query) {
      return new Promise(resolve => {
        let url = query ? `${api_tipo_ingreso}${query}` : api_tipo_ingreso
        commit("SET_OVERLAY");
        axios.get(`${url}`)
          .then(response => {
            commit('SET_TYPE_INCOME', response.data);
            resolve(response.data);
          })
          .catch((err) => {
            notificationError('Ha ocurrido un error al obtener los tipos de ingreso', err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })
    },

    SAVE_TYPE_INCOME({commit}, object) {
      commit("SET_OVERLAY");
      axios.post(api_tipo_ingreso, object)
        .then(() => {
          notificationSuccess(`Tipo de ingreso ${object.nombre} agregado correctamente`)
          router.push({name: 'listTypeIncome'}).then(() => {
          })
        }, (err => {
          notificationError('Ha ocurrido un error al agregar el tipo de ingreso', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    EDIT_TYPE_INCOME({commit}, object) {
      commit("SET_OVERLAY");
      axios.put(`${api_tipo_ingreso}${object.id}/`, object)
        .then(() => {
          notificationSuccess('Tipo de ingreso editado correctamente')
          router.push({name: 'listTypeIncome'}).then(() => {
          })
        }, (err => {
          notificationError('Ha ocurrido un error al editar el tipo de ingreso', err.response)
        }))
        .finally(() => {
          commit("SET_OVERLAY", false);
        });
    },
    FETCH_TYPE_PAYMENTS({commit}, query) {
      return new Promise(resolve => {
        commit("SET_OVERLAY");
        let url = query ? `${api_tipo_pago_nomvalue}${query}`: api_tipo_pago_nomvalue
        axios.get(url)
          .then(response => {
            commit('SET_TYPE_PAY', response.data);
            resolve(response.data)
          })
          .catch(err => {
            notificationError(`Ha ocurrido un error al obtener los tipos de pago`, err.response)
          })
          .finally(() => {
            commit("SET_OVERLAY", false);
          });
      })
    }

  },
  getters: {
    GET_ACCOUNTS(state) {
      return state.accounts
    },
    GET_TYPE_CASH(state) {
      return state.typeCash
    },
    GET_TYPE_EXPENSES(state) {
      return state.typeExpenses
    },
    GET_TYPE_INCOME(state) {
      return state.typeIncome
    },
    GET_TYPE_PAY(state) {
      return state.typePay
    }
  }
}
