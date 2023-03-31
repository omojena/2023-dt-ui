<template>
  <section>
    <b-menu-item v-for="(item, idx) in pages" :key="idx"
                 :class="{'is-disabled': item.disable}"
                 @click="goTo(item.link)"
                 regular :icon="item.icon"
                 :label="item.name"></b-menu-item>
  </section>

</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "m-item",
  props: {
    pages: {
      type: Object
    },
  },
  methods: {
    ...mapActions({
      goTo: 'GO_TO'
    })
  }
}
</script>

<style scoped>

</style>