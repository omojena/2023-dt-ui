<template>
  <div class="content-page">
    <section>
      <top-bar is_back :page-title="post?'Nueva Incidencia':'Editar Incidencia'"/>
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
              <b-field label="Involucrados" label-position="on-border">
                <multiselect
                    placeholder="Involucrados"
                    v-model="fk_personValue"
                    :multiple="true"
                    track-by="id"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :options="person_list">
                </multiselect>
              </b-field>
              <b-field label="Tipo de Incidencia" label-position="on-border">
                <multiselect
                    placeholder="Tipo de Incidencia"
                    v-model="fk_type_incidentsValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="incidents_list">
                </multiselect>
              </b-field>

            </div>
            <div class="column is-half">
              <b-field label="Descripcion" label-position="on-border">
                                <textarea
                                    v-model="description"
                                    class="textarea"
                                    placeholder="Descripcion"
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
import {api_incidencia} from "@/urls";
import {mapMutations, mapActions} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import Multiselect from "vue-multiselect";

export default {
  components: {TopBar, Multiselect},
  data: () => ({
    name: '',
    description:'',
    valid: true,
    post: true,
    item_id: null,
    fk_enterprise: localStorage.getItem('enterprise_id'),
    fk_type_incidents: null,
    fk_type_incidentsValue: null,
    person_list: [],
    incidents_list: [],
    fk_person: null,
    fk_personValue: null,

  }),

  methods: {
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
    }),
    ...mapActions({
      updateValues: 'UPDATE_VALUES',
      saveIncidents: 'SAVE_INCIDENTS',
      editIncidents: 'EDIT_INCIDENTS',
      fetchWorkers: 'FETCH_PERSON_LIST',
      fetchTypeIncidents: 'FETCH_TYPE_INCIDENTS'
    }),
    selectName({nombre}) {
      return nombre
    },
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_incidencia}${id}/`)
          .then(item => {
            this.name = item.nombre;
            this.fk_type_incidents = item.fk_tipo_incidencia;
            this.fk_person = item.fk_persona;
            this.fk_enterprise = item.fk_empresa;
            this.description = item.descripcion;
            this.item_id = item.id;
          });
    },
    save() {
      let incident_object = {
        nombre: this.name,
        fk_tipo_incidencia: this.fk_type_incidents,
        fk_empresa: parseInt(this.fk_enterprise),
        fk_persona: this.fk_person,
        descripcion: this.description,
        id: this.item_id
      };

      if (this.post)
        this.saveIncidents(incident_object);
      else
        this.editIncidents(incident_object);
    },
    getWorkers() {
      this.fetchWorkers(null).then(value => {
        let query = `?page=1&type_person=3&page_size=${value.count}`;
        this.fetchWorkers(query)
            .then(value1 => {
              this.person_list = value1.results.filter(item => item.deleted === false);
            });
      });
    },
    getTypeIncidents() {
      let query = `?page=1&page_size=100`
      this.fetchTypeIncidents(query).then(value => {
        this.incidents_list = value.results.filter(item => item.deleted === false);
      })
    },
  },
  watch: {
    fk_personValue: function () {
      this.fk_person = []
      this.fk_personValue.forEach(item => {
        this.fk_person.push(item.id)
      });
    },
    fk_type_incidentsValue: function () {
      this.fk_type_incidents = this.fk_type_incidentsValue.id
    },

  },

  created() {
    this.getWorkers();
    this.getTypeIncidents();
    if (this.$route.params.id) {
      this.update_values();
    }
  }
}
</script>
