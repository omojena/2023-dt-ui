<template>
  <div id="app">
    <nav-component :enterprise-name="enterprise.enterprise_name" class="d-none"
                   :class="{'d-block':navActive, 'd-none':isLoginPage}"/>
    <div class="is-flex">
      <div class="bg-menu" :class="{'d-none':isLoginPage}">
        <section>
          <div class="sidebar-page d-none" :class="{'d-block':navActive}">
            <section class="sidebar-layout">
              <b-sidebar class="custom-sidebar"
                         position="static"
                         :mobile="mobile"
                         :expand-on-hover="expandOnHover"
                         :reduce="reduce"
                         type="is-light"
                         open
              >
                <div class="top-bar">
                  <div class="block is-flex-direction-column is-align-items-center">
                    <img class="avatar-menu"
                         :src="avatar"
                         alt="Avatar"
                    />
                    <div xmd-font regular main-color class="mt-3">{{ user.first_name }} {{ user.last_name }}</div>
                    <div v-if="user.is_superuser" xs-font ligth primary-ligth-color>Administrador</div>
                    <div v-else xs-font ligth primary-ligth-color>Trabajador</div>
                  </div>


                  <b-menu class="custom-menu">
                    <b-menu-list>
                      <b-menu-item icon-pack="doublet" regular
                                   icon="icon-dt-doublet-75"
                                   @click="goTo('home')"
                                   label="Inicio"></b-menu-item>
                      <b-menu-item v-if="hasModule('EMPRESA')" regular icon=" icon-dt-doublet-147">
                        <template slot="label" slot-scope="props">
                          Empresa
                          <span class="is-pulled-right"
                                :class="props.expanded ? ' icon-dt-doublet-140' : ' icon-dt-doublet-142'"></span>
                        </template>
                        <div class="sub-menu">
                          <b-menu-item v-if="hasPerm('EMPRESA | LISTAR')" disabled regular icon=" icon-dt-doublet-147"
                                       label="Perfil"></b-menu-item>
                          <b-menu-item v-if="hasPerm('EMPRESA | LISTAR')" regular icon=" icon-dt-doublet-147"
                                       @click="goTo('organizationChart')"
                                       label="Organigrama"></b-menu-item>
                          <b-menu-item v-if="hasPerm('EMPRESA | LISTAR')" disabled regular icon=" icon-dt-doublet-147"
                                       label="Plantilla"></b-menu-item>
                          <b-menu-item v-if="hasPerm('EMPRESA | LISTAR')" regular icon=" icon-dt-doublet-147"
                                       @click="goTo('listArea')"
                                       label="Areas"></b-menu-item>
                        </div>
                      </b-menu-item>
                      <b-menu-item v-if="hasModule('RRHH')" regular icon=" icon-dt-doublet-28">
                        <template slot="label" slot-scope="props">
                          RRHH
                          <span class="is-pulled-right"
                                :class="props.expanded ? ' icon-dt-doublet-140' : ' icon-dt-doublet-142'"></span>
                        </template>
                        <div class="sub-menu">
                          <b-menu-item v-if="hasPerm('RRHH | LISTAR')" regular icon=" icon-dt-doublet-28"
                                       @click="goTo('listPerson')"
                                       label="Listado Personas"></b-menu-item>
                          <b-menu-item v-if="hasPerm('RRHH | LISTAR')" regular icon=" icon-dt-doublet-28"
                                       @click="goTo('listPosition')"
                                       label="Cargos"></b-menu-item>
                          <b-menu-item v-if="hasPerm('RRHH | LISTAR')" regular icon=" icon-dt-doublet-28"
                                       @click="goTo('listTypePosition')"
                                       label="Tipos de Cargo"></b-menu-item>
                          <b-menu-item v-if="hasPerm('RRHH | LISTAR')" regular icon=" icon-dt-doublet-28"
                                       @click="goTo('listTypeContract')"
                                       label="Tipos de Contrato"></b-menu-item>
                          <b-menu-item v-if="hasPerm('RRHH | LISTAR')" regular icon=" icon-dt-doublet-28"
                                       @click="goTo('listTypeWorkplace')"
                                       label="Tipos de Plaza"></b-menu-item>
                          <b-menu-item v-if="hasPerm('RRHH | LISTAR')" regular icon=" icon-dt-doublet-28"
                                       @click="goTo('listTypePerson')"
                                       label="Tipos de Personas"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('RRHH | LISTAR')" regular icon=" icon-dt-doublet-28"
                                       @click="goTo('listClassificationPerson')"
                                       label="Clasificación de Personas"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('RRHH | LISTAR')" class="d-none" regular icon=" icon-dt-doublet-28"
                                       @click="goTo('attrPerson')"
                                       label="Atributos de Personas"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('RRHH | LISTAR')" regular icon=" icon-dt-doublet-28"
                                       @click="goTo('listTypeLicense')"
                                       label="Tipos de Licencia"></b-menu-item>
                        </div>
                      </b-menu-item>
                      <b-menu-item v-if="hasModule('ADMINISTRACION')" regular icon=" icon-dt-doublet-157">
                        <template slot="label" slot-scope="props">
                          Administraci&oacute;n
                          <span class="is-pulled-right"
                                :class="props.expanded ? ' icon-dt-doublet-140' : ' icon-dt-doublet-142'"></span>
                        </template>
                        <div class="sub-menu">
                          <b-menu-item  v-if="hasPerm('ADMINISTRACION | LISTAR')" regular icon=" icon-dt-doublet-157"
                                       @click="goTo('listTasks')"
                                       label="Tareas"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('ADMINISTRACION | LISTAR')" regular icon=" icon-dt-doublet-157"
                                       @click="goTo('taskCalendar')"
                                       label="Calendario"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('ADMINISTRACION | LISTAR')" regular icon=" icon-dt-doublet-157"
                                       @click="goTo('taskBoard')"
                                       label="Tablero de Tareas"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('ADMINISTRACION | LISTAR')" regular icon=" icon-dt-doublet-157"
                                       @click="goTo('listIncidents')"
                                       label="Incidencias"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('ADMINISTRACION | LISTAR')" regular icon=" icon-dt-doublet-157"
                                       @click="goTo('listTypeIncidents')"
                                       label="Tipos de Incidencias"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('ADMINISTRACION | LISTAR')" regular icon=" icon-dt-doublet-157"
                                       @click="goTo('listTypeTask')"
                                       label="Tipos de Tarea"></b-menu-item>
                        </div>

                      </b-menu-item>

                      <b-menu-item v-if="hasModule('FLOTA')" regular icon=" icon-dt-doublet-27">
                        <template slot="label" slot-scope="props">
                          Flota
                          <span class="is-pulled-right"
                                :class="props.expanded ? ' icon-dt-doublet-140' : ' icon-dt-doublet-142'"></span>
                        </template>
                        <div class="sub-menu">
                          <b-menu-item  v-if="hasPerm('FLOTA | LISTAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('listFlota')"
                                       label="Bicicletas"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('FLOTA | MODIFICAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('moveFlota')"
                                       label="Movimientos"></b-menu-item>
                        </div>

                      </b-menu-item>
                      <b-menu-item v-if="hasModule('SERVICIO')" regular icon=" icon-dt-doublet-27">
                        <template slot="label" slot-scope="props">
                          Servicios
                          <span class="is-pulled-right"
                                :class="props.expanded ? ' icon-dt-doublet-140' : ' icon-dt-doublet-142'"></span>
                        </template>
                        <div class="sub-menu">
                          <b-menu-item  v-if="hasPerm('SERVICIO | LISTAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('allServices')"
                                       label="Historial"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('SERVICIO | LISTAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('listOffers')"
                                       label="Ofertas"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('SERVICIO | MODIFICAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('formServiceRent')"
                                       label="Renta"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('SERVICIO | MODIFICAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('formServiceTaller')"
                                       label="Taller"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('SERVICIO | LISTAR')" class="d-none" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('listTypeService')"
                                       label="Tipos de Servicios"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('SERVICIO | LISTAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('listTypeRefund')"
                                       label="Tipos de Devolución"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('SERVICIO | LISTAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('listTypeOffer')"
                                       label="Tipos de Oferta"></b-menu-item>
                        </div>

                      </b-menu-item>
                      <b-menu-item v-if="hasModule('MENSAJERIA')" regular icon=" icon-dt-doublet-27">
                        <template slot="label" slot-scope="props">
                          Mensajeria
                          <span class="is-pulled-right"
                                :class="props.expanded ? ' icon-dt-doublet-140' : ' icon-dt-doublet-142'"></span>
                        </template>
                        <div class="sub-menu">
                          <b-menu-item  v-if="hasPerm('MENSAJERIA | LISTAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('serviceMessenger')"
                                       label="Mensajerias"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('MENSAJERIA | LISTAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('listMessengerProvider')"
                                       label="Proveedores de Mensajeria"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('MENSAJERIA | LISTAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('listDistributionZone')"
                                       label="Zona de distribucion"></b-menu-item>
                        </div>

                      </b-menu-item>

                      <b-menu-item v-if="hasModule('CONTABILIDAD')" regular icon=" icon-dt-doublet-27">
                        <template slot="label" slot-scope="props">
                          Contabilidad
                          <span class="is-pulled-right"
                                :class="props.expanded ? ' icon-dt-doublet-140' : ' icon-dt-doublet-142'"></span>
                        </template>
                        <div class="sub-menu">
                          <b-menu-item  v-if="hasPerm('CONTABILIDAD | LISTAR')" disabled regular icon=" icon-dt-doublet-27"
                                       label="Nóminas"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('CONTABILIDAD | LISTAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('listAccounts')"
                                       label="Cuentas"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('CONTABILIDAD | LISTAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('listTypePay')"
                                       label="Tipos de Pago"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('CONTABILIDAD | LISTAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('listTypeExpenses')"
                                       label="Tipos de Gasto"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('CONTABILIDAD | LISTAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('listTypeIncome')"
                                       label="Tipos de Ingresos"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('CONTABILIDAD | LISTAR')" regular icon=" icon-dt-doublet-27"
                                       @click="goTo('listTypeCash')"
                                       label="Tipos de Moneda"></b-menu-item>
                        </div>

                      </b-menu-item>
                      <b-menu-item v-if="hasModule('ALMACEN')" regular icon=" icon-dt-doublet-108">
                        <template slot="label" slot-scope="props">
                          Almac&eacute;n
                          <span class="is-pulled-right"
                                :class="props.expanded ? ' icon-dt-doublet-140' : ' icon-dt-doublet-142'"></span>
                        </template>
                        <div class="sub-menu">
                          <b-menu-item  v-if="hasPerm('ALMACEN | LISTAR')" regular icon=" icon-dt-doublet-108"
                                       @click="goTo('listWarehouse')"
                                       label="Almacenes"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('ALMACEN | LISTAR')" regular icon=" icon-dt-doublet-108"
                                       @click="goTo('listAft')"
                                       label="Activos Fijos"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('ALMACEN | LISTAR')" regular icon=" icon-dt-doublet-108"
                                       @click="goTo('listSupplies')"
                                       label="Insumos">
                          </b-menu-item>
                          <b-menu-item  v-if="hasPerm('ALMACEN | LISTAR')" regular icon=" icon-dt-doublet-108"
                                       @click="goTo('listProducts')"
                                       label="Productos">
                          </b-menu-item>
                          <b-menu-item  v-if="hasPerm('ALMACEN | LISTAR')" regular icon=" icon-dt-doublet-108"
                                       @click="goTo('listMovement')"
                                       label="Movimientos">
                          </b-menu-item>
                          <b-menu-item  v-if="hasPerm('ALMACEN | LISTAR')" regular icon=" icon-dt-doublet-108"
                                       @click="goTo('listTypeProduct')"
                                       label="Tipos de Productos"></b-menu-item>
                          <b-menu-item  v-if="hasPerm('ALMACEN | LISTAR')" regular icon=" icon-dt-doublet-108"
                                       @click="goTo('listTypSupplies')"
                                       label="Tipos de Insumo"></b-menu-item>
                        </div>

                      </b-menu-item>
                      <b-menu-item v-if="hasModule('CONFIGURACION')" regular icon=" icon-dt-doublet-58">
                        <template slot="label" slot-scope="props">
                          Configuraci&oacute;n
                          <span class="is-pulled-right"
                                :class="props.expanded ? ' icon-dt-doublet-140' : ' icon-dt-doublet-142'"></span>
                        </template>
                        <div class="sub-menu">
                          <b-menu-item regular icon=" icon-dt-doublet-58">
                            <template slot="label" slot-scope="props">
                              Seguridad
                              <span class="is-pulled-right"
                                    :class="props.expanded ? ' icon-dt-doublet-140' : ' icon-dt-doublet-142'"></span>
                            </template>
                            <div class="sub-menu level-2">
                              <b-menu-item  v-if="hasPerm('CONFIGURACION | LISTAR')" regular icon=" icon-dt-doublet-58"
                                           @click="goTo('ListUsers')"
                                           label="Usuarios">
                              </b-menu-item>
                              <b-menu-item  v-if="hasPerm('CONFIGURACION | LISTAR')" regular icon=" icon-dt-doublet-58"
                                           @click="goTo('ListRoles')"
                                           label="Roles">
                              </b-menu-item>
                            </div>
                          </b-menu-item>

                          <b-menu-item  v-if="hasPerm('CONFIGURACION | LISTAR')" regular icon=" icon-dt-doublet-58"
                                       @click="goTo('listTypeEnterprise')"
                                       label="Tipos de Empresa">
                          </b-menu-item>
                          <b-menu-item  v-if="hasPerm('CONFIGURACION | LISTAR')" regular icon=" icon-dt-doublet-58"
                                       @click="goTo('listClassificationEnterprise')"
                                       label="Clasificación de Empresas">
                          </b-menu-item>
                        </div>

                      </b-menu-item>
                    </b-menu-list>

                  </b-menu>
                </div>
              </b-sidebar>
            </section>
          </div>
        </section>
      </div>
      <div class="router-view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import NavComponent from "./components/nav/NavComponent";
import avatar from '../src/assets/img/profile-picture.png'
import {mapGetters} from "vuex";
import {exitsKey, getStorage} from "@/utils";
const { includes } = require('lodash')
export default {
  name: 'App',
  components: {NavComponent},
  data() {
    return {
      permissions: exitsKey('permissions') ? getStorage('permissions'):[],
      modules: exitsKey('modules') ? getStorage('modules'):[],
      isActive: true,
      navMenu: false,
      expandOnHover: false,
      mobile: "reduce",
      reduce: false,
      avatar,
      enterpriseName: localStorage.getItem('enterprise_name')
    }
  },
  computed: {
    ...mapGetters({
      isLoginPage: 'GET_IS_LOGIN',
      user: 'GET_USER',
      enterprise: 'GET_ENTERPRISE_AUTH',
      menu: 'GET_MENU_MODULES'
    }),
    navActive() {
      return this.$route.name !== 'login' || false
    }
  },
  methods: {

    hasPerm(perm){
      return this.user.is_superuser ? true : includes(this.permissions, perm)
    },
    hasModule(module){
      return this.user.is_superuser ? true : includes(this.modules, module)
    },
    goTo(name) {
      this.$route.name !== name && this.$router.push({name: name})
    }
  },
  created() {
    this.enterpriseName = getStorage('enterprise_name', false)
    console.log(this.$route);
  }
}
</script>
<style src="../theme/multiselect.css"></style>

<style lang="scss">
@import "../theme/app";

.router-view {
  width: 100%;

}

//.icon {
//  margin-right: 15px;
//}

a {
  display: flex;

  i {
    font-size: 24px;
  }
}
ul {
  li {
    a {
      display: flex;
      align-items: center;
    }
  }
}
.sub-menu {

  a {
    padding-left: 25px;
  }

  .level-2 {
    a {
      padding-left: 50px;
    }
  }

}

b-menu-item {
  font-size: 15px;
  font-weight: 500 !important;
}

.custom-menu {
  width: 260px;
  background: #1F1C39;
  height: 100vh;
}

.menu-list li ul {
  margin: 0;
  padding: 0;
  background: #3827B3;
}

.avatar-menu {
  border-radius: 50%;
  width: 89px;
  height: 89px;
  display: flex;
  align-items: center;
}

.top-bar {
  padding-top: 40px;
  background-color: #1F1C39;

  .block {
    display: flex;
    justify-content: center;
  }
}

.p-1 {
  padding: 1em;
}

.sidebar-page {
  display: flex;
  flex-direction: column;
  /*width: 100%;*/
  min-height: 100%;
  width: 260px;
  /*background: #1F1C39;*/
  // min-height: 100vh;
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    // min-height: 100vh;
  }
}

//@media screen and (max-width: 1023px) {
//  .b-sidebar {
//    .sidebar-content {
//      &.is-mini-mobile {
//        &:not(.is-mini-expand),
//        &.is-mini-expand:not(:hover) {
//          .menu-list {
//            li {
//              a {
//                span:nth-child(2) {
//                  display: none;
//                }
//              }
//
//              ul {
//                padding-left: 0;
//
//                li {
//                  a {
//                    display: inline-block;
//                  }
//                }
//              }
//            }
//          }
//
//          .menu-label:not(:last-child) {
//            margin-bottom: 0;
//          }
//        }
//      }
//    }
//  }
//}
//
//@media screen and (min-width: 1024px) {
//  .b-sidebar {
//    .sidebar-content {
//      &.is-mini {
//        &:not(.is-mini-expand),
//        &.is-mini-expand:not(:hover) {
//          .menu-list {
//            li {
//              a {
//                span:nth-child(2) {
//                  display: none;
//                }
//              }
//
//              ul {
//                padding-left: 0;
//
//                li {
//                  a {
//                    display: inline-block;
//                  }
//                }
//              }
//            }
//          }
//
//          .menu-label:not(:last-child) {
//            margin-bottom: 0;
//          }
//        }
//      }
//    }
//  }
//}

.input {
  -webkit-appearance: none;
  align-items: center;
  border: 1px solid #C2C2C2;
  border-radius: 4px !important;
  box-shadow: none !important;
  display: inline-flex;
  font-size: 1rem;
  height: 36px;
  justify-content: flex-start;
  line-height: 1.5;
  padding: calc(0.5em - 1px) calc(0.75em - 1px);
  position: relative;
  vertical-align: top;
  background-color: #FFFFFF;
  color: #363636 !important;

  &.search-bar {
    width: 315px;
  }
}

select {
  height: 36px !important;
  box-shadow: none !important;
}

//.card {
//  height: 100vh;
//}


</style>

