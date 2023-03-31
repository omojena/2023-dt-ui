<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Ofertas"/>
      <div class="mt-3 bg-withe p-5">
        <h-list :go-to-url="addUrl"
                :only-new="isEmpty"
                :records="index === 1 ? dessertsSimples : dessertsGrouped"
                :per-page="perPage"
                @btn-view-all="viewAll"
                class="mb-6"/>
        <b-tabs>
          <b-tab-item>
            <template #header>
              <b-button type="is-link" @click="changeUrlForm(1)"> Simples</b-button>
            </template>
            <b-table
                :data="isEmpty ? [] : dessertsSimples.results"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page="currentPage"
                mobile-cards
                checkbox-position="left"
                :checked-rows="checkedRows"
                :row-class="(row, index) => row.deleted && 'is-danger'"
            >

              <b-table-column field="nombre" label="Nombre" v-slot="props">
                {{ props.row.nombre }}
              </b-table-column>

              <b-table-column field="cantidad" label="Cantidad" v-slot="props">
                {{ props.row.cantidad }}
              </b-table-column>

              <b-table-column field="precio" label="Precio" v-slot="props">
                {{ props.row.precio }}
              </b-table-column>

              <b-table-column field="costo" label="Costo prod" v-slot="props">
                {{ props.row.costo }}
              </b-table-column>

              <b-table-column field="created_by" label="Creado por" v-slot="props">
                {{ props.row.created_by }}
              </b-table-column>
              <b-table-column field="updated_by" label="Actualizado por" v-slot="props">
                {{ props.row.updated_by }}
              </b-table-column>

              <b-table-column field="action" label="Acciones" v-slot="props">
                <div class="is-flex">
                  <router-link style="display: inline;"
                               :to="{name: 'formEditOffersSimple', params:{id:props.row.id}}">
                    <div class="mx-10">
                      <b-icon type="is-primary-light" icon="pencil" class="mx-4 cursor-pointer"></b-icon>
                    </div>
                  </router-link>
                  <div @click="open_modal_delete(props.row)" class="mx-10 mt-1">
                    <b-icon type="is-danger" icon="delete" class="mx-4 cursor-pointer"></b-icon>
                  </div>
                </div>
              </b-table-column>

            </b-table>
          </b-tab-item>

          <b-tab-item>
            <template #header>
              <b-button type="is-link" @click="changeUrlForm(2)"> Agrupadas</b-button>
            </template>
            <b-table
                :data="isEmpty ? [] : dessertsGrouped.results"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page="currentPage"
                mobile-cards
                checkbox-position="left"
                :checked-rows="checkedRows"
                :row-class="(row, index) => row.deleted && 'is-danger'"
            >

              <b-table-column field="nombre" label="Nombre" v-slot="props">
                {{ props.row.nombre }}
              </b-table-column>

              <b-table-column field="cantidad" label="Cantidad" v-slot="props">
                {{ props.row.cantidad }}
              </b-table-column>

              <b-table-column field="precio" label="Precio" v-slot="props">
                {{ props.row.precio }}
              </b-table-column>

              <b-table-column field="costo" label="Costo prod" v-slot="props">
                {{ props.row.costo }}
              </b-table-column>

              <b-table-column field="created_by" label="Creado por" v-slot="props">
                {{ props.row.created_by }}
              </b-table-column>
              <b-table-column field="updated_by" label="Actualizado por" v-slot="props">
                {{ props.row.updated_by }}
              </b-table-column>

              <b-table-column field="action" label="Acciones" v-slot="props">
                <router-link style="display: inline;"
                             :to="{name: 'formEditOffersGrouped', params:{id:props.row.id}}">
                  <div class="mx-10">
                    <b-icon type="is-primary-light" icon="pencil" class="mx-4 cursor-pointer"></b-icon>
                  </div>
                </router-link>
                <div @click="open_modal_delete(props.row)" class="mx-10 mt-1">
                  <b-icon type="is-danger" icon="delete" class="mx-4 cursor-pointer"></b-icon>
                </div>
              </b-table-column>

            </b-table>
          </b-tab-item>
        </b-tabs>


      </div>
    </section>
  </div>
</template>

<script>
import {api_oferta_agrupada, api_oferta_simple} from "@/urls";
import {mapGetters, mapMutations, mapActions} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";
import BButton from "buefy/src/components/button/Button";


export default {
  name: "LOffers",
  components: {BButton, BTableColumn, BTable, HList, TopBar},
  data() {
    return {
      search: '',
      checkedRows: [],
      addUrl: null,
      isEmpty: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5,
      uri_delete: null,
      index: 1,
    }
  },
  methods: {
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
      setOffers: 'SET_OFFERS'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchAllOffers: 'FETCH_ALL_OFFERS',
      fetchSimpleOffers: 'FETCH_SIMPLE_OFFERS',
      fetchGroupOffers: 'FETCH_GROUP_OFFERS'

    }),
    open_modal_delete: function (item) {
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Oferta`,
        message: `Estás seguro que desea ${action} la oferta "${item.nombre}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(this.uri_delete + item.id + '/');
          this.loadUrlData(this.uri_delete);
          let resolve = await this.confirmDelete();
          this.setOffers(resolve)
        }
      })
    },
    changeUrlForm(index) {
      this.index = index;
      switch (index) {
        case 1:
          this.addUrl = '/offers/simple/form/';
          this.uri_delete = api_oferta_simple;
          break;
        case 2:
          this.addUrl = '/offers/grouped/form/';
          this.uri_delete = api_oferta_agrupada;
          break;

      }

    },
    viewAll() {
      this.isPaginated = !this.isPaginated;
    }
  },
  created() {
    this.fetchSimpleOffers();
    this.fetchGroupOffers();
    this.changeUrlForm(1)
  },
  computed: {
    ...mapGetters({
      dessertsSimples: 'GET_OFFERS_SIMPLE',
      dessertsGrouped: 'GET_OFFERS_GROUPED'
    })
  }

}
</script>

<style scoped>

</style>