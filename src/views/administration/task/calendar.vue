<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Calendario de Tareas"/>
      <div class="mt-3 bg-withe p-5 card">
        <vue-event-calendar :title="title" :events="demoEvents">
          <template slot-scope="props">
            <calendar-event
                class="mb-2"
                v-for="(event, index) in props.showEvents"
                :key="index"
                :title="event.title"
                :assigned-to="event.assignedTo"
                :type-task="event.type"
                :date="event.date"
                :desc="event.desc"
                :status="event.status"
            >

            </calendar-event>
          </template>
        </vue-event-calendar>
      </div>
    </section>
  </div>


</template>

<script>

import TopBar from "../../../components/top-bar/topBar";
import src_avatar from '../../../assets/img/profile-picture.png';
import CalendarEvent from "../../../components/board/calendar-event";
import {mapActions} from "vuex";

export default {
  name: "calendar",
  components: {CalendarEvent, TopBar},
  data() {
    return {
      src_avatar: src_avatar,
      title: "Tareas",
      demoEvents: []

    }
  },
  methods: {
    ...mapActions({
      fetchTask: 'FETCH_TASK'
    }),
    formatYYYYMMDD(value) {
      const date = new Date(value)
      if (value && !isNaN(date)) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return year + '/' +
            ((month < 10 ? '0' : '') + month) + '/' +
            ((day < 10 ? '0' : '') + day)
      }
      return ''
    },
    getTask() {
      this.fetchTask(null)
          .then(value => {
            this.query = `?page_size=${value.count}`
            this.fetchTask(this.query)
            value.results.forEach(item => {
              this.demoEvents.push(
                  {
                    date: this.formatYYYYMMDD(item.created_at), // Required
                    desc: item.descripcion,
                    title: item.nombre,
                    status: item.estado,
                    type: item.tipo.nombre,
                    assignedTo: item.responsables

                  })
            })
          })
    },
  },
  created() {
    this.getTask()
  }
}
</script>

<style lang="scss" scoped>
.events-wrapper {
  background-color: #1D0F80 !important;
}
</style>