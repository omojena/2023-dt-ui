<template>
  <div class="content-page">
    <section>
      <top-bar is_back :page-title="post?'Nueva Tarea':'Editar Tarea'"/>
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

              <div class="columns">
                <div class="column is-6">
                  <b-field label="Responsables" label-position="on-border">
                    <multiselect
                        placeholder="Responsables"
                        v-model="workerValue"
                        :multiple="true"
                        track-by="value"
                        :custom-label="selectName"
                        open-direction="bottom"
                        :show-no-results="false"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        :options="workerList">
                    </multiselect>
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field label="Tipo de Tarea" label-position="on-border">
                    <multiselect
                        placeholder="Tipo de Tarea"
                        v-model="typeTaskValue"
                        :custom-label="selectName"
                        open-direction="bottom"
                        :show-no-results="false"
                        :options="typeTaskList">
                    </multiselect>
                  </b-field>
                </div>
              </div>
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
import {api_tarea} from "@/urls";
import {mapMutations, mapActions} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import Multiselect from "vue-multiselect";

export default {
  components: {TopBar, Multiselect},
  data: () => ({
    name: '',
    valid: true,
    post: true,
    item_id: null,
    fk_enterprise: localStorage.getItem('enterprise_id'),
    address: null,
    workerList: [],
    workerValue: null,
    workers: [],
    typeTaskList: [],
    typeTaskValue: null,
    typeTask:null,
    description: null,

  }),
  methods: {
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
    }),
    ...mapActions({
      goBack: 'GO_BACK',
      updateValues: 'UPDATE_VALUES',
      saveTask: 'SAVE_TASK',
      editTask: 'EDIT_TASK',
      fetchTypeTask: 'FETCH_TYPE_TASK',
      fetchWorker: 'FETCH_PERSON_LIST',
    }),
    selectName({nombre}) {
      return nombre
    },
    selectNameText({text}) {
      return text
    },
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_tarea}${id}/`).then(async item =>  {
        this.name = item.nombre;
        this.description = item.descripcion;
        this.typeTaskValue = this.typeTaskList.find(f=>f.id === item.tipo);
        this.workerValue = item.responsables;
        this.fk_enterprise = item.fk_empresa;
        this.item_id = item.id;
      });
    },
    save() {
      let task_object = {
        nombre: this.name,
        descripcion: this.description,
        fk_empresa: parseInt(this.fk_enterprise),
        tipo: this.typeTask,
        responsables: this.workers,
        id: this.item_id,
      };
      if (this.post) this.saveTask(task_object); else this.editTask(task_object);
    },
    getWorkers() {
      this.fetchWorker(null).then(value => {
        let query = `?page=1&type_person=3&page_size=${value.count}`;
        this.fetchWorker(query)
        .then(value1 => {
          this.workerList = value1.results.filter(item => item.deleted === false);
        })
      });
    },
  },
  watch: {
    workerValue: function () {
      this.workers = []
      this.workerValue.forEach(item =>{
        this.workers.push(item.id)
      });
    },
    typeTaskValue: function () {
      this.typeTask = this.typeTaskValue.id
    },

  },


  created() {
    this.getWorkers();
    let query = `?page=1&page_size=100`
    this.fetchTypeTask(query)
    .then(value => {
      this.typeTaskList = value.results
    });
    if (this.$route.params.id) {
      this.update_values();
    }
  }
}
</script>
