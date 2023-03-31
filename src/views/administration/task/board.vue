<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Tareas"/>
      <div class="mt-3 bg-withe p-5 card board">
        <section>
          <div class="columns">
            <div class="column pr-2 pl-2">
              <div semi-bold class="titles">Pendientes</div>
              <draggable
                  class="dragArea list-group mt-3"
                  :list="pending"
                  :group="{ name: 'people', put: true  }"
              >
                <task-board class="mb-2" v-for="(item, id) of pending" :key="id"
                            :title="item.nombre"
                            :assigned-to="item.responsables"
                            :type-task="item.tipo.nombre"
                />
              </draggable>
            </div>
            <div class="column pr-2 pl-2">
              <div semi-bold class="titles">En Ejecucion</div>
              <draggable
                  class="dragArea list-group mt-3"
                  :list="progress"
                  :group="{ name: 'people' , put: true }"
                  @change="inProgressChange"

              >
                <task-board class="mb-2" v-for="(item, id) of progress" :key="id"
                            :title="item.nombre"
                            :assigned-to="item.responsables"
                            :type-task="item.tipo.nombre"
                />

              </draggable>
            </div>
            <div class="column pr-2 pl-2">
              <div semi-bold class="titles">Resueltas</div>
              <draggable
                  class="dragArea list-group mt-3"
                  :list="done"
                  :group="{ name: 'people', put: true }"

              >
                <task-board class="mb-2" v-for="(item, id) of done" :key="id"
                            :title="item.nombre"
                            :assigned-to="item.responsables"
                            :type-task="item.tipo.nombre"
                />

              </draggable>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import TopBar from "../../../components/top-bar/topBar";
import TaskBoard from "../../../components/board/task-board";
import src_avatar from '../../../assets/img/profile-picture.png';
import {STATUS_TASK} from '@/enum'
import {mapActions} from "vuex";

export default {
  name: "Board",
  components: {
    TaskBoard,
    TopBar,
    draggable
  },
  data() {
    return {
      src_avatar: src_avatar,
      pending: [],
      progress: [],
      done: []
    }
  },
  methods: {
    ...mapActions({
      fetchTask: 'FETCH_TASK'
    }),
    add: function () {
      this.list.push({name: "Juan"});
    },
    replace: function () {
      this.list = [{name: "Edgard"}];
    },
    clone: function (el) {
      return {
        name: el.name + " cloned"
      };
    },
    log: function (evt) {
      window.console.log(evt);
    },
    inProgressChange: function (evt) {
      // this.progress.push(evt.added.element);
      console.log(evt.added.element);
      console.log(this.progress);
      window.console.log(evt);
    },
    getTask() {
      this.fetchTask(null)
          .then(value => {
            this.query = `?page_size=${value.count}`
            this.fetchTask(this.query)
            value.results.forEach(item => {
              switch (item.estado) {
                case STATUS_TASK.TODO:
                  this.pending.push(item)
                  break
                case STATUS_TASK.PROGRESS:
                  this.progress.push(item)
                  break
                case STATUS_TASK.COMPLETED:
                  this.done.push(item)
                  break;
              }
            })
          })
    },
  },
  created() {
    this.getTask()
  }

}
</script>

<style scoped lang="scss">
.board {
  height: 110vh;
}

.titles {
  display: flex;
  justify-content: center;
  height: 35px;
  align-items: center;
  background-color: #fe5723;
  flex-basis: 3rem;
  color: #ffffff;
  font-size: 18px;
  position: relative;
}

.column {
  /*border: 1px solid #C2C2C2;*/
  height: 95vh;
  margin-right: 5px;
  margin-left: 5px;

}

.dragArea {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}

</style>