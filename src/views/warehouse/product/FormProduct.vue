<template>
  <div class="content-page">
    <section>
      <top-bar :page-title="post?'Nuevo Producto':'Editar Producto'"/>
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
              <b-field label="Fecha de Entrada" label-position="on-border">
                <b-datepicker v-model="buy_date"
                              :show-week-number="false"
                              placeholder="Fecha de Entrada"
                              trap-focus
                >
                </b-datepicker>
              </b-field>
              <b-field label="Proveedor" label-position="on-border">
                <multiselect
                    placeholder="Proveedor"
                    v-model="providerValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="list_provider">
                </multiselect>
              </b-field>
              <b-field label="Almacen" label-position="on-border">
                <multiselect
                    placeholder="Almacen"
                    v-model="warehouseValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="list_warehouse">
                </multiselect>
              </b-field>
              <div class="columns">
                <div class="column is-4">
                  <b-field>
                    <b-checkbox v-model="is_finish_product"><span bold>Producto Final?</span>
                    </b-checkbox>
                  </b-field>
                  <b-field>
                    <b-checkbox v-model="validate_stock"><span bold>Alerta de Existencias</span>
                    </b-checkbox>
                  </b-field>
                </div>
                <div class="column is-8">
                  <b-field v-if="is_finish_product" label="Precio de Venta"
                           label-position="on-border">
                    <b-input placeholder="Precio de Venta"
                             v-model="sale_price"
                             type="number">
                    </b-input>
                  </b-field>

                  <b-field v-if="validate_stock" label="Mínimo de existencias"
                           label-position="on-border">
                    <b-input placeholder="Mínimo de existencias"
                             v-model="min_stock"
                             type="text">
                    </b-input>
                  </b-field>
                </div>
              </div>
            </div>
            <div class="column is-half">
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
              <div class="columns">
                <div class="column is-4">
                  <b-checkbox v-model="supposes_expense">Supone Gastos</b-checkbox>

                </div>
                <div class="column is-8">
                  <b-field v-if="supposes_expense" label="Tipo de Gasto" label-position="on-border">
                    <multiselect
                        placeholder="Tipo de Gasto"
                        v-model="type_expenseValue"
                        :custom-label="selectName"
                        open-direction="bottom"
                        :show-no-results="false"
                        :options="list_type_expense">
                    </multiselect>
                  </b-field>
                </div>
              </div>
              <b-field v-if="supposes_expense" label="Precio de Compra" label-position="on-border">
                <b-input placeholder="Precio de Compra"
                         v-model="buy_price"
                         type="number">
                </b-input>
              </b-field>
              <b-field v-if="supposes_expense" label="Costo Unitario" label-position="on-border">
                <b-input placeholder="Costo Unitario"
                         v-model="unit_cost"
                         type="number">
                </b-input>
              </b-field>
              <b-field label="Tipo de Producto" label-position="on-border">
                <multiselect
                    placeholder="Tipo de Producto"
                    v-model="fk_attribute_nom_typeValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="list_type_product">
                </multiselect>
              </b-field>
              <b-field label="Descripcion" label-position="on-border">
                  <textarea
                      class="textarea"
                      placeholder="Descripcion"
                      v-model="description"
                      rows="3"
                  >
                  </textarea>
              </b-field>
              <b-field class="file is-btn-color">
                <b-upload v-model="image_file" class="file-label">
                                    <span class="file-cta">
                                        <b-icon class="file-icon" icon="upload"></b-icon>
                                        <span class="file-label">Imagen</span>
                                    </span>
                </b-upload>
              </b-field>
              <vue-form-generator :schema="attributesRender"></vue-form-generator>
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
import TopBar from "../../../components/top-bar/topBar";
import VueFormGenerator from "vue-form-generator";
import BButton from "buefy/src/components/button/Button";
import BDatepicker from "buefy/src/components/datepicker/Datepicker";
import {mapActions, mapGetters} from "vuex";
import {api_producto} from "@/urls";
import BInput from "buefy/src/components/input/Input";
import Multiselect from "vue-multiselect";

export default {
  components: {BInput, TopBar, BButton, Multiselect, BDatepicker, "vue-form-generator": VueFormGenerator.component},
  data() {
    return {
      post: true,
      name: null,
      code: null,
      quantity: null,
      buy_date: null,
      providerValue: null,
      provider: null,
      list_provider: [],
      warehouseValue: null,
      warehouse: null,
      list_warehouse: [],
      is_finish_product: false,
      validate_stock: false,
      sale_price: null,
      min_stock: null,
      um: null,
      umValue: null,
      image_file: null,
      image: null,
      measurement_units: [{text: 'Unidades(U)', value: 'Unidades(U)'},
        {text: 'Libras(Lb)', value: 'Libras(Lb)'},
        {text: 'Kilogramos(Kg)', value: 'Kilogramos(Kg)'},
        {text: 'Litros(Lt)', value: 'Litros(Lt)'},
        {text: 'Taza(45m)', value: 'Taza(45m)'},
        {text: 'Vaso(8 Onz)', value: 'Vaso(8 Onz)'},
        {text: 'Vaso(10 Onz)', value: 'Vaso(10 Onz)'},
        {text: 'Caja', value: 'Caja'},],
      supposes_expense: false,
      type_expense: null,
      type_expenseValue: null,
      list_type_expense: [],
      buy_price: null,
      unit_cost: null,
      fk_attribute_nom_type: null,
      fk_attribute_nom_typeValue: null,
      list_type_product: [],
      description: null,
      item_id: null

    }
  },
  computed: {
    cal_unit_cost() {
      if (!this.quantity || !!this.buy_price)
        return 0
      return this.quantity / this.buy_price;
    },
    ...mapGetters({
      attributesRender: 'GET_ATTRIBUTES_RENDER'
    })

  },
  methods: {
    ...mapActions({
      updateValues: 'UPDATE_VALUES',
      getAttributesNomType: 'GET_ATTRIBUTES_NOM_TYPE',
      fetchTypeProduct: 'FETCH_TYPE_PRODUCT',
      fetchProviders: 'FETCH_PERSON_LIST',
      fetchTypeExpenses: 'FETCH_TYPE_EXPENSE',
      fetchWarehouses: 'FETCH_WAREHOUSE',
      saveProduct: 'SAVE_PRODUCT',
      editProduct: 'EDIT_PRODUCT'
    }),
    selectNameText({text}) {
      return text
    },
    selectName({nombre}) {
      return nombre
    },
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_producto}${id}/`)
          .then(item => {
            this.name = item.nombre;
            this.code = item.codigo;
            this.buy_price = item.precio_compra;
            this.buy_date = new Date(item.fecha_compra);
            this.umValue = this.measurement_units.find(f => f.value === item.um)
            this.getStorageList()
                .then(value => {
                  this.warehouseValue = value.find(f => f.value === item.fk_almacen_id);
                })
            this.validate_stock = item.validar_existencias;
            this.min_stock = item.minino_existencias;
            this.quantity = item.cantidad;
            this.unit_cost = item.costo_unitario;
            this.description = item.descripcion;
            this.getTypeExpenses()
                .then(value => {
                  this.type_expenseValue = value.find(f => f.value === item.tipo_gasto);
                })
            this.getTypeProduct()
                .then(value => {
                  this.fk_attribute_nom_typeValue = value.find(f => f.value === item.fk_attribute_nomtype);
                })
            this.getProviderList()
                .then(value => {
                  this.providerValue = value.find(f => f.value === item.proveedor_id);
                })
            this.supposes_expense = item.supone_gasto
            this.item_id = item.id;
          });
    },
    save() {
      let product = {
        nombre: this.name,
        codigo: this.code,
        tipo_gasto: this.type_expense,
        proveedor: this.provider,
        costo_unitario: this.unit_cost,
        fecha_compra: this.formatYYYYMMDD(this.buy_date),
        cantidad: this.quantity,
        minino_existencias: this.min_stock,
        validar_existencias: this.validate_stock,
        um: this.um,
        precio_compra: this.buy_price,
        precio_venta: this.sale_price,
        producto_final: this.is_finish_product,
        supone_gasto: this.supposes_expense,
        imagen: this.image,
        descripcion: this.description,
        fk_attribute_nomtype: this.fk_attribute_nom_type,
        atributos: '',
        type: 'PRODUCT',
        fk_almacen: this.warehouse,
        fk_empresa: parseInt(localStorage.getItem('enterprise_id')),
        id: this.item_id
      }
      if (this.post) {
        this.saveProduct(product)
      } else {
        this.editProduct()
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
    getImgUrl(file) {
      if (file !== undefined) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener('load', () => {
          this.image = fr.result;
          console.log(this.image);
        })
      }
    },
    getStorageList() {
      return new Promise(resolve => {
        let query = '?page_size=1000';
        this.fetchWarehouses(query)
            .then(response => {
              this.list_warehouse = response.results.filter(item => !item.deleted);
              resolve(this.list_warehouse)
            });
      })
    },
    getTypeExpenses() {
      return new Promise(resolve => {
        let query = '?page_size=1000';
        this.fetchTypeExpenses(query)
            .then(response => {
              this.list_type_expense = response.results.filter(item => !item.deleted)
              resolve(this.list_type_expense)
            });
      })

    },
    getProviderList() {
      return new Promise(resolve => {
        let query = '?page_size=1000';
        this.fetchProviders(query)
            .then(response => {
              this.list_provider = response.results.filter(item => !item.deleted)
              resolve(this.list_provider)
            });
      })
    },
    getTypeProduct() {
      return new Promise(resolve => {
        let query = '?page_size=1000';
        this.fetchTypeProduct(query)
            .then(response => {
              this.list_type_product = response.filter(item => !item.deleted)
              resolve(this.list_type_product)
            })
      })
    }
  },
  watch: {
    providerValue: function () {
      this.provider = this.providerValue.id
    },
    warehouseValue: function () {
      this.warehouse = this.warehouseValue.id
    },
    umValue: function () {
      this.um = this.umValue.value
    },
    type_expenseValue: function () {
      this.type_expense = this.type_expenseValue.id
    },
    fk_attribute_nom_typeValue: function () {
      this.fk_attribute_nom_type = this.fk_attribute_nom_typeValue.id
    },
    image_file: function () {
      this.getImgUrl(this.image_file);
    },
    quantity: function () {
      this.unit_cost = !this.quantity || !this.buy_price ? 0 : (this.quantity / this.buy_price).toFixed(2);
    },
    buy_price: function () {
      this.unit_cost = !this.quantity || !this.buy_price ? 0 : (this.quantity / this.buy_price).toFixed(2);
    }
  },
  async created() {
    await this.getStorageList();
    await this.getTypeExpenses();
    await this.getProviderList();
    await this.getTypeProduct();
    if (this.$route.params.id) {
      this.update_values();
    }
  }
}
</script>