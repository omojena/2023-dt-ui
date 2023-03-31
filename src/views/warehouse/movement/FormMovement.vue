<template>
    <div class="content-page">
        <section>
            <top-bar :page-title="post?'Nuevo Movimiento':'Editar Movimiento'"/>
            <div class="mt-3 bg-withe p-5 card">
                <section>
                    <div class="columns ">

                        <div class="column is-half">
                            <b-field label="Desde" label-position="on-border">
                                <b-select placeholder="Desde"
                                          v-model="optionSelectMov"
                                          expanded>
                                    <option
                                            v-for="item in optionsListMovement"
                                            :key="item.value"
                                            :value="item.value">
                                        {{ item.name }}
                                    </option>
                                </b-select>
                            </b-field>

                        </div>
                        <div class="column is-half" v-if="optionSelectMov">
                            <b-field label="Objeto Almacen" label-position="on-border">
                                <b-select placeholder="Objeto Almacen"
                                          v-model="objectSelectMov"
                                          expanded>
                                    <option
                                            v-for="item in objectListMovement"
                                            :key="item.value"
                                            :value="item.value">
                                        {{ item.name }}
                                    </option>
                                </b-select>
                            </b-field>
                        </div>
                    </div>
                    <div class="columns ">
                        <div class="column is-half" v-if="objectSelectMov">
                            <b-field label="Seleccione el Origen" label-position="on-border">
                                <b-select placeholder="Seleccione el Origen"
                                          v-model="fromMov"
                                          expanded>
                                    <option
                                            v-for="(item,index) in fromList"
                                            :key="index"
                                            :value="item">
                                        {{ item.nombre }}
                                    </option>
                                </b-select>
                            </b-field>


                        </div>
                        <div class="column is-half" v-if="fromMov">
                            <b-field label="Seleccione el Destino" label-position="on-border">
                                <b-select placeholder="Seleccione el Destino"
                                          v-model="toMov"
                                          expanded>
                                    <option
                                            v-for="(item,index) in toList"
                                            :key="index"
                                            :value="item">
                                        {{ item.nombre }}
                                    </option>
                                </b-select>
                            </b-field>

                        </div>

                    </div>
                    <div class="columns">
                        <div class="column is-half">
                            <b-field :label="`Seleccione el Objeto ${objectMov.length}`" label-position="on-border">
                                <b-select placeholder="Seleccione el Objeto"
                                          v-model="objSelect"
                                          expanded>
                                    <option
                                            v-for="(item,index) in objectMov"
                                            :key="index"
                                            :value="item">
                                        {{ item.nombre }}
                                    </option>
                                </b-select>
                            </b-field>
                        </div>
                        <div class="column is-half">
                            <b-field label="Cantidad " label-position="on-border">
                                <b-input placeholder="Cantidad"
                                         v-model="cantidad"
                                >

                                </b-input>
                            </b-field>
                        </div>
                    </div>


                    <div class="buttons is-pulled-right">
                        <b-button @click="save" class="btn-global btn-accept is-rounded form mt-3"><span
                                lg-font regular main-color>Guardar</span>
                        </b-button>
                    </div>
                </section>
            </div>
        </section>
    </div>


</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    import BButton from "buefy/src/components/button/Button";
    import TopBar from "../../../components/top-bar/topBar";
    import BInput from "buefy/src/components/input/Input";
    import {MOVEMENT, OBJECT_WAREHOUSE} from "@/enum";

    export default {
        components: {BInput, TopBar, BButton,},
        data: () => ({
            post: true,
            movementType: MOVEMENT,
            fk_enterprise: localStorage.getItem('enterprise_id'),
            optionSelectMov: null,
            objectSelectMov: null,
            cantidad: 0,
            fromMov: null,
            toMov: null,
            query: `?page=1&page_size=1000`,
            selected: {},
            movement: {
                area_origen: null,
                almacen_origen: null,
                area_destino: null,
                almacen_destino: null,
                oa: null
            },
            optionsListMovement: [
                {name: 'Area <--> Area', value: 1},
                {name: 'Area <--> Almacen', value: 2},
                {name: 'Almacen <--> Almacen', value: 3},
                {name: 'Almacen <--> Area', value: 4},
            ],
            objectListMovement: [
                {name: 'Productos', value: OBJECT_WAREHOUSE.PRODUCT},
                {name: 'Insumos', value: OBJECT_WAREHOUSE.SUPPLIES},
                {name: 'Activos', value: OBJECT_WAREHOUSE.AF},

            ],
            fromList: [],
            objectSelectList: [],
            toList: [],
            objectMov: [],
            objSelect: null,
            checkedRows: [],


        }),
        computed: {
            ...mapGetters({
                attributesRender: 'GET_ATTRIBUTES_RENDER'
            })

        },

        methods: {
            ...mapActions({
                fetchWarehouse: 'FETCH_WAREHOUSE',
                fetchAreas: 'FETCH_AREAS',
                fetchProduct: 'FETCH_PRODUCT',
                fetchAfT: 'FETCH_AFT',
                moveObj: 'SAVE_MOVE',
                fetchSupplies: 'FETCH_SUPPLIES'
            }),
            alertCustom(title, msg) {
                this.$buefy.dialog.alert({
                    title: title,
                    message: msg,
                    confirmText: 'Ok'
                })
            },
            checkQuantity(item) {
                if (this.selected[item.id] > item.cantidad) {
                    this.$buefy.dialog.alert({
                        title: 'Error',
                        message: 'Ha exedido la disponibilidad',
                        type: 'is-danger',
                        hasIcon: true,
                        icon: 'times-circle',
                        iconPack: 'fa',
                        ariaRole: 'alertdialog',
                        ariaModal: true
                    });
                    this.selected[item.id] = 0
                }
            },
            save() {
                switch (this.optionSelectMov) {
                    case MOVEMENT.AREA_AREA:
                        this.movement.area_origen = this.fromMov.id;
                        this.movement.area_destino = this.toMov.id;
                        this.movement.almacen_origen = null;
                        this.movement.almacen_destino = null;
                        break;
                    case MOVEMENT.AREA_ALMACEN:
                        this.movement.area_origen = this.fromMov.id;
                        this.movement.almacen_origen = null;
                        this.movement.almacen_destino = this.toMov.id;
                        this.movement.area_destino = this.toMov.fk_area.id;
                        break;
                    case MOVEMENT.ALMACEN_ALMACEN:
                        this.movement.almacen_origen = this.fromMov.id;
                        this.movement.area_origen = this.fromMov.fk_area.id;
                        this.movement.almacen_destino = this.toMov.id;
                        this.movement.area_destino = this.toMov.fk_area.id;
                        break;
                    case MOVEMENT.ALMACEN_AREA:
                        this.movement.almacen_origen = this.fromMov.id;
                        this.movement.area_origen = this.fromMov.fk_area.id;
                        this.movement.area_destino = this.toMov.id;
                        this.movement.almacen_destino = null;
                        break;
                }
                switch (this.objectSelectMov) {
                    case OBJECT_WAREHOUSE.AF:
                        this.movement.oa = "A";
                        break;
                    case OBJECT_WAREHOUSE.SUPPLIES:
                        this.movement.oa = "I";
                        break;
                    case OBJECT_WAREHOUSE.PRODUCT:
                        this.movement.oa = "P"
                }
                let obj = {
                    oa: this.movement.oa,
                    fk_objeto_almacen: this.objSelect.id,
                    area_origen: this.movement.area_origen,

                    almacen_origen: this.movement.almacen_origen,

                    area_destino: this.movement.area_destino,

                    almacen_destino: this.movement.almacen_destino,

                    cantidad: Number(this.cantidad)
                };
                 this.moveObj(obj);
            },

        },
        watch: {
            optionSelectMov: async function () {
                this.objectSelectMov = null;
                this.fromMov = null;
                this.toMov = null;
                switch (this.optionSelectMov) {
                    case MOVEMENT.AREA_AREA:
                      this.fetchAreas(this.query)
                        .then(result =>{
                          this.fromList = result.results;
                          this.fromList = this.fromList.filter(item => item.deleted === false)
                          if (this.fromList.length > 1) {
                            this.toList = this.fromList;
                          } else {
                            this.alertCustom('Movimiento entre Areas', 'Solo hay un area en la empresa, debe agregar otra area para reliazar este movimiento')
                          }
                        })
                        break;
                    case MOVEMENT.AREA_ALMACEN:
                        this.fromList = await this.fetchAreas(this.query);
                        this.fromList = this.fromList.results.filter(item => item.deleted === false)
                        this.toList = await this.fetchWarehouse(this.query);
                        this.toList = this.toList.results.filter(item => item.deleted === false)
                      if (!this.fromList.length) {
                            this.alertCustom('Movimiento Area-Alamcen', 'No hay areas registradas en su empresa')
                        }
                        if (!this.toList.length) {
                            this.alertCustom('Movimiento Area-Alamcen', 'No hay almacenes registradas en su empresa')
                        }
                        break;
                    case MOVEMENT.ALMACEN_ALMACEN:
                        this.fromList = await this.fetchWarehouse(this.query);
                        this.fromList = this.fromList.results.filter(item => item.deleted === false)
                        if (this.fromList.length > 1) {
                              this.toList = this.fromList;
                          } else {
                              this.alertCustom('Movimiento entre Almacenes', 'Solo hay un almacen en la empresa, debe agregar otro area para reliazar este movimiento')
                          }
                        break;
                    case MOVEMENT.ALMACEN_AREA:
                        this.fromList = await this.fetchWarehouse(this.query);
                        this.toList = await this.fetchAreas(this.query);
                        this.toList = this.toList.results.filter(item => item.deleted === false)
                        break;
                }
            },
            fromMov: async function () {
              this.objectMov = [];
              let mov = null;
                switch (this.objectSelectMov) {
                    case 1:
                        mov = await this.fetchProduct(this.query);
                      console.log(mov.results);
                      this.objectMov = mov.results.filter(f=>f !==null && f.deleted === false)
                      break;
                    case 2:
                        mov = await this.fetchSupplies(this.query);
                        this.objectMov = mov.results.filter(f=>f !==null && f.deleted === false)
                        break;
                    case 3:
                      this.fetchAfT(this.query)
                        .then(value => {
                          let mov = value.results.filter(f=>f !==null && f.deleted === false && f.disponible)
                          mov.forEach(value1 => {
                            this.objectMov.push(value1)
                            this.objectMov.push(value1)
                          })
                          // value.dessertsAFI.forEach(value2 => {
                          //   this.objectMov.push(value2)
                          // })
                          // value.dessertsAFB.forEach(value3 => {
                          //   this.objectMov.push(value3)
                          // })
                        })
                        break;
                }
              if (this.optionSelectMov === 1 || this.optionSelectMov === 2) {
                    this.objectMov = this.objectMov.filter(f => f.fk_area_id === this.fromMov.id)
                }
                if (this.optionSelectMov === 3 || this.optionSelectMov === 4) {
                    this.objectMov = this.objectMov.filter(f => f.fk_almacen_id === this.fromMov.id)
                }
            }
        },
        created() {

        }
    }
</script>
<style lang="scss">
    .quantity-mov {
        width: 200px !important;
    }
</style>