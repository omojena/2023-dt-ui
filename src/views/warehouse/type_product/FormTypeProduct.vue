<template>
  <div class="content-page">
    <section>
      <top-bar :page-title="post?'Nuevo Tipo de Producto':'Editar Tipo de Producto'"/>
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
            </div>
            <div class="column is-half">
              <b-field label="Descripcion" label-position="on-border">
                <b-input type="textarea"
                         v-model="description"
                         minlength="1"
                         maxlength="300"
                         placeholder="Descripcion">
                </b-input>
              </b-field>
            </div>
          </div>
          <CustomAttributes/>
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

import {mapActions, mapMutations, mapGetters} from 'vuex'
import {api_attributenomtype} from "@/urls";
import TopBar from "../../../components/top-bar/topBar";
import BButton from "buefy/src/components/button/Button";
import CustomAttributes from "../../../components/form/custom-attributes";


export default {
  components: {CustomAttributes, BButton, TopBar},
  data: () => ({
    valid: true,
    post: true,
    item_id: null,
    name: null,
    description: null,
    type_product_object: null,
    fk_enterprise: localStorage.getItem('enterprise_id'),
    attributes_selected: [],

  }),
  computed: {
    ...mapGetters({
      enterpriseAuth: 'GET_ENTERPRISE_AUTH',
      selected: 'GET_ATTRIBUTES_RENDER'
    }),

  },
  methods: {
    ...mapMutations({
      setCustomAttributes: 'SET_CUSTOM_ATTRIBUTES'
    }),
    ...mapActions({
      updateValues: 'UPDATE_VALUES',
      getAttributesNomType: 'GET_ATTRIBUTES_NOM_TYPE',
      saveTypeProduct: 'SAVE_TYPE_PRODUCT',
      editTypeProduct: 'EDIT_TYPE_PRODUCT'

    }),
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_attributenomtype}${id}/`)
          .then(item => {
            this.name = item.nombre;
            this.description = item.descripcion;
            this.item_id = item.id;
            this.getAttributesNomType(item.id);
          });
    },
    save() {
      this.type_product_object = {
        nomtype: 19,
        nombre: this.name,
        fk_empresa: parseInt(this.enterpriseAuth.enterprise_id),
        slug: 'type_product',
        descripcion: this.description,
        fk_atributo: '',
        id: this.item_id
      };
      if (this.post)
        this.saveTypeProduct(this.type_product_object);
      else
        this.editTypeProduct(this.type_product_object);
    },
  },
  created() {
    this.setCustomAttributes([]);
    if (this.$route.params.id) {
      this.update_values();
    }
  },

}
</script>
