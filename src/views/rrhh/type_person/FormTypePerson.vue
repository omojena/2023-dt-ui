<template>
  <div class="content-page">
    <section>
      <top-bar is_back :page-title="post?'Nuevo Tipo de Persona':'Editar Tipo de Persona'"/>
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
import {api_tipo_persona} from "@/urls";
import {mapActions} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import BButton from "buefy/src/components/button/Button";


export default {
  components: {BButton, TopBar},
  data: () => ({
    name: '',
    description: '',
    post: true,
    item_id: null,
    valid: true,
    fk_enterprise: localStorage.getItem('enterprise_id'),

  }),
  computed: {
  },
  methods: {
    ...mapActions({
      updateValues: 'UPDATE_VALUES',
      saveTypePerson: 'SAVE_TYPE_PERSON',
      editTypePerson: 'EDIT_TYPE_PERSON',
    }),
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_tipo_persona}${id}/`)
          .then(item => {
            this.name = item.nombre;
            this.description = item.descripcion;
            this.fk_enterprise = item.fk_empresa;
            this.item_id = item.id
          });
    },
    save() {
      let typePerson = {
        nombre: this.name,
        fk_empresa: parseInt(this.fk_enterprise),
        descripcion: this.description,
        id: this.item_id
      };
      if (this.post)
        this.saveTypePerson(typePerson);
      else
        this.editTypePerson(typePerson)
    },

  },

  created() {
    if (this.$route.params.id)
      this.update_values();
  },

}
</script>