<template>
  <div class="content-page">
    <section>
      <top-bar is_back :page-title="post?pageTitleAdd:pageTitleEdit"/>
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
import {api_nomvalue} from "@/urls";
import {mapGetters, mapMutations, mapActions} from 'vuex'
import BInput from "buefy/src/components/input/Input";
import BButton from "buefy/src/components/button/Button";
import TopBar from "../top-bar/topBar";

export default {
  name: 'GFNomenclator',
  components: {TopBar, BButton, BInput},
  data: () => ({
    name: null,
    description: null,

    post: true,
    item_id: null,
    valid: true,

  }),
  props: {
    pageTitleAdd: {
      type: String,
      default: ''
    },
    pageTitleEdit: {
      type: String,
      default: ''
    },
    typeIdNom: Number,
    successUrl: String
  },

  methods: {
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
    }),
    ...mapActions({
      updateValues: 'UPDATE_VALUES',
      saveNomValue: 'SAVE_NOM_VALUE',
      editNomValue: 'EDIT_NOM_VALUE'
    }),
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_nomvalue}${id}/`).then(item => {
        this.name = item.nombre;
        this.description = item.descripcion;
        this.item_id = item.id;
      })
    },
    save() {
      let object = {
        type_id: this.typeIdNom,
        nombre: this.name,
        descripcion: this.description,
        id: this.item_id,
        successUrl: this.successUrl
      };
      if (this.post)
        this.saveNomValue(object);
      else
        this.editNomValue(object);
    },

  },

  computed: {
    ...mapGetters({
      enterpriseAuth: 'GET_ENTERPRISE_AUTH'
    }),
  },
  created() {
    if (this.$route.params.id) {
      this.update_values();
    }
  },
}
</script>
<style lang="scss" scoped>

</style>e>
