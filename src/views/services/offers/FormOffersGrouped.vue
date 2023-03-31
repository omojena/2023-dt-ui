<template>
  <div class="content-page">
    <section>
      <top-bar :page-title="post?'Nueva Oferta Agrupada':'Editar Oferta Agrupada'"/>
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

              <b-field label="Precio" label-position="on-border">
                <b-input placeholder="Precio"
                         v-model="price"
                         type="number">
                </b-input>
              </b-field>
              <b-field>
                <b-checkbox
                    v-model="price_variable"><span bold>Precio Variable</span>
                </b-checkbox>
              </b-field>
              <b-field v-if="price_variable" label="Precio mínimo" label-position="on-border">
                <b-input placeholder="Precio mínimo"
                         v-model="price_min"
                         type="number">
                </b-input>
              </b-field>
              <b-field v-if="price_variable" label="Precio máximo" label-position="on-border">
                <b-input placeholder="Precio máximo"
                         v-model="price_max"
                         type="number">
                </b-input>
              </b-field>
              <b-field label="Cantidad" label-position="on-border">
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
                    <b-upload v-model="imageFile" class="file-label">
                                    <span class="file-cta">
                                        <b-icon class="file-icon" icon="upload"></b-icon>
                                        <span class="file-label">Imagen</span>
                                    </span>
                      <span class="file-name" v-if="imageFile">
                                        {{ imageFile.name }}
                                    </span>
                    </b-upload>
                  </b-field>
                </div>
              </div>
            </div>
            <div class="column is-half">
              <b-field label="Ofertas Simples" label-position="on-border">
                <multiselect
                    placeholder="Ofertas Simples"
                    v-model="fkOffersValue"
                    :multiple="true"
                    track-by="id"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :options="offers_list">
                </multiselect>
              </b-field>
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
  api_oferta_agrupada
} from "@/urls";
import {mapGetters, mapActions} from 'vuex'
import BUpload from "buefy/src/components/upload/Upload";
import TopBar from "../../../components/top-bar/topBar";
import BCheckbox from "buefy/src/components/checkbox/Checkbox";
import Multiselect from "vue-multiselect";

export default {
  components: { BCheckbox, TopBar, BUpload, Multiselect},
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    name: null,
    name_modal: '',
    post: true,
    item_id: null,

    description: null,
    list_supplies: [],
    offers_list: [],
    fk_product: [],
    fk_offers: [],
    fkOffersValue: [],
    fk_supplies: [],
    fk_type_offer: 29,
    attributes: [],
    price: null,
    price_min: null,
    price_max: null,
    price_variable: false,
    cost: 0,
    quantity: '',
    fk_enterprise: localStorage.getItem('enterprise_id'),
    recommended: false,
    is_active: false,
    imageName: '',
    imageFile: '',
    imageUrl: '',
    imageUrlRender: [],

    //
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
      updateValues: 'UPDATE_VALUES',
      fetchSuppliesList: 'FETCH_SUPPLIES',
      fetchOffersList: 'FETCH_SIMPLE_OFFERS',
      saveOffer: 'SAVE_OFFER',
      editOffer: 'EDIT_OFFER'
    }),

    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_oferta_agrupada}${id}/`)
          .then(item => {
            this.name = item.nombre;
            this.description = item.descripcion;
            this.attributes = item.atributos;
            this.price = item.precio;
            this.quantity = item.cantidad;
            this.recommended = item.recomendado;
            this.is_active = item.is_active;
            this.item_id = item.id;
            this.fkOffersValue = item.lista_ofertas;
            this.fk_supplies = item.fk_insumo;
            this.cost = item.costo;
            this.discount = item.descuento;
            this.price_max = item.precio_max;
            this.price_min = item.precio_min;
            this.price_variable = item.precio_variable;
          })
    },
    selectName({nombre}) {
      return nombre
    },
    save() {
      let oferta_object = {
        nombre: this.name,
        descripcion: this.description,
        fk_insumo: this.fk_supplies,
        atributos: JSON.stringify(this.attributes),
        precio: this.price,
        costo: this.cost,
        cantidad: this.quantity,
        recomendado: this.recommended,
        is_active: this.is_active,
        precio_variable: this.price_variable,
        precio_min: this.price_min,
        precio_max: this.price_max,
        descuento: this.discount,
        type: 'grouped',
        fk_empresa: parseInt(localStorage.getItem('enterprise_id')),
        lista_ofertas_id: this.fk_offers
      };

      if (this.post)
      this.saveOffer(oferta_object)
      else
        this.editOffer(oferta_object)
    },

    getOffersSimple() {
      let query = '?page_size=1000'
      this.fetchOffersList(query).then(value => {
        this.offers_list = value.results;
      })
    },
    getSupplies() {
      let query = '?page_size=1000'
      this.fetchSuppliesList(query).then(value => {
        this.list_supplies = value.results;
      })
    },
  },
  watch:{
    fkOffersValue:function () {
      this.fk_offers = [];
      this.fkOffersValue.forEach(value => {
        this.fk_offers.push(value.id)
      })
    },

  },
  created() {
    this.getOffersSimple();
    this.getSupplies();
    if (this.$route.params.id)
      this.update_values();
  },


}
</script>

<style scoped>

</style>