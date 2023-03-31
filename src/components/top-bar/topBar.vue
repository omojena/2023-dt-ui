<template>
  <div class="top-bar-page is-flex is-justify-content-space-between card">
    <div class="page-title">
      <b-button v-if="is_back" type="is-small" class="button back-btn mr-2" @click="goBack">
        <b-icon icon="arrow-left"></b-icon>
      </b-button>
      <h1 bold>

        {{ pageTitle }}
      </h1>
    </div>
    <div class="search" v-if="!is_search">
      <b-input custom-class="search-bar"
               has-icon-right
               icon-right-name="icon-dt-search"
               v-model="search1"
               placeholder="Search"></b-input>
    </div>
    <div class="cursor-pointer" v-if="is_reload" @click="$emit('reload')">
      <b-tooltip label="Recargar">
        <b-icon  icon="reload"></b-icon>
      </b-tooltip>
    </div>
    <b-loading is-full-page v-model="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
import BLoading from "buefy/src/components/loading/Loading";
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "topBar",
  components: {BLoading},
  data() {
    return {
      search1: ''
    }
  },
  props: {
    pageTitle: {
      type: String
    },
    search: {
      type: String
    },
    is_search: {
      type: Boolean,
      default: true
    },
    is_reload: {
      type: Boolean,
      default: false
    },
    is_back: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ...mapActions({
      goBack: 'GO_BACK'
    })
  },
  computed: {
    ...mapGetters({
      isLoading: 'GET_LOADING'
    })
  }
}
</script>

<style scoped lang="scss">
.top-bar-page {
  background-color: #FFFFFF;
  height: 60px !important;
  width: 100%;
  padding: 10px 30px 10px 10px;
  display: flex;
  align-items: center;
  border: none !important;
  border-radius: 0 !important;

  .page-title {
    display: flex;
    font-size: 19px;
    color: #707070;
    padding-left: 10px;

    .back-btn {
      border: none;

      &:focus {
        border: none;
        box-shadow: none;
      }
    }
  }
}


</style>
