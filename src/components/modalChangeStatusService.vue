<template>
  <div class="modal-card" style="width: auto">
    <section class="modal-card-body is-flex is-align-items-center is-flex-direction-column">
      <div
          v-if="service.estado === status.PENDING"
          @click="changeToShipping"
          class="cancel-btn my-10 pointer">
        <span class="title">En Ejecucion</span>
      </div>
      <template v-if="selectMessenger">
        <multiselect
            placeholder="Mensajero"
            v-model="messenger"
            :custom-label="selectName"
            open-direction="bottom"
            :show-no-results="false"
            :options="workers_list_custom">
        </multiselect>
      </template>
      <div
          v-if="service.estado === status.PROCESS "
          @click="changeToCompleted"
          class="cancel-btn my-10 pointer">
        <span class="title">Finalizado</span>
      </div>
    </section>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {STATUS_SERVICE} from "@/enum";
import Multiselect from "vue-multiselect";

export default {
  name: "modalChangeStatusService",
  components: {Multiselect},
  props: ['service'],
  data() {
    return {
      status: STATUS_SERVICE,
      completed: false,
      messenger: null,
      selectMessenger: false,
      workers_list_custom: []
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      fetchPersonList: 'FETCH_PERSON_LIST',
      setStatusService: 'PARTIAL_UPDATE_SERVICE'

    }),
    selectName({text}) {
      return text
    },
    getPersonList() {
      this.workers_list_custom = []
      this.fetchPersonList().then(value => {
        this.selectMessenger = true
        value.results.forEach(item => {
          if (item.fk_tipo_persona.find(p => p.nombre.toLowerCase() === 'trabajador')) {
            this.workers_list_custom.push({text: item.nombre, value: item.id})
          }
        })
      })
    },
    save() {

    },
    changeToCompleted() {
      let data = {
        estado: STATUS_SERVICE.COMPLETED,
        id: this.service.id
      }
      this.setStatusService(data)
          .then(() => {
            this.$emit('close')
            this.$emit('reload')
          })
    },
    changeToShipping() {
      if (this.service.slug === 'delivery_service') {
        this.getPersonList()
      } else {
        let data = {
          estado: STATUS_SERVICE.PROCESS,
          id: this.service.id
        }
        this.setStatusService(data)
            .then(() => {
              this.$emit('close')
              this.$emit('reload')
            })
      }

    },
    changeToCancel() {

    },

  },
  watch: {
    messenger: function () {
      let data = {
        messenger: this.messenger ? this.messenger.value : null,
        estado: STATUS_SERVICE.PROCESS,
        id: this.service.id
      }
      this.setStatusService(data)
          .then(() => {
            this.$emit('close')
            this.$emit('reload')
          })
    }
  }
}
</script>

<style scoped lang="scss">
.modal-card {
  border-radius: 10px;
}

.cancel-btn {
  background: #FCFCFC;
  border: 1px solid #FDC4D1;
  box-sizing: border-box;
  border-radius: 10px;
  width: 314px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 0.5px;
    font-style: normal;
  }

}

.pointer {
  cursor: pointer;
}
</style>