<template>
  <div class="content-page">
    <section>
      <top-bar is_back :page-title="post?'Nuevo Tipo de Gasto':'Editar Tipo de Gasto'"/>
      <div class="mt-3 bg-withe p-5 card">
        <section>
          <div class="columns ">
            <div class="column is-half">
              <b-field label="Nombre" label-position="on-border">
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
              <b-field label="Tipo de Gasto Padre" label-position="on-border">
                <multiselect
                    placeholder="Tipo de Gasto Padre"
                    v-model="fk_parentValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="expenses_list">
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
import {api_tipo_gasto} from "@/urls";
import {mapActions} from 'vuex'
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
    post: true,
    item_id: null,
    valid: true,
    fk_enterprise: localStorage.getItem('enterprise_id'),

    fk_account: null,
    fk_accountValue: null,
    account_list: [],
    fk_parent: null,
    fk_parentValue: null,
    expenses_list: [],

    description: '',
    type_expense_object: null,

  }),
  computed: {},
  methods: {
    ...mapActions({
      updateValues: 'UPDATE_VALUES',
      saveTypeExpense: 'SAVE_TYPE_EXPENSE',
      editTypeExpense: 'EDIT_TYPE_EXPENSE',
      fetchAccount: 'FETCH_ACCOUNTS',
      fetchTypeExpense: 'FETCH_TYPE_EXPENSE'

    }),
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_tipo_gasto}${id}/`)
          .then(item => {
            this.name = item.nombre;
            this.description = item.descripcion;
            this.fk_enterprise = item.fk_empresa;
            this.fk_parentValue = item.fk_parent;
            this.item_id = item.id
          });
    },
    selectName({nombre}) {
      return nombre
    },
    save() {
      this.type_expense_object = {
        nombre: this.name,
        fk_empresa: parseInt(this.fk_enterprise),
        fk_cuenta: this.fk_account,
        fk_parent: this.fk_parent,
        descripcion: this.description,
        id: this.item_id
      };
      if (this.post)
        this.saveTypeExpense(this.type_expense_object);
      else
        this.editTypeExpense(this.type_expense_object)
    },
    getAccounts() {
      let query = '?page_size=1000';
      this.fetchAccount(query).then(async response => {
        this.account_list = response.results.filter(item => item.deleted === false);
      });
    },
    getTypeExpenses() {
      let query = '?page_size=1000';
      this.fetchTypeExpense(query).then(response => {
        this.expenses_list = response.results.filter(item => item.deleted === false);
      });
    },
  },

  created() {
    this.getAccounts();
    this.getTypeExpenses();
    if (this.$route.params.id)
      this.update_values();
  },

}
</script>
