import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import {TYPE_ERROR} from "@/enum";

Vue.use(VueToast);


export function saveStorage(key, value, object = true) {
  if (object) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, value)
  }

}

export function notification(msg, type, position = 'top-right', duration = 5000) {
  Vue.$toast.open({
    message: msg,
    type: type ? type : TYPE_ERROR.SUCCESS,
    position: position,
    duration: duration
  });
}

export function notificationSuccess(msg, response = null, position = 'top-right', duration = 5000) {
  console.log(response);
  Vue.$toast.open({
    message: msg,
    type: TYPE_ERROR.SUCCESS,
    position: position,
    duration: duration
  });
}

export function notificationError(msg, response = null, position = 'top-right', duration = 5000) {
  if (response) {
    switch (response.status) {
      case 401:
        msg = 'No esta autorizado a este servicio'
        break;
      case 403:
        msg = 'Permiso denegado'
        break;
      case 404:
        msg = 'Recurso no encontrado'
        break;
      case 500:
        msg = 'Ha ocurrido un error en el servidor, por favor intente mas tarde'
        break;
    }

  }
  Vue.$toast.open({
    message: msg,
    type: TYPE_ERROR.ERROR,
    position: position,
    duration: duration
  });
}

export function deleteStorage(key) {
  localStorage.removeItem(key)
}

export function getStorage(key, object = true) {
  if (localStorage.getItem(key)) {
    return object ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key)
  }
}

export function exitsKey(key) {
  return !!localStorage.getItem(key)
}

export function clearStorage() {
  const keys = [
    'enterprise_name',
    'enterprise_id',
    'classification_enterprise',
    'pages',
    'modules',
    'user',
    'token',
    'refresh',
    'fullName',
    'avatar',
    'uri_get_data',
    'uri_delete',
    'permissions',
  ];
  keys.forEach(key => {
    deleteStorage(key)
  })
}