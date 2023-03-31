<template>


  <div class="content-page">
    <section>
      <top-bar :page-title="post?'Nuevo Insumo':'Editar Insumo'"/>
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
              <b-field label="Código" label-position="on-border">
                <b-input placeholder="Código"
                         v-model="code"
                         type="text">
                </b-input>
              </b-field>
              <b-field label="Cantidad" label-position="on-border">
                <b-input :readonly="!post" placeholder="Cantidad"
                         v-model="quantity"
                         type="number">
                </b-input>
              </b-field>
              <b-field label="Fecha de Compra" label-position="on-border">
                <b-datepicker
                    v-model="buy_date"
                    :show-week-number="false"
                    placeholder="Fecha de Compra"
                    trap-focus
                >
                </b-datepicker>
              </b-field>
              <b-field label="Proveedor" label-position="on-border">
                <multiselect
                    placeholder="Proveedor"
                    v-model="providerValue"
                    :custom-label="selectNameText"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="list_providers">
                </multiselect>
              </b-field>
              <b-field label="Almacen" label-position="on-border">
                <multiselect
                    placeholder="Almacen"
                    v-model="fk_warehouseValue"
                    :custom-label="selectNameText"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="list_warehouse">
                </multiselect>
              </b-field>
              <b-field label="Tipo de Insummo" label-position="on-border">
                <multiselect
                    placeholder="Tipo de Insummo"
                    v-model="type_suppliesValue"
                    :custom-label="selectNameText"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="list_type_supplies">
                </multiselect>
              </b-field>
            </div>
            <div class="column is-half">
              <div class="is-flex is-justify-content-space-between mb-2">
                <b-checkbox v-model="isValidate"><span bold>Alerta de Existencias</span></b-checkbox>
                <b-field label="Mínimo de existencias" label-position="on-border">
                  <b-input placeholder="Mínimo de existencias"
                           v-model="min_stock"
                           type="number">
                  </b-input>
                </b-field>
              </div>
              <b-field label="Unidad de Medida" label-position="on-border">
                <multiselect
                    placeholder="Unidad de Medida"
                    v-model="umValue"
                    :custom-label="selectNameText"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="measurement_units">
                </multiselect>
              </b-field>
              <div class="is-flex is-justify-content-space-between mb-2">
                <b-checkbox v-model="supposes_expense"><span bold>Supone Gastos</span></b-checkbox>
                <b-field label="Precio de Compra" label-position="on-border">
                  <b-input placeholder="Precio de Compra"
                           v-model="buy_price"
                           type="number">
                  </b-input>
                </b-field>
              </div>
              <b-field label="Costo Unitario" label-position="on-border">
                <b-input placeholder="Costo Unitario"
                         v-model="cal_unit_cost"
                         type="number">
                </b-input>
              </b-field>
              <b-field label="Tipo de Gasto" label-position="on-border">
                <multiselect
                    placeholder="Tipo de Gasto"
                    v-model="fk_type_expensesValue"
                    :custom-label="selectNameText"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="list_type_expenses">
                </multiselect>
              </b-field>
              <b-field label="Descripcion" label-position="on-border">
                                <textarea
                                    v-model="description"
                                    class="textarea"
                                    placeholder="Descripcion"
                                    rows="5"
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
  api_insumos,
} from "@/urls";
import {mapGetters, mapActions} from 'vuex'
import BButton from "buefy/src/components/button/Button";
import BDatepicker from "buefy/src/components/datepicker/Datepicker";
import TopBar from "../../../components/top-bar/topBar";
import VueFormGenerator from "vue-form-generator";
import Multiselect from "vue-multiselect";

export default {
  components: {TopBar, BDatepicker, Multiselect, BButton, "vue-form-generator": VueFormGenerator.component},
  watch: {
    providerValue: function () {
      this.provider = this.providerValue.id
    },
    fk_warehouseValue: function () {
      this.fk_warehouse = this.fk_warehouseValue.id
    },
    fk_type_expensesValue: function () {
      this.fk_type_expenses = this.fk_type_expensesValue.id
    },
    umValue: function () {
      this.um = this.umValue.value
    },
    type_suppliesValue: function () {
      this.type_supplies = this.type_suppliesValue.id
      this.getAttributesNomType(this.type_suppliesValue.id)
    }
  },
  data: () => ({
    schema: {
      fields: []
    },
    renderImageName: [],
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,

    name: null,
    post: true,
    item_id: null,
    isValidate: false,
    min_stock: null,
    val_stock: true,
    code: null,
    buy_price: null,
    buy_date: null,
    um: null,
    umValue: null,
    measurement_units: [{nombre: 'Unidades(U)', value: 'Unidades(U)'},
      {nombre: 'Libras(Lb)', value: 'Libras(Lb)'},
      {nombre: 'Kilogramos(Kg)', value: 'Kilogramos(Kg)'},
      {nombre: 'Litros(Lt)', value: 'Litros(Lt)'},
      {nombre: 'Taza(45m)', value: 'Taza(45m)'},
      {nombre: 'Vaso(8 Onz)', value: 'Vaso(8 Onz)'},
      {nombre: 'Vaso(10 Onz)', value: 'Vaso(10 Onz)'},
      {nombre: 'Caja', value: 'Caja'},],
    supposes_expense: true,
    fk_enterprise: localStorage.getItem('enterprise_id'),
    fk_warehouse: null,
    fk_warehouseValue: null,
    type_supplies: null,
    type_suppliesValue: null,
    list_warehouse: [],
    quantity: null,
    unit_cost: null,
    description: null,
    fk_type_expenses: null,
    fk_type_expensesValue: null,
    list_type_expenses: [],
    provider: null,
    providerValue: null,
    list_providers: [],
    fk_attribute_nom_type: null,
    list_type_supplies: [],
    attributes: [],
    attributes_img: [],
  }),
  computed: {
    cal_unit_cost() {
      return this.buy_price / this.quantity;
    },
    ...mapGetters({
      attributesRender: 'GET_ATTRIBUTES_RENDER'
    })
  },

  methods: {
    ...mapActions({
      getAttributesNomType: 'GET_ATTRIBUTES_NOM_TYPE',
      updateValues: 'UPDATE_VALUES',
      fetchProviders: 'FETCH_PERSON_LIST',
      fetchTypeExpenses: 'FETCH_TYPE_EXPENSE',
      fetchWarehouses: 'FETCH_WAREHOUSE',
      fetchTypeSupplies: 'FETCH_TYPE_SUPPLIES',
      saveSupplies: 'SAVE_SUPPLIES',
      editSupplies: 'EDIT_SUPPLIES',

    }),
    selectNameText({nombre}) {
      return nombre
    },
    valExist() {
      this.val_exist = !this.val_exist;
      if (this.val_exist === false) {
        this.minino_existencias = 0;
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
      this.updateValues(`${api_insumos}${id}/`)
          .then(item => {
            this.name = item.nombre;
            this.code = item.codigo;
            this.buy_price = item.precio_compra;
            this.buy_date = item.fecha_compra;
            this.umValue = this.measurement_units.find(f => f.value === item.um)
            this.supposes_expense = item.supone_gasto;
            this.getStorageList()
                .then(value => {
                  this.fk_warehouseValue = value.find(f => f.value === item.fk_almacen)
                })
            this.quantity = item.cantidad;
            this.min_stock = item.minino_existencias;
            this.isValidate = item.validar_existencias;
            this.fk_attribute_nomtype = item.fk_attribute_nomtype;
            this.unit_cost = item.costo_unitario;
            this.description = item.descripcion;
            this.getTypeExpenses()
                .then(value => {
                  this.fk_type_expensesValue = value.find(f => f.value === item.fk_tipo_gasto)
                })
            this.getProviderList()
                .then(value => {
                  this.providerValue = value.find(f => f.value === item.proveedor)
                })
            this.fk_area = item.fk_area;
            this.item_id = item.id;
          });
    },
    save() {
      let supplies_object = {
        nombre: this.name,
        codigo: this.code,
        precio_compra: this.buy_price,
        fecha_compra: this.formatYYYYMMDD(this.buy_date),
        fk_almacen: this.fk_warehouse,
        cantidad: this.quantity,
        minino_existencias: this.min_stock,
        validar_existencias: this.isValidate,
        um: this.um,
        supone_gasto: this.supposes_expense,
        atributos: JSON.stringify(this.attributes),
        fk_attribute_nomtype: 6,
        costo_unitario: this.quantity / this.buy_price,
        descripcion: this.description,
        tipo_gasto: this.fk_type_expenses,
        proveedor: this.provider,
        type: 'INSUMO',
        fk_empresa: parseInt(localStorage.getItem('enterprise_id')),
        id: this.item_id
      };

      if (this.post)
        this.saveSupplies(supplies_object);
      else
        this.editSupplies(supplies_object);
    },
    getStorageList() {
      return new Promise(resolve => {
        let query = `?page=1&page_size=1000`
        this.fetchWarehouses(query)
            .then(response => {
              this.list_warehouse = response.results.filter(item => !item.deleted);
              resolve(this.list_warehouse)
            });
      })

    },
    getTypeExpenses() {
      return new Promise(resolve => {
        let query = `?page=1&page_size=1000`
        this.fetchTypeExpenses(query)
            .then(response => {
              this.list_type_expenses = response.results.filter(item => !item.deleted);
              resolve(this.list_type_expenses)
            });
      })

    },
    getProviderList() {
      return new Promise(resolve => {
        let query = `?page=1&page_size=1000&type_person=2`
        this.fetchProviders(query)
            .then(response => {
              this.list_providers = response.results.filter(item => !item.deleted);
              resolve(this.list_providers)
            });
      })

    },
    getTypeSupplies() {
      return new Promise(resolve => {
        let query = `?page=1&page_size=1000`
        this.fetchTypeSupplies(query)
            .then(response => {
              this.list_type_supplies = response.filter(item => !item.deleted);
              resolve(this.list_type_supplies)
            });
      })


    },
  },
  created() {
    this.getStorageList();
    this.getTypeExpenses();
    this.getProviderList();
    this.getTypeSupplies();
    if (this.$route.params.id) {
      this.update_values();
    }

  }


}
</script>
<style scoped>
</style>
