<template>
  <b-menu-item regular>
    <template slot="label" slot-scope="props">
      {{ module.name }}
      <span class="is-pulled-right"
            :class="props.expanded ? ' icon-dt-doublet-140' : ' icon-dt-doublet-142'"></span>
    </template>
    <div class="sub-menu">
      <m-item :pages="module.pages"/>
    </div>
  </b-menu-item>
</template>

<script>
import {mapActions} from "vuex";
import MItem from "@/components/menu/m-item";

export default {
  name: "m-item-sub-menu",
  components: {MItem},
  props: {
    module: {
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

<style scoped lang="scss">
.is-disabled {
  pointer-events: none;
}
</style>