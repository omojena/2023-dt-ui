<template>

  <div class="content-page">
    <section>
      <top-bar :page-title="post?'Nuevo AFT':'Editar AFT'"/>
      <div class="mt-3 bg-withe p-5 card">
        <section>
          <div class="columns ">
            <div class="column is-half">
              <b-field label="Tipo de activo" label-position="on-border">
                <multiselect
                    placeholder="Tipo de activo"
                    v-model="type_activeValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="list_type_aft">
                </multiselect>
              </b-field>
              <b-field label="Nombre" label-position="on-border">
                <b-input placeholder="Nombre"
                         v-model="name"
                         required
                         validation-message="Campo requerido"
                         type="text">
                </b-input>
              </b-field>

              <b-field label="Código" label-position="on-border">
                <b-input placeholder="Código"
                         v-model="code"
                         type="text">
                </b-input>
              </b-field>
              <b-field v-if="!is_bike" label="Cantidad" label-position="on-border">
                <b-input placeholder="Cantidad"
                         v-model="quantity"
                         type="number">
                </b-input>
              </b-field>
              <b-field label="Vida Útil" label-position="on-border">
                <b-input placeholder="Vida Útil"
                         v-model="util_life"
                         type="number">
                </b-input>
              </b-field>
              <b-field label="Precio de Compra" label-position="on-border">
                <b-input placeholder="Precio de Compra"
                         @focusout="calDeprecatedUnitCost"
                         v-model="buy_price"
                         type="number">
                </b-input>
              </b-field>
              <b-field label="Almacen" label-position="on-border">
                <multiselect
                    placeholder="Almacen"
                    v-model="fk_storageValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="list_storage">
                </multiselect>
              </b-field>
              <b-field label="Proveedor" label-position="on-border">
                <multiselect
                    placeholder="Proveedor"
                    v-model="providerValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="list_providers">
                </multiselect>
              </b-field>
              <template v-if="is_bike ">
                <b-field label="Numero" label-position="on-border">
                  <b-input placeholder="Numero"
                           v-model="numero_bike"
                           type="number">
                  </b-input>
                </b-field>
                <b-field label="Marca" label-position="on-border">
                  <b-input custom-class="d-none" placeholder="Marcas"
                           v-model="marca_bike"
                           type="text">
                  </b-input>
                  <b-input placeholder="Marca"
                           v-model="marca_bike"
                           type="text">
                  </b-input>
                </b-field>
                <b-field label="Modelo" label-position="on-border">
                  <b-input custom-class="d-none" placeholder="Modelo"
                           v-model="modelo_bike"
                           type="text">
                  </b-input>
                  <b-input placeholder="Modelo"
                           v-model="modelo_bike"
                           type="text">
                  </b-input>
                </b-field>
              </template>

            </div>
            <div class="column is-half">
              <div v-if="!is_bike" class="is-flex is-justify-content-space-between mb-2">
                <b-checkbox v-model="validate_stock"><span bold>Alerta de Existencias</span>
                </b-checkbox>
                <b-field label="Mínimo de existencias" label-position="on-border">
                  <b-input placeholder="Mínimo de existencias"
                           v-model="min_stock"
                           type="number">
                  </b-input>
                </b-field>
              </div>
              <b-field label="Fecha de Compra" label-position="on-border">
                <b-datepicker
                    v-model="buy_date"
                    :show-week-number="false"
                    locale="en-CA"
                    placeholder="Fecha de Compra"
                    trap-focus
                >
                </b-datepicker>
              </b-field>
              <b-field :label="labelCost" label-position="on-border">
                <b-input :placeholder="LabelCost"
                         v-model="unit_cost"
                         type="number">
                </b-input>
              </b-field>
              <b-field label="Depreciación" label-position="on-border">
                <b-input placeholder="Depreciación"
                         v-model="deprecated"
                         type="number">
                </b-input>
              </b-field>
              <b-field label="Tipo de Gasto" label-position="on-border">
                <multiselect
                    placeholder="Tipo de Gasto"
                    v-model="type_expenseValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="list_type_expenses">
                </multiselect>
              </b-field>
              <template v-if="is_bike">
                <b-field label="Sexo" label-position="on-border">
                  <multiselect
                      placeholder="Sexo"
                      v-model="sexo_bikeValue"
                      :custom-label="selectName"
                      open-direction="bottom"
                      :show-no-results="false"
                      :options="sexList">
                  </multiselect>
                </b-field>
                <b-field label="Calidad" label-position="on-border">
                  <multiselect
                      placeholder="Calidad"
                      v-model="calidad_bikeValue"
                      :custom-label="selectName"
                      open-direction="bottom"
                      :show-no-results="false"
                      :options="calidadList">
                  </multiselect>
                </b-field>
                <b-field label="Color" label-position="on-border">
                  <b-input placeholder="Color"
                           v-model="color_bike"
                           type="text">
                  </b-input>
                </b-field>
              </template>

              <b-field label="Descripcion" label-position="on-border">
                                <textarea
                                    class="textarea"
                                    placeholder="Descripcion"
                                    v-model="description"
                                    rows="6"
                                >
                                </textarea>
              </b-field>


              <vue-form-generator :schema="schema"></vue-form-generator>

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
import {
  api_aft,
} from "@/urls";
import {mapGetters, mapActions} from 'vuex'
import BDatepicker from "buefy/src/components/datepicker/Datepicker";
import BButton from "buefy/src/components/button/Button";
import TopBar from "../../../components/top-bar/topBar";
import VueFormGenerator from "vue-form-generator";
import Multiselect from "vue-multiselect";

export default {
  components: {TopBar, BButton, Multiselect, BDatepicker, "vue-form-generator": VueFormGenerator.component},

  data: () => ({
    schema: {
      fields: []
    },
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    is_bike: false,
    labelCost: 'Costo Unitario',
    numero_bike: null,
    marca_bike: null,
    modelo_bike: null,
    color_bike: null,
    sexo_bike: null,
    sexo_bikeValue: null,
    calidad_bike: null,
    calidad_bikeValue: null,
    post: true,
    item_id: null,
    name: null,
    code: null,
    buy_price: null,
    buy_date: null,
    util_life: null,
    fk_enterprise: localStorage.getItem('enterprise_id'),
    fk_storage: null,
    fk_storageValue: null,
    fk_area: null,
    validate_stock: false,
    min_stock: null,
    list_storage: [],
    quantity: null,
    deprecated: null,
    type_active: null,
    type_activeValue: null,
    unit_cost: null,
    description: null,
    type_expense: null,
    type_expenseValue: null,
    type_expense_list: [],
    list_type_expenses: [],
    sexList: [{id: 'H', nombre: 'Hombre'}, {id: 'M', nombre: 'Mujer'}],
    calidadList: [{id: 'P', nombre: 'Premium'}, {id: 'S', nombre: 'Standard'}, {id: 'M', nombre: 'Medium'}],
    list_type_aft: [
      {nombre: `Activo Fijo Intangible`, id: 'AFI'},
      {nombre: `Activo Fijo Tangible`, id: 'AFT'},
      {nombre: `Activo Fijo Tangible (Bicicletas)`, id: 'AFB'}

    ],
    provider: null,
    providerValue: null,
    list_providers: [],
    attributes: [],

  }),
  computed: {
    ...mapGetters({
      attributesRender: 'GET_ATTRIBUTES_RENDER'
    })

  },
  watch: {
    fk_storageValue: function () {
      this.fk_storage = this.fk_storageValue.id
    },
    providerValue: function () {
      this.provider = this.providerValue.id
    },
    type_expenseValue: function () {
      this.type_expense = this.type_expenseValue.id
    },
    sexo_bikeValue: function () {
      this.sexo_bike = this.sexo_bikeValue.id
    },
    calidad_bikeValue: function () {
      this.calidad_bike = this.calidad_bikeValue.id
    },
    type_activeValue: function () {
      this.is_bike = this.type_activeValue.id === 'AFB';
      this.type_active = this.type_activeValue.id
      if (this.is_bike) {
        this.labelCost = 'Valor de la Bicicleta'
      }
    }
  },
  methods: {
    ...mapActions({
      updateValues: 'UPDATE_VALUES',
      getAttributesNomType: 'GET_ATTRIBUTES_NOM_TYPE',
      fetchTypeAft: 'FETCH_AFT',
      fetchProviders: 'FETCH_PERSON_LIST',
      fetchTypeExpenses: 'FETCH_TYPE_EXPENSE',
      fetchWarehouses: 'FETCH_WAREHOUSE',
      saveAft: 'SAVE_AFT',
      editAFT: 'EDIT_AFT',
    }),
    selectName({ nombre }) {
      return nombre
    },
    calDeprecatedUnitCost() {
      if (this.buy_price && this.vida_util) {
        this.deprecated = (this.precio_compra / this.vida_util) / 12;
      }
      if (this.quantity && this.buy_price) {
        this.unit_cost = this.cantidad / this.precio_compra;
      }
    },
    formatYYYYMMDD(value) {
      const date = new Date(value)
      if (value && !isNaN(date)) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return year + '-' +
            ((month < 10 ? '0' : '') + month) + '-' +
            ((day < 10 ? '0' : '') + day)
      }
      return ''
    },
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_aft}${id}/`)
          .then(item => {
            this.name = item.nombre;
            this.code = item.codigo;
            this.buy_price = item.precio_compra;
            this.buy_date = item.fecha_compra;
            this.util_life = item.vida_util;
            this.fk_area = item.fk_area;
            this.validate_stock = item.validar_existencias;
            this.min_stock = item.minino_existencias;
            this.quantity = item.cantidad;
            this.deprecated = item.depreciacion;
            this.unit_cost = item.costo_unitario;
            this.description = item.descripcion;
            this.getWorkersList()
                .then(value => {
                  this.fk_storageValue = value.find(f => f.id === item.fk_almacen);
                })
            this.getTypeExpenses()
                .then(value => {
                  this.type_expenseValue = value.find(f => f.id === item.tipo_gasto);
                })
            this.getProviderList()
                .then(value => {
                  this.providerValue = value.find(f => f.id === item.proveedor);
                })
            this.type_activeValue = this.list_type_aft.find(f => f.id === item.tipo_activo);
            this.calidad_bikeValue = this.calidadList.find(f=>f.id === item.calidad)
            this.sexo_bikeValue = this.sexList.find(f=>f.id === item.sexo)
            this.numero_bike = item.numero;
            this.marca_bike = item.marca;
            this.modelo_bike = item.modelo;
            this.color_bike = item.color;
            this.item_id = item.id;
          });
    },
    save() {
      let aft_object = {
        nombre: this.name,
        codigo: this.code,
        precio_compra: this.buy_price,
        fecha_compra: this.formatYYYYMMDD(this.buy_date),
        vida_util: this.util_life,
        fk_almacen: this.fk_storage,
        cantidad: this.is_bike ? 1 : this.quantity,
        depreciacion: this.deprecated,
        tipo_activo: this.type_active,
        costo_unitario: this.unit_cost,
        descripcion: this.description,
        tipo_gasto: this.type_expense,
        proveedor: this.provider,
        validar_existencias: this.validate_stock,
        minino_existencias: this.min_stock,
        numero: this.numero_bike,
        marca: this.marca_bike,
        modelo: this.modelo_bike,
        sexo: this.sexo_bike,
        calidad: this.calidad_bike,
        color: this.color_bike,
        type: 'AF',
        fk_empresa: parseInt(localStorage.getItem('enterprise_id')),
        id: this.item_id
      };

      if (this.post) {
        this.saveAft(aft_object);
      } else {
        this.editAFT(aft_object);
      }


    },
    getStorageList() {
      return new Promise(resolve => {
        let query = `?page_size=1000`;
        this.fetchWarehouses(query)
            .then(response => {
                this.list_storage = response.results.filter(item => item.deleted === false);
                resolve(this.list_storage)
            });
      })

    },
    getTypeExpenses() {
      return new Promise(resolve => {
        let query = `?page_size=1000`;
        this.fetchTypeExpenses(query)
            .then(response => {
                this.list_type_expenses = response.results.filter(item => item.deleted === false);
                resolve(this.list_type_expenses)
            });
      })

    },
    getProviderList() {
      return new Promise(resolve => {
        let query = `?page_size=1000`;
        this.fetchProviders(query)
            .then(response => {
                this.list_providers = response.results.filter(item => item.deleted === false);
              resolve(this.list_providers)
            });
      })

    },

  },
  created() {
    this.getStorageList();
    this.getTypeExpenses();
    this.getProviderList();
    if (this.$route.params.id) {
      this.update_values();
    }
  }
}
</script>
<style lang="scss">
.form-control {
  align-items: center;
  border: 1px solid #C2C2C2 !important;
  border-radius: 0;
  box-shadow: none !important;
  display: inline-flex;
  font-size: 1rem;
  height: 35px;
  justify-content: flex-start;
  line-height: 1.5;
  padding: calc(0.5em - 1px) calc(0.75em - 1px);
  position: relative;
  vertical-align: top;
  background-color: #FFFFFF;
  color: #363636 !important;
  width: 100%;

  &:focus {
    border: 1px solid #C2C2C2 !important;
    outline: -webkit-focus-ring-color auto 1px;
  }
}
</style>
