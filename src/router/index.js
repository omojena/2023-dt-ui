import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

const nomenclator = require('./nomenclator')
const home = require('./home')
const security = require('./security')
const services = require('./services')
const enterprise = require('./enterprise')
const accounting = require('./accounting')
const administration = require('./administration')
const rrhh = require('./rrhh')
const warehouse = require('./warehouse')
import {clearStorage, exitsKey, notificationError} from "@/utils";


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home.HomeComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'HOME',
        title: 'Home'
      }
    },
    ///////////SECURITY/////////////////
    {
      path: '/',
      name: 'login',
      component: security.LoginComponent,
      meta: {
        requiresAuth: false,
        is_admin: false,
        title: 'Login'
      }
    },
    ////////NOMENCLATOR//////////////////
    {
      path: '/nomenclators/',
      name: 'nomenclator',
      component: nomenclator.MainNomenclatorComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        title: 'Nomencladores'
      },
    },

    ///////////ADMINISTRATION////////////

    {
      path: '/organizationchart',
      name: 'organizationChart',
      component: administration.OrganizationChartComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'EMPRESA | LISTAR',
        title: 'Organigrama'
      },
    },
    {
      path: '/organizationchart/form',
      name: 'formOrganizationChart',
      component: administration.FormOrganizationChartComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'EMPRESA | MODIFICAR',
        title: 'Organigrama'
      },
    },

    {
      path: '/type/incidents/list/',
      name: 'listTypeIncidents',
      component: administration.TypeIncidentsListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMINISTRACION | LISTAR',
        title: 'Tipo de Incidencia'
      },
    },
    {
      path: '/type/incidents/form/',
      name: 'formTypeIncidents',
      component: administration.TypeIncidentsFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMINISTRACION | MODIFICAR',
        title: 'Tipo Incidencia'
      },
    },
    {
      path: '/type/incidents/form/:id',
      name: 'formEditTypeIncidents',
      component: administration.TypeIncidentsFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMINISTRACION | MODIFICAR',
        title: 'Tipo de Incidencia'
      },
    },
    {
      path: '/incidents/list/',
      name: 'listIncidents',
      component: administration.IncidentsListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMINISTRACION | LISTAR',
        title: 'Incidecias'
      },
    },
    {
      path: '/incidents/form/',
      name: 'formIncidents',
      component: administration.IncidentsFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMINISTRACION | MODIFICAR',
        title: 'Incidencias'
      },
    },
    {
      path: '/incidents/form/:id',
      name: 'formEditIncidents',
      component: administration.IncidentsFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMINISTRACION | MODIFICAR',
        title: 'Incidencias'
      },
    },
    {
      path: '/type/tasks/list/',
      name: 'listTypeTask',
      component: administration.TypeTaskListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMINISTRACION | LISTAR',
        title: 'Tareas'
      },
    },
    {
      path: '/type/tasks/form/',
      name: 'formTypeTask',
      component: administration.TypeTaskFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMINISTRACION | MODIFICAR',
        title: 'Tipos de Tareas'
      },
    },
    {
      path: '/type/tasks/form/:id',
      name: 'formEditTypeTask',
      component: administration.TypeTaskFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMINISTRACION | MODIFICAR',
        title: 'Tipos de Tareas'
      },
    },
    {
      path: '/task/board/',
      name: 'taskBoard',
      component: administration.TaskBoardComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMINISTRACION | MODIFICAR',
        title: 'Tareas'
      },

    },

    {
      path: '/task/calendar/',
      name: 'taskCalendar',
      component: administration.TaskCalendarComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMINISTRACION | LISTAR',
        title: 'Tareas'
      },
    },

    {
      path: '/task/',
      name: 'listTasks',
      component: administration.ListTaskComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMINISTRACION | LISTAR',
        title: 'Tareas'
      },

    },
    {
      path: '/task/form/',
      name: 'formTasks',
      component: administration.FormTaskComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMINISTRACION | MODIFICAR',
        title: 'Tareas'
      },

    },
    {
      path: '/task/form/:id',
      name: 'formEditTasks',
      component: administration.FormTaskComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMINISTRACION | MODIFICAR',
        title: 'Tareas'
      },

    },

    ////////////RRHH////////////////

    {
      path: '/type/person-classification/list/',
      name: 'listClassificationPerson',
      component: rrhh.ClassificationPersonListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | LISTAR',
        title: 'Clasificaci&oacuten de Personas'
      },
    },
    {
      path: '/type/person-classification/form/',
      name: 'formClassificationPerson',
      component: rrhh.ClassificationPersonFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Clasificaci&oacuten de Personas'
      },
    },
    {
      path: '/type/person-classification/form/:',
      name: 'formEditClassificationPerson',
      component: rrhh.ClassificationPersonFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Clasificaci&oacuten de Personas'
      },
    },

    {
      path: '/type/license/list/',
      name: 'listTypeLicense',
      component: rrhh.TypeLicenseListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | LISTAR',
        title: 'Tipo de Licencia'
      },
    },
    {
      path: '/type/license/form/',
      name: 'formTypeLicense',
      component: rrhh.TypeLicenseFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Tipo de Licencia'
      },
    },
    {
      path: '/type/license/form/:id',
      name: 'formEditTypeLicense',
      component: rrhh.TypeLicenseFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Tipo de Licencia'
      },
    },
    {
      path: '/type/attr/person/',
      name: 'attrPerson',
      component: rrhh.AttributesPersonComponent,
      meta: {
        requiresAuth: true,
        permission: 'RRHH | LISTAR',
        is_admin: false,
        title: 'Atributos de Personas'
      },
    },
    {
      path: '/type/person/list/',
      name: 'listTypePerson',
      component: rrhh.TypePersonListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | LISTAR',
        title: 'Tipos de Personas'
      },
    },
    {
      path: '/type/person/form/',
      name: 'formTypePerson',
      component: rrhh.TypePersonFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Tipos de Personas'
      },
    },
    {
      path: '/type/person/form/:',
      name: 'formEditTypePerson',
      component: rrhh.TypePersonFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Tipos de Personas'
      },
    },
    {
      path: '/person/list/',
      name: 'listPerson',
      component: rrhh.PersonListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | LISTAR',
        title: 'Personas'
      },
    },
    {
      path: '/person/form/',
      name: 'formPerson',
      component: rrhh.PersonFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Personas'
      },
    },
    {
      path: '/person/form/:id',
      name: 'formEditPerson',
      component: rrhh.PersonFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Personas'
      },
    },
    {
      path: '/type/contract/list/',
      name: 'listTypeContract',
      component: rrhh.TypeContractListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | LISTAR',
        title: 'Tipo de Contrato'
      },
    },
    {
      path: '/type/contract/form/',
      name: 'formTypeContract',
      component: rrhh.TypeContractFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Tipo de Contrato'
      },
    },
    {
      path: '/type/contract/form/:id',
      name: 'formEditTypeContract',
      component: rrhh.TypeContractFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Tipo de Contrato'
      },
    },
    {
      path: '/position/list/',
      name: 'listPosition',
      component: rrhh.PositionListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | LISTAR',
        title: 'Cargos'
      },
    },
    {
      path: '/position/form/',
      name: 'formPosition',
      component: rrhh.PositionFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Cargos'
      },
    },
    {
      path: '/position/form/:id',
      name: 'formEditPosition',
      component: rrhh.PositionFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Cargos'
      },
    },
    {
      path: '/type/position/list/',
      name: 'listTypePosition',
      component: rrhh.TypePositionListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | LISTAR',
        title: 'Tipos de Cargos'
      },
    },
    {
      path: '/type/position/form/',
      name: 'formTypePosition',
      component: rrhh.TypePositionFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Tipos de Cargos'
      },
    },
    {
      path: '/type/position/form/:id',
      name: 'formEditTypePosition',
      component: rrhh.TypePositionFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Tipos de Cargos'
      },
    },
    {
      path: '/type/workplace/list/',
      name: 'listTypeWorkplace',
      component: rrhh.TypeWorkplaceListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | LISTAR',
        title: 'Tipos de Plazas'
      },
    },
    {
      path: '/type/workplace/form/',
      name: 'formTypeWorkplace',
      component: rrhh.TypeWorkplaceFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Tipos de Plazas'
      },
    },
    {
      path: '/type/workplace/form/:',
      name: 'formEditTypeWorkplace',
      component: rrhh.TypeWorkplaceFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'RRHH | MODIFICAR',
        title: 'Tipos de Plazas'
      },
    },

    ////////// ACCOUNTING///////////

    {
      path: '/account/list/',
      name: 'listAccounts',
      component: accounting.AccountListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'CONTABILIDAD | LISTAR',
        title: 'Cuentas'
      },
    },
    {
      path: '/account/form/',
      name: 'formAccount',
      component: accounting.AccountFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'CONTABILIDAD | MODIFICAR',
        title: 'Cuentas'
      },
    },
    {
      path: '/account/form/:id',
      name: 'formEditAccount',
      component: accounting.AccountFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'CONTABILIDAD | MODIFICAR',
        title: 'Cuentas'
      },
    },
    {
      path: '/type/pay/list/',
      name: 'listTypePay',
      component: accounting.TypePayListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'CONTABILIDAD | LISTAR',
        title: 'Tipos de Pago'
      },
    },
    {
      path: '/type/pay/form/',
      name: 'formTypePay',
      component: accounting.TypePayFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'CONTABILIDAD | MODIFICAR',
        title: 'Tipos de Pago'
      },
    },
    {
      path: '/type/pay/form/:id',
      name: 'formEditTypePay',
      component: accounting.TypePayFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'CONTABILIDAD | MODIFICAR',
        title: 'Tipos de Pago'
      },
    },
    {
      path: '/type/cash/list/',
      name: 'listTypeCash',
      component: accounting.TypeCashListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'CONTABILIDAD | LISTAR',
        title: 'Tipo de Moneda'
      },
    },
    {
      path: '/type/cash/form/',
      name: 'formTypeCash',
      component: accounting.TypeCashFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'CONTABILIDAD | MODIFICAR',
        title: 'Tipo de Moneda'
      },
    },
    {
      path: '/type/cash/form/:id',
      name: 'formEditTypeCash',
      component: accounting.TypeCashFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'CONTABILIDAD | MODIFICAR',
        title: 'Tipo de Moneda'
      },
    },
    {
      path: '/type/income/list/',
      name: 'listTypeIncome',
      component: accounting.TypeIncomeListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'CONTABILIDAD | LISTAR',
        title: 'Tipo de Ingreso'
      },
    },
    {
      path: '/type/income/form/',
      name: 'formTypeIncome',
      component: accounting.TypeIncomeFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'CONTABILIDAD | MODIFICAR',
        title: 'Tipo de Ingreso'
      },
    },
    {
      path: '/type/income/form/:id',
      name: 'formEditTypeIncome',
      component: accounting.TypeIncomeFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'CONTABILIDAD | MODIFICAR',
        title: 'Tipo de Ingreso'
      },
    },
    {
      path: '/type/expenses/list/',
      name: 'listTypeExpenses',
      component: accounting.TypeExpensesListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'CONTABILIDAD | LISTAR',
        title: 'Tipo de Gasto'
      },
    },
    {
      path: '/type/expenses/form/',
      name: 'formTypeExpenses',
      component: accounting.TypeExpensesFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'CONTABILIDAD | MODIFICAR',
        title: 'Tipo de Gasto'
      },
    },
    {
      path: '/type/expenses/form/:id',
      name: 'formEditTypeExpenses',
      component: accounting.TypeExpensesFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'CONTABILIDAD | MODIFICAR',
        title: 'Tipo de Gasto'
      },
    },

    /////// ENTERPRISE ////////
    {
      path: '/area/list/',
      name: 'listArea',
      component: enterprise.AreaListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'EMPRESA | LISTAR',
        title: 'Areas'
      },
    },
    {
      path: '/area/form/',
      name: 'formArea',
      component: enterprise.AreaFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'EMPRESA | MODIFICAR',
        title: 'Areas'
      },
    },
    {
      path: '/area/form/:id',
      name: 'formEditArea',
      component: enterprise.AreaFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'EMPRESA | MODIFICAR',
        title: 'Areas'
      },
    },
    {
      path: '/type/enterprise-classification/list/',
      name: 'listClassificationEnterprise',
      component: enterprise.ClassificationEnterpriseListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'EMPRESA | LISTAR',
        title: 'Empresa'
      },
    },
    {
      path: '/type/enterprise-classification/form/',
      name: 'formClassificationEnterprise',
      component: enterprise.ClassificationEnterpriseFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'EMPRESA | MODIFICAR',
        title: 'Empresa'
      },
    },
    {
      path: '/type/enterprise-classification/form/:id',
      name: 'formEditClassificationEnterprise',
      component: enterprise.ClassificationEnterpriseFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'EMPRESA | MODIFICAR',
        title: 'Empresa'
      },
    },
    {
      path: '/type/enterprise/list/',
      name: 'listTypeEnterprise',
      component: enterprise.TypeEnterpriseListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'EMPRESA | LISTAR',
        title: 'Empresa'
      },
    },
    {
      path: '/type/enterprise/form/',
      name: 'formTypeEnterprise',
      component: enterprise.TypeEnterpriseFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'EMPRESA | MODIFICAR',
        title: 'Empresa'
      },
    },
    {
      path: '/type/enterprise/form/:id',
      name: 'formEditTypeEnterprise',
      component: enterprise.TypeEnterpriseFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'EMPRESA | MODIFICAR',
        title: 'Empresa'
      },
    },

    //////// SERVICES//////////
    {
      path: '/type/offer/list/',
      name: 'listTypeOffer',
      component: services.TypeOfferListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | LISTAR',
        title: 'Ofertas'
      },
    },
    {
      path: '/type/service/list/',
      name: 'listTypeService',
      component: services.TypeServiceListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | LISTAR',
        title: 'Servicios'
      },
    },
    {
      path: '/type/service/form/',
      name: 'formTypeService',
      component: services.TypeServiceFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | MODIFICAR',
        title: 'Servicios'
      },
    },
    {
      path: '/messenger_provider/list/',
      name: 'listMessengerProvider',
      component: services.MessengerProviderListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'MENSAJERIA | LISTAR',
        title: 'Mensajeria'

      },
    },
    {
      path: '/distribution_zone/list/',
      name: 'listDistributionZone',
      component: services.DistributionZoneListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'MENSAJERIA | LISTAR',
        title: 'Mensajeria'
      },
    },
    {
      path: '/distribution_zone/form/',
      name: 'formDistributionZone',
      component: services.DistributionZoneFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'MENSAJERIA | MODIFICAR',
        title: 'Mensajeria'
      },
    },
    {
      path: '/distribution_zone/form/:id',
      name: 'formEditDistributionZone',
      component: services.DistributionZoneFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'MENSAJERIA | LISTAR',
        title: 'Mensajeria'
      },
    },
    {
      path: '/messenger_provider/form/',
      name: 'formMessengerProvider',
      component: services.MessengerProviderFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'MENSAJERIA | LISTAR',
        title: 'Mensajeria'
      },
    },
    {
      path: '/messenger_provider/form/:id',
      name: 'formEditMessengerProvider',
      component: services.MessengerProviderFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'MENSAJERIA | LISTAR',
        title: 'Mensajeria'
      },
    },
    {
      path: '/type/service-structure/list/',
      name: 'listServiceStructure',
      component: services.ServiceStructureListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | LISTAR',
        title: 'Servicios'
      },
    },
    {
      path: '/type/service-structure/form/',
      name: 'formServiceStructure',
      component: services.ServiceStructureFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | MODIFICAR',
        title: 'Servicios'
      },
    },
    {
      path: '/offers/list/',
      name: 'listOffers',
      component: services.ListOffersSimpleComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | LISTAR',
        title: 'Ofertas'
      },
    },
    {
      path: '/offers/simple/form/',
      name: 'formOffersSimple',
      component: services.FormOffersSimpleComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | MODIFICAR',
        title: 'Ofertas'
      },
    },
    {
      path: '/offers/simple/form/:id',
      name: 'formEditOffersSimple',
      component: services.FormOffersSimpleComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | MODIFICAR',
        title: 'Ofertas'
      },
    },
    {
      path: '/offers/grouped/form/',
      name: 'formOffersGrouped',
      component: services.FormOffersGroupedComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | MODIFICAR',
        title: 'Ofertas'
      },
    },
    {
      path: '/offers/grouped/form/:id',
      name: 'formEditOffersGrouped',
      component: services.FormOffersGroupedComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | MODIFICAR',
        title: 'Ofertas'
      },
    },
    {
      path: '/service/all/',
      name: 'allServices',
      component: services.AllServiceComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | LISTAR',
        title: 'Servicios'
      },
    },
    {
      path: '/service/taller/form/',
      name: 'formServiceTaller',
      component: services.FormServiceTallerComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | MODIFICAR',
        title: 'Taller'
      },
    },
    {
      path: '/service/taller/form/:id',
      name: 'formEditServiceTaller',
      component: services.FormServiceTallerComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | MODIFICAR',
        title: 'Taller'
      },
    },
    {
      path: '/service/rent',
      name: 'serviceRent',
      component: services.ServiceRentListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | LISTAR',
        title: 'Servicios de Renta'
      },
    },
    {
      path: '/service/rent/form/',
      name: 'formServiceRent',
      component: services.FormServiceRentComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | MODIFICAR',
        title: 'Renta'
      },
    },
    {
      path: '/service/messenger_service',
      name: 'serviceMessenger',
      component: services.MessengerServiceListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'MENSAJERIA | LISTAR',
        title: 'Seervicios de Mensajeria'
      },
    },
    {
      path: '/service/messenger_service/form/',
      name: 'formServiceMessenger',
      component: services.FormMessengerServiceComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'MENSAJERIA | MODIFICAR',
        title: 'Mensajeria'
      },
    },
    {
      path: '/service/messenger_service/form/:id',
      name: 'editFormServiceMessenger',
      component: services.FormMessengerServiceComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'MENSAJERIA | MODIFICAR',
        title: 'Mensajeria'
      },
    },
    {
      path: '/service/rent/form/:id',
      name: 'formEditServiceRent',
      component: services.FormServiceRentComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | MODIFICAR',
        title: 'Renta'
      },
    },
    {
      path: '/type/refund/list/',
      name: 'listTypeRefund',
      component: services.TypeRefundListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | LISTAR',
        title: 'Devoluciones'
      },
    },
    {
      path: '/type/refund/form/',
      name: 'formTypeRefund',
      component: services.TypeRefundFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | MODIFICAR',
        title: 'Devoluciones'
      },
    },
    {
      path: '/service/board/',
      name: 'boardServiceAll',
      component: services.ServiceBoardGeneralComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'SERVICIO | MODIFICAR',
        title: 'Servicios'
      },
    },

    /////////////WAREHOUSE///////////////

    {
      path: '/type/product/list/',
      name: 'listTypeProduct',
      component: warehouse.TypeProductListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | LISTAR',
        title: 'Tipos de Productos'
      },
    },
    {
      path: '/type/product/form/',
      name: 'formTypeProduct',
      component: warehouse.TypeProductFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | MODIFICAR',
        title: 'Tipos de Productos'
      },
    },
    {
      path: '/type/product/form/:id',
      name: 'formEditTypeProduct',
      component: warehouse.TypeProductFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | MODIFICAR',
        title: 'Tipos de Productos'
      },
    },
    {
      path: '/type/supplies/list/',
      name: 'listTypSupplies',
      component: warehouse.TypeSuppliesListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | LISTAR',
        title: 'Tipos de Insumos'
      },
    },
    {
      path: '/type/supplies/form/',
      name: 'formTypeSupplies',
      component: warehouse.TypeSuppliesFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | MODIFICAR',
        title: 'Tipos de Insumos'
      },
    },
    {
      path: '/type/supplies/form/:id',
      name: 'formEditTypeSupplies',
      component: warehouse.TypeSuppliesFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | MODIFICAR',
        title: 'Tipos de Insumos'
      },
    },
    {
      path: '/warehouse/aft/list/',
      name: 'listAft',
      component: warehouse.ListAftComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | LISTAR',
        title: 'Activis Fijos'
      },
    },
    {
      path: '/warehouse/aft/form/',
      name: 'formAft',
      component: warehouse.FormAftComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | MODIFICAR',
        title: 'Activis Fijos'
      },
    },
    {
      path: '/warehouse/aft/form/:id',
      name: 'formEditAft',
      component: warehouse.FormAftComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | MODIFICAR',
        title: 'Activis Fijos'
      },
    },
    {
      path: '/warehouse/list/',
      name: 'listWarehouse',
      component: warehouse.ListWarehouseComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | LISTAR',
        title: 'Almacenes'
      },
    },
    {
      path: '/warehouse/form/',
      name: 'formWarehouse',
      component: warehouse.FormWarehouseComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | MODIFICAR',
        title: 'Almacen'
      },
    },
    {
      path: '/warehouse/form/:id',
      name: 'formEditWarehouse',
      component: warehouse.FormWarehouseComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | MODIFICAR',
        title: 'Almacen'
      },
    },
    {
      path: '/warehouse/supplies/list/',
      name: 'listSupplies',
      component: warehouse.ListSuppliesComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | LISTAR',
        title: 'Insumos'
      },
    },
    {
      path: '/warehouse/supplies/form/',
      name: 'formSupplies',
      component: warehouse.FormSuppliesComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | MODIFICAR',
        title: 'Insumos'
      },
    },
    {
      path: '/warehouse/supplies/form/:id',
      name: 'formEditSupplies',
      component: warehouse.FormSuppliesComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | MODIFICAR',
        title: 'Insumos'
      },
    },
    {
      path: '/warehouse/product/list/',
      name: 'listProducts',
      component: warehouse.ListProductsComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | LISTAR',
        title: 'Productos'
      },
    },
    {
      path: '/warehouse/product/form/',
      name: 'formProducts',
      component: warehouse.FormProductsComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | MODIFICAR',
        title: 'Productos'
      },
    },
    {
      path: '/warehouse/product/form/:id',
      name: 'formEditProducts',
      component: warehouse.FormProductsComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | MODIFICAR',
        title: 'Productos'
      },
    },
    {
      path: '/warehouse/movement/list/',
      name: 'listMovement',
      component: warehouse.ListMovementComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | LISTAR',
        title: 'Movimientos'
      },
    },
    {
      path: '/warehouse/movement/form/',
      name: 'formMovement',
      component: warehouse.FormMovementComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | MODIFICAR',
        title: 'Movimientos'
      },
    },
    // USUARIOS
    {
      path: '/user/list/',
      name: 'ListUsers',
      component: security.UserListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMIN | LISTAR TODO',
        title: 'Usuarios'
      },
    },
    {
      path: '/user/form/',
      name: 'FormUsers',
      component: security.UserFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMIN | MODIFICAR TODO',
        title: 'Usuarios'
      },
    },
    {
      path: '/user/form/:id',
      name: 'FormEditUsers',
      component: security.UserFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ALMACEN | MODIFICAR',
        title: 'Usuarios'
      },
    },
     /////////////FLOTA///////////////

    {
      path: '/flota/list/',
      name: 'listFlota',
      component: services.FlotasListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'FLOTA | LISTAR',
        title: 'Listado de Flotas'
      },
    },
    {
      path: '/flota/form/',
      name: 'moveFlota',
      component: services.FlotasFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'FLOTA | MODIFICAR',
        title: 'Movimientos de Flotas'
      },
    },
    {
      path: '/flotas/form/:id',
      name: 'moveEditFlota',
      component: services.FlotasFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'FLOTA | MODIFICAR',
        title: 'Editar Movimientos de Flotas'
      },
    },
    // ROLES
    {
      path: '/roles/list/',
      name: 'ListRoles',
      component: security.RolesListComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMIN | LISTAR TODO',
        title: 'Roles'
      },
    },
    {
      path: '/roles/form/',
      name: 'FormRoles',
      component: security.RolesFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMIN | MODIFICAR TODO',
        title: 'Roles'
      },
    },
    {
      path: '/roles/form/:id',
      name: 'FormEditRoles',
      component: security.RolesFormComponent,
      meta: {
        requiresAuth: true,
        is_admin: false,
        permission: 'ADMIN | MODIFICAR TODO',
        title: 'Roles'
      },
    },

  ]
});
const defaultDocumentTitle = 'DoubleT'

router.afterEach((to, from) => {
  let token = exitsKey('token')
  if (!token) {
    store.commit('SET_IS_LOGIN', true)
    store.dispatch('GO_TO', 'login').then(() => {
      clearStorage()
    })
  } else {
    const {permissions} = store.getters.GET_PERMISSIONS;
    const user = store.getters.GET_USER;
    let hasPerm = permissions.find(f => f === to.meta.permission)
    if (hasPerm || user.is_superuser || to.name === 'login' || to.name === 'home') {
      store.commit('SET_IS_LOGIN', false)
      if (user) store.dispatch('GET_USER')
      if (from.name === 'login' && to.name === 'home') {
        window.location.reload()
      }
      if (to.meta.title) {
        document.title = `${defaultDocumentTitle} - ${to.meta.title}`
      } else {
        document.title = defaultDocumentTitle
      }
    } else {
      let redirect = from.name ? from.name : 'login'
       notificationError('No tiene Permiso para Acceder a esta Pagina')
       store.dispatch('GO_TO', redirect)
    }

  }

})
export default router;
