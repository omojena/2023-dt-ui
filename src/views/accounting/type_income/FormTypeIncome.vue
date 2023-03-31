<template>
  <div class="content-page">
    <section>
      <top-bar is_back :page-title="post?'Nuevo Tipo de Ingreso':'Editar Tipo de Ingreso'"/>
      <div class="mt-3 bg-withe p-5 card">
        <section>
          <div class="columns ">
            <div class="column is-half">
              <b-field label="Descripcion" label-position="on-border">
                <b-input placeholder="Nombre"
                         v-model="name"
                         required
                         validation-message="Campo requerido"
                         type="text">
                </b-input>
              </b-field>
              <b-field label="Cuenta Asociada" label-position="on-border">
                <multiselect
                    placeholder="Cuenta Asociada"
                    v-model="fk_accountValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="account_list">
                </multiselect>
              </b-field>
              <b-field label="Tipo de Ingreso Padre" label-position="on-border">
                    <multiselect
                    placeholder="Tipo de Ingreso Padre"
                    v-model="fk_parentValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="parent_list">
                </multiselect>
              </b-field>
            </div>
            <div class="column is-half">

              <b-field label="Descripcion" label-position="on-border">
                                <textarea
                                    class="textarea"
                                    placeholder="Descripcion"
                                    v-model="description"
                                    rows="5"
                                >
                                </textarea>
              </b-field>
            </div>

          </div>
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
import {api_tipo_ingreso} from "@/urls";
import {mapGetters, mapMutations, mapActions} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import BButton from "buefy/src/components/button/Button";
import Multiselect from "vue-multiselect";


export default {
  components: {BButton, TopBar, Multiselect},
    watch: {
    fk_accountValue: function () {
      this.fk_account = this.fk_accountValue.id
    },
    fk_parentValue: function () {
      this.fk_parent = this.fk_parentValue.id
    },
  },
  data: () => ({
    name: '',
    description: '',
    fk_parent: null,
    fk_account: null,
    fk_accountValue: null,
    fk_parentValue: null,

    valid: true,
    post: true,
    item_id: null,

    account_list: [],
    parent_list: [],
    type_income_object: null,

  }),

  methods: {
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
    }),
    ...mapActions({
      updateValues: 'UPDATE_VALUES',
      fetchAccount: 'FETCH_ACCOUNTS',
      fetchTypeIncome: 'FETCH_TYPE_INCOME',
      saveTypeIncome: 'SAVE_TYPE_INCOME',
      editTypeIncome: 'EDIT_TYPE_INCOME'
    }),
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_tipo_ingreso}${id}/`)
          .then(item => {
            this.name = item.nombre;
            this.fk_accountValue = item.fk_cuenta;
            this.fk_parent = item.fk_parent;
            this.description = item.descripcion;
            this.item_id = item.id
          });
    },
    selectName({nombre}) {
      return nombre
    },
    save() {
      this.type_income_object = {
        nombre: this.name,
        fk_cuenta: this.fk_account,
        fk_empresa: localStorage.getItem('enterprise_id'),
        fk_parent: this.fk_parent,
        descripcion: this.description,
        id: this.item_id
      };
      if (this.post)
        this.saveTypeIncome(this.type_income_object);
      else
        this.editTypeIncome(this.type_income_object);
    },
    getAccounts() {
      let query = '?page_size=1000';
      this.fetchAccount(query).then(async response => {
        this.account_list = response.results.filter(item => item.deleted === false)
       });
    },
    getTypesIncome() {
      let query = '?page_size=1000';
      this.fetchTypeIncome(query).then(response => {
        this.parent_list = response.results.filter(item => item.deleted === false)
      });
    },

  },
  computed: {
    ...mapGetters({
      enterpriseAuth: 'GET_ENTERPRISE_AUTH'
    }),
  },
  created() {
    this.getAccounts();
    this.getTypesIncome();
    if (this.$route.params.id) {
      this.update_values();
    }
  },

}
</script>
