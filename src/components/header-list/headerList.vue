<template>
  <section>
    <div class="is-flex is-justify-content-space-between" :class="{'pull-right':onlyAll}">
      <b-button v-if="!onlyAll" class="btn-new btn-global btn-accept" expanded
                @click="goTo">
        <span class="label-new" lg-font regular>Nuevo</span>
      </b-button>
      <div v-if="viewMode" class="is-flex is-align-items-center">
        <div class="pointer" @click="$emit('view-module')">
          <b-icon
              icon="view-module"
              size="is-large"
              type="is-accent">
          </b-icon>
        </div>
        <div class="pointer" @click="$emit('view-list')">
          <b-icon
              icon="view-list"
              size="is-large"
              type="is-accent">
          </b-icon>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import BButton from "buefy/src/components/button/Button";

export default {
  name: "HList",
  components: {BButton},
  props: {
    goToUrl: String,
    onlyNew: {
      type: Boolean,
      default: false
    },
    onlyAll: {
      type: Boolean,
      default: false
    },
    viewMode: {
      type: Boolean,
      default: false
    },
    records: Number,
    perPage: Number,
  },
  methods: {
    goTo() {
      this.$router.push(this.goToUrl)
    }
  },
  computed: {
    hideViewAll() {
      return this.records > this.perPage;
    }
  }
}
</script>

<style scoped lang="scss">
.pointer {
  cursor: pointer;
}

.btn-new {
  width: 92px;
  height: 31px;

  .label-new {
    color: #FFFFFF;
  }

  .label-all {
    color: #009FE3;
  }
}

.pull-right {
  justify-content: flex-end !important;
}
</style>