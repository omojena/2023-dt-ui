<template>
  <div class="card">
    <div class="card-content">
      <div class="content">

        <div class="is-flex is-justify-content-space-between">
          <h3 class="title-card">{{ title }}</h3>
          <h5>
            {{ date }}
          </h5>
        </div>

        <b-taglist attached>
          <b-tag size="is-medium" type="is-dark">Tipo de Tarea</b-tag>
          <b-tag size="is-medium" type="is-info">{{ typeTask }}</b-tag>
        </b-taglist>

        <b-taglist attached>
          <b-tag size="is-medium" type="is-dark">Estado</b-tag>
          <b-tag size="is-medium" type="is-info">{{ getStatusString(status) }}</b-tag>
        </b-taglist>


        <div class="is-flex is-align-items-center">
          <b-tag class="mr-2" type="is-dark">Responsable (s)</b-tag>

          <b-tooltip v-for="(item, id) of assignedTo" :key="id"
                     type="is-primary-light"
                     :label="item.nombre"
                     position="is-top">
            <avatar class="mr-1 ml-1" :size="35"
                    color="#ffffff"
                    :src="item.avatar || ''"
                    :username="item.nombre"/>
          </b-tooltip>
        </div>
        <div>
          <b-collapse v-if="desc" :open="false" aria-id="contentIdForA11y1">
            <a
                class="is-primary"
                slot="trigger"
                aria-controls="contentIdForA11y1"> <i class="icon-dt-eye-3 description">Ver
              descripcion</i></a>
            <div class="notification">
              <div class="content">
                <p>
                  {{ desc }}
                </p>
              </div>
            </div>
          </b-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BTaglist from "buefy/src/components/tag/Taglist";
import BTag from "buefy/src/components/tag/Tag";
import Avatar from 'vue-avatar';
import BTooltip from "buefy/src/components/tooltip/Tooltip";
import BCollapse from "buefy/src/components/collapse/Collapse";
import {STATUS_TASK} from '@/enum'

export default {
  name: "CalendarEvent",
  components: {BCollapse, BTooltip, BTag, BTaglist, Avatar},
  data() {
    return {}
  },
  props: {
    title: {
      type: String
    },
    assignedTo: {
      type: Array
    },
    typeTask: {
      type: String
    },
    date: {
      type: String
    },
    status: {
      type: Number
    },
    desc: {
      type: String
    }
  },
  computed: {},
  methods: {
    getStatusString(status) {
      switch (status) {
        case STATUS_TASK.TODO:
          return 'Pendiente';
        case STATUS_TASK.PROGRESS:
          return 'En Ejecucion';
        case STATUS_TASK.COMPLETED:
          return 'COmpletada'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../theme/app";

.card {
  background-color: #d1c3f9;
  border: 1px solid #3827B3;

  .card-content {
    padding: 0.5rem;

    .content {
      h3 {
        color: #000000;
      }
    }
  }

  .description {
    font-size: 16px;
    color: black;
  }
}
</style>