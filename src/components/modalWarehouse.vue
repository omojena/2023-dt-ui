<template>
  <div class="modal-card rounded-10">
    <section class="modal-card-body">
      <div class="content">
        <div class="is-flex is-justify-content-flex-end is-align-items-center">
          <button @click="$emit('close')" class="delete bg-red1" aria-label="close"></button>
        </div>
        <div class="is-flex is-justify-content-center is-align-items-center">
          <div class="title-new-modal">Inventario Almacen : {{ warehouse.nombre }}</div>
        </div>
        <section v-if="skeleton">
          <skeleton-table/>
        </section>
        <section v-else>
          <b-tabs>
            <b-tab-item v-if="products.length">
              <template #header>
                <b-button type="is-link"> Productos</b-button>
              </template>
              <b-table
                  :data="products"
                  :paginated="true"
                  :per-page="20"
                  :current-page="1"
                  mobile-cards
                  :row-class="(row, index) => row.deleted && 'is-danger'"
              >

                <b-table-column field="nombre" label="Nombre" v-slot="props">
                  {{ props.row.fk_objeto_almacen.nombre }}
                </b-table-column>

                <b-table-column field="fk_almacen" label="Código" v-slot="props">
                  {{ props.row.fk_objeto_almacen.codigo }}
                </b-table-column>

                <b-table-column field="cantidad" label="Cantidad" v-slot="props">
                  {{ props.row.cantidad }}
                </b-table-column>

                <b-table-column field="proveedor" label="Proveedor" v-slot="props">
                  {{ props.row.fk_objeto_almacen.proveedor.nombre }}
                </b-table-column>

                <b-table-column field="costo_unitario" label="Costo Unitario" v-slot="props">
                  {{ props.row.fk_objeto_almacen.costo_unitario }}
                </b-table-column>
                <b-table-column field="precio_compra" label="Precio de Compra" v-slot="props">
                  {{ props.row.fk_objeto_almacen.precio_compra }}
                </b-table-column>
              </b-table>
            </b-tab-item>
            <b-tab-item v-if="active.length">
              <template #header>
                <b-button type="is-link">Activos Fijos</b-button>
              </template>
              <b-table
                  :data="active"
                  :paginated="true"
                  :per-page="20"
                  :current-page="1"
                  checkbox-position="left"
                  :row-class="(row, index) => row.deleted && 'is-danger'"
              >
                <b-table-column field="nombre" label="Nombre" v-slot="props">
                  {{ props.row.fk_objeto_almacen.nombre }}
                </b-table-column>

                <b-table-column field="fk_almacen" label="Código" v-slot="props">
                  {{ props.row.fk_objeto_almacen.codigo }}
                </b-table-column>

                <b-table-column field="cantidad" label="Cantidad" v-slot="props">
                  {{ props.row.cantidad }}
                </b-table-column>

                <b-table-column field="proveedor" label="Proveedor" v-slot="props">
                  {{ props.row.fk_objeto_almacen.proveedor.nombre }}
                </b-table-column>

                <b-table-column field="costo_unitario" label="Costo Unitario" v-slot="props">
                  {{ props.row.fk_objeto_almacen.costo_unitario }}
                </b-table-column>
                <b-table-column field="precio_compra" label="Precio de Compra" v-slot="props">
                  {{ props.row.fk_objeto_almacen.precio_compra }}
                </b-table-column>
                <b-table-column field="created_by" label="Creado por" v-slot="props">
                  {{ props.row.fk_objeto_almacen.created_by }}
                </b-table-column>

              </b-table>
            </b-tab-item>
            <b-tab-item v-if="supplies.length">
              <template #header>
                <b-button type="is-link"> Insumos</b-button>
              </template>
              <b-table
                  :data="supplies"
                  :per-page="20"
                  :current-page="1"
                  mobile-cards
                  :row-class="(row, index) => row.deleted && 'is-danger'"
              >
                <b-table-column field="nombre" label="Nombre" v-slot="props">
                  {{ props.row.fk_objeto_almacen.nombre }}
                </b-table-column>

                <b-table-column field="fk_almacen" label="Código" v-slot="props">
                  {{ props.row.fk_objeto_almacen.codigo }}
                </b-table-column>

                <b-table-column field="cantidad" label="Cantidad" v-slot="props">
                  {{ props.row.cantidad }}
                </b-table-column>

                <b-table-column field="proveedor" label="Proveedor" v-slot="props">
                  {{ props.row.fk_objeto_almacen.proveedor.nombre }}
                </b-table-column>

                <b-table-column field="costo_unitario" label="Costo Unitario" v-slot="props">
                  {{ props.row.fk_objeto_almacen.costo_unitario }}
                </b-table-column>
                <b-table-column field="precio_compra" label="Precio de Compra" v-slot="props">
                  {{ props.row.fk_objeto_almacen.precio_compra }}
                </b-table-column>
                <b-table-column field="created_by" label="Creado por" v-slot="props">
                  {{ props.row.fk_objeto_almacen.created_by }}
                </b-table-column>

              </b-table>

            </b-tab-item>
          </b-tabs>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import SkeletonTable from "@/components/skeleton/skeleton-table";

export default {
  name: "modalWarehouse",
  components: {SkeletonTable},
  props: ['warehouse'],
  data() {
    return {
      skeleton:true,
      products: [],
      supplies: [],
      active: [],
    }
  },
  methods: {
    ...mapActions({
      fetchAft: 'FETCH_AFT',
      fetchProduct: 'FETCH_PRODUCT',
      fetchSupplies: 'FETCH_SUPPLIES',
      fetchObjectWarehouse: 'FETCH_OBJECT_WAREHOUSE_AREA'
    }),
    getATFPI(id) {
      this.fetchObjectWarehouse(id)
          .then(value => {
            this.skeleton = false;
            this.products = value.filter(f => f.fk_objeto_almacen.type === 'PRODUCTO')
            this.supplies = value.filter(f => f.fk_objeto_almacen.type === 'INSUMO')
            this.active = value.filter(f => f.fk_objeto_almacen.type === 'AFT')
          })
    },
  },
  created() {
    this.getATFPI(this.warehouse.id)
  }
}
</script>

<style scoped lang="scss">
.title-new-modal {
  line-height: 32px;
  letter-spacing: 0.5px;
  color: #0B2B46;
  font-size: 28px;
}
</style>