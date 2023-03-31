<template>
  <b-dropdown
      v-model="dataModel"
      multiple
      @change="$emit('data-select', dataModel)"
      aria-role="list">
    <template #trigger>
      <b-button
          expanded
          class="btn-global dropdown-btn"
          icon-right="menu-down">
        <b-taglist>
          <b-tag v-for="(item, index) in selectedList"
                 :key="index"
                 type="is-light"
                 aria-close-label="Close tag"
                 closable>
            {{ item }}
          </b-tag>
        </b-taglist>
      </b-button>
    </template>
    <b-dropdown-item v-for="(item, index) in dataList"
                     :key="index"
                     :value="item.value" aria-role="listitem">
      <span>{{ item.text }}</span>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: "custom-multi-select",
  props: {
    dataList: {
      type: Array,
    },
    selected: {
      type: Array,
    },
    is_bike: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dataModel: [],
      selectedList: []
    }
  },

  watch: {
    dataModel: function () {
      this.selectedList = []
      this.dataModel.forEach(item => {
        let label = this.dataList.find(val => val.value === item)
        if (label) {
          this.selectedList.push(label.text)
        }
      })
    }
  },
  updated() {
    if (this.selected.length) {
      this.dataModel = this.selected
      console.log(this.selected);
    }
  }
}
</script>

<style scoped>

</style>