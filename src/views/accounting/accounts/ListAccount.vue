<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Cuentas"/>
      <div class="mt-3 bg-withe p-5">
        <section v-if="!desserts">
          <skeleton-table/>
        </section>
        <section v-else>
          <h-list :go-to-url="addUrl"
                  :only-new="isEmpty"
                  :records="desserts.count"
                  :per-page="perPage"
                  :view-mode="true"
                  @view-module="getAccounts(typeAccount.BANK)"
                  @view-list="getAccounts"
                  class="mb-6"/>
          <div class="columns filters is-flex is-justify-content-space-between">
            <div class="column is-flex is-align-items-center">
              <div>
                <b-field>
                  <b-input placeholder="Buscar"
                           custom-class="search-filter"
                           v-model="search"
                           type="search"
                           icon="magnify"
                           icon-clickable
                           @icon-click="searchIconClick">
                  </b-input>
                </b-field>
              </div>
            </div>
          </div>
          <section v-if="viewMode">
            <b-table
                :data="isEmpty ? [] : accountingAccount"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page="currentPage"
                mobile-cards
                :row-class="(row, index) => row.deleted && 'is-danger'"
                checkbox-position="left"
                :checked-rows="checkedRows"
            >

              <b-table-column field="nombre" label="Nombre" v-slot="props">
           <span class="col details">
              {{ props.row.nombre }}
           </span>
              </b-table-column>

              <b-table-column field="numero" label="Numero" v-slot="props">
           <span class="col bold">
              {{ getAccountNumber(props.row.numero) }}
           </span>
              </b-table-column>
              <b-table-column field="moneda" label="Moneda" v-slot="props">
                <b-tag type="is-tag-completed" rounded v-if="props.row.moneda === 'CUP'">
                  <span class="text-status completed"> {{ props.row.moneda }}</span>
                </b-tag>
                <b-tag type="is-tag-success success" rounded v-else>
                  <span class="text-status success"> {{ props.row.moneda }}</span>
                </b-tag>
              </b-table-column>

              <b-table-column field="created_by" label="Creado por" v-slot="props">
            <span class="col">
              {{ props.row.created_by }}
            </span>
              </b-table-column>
              <b-table-column field="updated_by" label="Actualizado por" v-slot="props">
            <span class="col">
              {{ props.row.updated_by }}
            </span>
              </b-table-column>


              <b-table-column field="action" label="Acciones" v-slot="props">
                <div class="is-flex">
                  <router-link :to="{name: 'formEditAccount', params:{id:props.row.id}}">
                    <div class="mx-10">
                      <b-icon type="is-primary-light" icon="pencil" class="mx-4 cursor-pointer"></b-icon>
                    </div>
                  </router-link>
                  <div @click="open_modal_delete(props.row)" class="mx-10 mt-1">
                    <b-icon :type="'is-danger'" icon="delete" class="mx-4 cursor-pointer"></b-icon>
                  </div>
                </div>
              </b-table-column>
            </b-table>
          </section>
          <section v-else>
            <div class="columns is-flex-wrap-wrap">
              <div class="column is-one-third" style="position: relative" v-for="(item, idx) in bankAccount"
                   :key="idx">
                <img :src="bm" class="img-fluid card-img" alt="Banco Metropolitano">
                <div class="card-options">
                  <div class="is-flex">
                    <router-link :to="{name: 'formEditAccount', params:{id:item.id}}">
                      <div class="ml-1">
                        <b-icon type="is-primary-light" icon="pencil" class="cursor-pointer"></b-icon>
                      </div>
                    </router-link>
                    <div @click="open_modal_delete(item)" class="mt-1">
                      <b-icon type="is-danger" icon="delete" class="cursor-pointer"></b-icon>
                    </div>
                  </div>
                </div>
                <div class="card-number">{{ getAccountNumber(item.numero) }}</div>
                <div class="is-flex card-data">
                  <div class="card-denomination">{{ item.moneda }}</div>
                  <div class="card-name">{{ item.nombre }}</div>
                </div>
              </div>
            </div>

          </section>
          <b-pagination class="mt-5"
              :total="paginate.total"
              v-model="paginate.current"
              :range-before="paginate.rangeBefore"
              :range-after="paginate.rangeAfter"
              :order="paginate.order"
              :size="paginate.size"
              :simple="paginate.isSimple"
              :rounded="paginate.isRounded"
              :per-page="paginate.perPage"
              :icon-prev="paginate.prevIcon"
              :icon-next="paginate.nextIcon"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page">
          </b-pagination>
        </section>

      </div>
    </section>
  </div>

</template>
<script>
import {api_cuenta} from "@/urls";
import {mapMutations, mapActions} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import HList from "../../../components/header-list/headerList";
import BTableColumn from "buefy/src/components/table/TableColumn";
import BTable from "buefy/src/components/table/Table";
import bm from '@/assets/img/card/bm.png'
import bandec from '@/assets/img/card/bandec.png'
import bpa from '@/assets/img/card/bpa.png'
import {TYPE_ACCOUNT} from "@/enum";
import SkeletonTable from "@/components/skeleton/skeleton-table";

export default {
  name: 'LAccounts',
  components: {SkeletonTable, BTable, BTableColumn, HList, TopBar},
  comments: {},
  data() {
    return {
      bm, bandec, bpa,
      viewMode: false,
      search: '',
      checkedRows: [],
      typeAccount: TYPE_ACCOUNT,
      addUrl: '/account/form/',
      isEmpty: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5,
      bankAccount: [],
      watchPaginate: null,
      accountingAccount: [],
      desserts: null,
      paginate: {
        total: null,
        current: 1,
        perPage: 10,
        rangeBefore: 3,
        rangeAfter: 3,
        order: '',
        size: '',
        isSimple: false,
        isRounded: true,
        prevIcon: 'chevron-left',
        nextIcon: 'chevron-right'
      },
      query: '',
      filterQuery: {
        type: null,
        currency: null
      }


    }
  },
  watch: {
    desserts: function () {
      let results = this.desserts
      this.paginate.current = results.page;
      this.paginate.total = results.count;
      this.paginate.perPage = results.page_size;
    },
    'paginate.current': function () {
      let mode = this.viewMode ? TYPE_ACCOUNT.ACCOUNTING : TYPE_ACCOUNT.BANK
      this.getAccounts(mode);
    }
  },
  methods: {
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
      setAccounts: 'SET_ACCOUNTS'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchAccount: 'FETCH_ACCOUNTS'
    }),
    getAccounts(mode = TYPE_ACCOUNT.ACCOUNTING) {
      this.viewMode = mode === TYPE_ACCOUNT.ACCOUNTING
      this.query = `?page=${this.paginate.current}`
      this.query += `&type=${mode}`
      if (this.filterQuery.currency) {
        this.query += `&moneda=${this.filterQuery.currency}`
      }
      this.fetchAccount(this.query)
          .then(value => {
            this.desserts = value
            this.watchPaginate = value
            if (this.viewMode) {
              this.accountingAccount = value.results
            } else {
              this.bankAccount = value.results
            }
          })
    },
    getAccountNumber(number) {
      return `**** **** **** ${number.substring(number.length - 4)}`;
    },
    open_modal_delete: function (item) {
      let uri_delete = api_cuenta + item.id + '/';
      let uri_get_data = api_cuenta;
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Cuenta`,
        message: `Estás seguro que desea ${action} la cuenta "${item.nombre}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          let resolve = await this.confirmDelete();
          this.getAccounts()
          this.setAccounts(resolve)
        }
      })
    },
    searchIconClick() {
      this.query = this.search ? `?nombre=${this.search}` : null
      this.getAccounts()
    },
  },

  created() {
    this.getAccounts(TYPE_ACCOUNT.ACCOUNTING)

  },

}
</script>

<style scoped lang="scss">

.card-bank {
  background-image: url("../../../assets/img/card/bm.png");
  background-size: cover;
}

.card-number {
  top: 6.5rem;
  position: absolute;
  margin-left: 3rem;
  font-size: 30px;
}

.card-options {
  position: absolute;
  top: 2rem;
  margin-left: 22rem;
}

.card-data {
  position: absolute;
  top: 10rem;
  margin-left: 2rem;

  .card-denomination {
    text-transform: uppercase;
    line-height: 32px;
    letter-spacing: 0.5px;
    font-size: 26px;
  }

  .card-name {
    margin-left: 35px;
    line-height: 32px;
    letter-spacing: 0.5px;
    font-size: 26px;
  }
}

</style>
