<template>
  <div class="content-page">
    <section>
      <top-bar is_back :page-title="post ? 'Nuevo Cargo' : 'Editar Cargo'"/>
      <div class="mt-3 bg-withe p-5 card">
        <section>
          <div class="columns ">
            <div class="column is-half">
              <b-field label="Nombre" label-position="on-border">
                <b-input placeholder="Nombre"
                         v-model="position.name"
                         required
                         validation-message="Campo requerido"
                         type="text">
                </b-input>
              </b-field>
              <b-field label="Descripcion" label-position="on-border">
                <b-input type="textarea"
                         v-model="position.description"
                         minlength="1"
                         maxlength="300"
                         placeholder="Descripcion">
                </b-input>
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Tipo de Cargo" label-position="on-border">
                <multiselect
                    placeholder="Tipo de Cargo"
                    :show-no-results="false"
                    v-model="typePositionValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :options="positionsList">
                </multiselect>
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
import {mapActions} from "vuex";
import Multiselect from "vue-multiselect";
import {api_cargo} from "@/urls";
import BButton from "buefy/src/components/button/Button";
import {getStorage} from "@/utils";

export default {
  components: {TopBar, Multiselect, BButton},
  data() {
    return {
      post: true,
      typePositionValue: null,
      positionsList: [],
      position: {
        name: null,
        description: null,
        typePosition: null,
      }
    }
  },
  methods: {
    ...mapActions({
      fetchTypePosition: 'FETCH_TYPE_POSITIONS',
      updateValues: 'UPDATE_VALUES',
      savePosition: 'SAVE_POSITION',
      editPosition: 'EDIT_PERSON',

    }),
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_cargo}${id}/`)
          .then(async item => {
            this.position.name = item.nombre;
            this.position.description = item.descripcion;
            this.typePositionValue = item.fk_tipo_cargo;
          });
    },
    getPositions() {
      let query = '?page_size=100'
      this.fetchTypePosition(query)
          .then(value => {
            this.positionsList = value.results.filter(item => item.deleted === false);
          })
    },
    selectName({nombre}) {
      return nombre
    },
    save() {
      let position = {
        nombre: this.position.name,
        descripcion: this.position.description,
        fk_empresa: parseInt(getStorage('enterprise_id', false)),
        fk_tipo_cargo: this.position.typePosition
      }
      if (this.post)
        this.savePosition(position);
      else
        this.editPosition(position);
    },
  },
  watch: {
    typePositionValue: function () {
      this.position.typePosition = this.typePositionValue.id
    }
  },
  created() {
    this.getPositions()
  }
}
</script>