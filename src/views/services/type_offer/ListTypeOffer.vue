<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Tipos de Oferta"/>
      <div class="mt-3 bg-withe p-5">
        <h-list :go-to-url="addUrl"
                :only-new="isEmpty"
                :only-all="true"
                :records="typeOfferList.length"
                :per-page="perPage"
                @btn-view-all="viewAll"
                class="mb-6"/>
        <b-table
            :data="isEmpty ? [] : typeOfferList.results"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page="currentPage"
            :row-class="(row, index) => row.deleted && 'is-danger'"
            mobile-cards>

          <b-table-column field="nombre" label="Nombre" v-slot="props">
            {{ props.row.nombre }}
          </b-table-column>

          <b-table-column field="descripcion" label="Descripcion" v-slot="props">
            {{ props.row.descripcion }}
          </b-table-column>
          <b-table-column field="action" label="Acciones" v-slot="props">
            <div class="is-flex">
                <div class="mx-10">
                  <b-icon type="is-primary-light" icon="pencil" class="mx-4 cursor-pointer"></b-icon>
                </div>
              <div @click="open_modal_delete(props.row)" class="mx-10 mt-1">
                <b-icon type="is-danger" icon="delete" class="mx-4 cursor-pointer"></b-icon>
              </div>
            </div>
          </b-table-column>

        </b-table>
      </div>
    </section>
  </div>
</template>
<script>
import {
  api_nomvalue, api_tipo_oferta_nomvalue
} from "@/urls";
import {mapMutations, mapActions, mapGetters} from 'vuex'
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";
import TopBar from "../../../components/top-bar/topBar";

export default {
  name: 'LTRefund',
  components: {TopBar, BTableColumn, BTable, HList},
  comments: {},
  data() {
    return {
      search: '',
      addUrl: '/type/offer/form/',
      desserts: [],
      isEmpty: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5
    }
  },
  methods: {
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
      setTypeOffer: 'SET_TYPE_OFFER'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchTypeOfferList: 'FETCH_TYPE_OFFER_LIST'
    }),

    viewAll() {
      this.isPaginated = !this.isPaginated;
    },
    open_modal_delete: function (item) {
      let uri_delete = api_nomvalue + item.id + '/';
      let uri_get_data = api_tipo_oferta_nomvalue;
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Tipo de Oferta`,
        message: `Estás seguro que desea ${action} el tipo de oferta "${item.nombre}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          let resolve = await this.confirmDelete();
          this.setTypeOffer(resolve)
        }
      })
    }
  },

  created() {
    this.fetchTypeOfferList();
  },
  computed: {
    ...mapGetters({
      typeOfferList: 'GET_TYPE_OFFER_LIST'
    })
  }

}
</script>

<style scoped>

</style>