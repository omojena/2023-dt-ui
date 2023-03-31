<template>
  <div class="content-page">
    <section>
      <top-bar :page-title="post?'Nueva Oferta Simple':'Editar Oferta Simple'"/>
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
              <b-field label="Insumos" label-position="on-border">
                <multiselect
                    placeholder="Insumos"
                    v-model="fkSuppliesValue"
                    :multiple="true"
                    track-by="id"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :options="list_supplies">
                </multiselect>
              </b-field>
              <b-field label="Productos" label-position="on-border">
                <multiselect
                    placeholder="Productos"
                    v-model="fkProductValue"
                    :multiple="true"
                    track-by="id"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :options="list_product">
                </multiselect>
              </b-field>
              <b-field label="Precio" label-position="on-border">
                <b-input placeholder="Precio"
                         v-model="price"
                         type="number">
                </b-input>
              </b-field>
              <div class="is-flex is-justify-content-space-between">
                <b-field>
                  <b-checkbox
                      v-model="price_variable"><span bold>Precio Variable </span>
                  </b-checkbox>
                </b-field>
                <div class="mb-5" v-if="price_variable">
                  <b-field label="Precio mínimo" label-position="on-border">
                    <b-input placeholder="Precio mínimo"
                             v-model="price_min"
                             type="number">
                    </b-input>
                  </b-field>
                  <b-field label="Precio máximo" label-position="on-border">
                    <b-input placeholder="Precio máximo"
                             v-model="price_max"
                             type="number">
                    </b-input>
                  </b-field>
                </div>
              </div>


              <b-field class="d-none" label="Cantidad" label-position="on-border">
                <b-input placeholder="Cantidad"
                         v-model="quantity"
                         type="number">
                </b-input>
              </b-field>
              <div class="columns d-none">
                <div class="column is-8">
                  <b-field>
                    <b-checkbox
                        v-model="recommended"><span bold>Recomendado por la empresa</span>
                    </b-checkbox>
                  </b-field>
                  <b-field>
                    <b-checkbox
                        v-model="is_active"><span bold>Disponible</span>
                    </b-checkbox>
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field class="file is-btn-color" :class="{'has-name':!!imageFile}">
                    <b-upload v-model="file_imageFile" class="file-label">
                                    <span class="file-cta">
                                        <b-icon class="file-icon" icon="upload"></b-icon>
                                        <span class="file-label">Imagen</span>
                                    </span>
                    </b-upload>
                  </b-field>
                </div>
              </div>

            </div>
            <div class="column is-half">
              <div class="is-flex is-justify-content-space-between mb-5">
                <b-checkbox v-model="have_discount"><span bold>Tiene Descuento</span></b-checkbox>
                <b-field v-if="have_discount" label="Descuento" label-position="on-border">
                  <b-input placeholder="Descuento"
                           v-model="discount"
                           type="number">
                  </b-input>
                </b-field>
              </div>

              <b-field label="Costo de Producción" label-position="on-border">
                <b-input placeholder="Costo de Producción"
                         v-model="cost"
                         type="number">
                </b-input>
              </b-field>
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
import {
  api_oferta_simple
} from "@/urls";
import {mapGetters, mapActions} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import Multiselect from "vue-multiselect";

export default {
  components: {Multiselect, TopBar},
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    name: '',
    post: true,
    item_id: null,
    hiddenPrice: true,
    hiddenDiscount: true,

    description: '',
    fk_product: [],
    fk_supplies: [],
    list_supplies: [],
    list_product: [],
    fk_type_offer: 27,
    attributes: [],
    fkSuppliesValue:[],
    fkProductValue:[],
    price: null,
    price_min: null,
    price_max: null,
    price_variable: false,
    have_discount: false,
    cost: 0,
    discount: 0.0,
    quantity: '',
    fk_enterprise: localStorage.getItem('enterprise_id'),
    recommended: false,
    is_active: false,
    imageName: null,
    imageFile: null,
    file_imageFile: null,
    cost_products: 0,
    cost_supplies: 0

  }),
  computed: {
    ...mapGetters({
      attributesRender: 'GET_ATTRIBUTES_RENDER',
     })
  },
  methods: {

    ...mapActions({
      getAttributesNomType: 'GET_ATTRIBUTES_NOM_TYPE',
      fetchProductList: 'FETCH_PRODUCT',
      updateValues: 'UPDATE_VALUES',
      fetchSuppliesList: 'FETCH_SUPPLIES',
      saveOffer: 'SAVE_OFFER',
      editOffer: 'EDIT_OFFER'
    }),

    hidePrice() {
      this.hiddenPrice = !this.hiddenPrice;
    },
    haveDiscount() {
      this.hiddenDiscount = !this.hiddenDiscount;
    },
    selectName({nombre}) {
      return nombre
    },
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_oferta_simple}${id}/`)
          .then(item => {
            this.name = item.nombre;
            this.description = item.descripcion;
            this.fkProductValue = item.fk_producto;
            this.fkSuppliesValue = item.fk_insumo;
            this.attributes = item.atributos;
            this.price = item.precio;
            this.cost = item.costo;
            this.quantity = item.cantidad;
            this.discount = item.descuento;
            this.have_discount = item.tiene_descuento;
            this.price_max = item.precio_max;
            this.price_min = item.precio_min;
            this.price_variable = item.precio_variable;
            this.recommended = item.recomendado;
            this.is_active = item.is_active;
            this.item_id = item.id
          })
    },

    save() {
      let oferta_object = {
        id:this.item_id,
        nombre: this.name,
        descripcion: this.description,
        fk_producto: this.fk_product,
        fk_insumo: this.fk_supplies,
        atributos: JSON.stringify(this.attributes),
        precio: this.price,
        costo: this.cost,
        cantidad: 10,
        recomendado: this.recommended,
        is_active: this.is_active,
        precio_variable: this.price_variable,
        precio_min: this.price_min,
        precio_max: this.price_max,
        descuento: this.discount,
        tiene_descuento: this.have_discount,
        fk_tipo_oferta: 29,
        type: 'simple',
        fk_empresa: parseInt(localStorage.getItem('enterprise_id')),
      };
      if (this.post)
        this.saveOffer(oferta_object)
      else
        this.editOffer(oferta_object)
    },
    getProducts() {
      let query = `?page_size=500&producto_final=${true}`
      this.fetchProductList(query).then(value => {
        this.list_product = value.results.filter(item => item.deleted === false);
      })
    },
    getSupplies() {
      let query = `?page_size=500`
      this.fetchSuppliesList(query).then(value => {
        this.list_supplies = value.results.filter(item => item.deleted === false);
         })
    },

  },
  watch:{
    fkProductValue:function () {
      this.fk_product = [];
      this.fkProductValue.forEach(value => {
        this.fk_product.push(value.id)
      })
    },
    fkSuppliesValue:function () {
      this.fk_supplies = [];
      this.fkSuppliesValue.forEach(value => {
        this.fk_supplies.push(value.id)
      })
    }
  },
  created() {
    this.getProducts();
    this.getSupplies();
    if (this.$route.params.id)
      this.update_values();

  }

}
</script>
