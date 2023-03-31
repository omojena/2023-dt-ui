<template>
  <div class="content-page">
    <section>
      <top-bar :page-title="post?'Nueva Cuenta':'Editar Cuenta'"/>
      <div class="mt-3 bg-withe p-5 card">
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
              <b-field label="Número" label-position="on-border">
                <b-input placeholder="Número"
                         v-model="number"
                         required
                         validation-message="Campo requerido"
                         type="text">
                </b-input>
              </b-field>
              <b-field label="Tipo de Moneda" label-position="on-border">
                <multiselect
                    placeholder="Tipo de Moneda"
                    v-model="cashTypeValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="list_cash_type">
                </multiselect>
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Tipo de Cuenta" label-position="on-border">
                <multiselect
                    placeholder="Tipo de Cuenta"
                    v-model="accountTypeValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="list_account_type">
                </multiselect>
              </b-field>
              <b-field label="Descripción" label-position="on-border">
                                <textarea
                                    v-model="description"
                                    class="textarea"
                                    placeholder="Descripcion"
                                    rows="3"
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
import {api_cuenta} from "@/urls";
import {mapActions, mapGetters} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import BButton from "buefy/src/components/button/Button";
import Multiselect from "vue-multiselect";

export default {
  components: {BButton, TopBar, Multiselect},
  watch: {
    cashTypeValue: function () {
      this.cashType = this.cashTypeValue.id
    },
    accountTypeValue: function () {
      this.accountType = this.accountTypeValue.id
    }
  },
  data: () => ({
    name: null,
    number: null,
    natures: ['Ingreso', 'Gastos'],
    list_account_type: [{id: 0, nombre: 'Cuenta Bancaria'}, {id: 1, nombre: 'Cuenta Contable'}],
    cashType: null,
    cashTypeValue: null,
    accountType: null,
    accountTypeValue: null,
    list_cash_type: [],
    description: '',

    valid: true,
    post: true,
    item_id: null,
    fk_enterprise: localStorage.getItem('enterprise_id'),

  }),

  methods: {
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      updateValues: 'UPDATE_VALUES',
      saveAccount: 'SAVE_ACCOUNT',
      editAccount: 'EDIT_ACCOUNT',
      fetchTypeCash: 'FETCH_TYPE_CASH'
    }),
    selectName({nombre}) {
      return nombre
    },
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_cuenta}${id}/`)
          .then(item => {
            this.name = item.nombre;
            this.number = item.numero;
            this.cashType = item.moneda;
            this.accountType = item.type;
            this.fk_enterprise = item.fk_empresa;
            this.description = item.descripcion;
            this.item_id = item.id
          })
    },
    save() {
      let account = {
        nombre: this.name,
        numero: this.number,
        moneda: this.cashType,
        type: this.accountType,
        fk_empresa: parseInt(this.fk_enterprise),
        descripcion: this.description,
        id: this.item_id
      };

      if (this.post)
        this.saveAccount(account);
      else
        this.editAccount(account);
    },

    getTypeCash() {
      let query = `?page_size=1000`
      this.fetchTypeCash(query).then(value => {
        this.list_cash_type = value.results.filter(item => item.deleted === false)
      });
    },
  },
  created() {
    this.getTypeCash();
    if (this.$route.params.id) {
      this.update_values();
    }
  },
  computed: {
    ...mapGetters({
      // list_cash_type: 'GET_TYPE_CASH'
    })
  }
}
</script>
