<template>
  <div class="content-page">
    <section>
      <top-bar :page-title="post?'Nuevo Usuario':'Editar Usuario'"/>
      <div class="mt-3 bg-withe p-5 card form-person">
        <section>
          <div class="columns">
            <div class="column is-half">
              <b-field label="Nombre" label-position="on-border">
                <b-input placeholder="Nombre"
                         v-model="first_name"
                         required
                         validation-message="Campo requerido"
                         type="text">
                </b-input>
              </b-field>
              <b-field label="Apellidos" label-position="on-border">
                <b-input placeholder="Apellidos"
                         v-model="last_name"
                         required
                         validation-message="Campo requerido"
                         type="text">
                </b-input>
              </b-field>
              <b-field label="Email" label-position="on-border">
                <b-input placeholder="Email"
                         v-model="email"
                         type="email">
                </b-input>
              </b-field>
              <b-field label="Selecionar Roles" label-position="on-border">
                <multiselect
                    placeholder="Selecionar Roles"
                    v-model="rolValue"
                    :multiple="true"
                    track-by="id"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :options="list_rol">
                </multiselect>
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="username" label-position="on-border">
                <b-input placeholder="username"
                         v-model="username"
                         type="text">
                </b-input>
              </b-field>
              <b-field label="password" label-position="on-border">
                <b-input placeholder="password"
                         v-model="password"
                         type="password">
                </b-input>
              </b-field>
              <b-field class="file is-btn-color"
                       :class="{'has-name':!!avatar}">
                <b-upload v-model="avatar" class="file-label">
                                    <span class="file-cta">
                                        <b-icon class="file-icon" icon="upload"></b-icon>
                                        <span class="file-label">Avatar</span>
                                    </span>
                </b-upload>
              </b-field>

            </div>
          </div>

          <vue-form-generator :schema="schema"></vue-form-generator>
          <div class="buttons is-pulled-right">
            <b-button @click="save" class="btn-global btn-accept is-rounded form mt-3"><span
                lg-font regular main-color>Guardar</span>
            </b-button>
          </div>
        </section>
      </div>
    </section>
  </div>

</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import BButton from "buefy/src/components/button/Button";
import {api_users} from "@/urls";
import VueFormGenerator from "vue-form-generator";

const _ = require('lodash');
import Multiselect from "vue-multiselect";

export default {
  components: {BButton, TopBar, Multiselect, "vue-form-generator": VueFormGenerator.component},
  data: () => ({
    schema: {
      fields: []
    },
    first_name: null,
    last_name: null,
    email: null,
    username: null,
    password: null,
    is_superuser: false,
    avatar: null,
    avatarUrl: null,

    valid: true,
    post: true,
    item_id: null,

    user_object: null,
    attributes_img: [],
    renderImageName: [],
    attributes: [],
    fk_enterprise: localStorage.getItem('enterprise_id'),
    list_rol: [],
    list_permissions: [],
    rol: [],
    permissions: [],
    rolValue: [],
    permissionsValue: [],

  }),
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      updateValues: 'UPDATE_VALUES',
      saveUser: 'SAVE_USER',
      editUser: 'EDIT_USER',
      fetchRoles: 'FETCH_ROLE_LIST',
      fetchPermissions: 'FETCH_PERMISSIONS_LIST_All',
    }),
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_users}${id}/`)
          .then(item => {
            this.first_name = item.first_name;
            this.last_name = item.last_name;
            this.email = item.email;
            this.username = item.username;
            this.is_superuser = item.is_superuser;
            this.avatar = item.avatar;
            this.rolValue = item.groups;
            this.permissionsValue = item.permissions;
            this.item_id = item.id;
          });
    },
    selectName({name}) {
      return name
    },
    save() {
      let object = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        username: this.username,
        password: this.password,
        is_superuser: this.is_superuser,
        avatar: this.avatarUrl,
        groups: this.rol,
        permissions: this.permissions,
        fk_empresa: parseInt(this.fk_enterprise),
        id: this.item_id
      };

      if (this.post)
        this.saveUser(object);
      else
        this.editUser(object);
    },
    getImgUrl(file) {
      if (file !== undefined) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener('load', () => {
          this.avatarUrl = fr.result
        })
      }
    },
    getListRoles() {
      let query = '?page_size=100'
      this.fetchRoles(query)
          .then(response => {
            this.list_rol = response.results.filter(item => item.deleted === false)
          });
    },
    getPermissionsList() {
      this.fetchPermissions()
          .then(response => {
            this.list_permissions = response
          });
    },
  },
  watch: {
    avatar: function () {
      this.getImgUrl(this.avatar)
    },
    rolValue: function () {
      this.rol = [];
      _.forEach(this.rolValue, (rol) => {
        this.rol.push(rol.id)
      })
    }
  },

  created() {
    this.getListRoles();
    this.getPermissionsList();
    if (this.$route.params.id) {
      this.update_values();
    }
  },

}
</script>
<style scoped lang="scss">

</style>
