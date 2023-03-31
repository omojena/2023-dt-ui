<template>
  <section>
    <div v-if="!selectMessengerLocal || service.slug !=='delivery_service'">
      <b-dropdown
          v-model="currentMenu"
          aria-role="list"
      >
        <template #trigger>
          <b-button
              :class="dynamicClass"
              :label="currentMenu.text"
              type="is-primary"
              :icon-left="currentMenu.icon"
              icon-right="menu-down"/>
        </template>


        <b-dropdown-item
            v-for="(menu, index) in menus"
            :key="index"
            :value="menu" aria-role="listitem">
          <div class="media">
            <div class="media-content">
              <h3>{{ menu.text }}</h3>

            </div>
          </div>
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div v-if="selectMessengerLocal && service.slug ==='delivery_service'">
      <multiselect
          placeholder="Mensajero"
          v-model="messenger"
          :custom-label="selectName"
          open-direction="bottom"
          :show-no-results="false"
          :options="workers_list_custom">
      </multiselect>
    </div>
  </section>

</template>

<script>

import {STATUS_SERVICE} from "@/enum";
import Multiselect from "vue-multiselect";
import {mapActions} from "vuex";

export default {
  name: "statusTrigger",
  components: {Multiselect},
  props: ['service', 'selectMessenger'],
  data() {
    return {
      selectMessengerLocal: false,
      statusService: STATUS_SERVICE,
      messenger: null,
      currentMenu: null,
      workers_list_custom: [],
      menus: [
        {value: STATUS_SERVICE.PENDING, text: 'Aperturado'},
        {value: STATUS_SERVICE.PROCESS, text: 'En Ejecucion'},
        {value: STATUS_SERVICE.COMPLETED, text: 'Finalizado'},
      ]
    }
  },

  computed: {
    dynamicClass() {
      return {
        'init': this.currentMenu.value === STATUS_SERVICE.PENDING,
        'dev': this.currentMenu.value === STATUS_SERVICE.PROCESS,
        'end': this.currentMenu.value === STATUS_SERVICE.COMPLETED,
      }
    }
  },
  methods: {
    ...mapActions({
      fetchPersonList: 'FETCH_PERSON_LIST',
    }),
    filterLabel(state) {
      switch (state) {
        case STATUS_SERVICE.PENDING:
          return 'Aperturado'
        case STATUS_SERVICE.PROCESS:
          return 'En Ejecucion'
        case STATUS_SERVICE.COMPLETED:
          return 'Finalizado'
      }
    },
    selectName({text}) {
      return text
    },
    getPersonList() {
      this.workers_list_custom = []
      this.fetchPersonList().then(value => {
        value.results.forEach(item => {
          if (item.fk_tipo_persona.find(p => p.nombre.toLowerCase() === 'trabajador')) {
            this.workers_list_custom.push({text: item.nombre, value: item.id})
          }
        })
      })
    },
  },
  watch: {
    messenger: function () {
      this.$emit('set-status', [this.currentMenu.value, this.messenger])
      this.selectMessengerLocal = false
    },
    currentMenu: function () {
      if (this.currentMenu.value === STATUS_SERVICE.PROCESS) {
        this.getPersonList()
        this.selectMessengerLocal = true
      } else {
        this.selectMessengerLocal = false
        this.$emit('set-status', this.currentMenu.value)
      }
    }
  },

  created() {
    this.currentMenu = {value: this.service.estado, text: this.filterLabel(this.service.estado)}
    this.selectMessengerLocal = false
  },

}
</script>

<style scoped lang="scss">


.dropdown-trigger {
  button {
    height: 30px !important;
    background-color: hsl(348, 86%, 61%);

    &:hover {
      background-color: hsl(348, 86%, 61%);
    }

    &.init {
      background-color: #01D2CC;
    }

    &.dev {
      background-color: #00B9FF;
    }

    &.end {
      background-color: #FD5360;
    }
  }
}
</style>