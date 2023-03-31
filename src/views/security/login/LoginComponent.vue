<template>
  <div
      class="content-page login-page is-flex is-flex-desktop is-justify-content-center is-align-content-center is-align-items-center"
      login>
    <div class="box-login card">
      <section class="section-logo centered">
        <logo-component logo-class="login"/>
      </section>
      <section class="mt-4 pt-15 is-flex is-justify-content-center">
        <div class="columns is-flex  is-align-items-center">
          <div class="column is-full">
            <div v-for="(item, idx) in enterpriseUserListAvailable" :key="idx"
                 class="title-collapse is-flex is-align-items-center pointer p-3">
              <avatar class="avatar-size" color="#FFFFFF" backgroundColor="#1F1C39" :size="40"
                      :username="item.empresa.empresa"
                      :src="null"/>
              <div class="is-flex is-flex-direction-column">
                <span @click="changeAvailable(item)" bold class="ml-3">{{item.user.email}}</span>
                <span @click="changeAvailable(item)" sm-font class="ml-3"><b>{{ item.empresa.empresa }}</b></span>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section v-if="userAndPassword || onlyPassword || !enterpriseUserListAvailable.length" class="section-input centered">
        <div v-if="userAndPassword || !enterpriseUserListAvailable.length" class="inputs">
          <b-field>
            <b-input placeholder="Usuario"
                     custom-class="login"
                     v-model="authData.email"
                     required
                     validation-message="Campo requerido"
                     type="text">
            </b-input>
          </b-field>
          <b-field>
            <b-input placeholder="Password"
                     custom-class="login"
                     v-model="authData.password"
                     required
                     password-reveal
                     validation-message="Campo requerido"
                     :change="login"
                     type="password">
            </b-input>
          </b-field>
        </div>
        <div v-if="onlyPassword" class="inputs">
          <b-field>
            <b-input placeholder="Password"
                     custom-class="login"
                     v-model="authData.password"
                     required
                     password-reveal
                     validation-message="Campo requerido"
                     :change="login"
                     type="password">
            </b-input>
          </b-field>
        </div>
      </section>

      <section class="forgot pb-2 pt-3 is-flex is-justify-content-space-around">
        <span @click="addEnterpriseList" v-if="onlyPassword || (!onlyPassword && !userAndPassword)" sm-font semi-bold class="forgot-text">Nueva Cuenta</span>
        <span @click="selectEnterprise" v-if="(enterpriseUserList.length && userAndPassword) || onlyPassword" sm-font semi-bold class="forgot-text">Volver</span>
      </section>

      <section class="open-session ">
        <div class="centered">
          <b-field>
            <b-checkbox></b-checkbox>
          </b-field>
          <span class="mt-2 notify" xs-font regular>Mantener abierta la sesión.
                        No recomendado en dispositivos
                        compartidos.
                    </span>
        </div>

      </section>
      <section class="btn-section centered">
        <div class="buttons">
          <b-button @click="login" class="btn-login btn-global btn-accept" expanded><span
              class="position-label" lg-font
              regular>Login</span>
          </b-button>
        </div>
      </section>
      <section class="forgot centered">
        <span sm-font semi-bold class="forgot-text">Tienes problemas para iniciar session ?</span>
      </section>
    </div>

    <b-modal
        v-model="isComponentModalActive"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal>
      <template #default="props">
        <modals-login-enterprise v-bind="enterpriseUserList" :user="user_id" :enterprise-list="enterpriseUserList"
                                 @close="props.close"></modals-login-enterprise>
      </template>
    </b-modal>

  </div>

</template>

<script>
import logo from '../../../assets/img/Grupo 12@2x.png';
import BButton from "buefy/src/components/button/Button";
import BCheckbox from "buefy/src/components/checkbox/Checkbox";
import LogoComponent from "../../../components/logo/logoComponent";
import axios from 'axios'
import {
  api_empresa,
  api_token, api_users,

} from "@/urls";
import {mapMutations, mapGetters, mapActions} from 'vuex'
import {clearStorage, exitsKey, getStorage, notificationError, saveStorage} from "@/utils";
import ModalsLoginEnterprise from "@/components/modalsLoginEnterprise";
import Avatar from 'vue-avatar'

export default {
  name: "LoginComponent",
  components: {ModalsLoginEnterprise, LogoComponent, BCheckbox, BButton, Avatar},
  data() {
    return {
      userAndPassword: false,
      onlyPassword:false,
      user_id: null,
      groups: null,
      isComponentModalActive: false,
      authData: {
        email: null,
        password: null
      },
      logo: logo,
      enterpriseUserList: exitsKey('enterpriseUserList') ? getStorage('enterpriseUserList'): [],
      enterpriseUserListAvailable: []

    }
  },
  methods: {
    ...mapMutations({
      loginMutations: 'LOGIN',
      saveUserId: 'SAVE_USER_ID',
      setEnterpriseUser: 'SET_ENTERPRISE_USER',
      loginEnterprise: 'LOGIN_ENTERPRISE',
      openModalLogin: 'MODAL_LOGIN'

    }),
    ...mapActions({
      loginEnterpriseAction: 'LOGIN_ENTERPRISE_ACTION'

    }),
    changeAvailable(item){
      this.enterpriseUserListAvailable = [item];
      this.onlyPassword = true;
      this.authData.email = item.fk_user.email;
    },
    selectEnterprise(){
      this.enterpriseUserListAvailable = this.enterpriseUserList;
      this.onlyPassword = false;
      this.userAndPassword = false;
    },
    addEnterpriseList(){
      this.userAndPassword = true;
      this.onlyPassword = false;
      this.enterpriseUserListAvailable = []

    },
    login() {
      this.setEnterpriseUser([]);
      axios.post(api_token, this.authData)
          .then((response) => {
            this.getUser(this.authData.email);
            saveStorage('token', response.data.access, false)
            saveStorage('refresh', response.data.refresh, false)
          })
          .catch((error) => {
            notificationError('Error de autenticación, inténtelo de nuevo', error.response)
          });

  },
  getUser() {
    axios.get(`${api_users}me/`)
        .then(response => {
          const user = response.data;
          this.setPermissionsAndModules(user.groups).then( async ()=>{
            await this.getEnterpriseByUser(user);
            this.user_id = user.id;
            this.saveUserId(user.id);
            let fullName = user.first_name + ' ' + user.last_name;
            saveStorage('user', user)
            saveStorage('fullName', fullName, false)
            saveStorage('avatar', user.avatar, false)
          })
        })
        .catch(err => {
          notificationError('Usuario no encontrado', err.response)
        });
  },
  getEnterpriseByUser(user) {
    console.log(this.enterpriseUserList);
    axios.get(`${api_empresa}${user.fk_enterprise}/`)
        .then(response => {
          const target = response.data;
          const find = this.enterpriseUserList.find(item => item.empresa.id === target.id && item.user.id === user.id)
          console.log(find);
          if (!find) {
            this.enterpriseUserList.push({empresa: response.data, user})
          }
          this.setEnterpriseUser(this.enterpriseUserList);
          saveStorage('enterpriseUserList', this.enterpriseUserList)
          this.login_in(response.data);
        })
        .catch(err => {
          console.log(err)
        });
  },
  login_in(enterprise) {
    saveStorage('enterprise_name', enterprise.name, false)
    saveStorage('enterprise_id', enterprise.id, false)
    saveStorage('classification_enterprise', enterprise.fk_classification_company.name, false)
    this.loginEnterpriseAction(enterprise)
  },
  setPermissionsAndModules(groups) {
      return new Promise(resolve => {
        let permissions = [];
        let modules = [];
        for (const item of groups) {
          for (const perm of item.custom_permissions) {
            if (permissions.indexOf(perm)===-1){
              permissions.push(perm);
            }
          }
          for (const mod of item.modules) {
            if (modules.indexOf(mod)===-1){
              modules.push(mod);
            }
          }
        }
        saveStorage('permissions', permissions)
        saveStorage('modules', modules)
        resolve(true)
      })

  }

}
,
computed: {
...
  mapGetters({}
  )
}
,
created()
{
  clearStorage()
}

}
</script>

<style scoped lang="scss">
@import "../../../../theme/app";

.login {
  width: 275px !important;
  height: 36px !important;
}

input {
  width: 275px !important;
  height: 36px !important;
  background-color: transparent !important;
  border: 1px solid #C2C2C2;
  color: #363636 !important;
}

.login-page[login] {
  background: url("../../../assets/img/suit-869380_19202@2x.png") bottom;
  background-size: cover;
  height: 100vh;

}

.centered {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.box-login {
  background: #FFFFFF;
  width: 377px;
  height: auto;

  .section-logo {
    margin-top: 35px;
  }

  .section-input {
    margin-top: 40px;
    flex-direction: column;
  }

  .open-session {
    width: 275px !important;
    margin-top: 30px;
    padding-left: 90px;

    .notify {
      color: #3E3E3E;
    }
  }

  .btn-section {
    .buttons {
      width: 247px;
      margin-bottom: 15px;
      margin-top: 20px;

      .btn-login {
        height: 32px;

        .position-label {
          color: #FFFFFF;
          position: relative;
          top: -3px;
        }
      }
    }
  }

  .forgot {
    padding-bottom: 20px;

    .forgot-text {
      color: $primary-light;
      cursor: pointer;
    }
  }

}

.modal-form-login {
  height: auto !important;
  width: auto !important;
  min-width: 350px !important;
  border-radius: 10px;
}

.title-collapse {
  cursor: pointer;
}


</style>

