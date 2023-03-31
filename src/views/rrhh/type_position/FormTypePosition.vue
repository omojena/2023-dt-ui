<template>
  <div class="content-page">
    <section>
      <top-bar is_back :page-title="post?'Nuevo Tipo de Cargo':'Editar Tipo de Cargo'"/>
      <div class="mt-3 bg-withe p-5 card">
        <section>
          <div class="columns ">
            <div class="column is-half">
              <b-field label="Nombre" label-position="on-border">
                <b-input placeholder="Nombre"
                         v-model="payload.name"
                         required
                         validation-message="Campo requerido"
                         type="text">
                </b-input>
              </b-field>
              <b-field label="Descripcion" label-position="on-border">
                <b-input type="textarea"
                         v-model="payload.description"
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
import TopBar from "@/components/top-bar/topBar";
import {mapActions, mapMutations} from "vuex";
import {api_type_position} from "@/urls";
import {getStorage} from "@/utils";

export default {
  components: {TopBar},
  data: () => ({
    post: true,
    payload: {
      id: null,
      name: null,
      description: null,
      fk_enterprise: null
    }
  }),

  methods: {
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
    }),
    ...mapActions({
      updateValues: 'UPDATE_VALUES',
      savePositionType: 'SAVE_NOM_VALUE',
      editPositionType: 'EDIT_NOM_VALUE'
    }),
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_type_position}${id}/`).then(item => {
        this.payload = item;
      })
    },
    save() {
      if (this.post) {
        this.payload.fk_enterprise = getStorage('fk_enterprise', false);
        this.savePositionType(this.payload);
      } else
        this.savePositionType(this.payload);
    },

  },

  created() {
    if (this.$route.params.id) {
      this.update_values();
    }
  },
}
</script>