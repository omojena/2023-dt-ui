<template>
  <div class="content-page">
    <section>
      <top-bar :page-title="post?'Nuevo Rol':'Editar Rol'"/>
      <div class="mt-3 bg-withe p-5 card form-person">
        <section>
          <div class="columns">
            <div class="column is-half">
              <b-field label="Nombre" label-position="on-border">
                <b-input placeholder="Nombre"
                         v-model="name"
                         required
                         validation-message="Campo requerido"
                         type="text">
                </b-input>
              </b-field>
              <b-field label="Modulos" label-position="on-border">
                <multiselect
                    placeholder="Modulos"
                    v-model="moduleValue"
                    :multiple="true"
                    track-by="name"
                    :custom-label="selectNameModule"
                    open-direction="bottom"
                    :show-no-results="false"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :options="moduleList">
                </multiselect>
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Descripcion" label-position="on-border">
                <b-input placeholder="Descripcion"
                         v-model="descripcion"
                         required
                         rows="3"
                         validation-message="Campo requerido"
                         type="textarea">
                </b-input>
              </b-field>
            </div>
          </div>
          <div class="columns is-flex is-flex-direction-column">
            <div class="column is-half">
              <section>
                <b-field class="is-flex is-flex-direction-column"
                    v-for="(item, idx) in permissionList" :key="idx + 1">
                  <b-checkbox
                      :native-value="item" v-model="permissionSelected">
                   {{item}}
                  </b-checkbox>
                </b-field>
              </section>
            </div>
            <div class="buttons is-pulled-right is-flex is-justify-content-flex-end">
              <b-button @click="save" class="btn-global btn-accept is-rounded form mt-3"><span
                  lg-font regular main-color>Guardar</span>
              </b-button>
            </div>
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
import {api_roles} from "@/urls";

const { includes} = require('lodash');
import Multiselect from "vue-multiselect";


export default {
  components: {BButton, TopBar, Multiselect},
  data: () => ({
    schema: {
      fields: []
    },
    includes: includes,
    moduleValue: null,
    pageList: [],
    permissionList: [],
    moduleList: [],
    modulesSelected: [],
    permissionSelected: [],
    list_permissions: [],
    name: null,
    descripcion: null,
    valid: true,
    post: true,
    item_id: null,
    rol_object: null,
    fk_enterprise: localStorage.getItem('enterprise_id'),

  }),
  computed: {
    ...mapGetters({})
  },
  watch: {
    moduleValue:function () {
      let temp = [];
      this.modulesSelected = [];
      this.moduleValue.forEach(item =>{
        this.modulesSelected.push(item.name);
        let perm = this.list_permissions.find(f=>f.group === item)
        temp.push(...perm.group.permissions)
      });
      this.permissionList = temp;
      console.log(this.permissionList);
    }
  },
  methods: {
    ...mapActions({
      updateValues: 'UPDATE_VALUES',
      saveROLE: 'SAVE_ROLE',
      editROLE: 'EDIT_ROLE',
      fetchPermissions: 'FETCH_PERMISSIONS_LIST_All',

    }),

    check(name) {
      return includes(this.modulesSelected, name)
    },
    selectName({nombre}) {
      return nombre
    },
    selectNameModule({ name }) {
      return name
    },
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_roles}${id}/`)
          .then(item => {
            this.name = item.name;
            this.descripcion = item.descripcion;
            this.moduleValue = item.modules;
            this.permissionSelected = item.custom_permissions;
            this.item_id = item.id;
          });
    },
    save() {
      let object = {
        name: this.name,
        descripcion: this.descripcion,
        fk_empresa: parseInt(this.fk_enterprise),
        modules: this.modulesSelected,
        custom_permissions: this.permissionSelected,
        id: this.item_id
      };

      if (this.post)
        this.saveROLE(object);
      else
        this.editROLE(object);
    },
    getPages() {
      let query = this.modules.length ? `?page_size=500&modules=${this.modules}` : '?page_size=500';
      this.fetchPages(query)
          .then(value => {
            this.pageList = value.results.filter(item => item.deleted === false)
          })
    },
    getModules() {
      let query = '?page_size=500';
      this.fetchModules(query)
          .then(value => {
            this.moduleList = value.results.filter(item => item.deleted === false)
          })
    },
    getPermissionsList() {
      this.fetchPermissions()
          .then(response => {
            this.list_permissions = response;
            this.moduleList = response.map(({ group }) => group);
            console.log(this.moduleList);
          });
    },
  },
  created() {
    // this.getModules();
    // this.getPages();
    this.getPermissionsList();
    if (this.$route.params.id) {
      this.update_values();
    }
  },

}
</script>
<style scoped lang="scss">

</style>
