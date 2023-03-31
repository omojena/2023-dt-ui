export const menuStore = {
  state: () => ({
    modules: [
      {
        id: 0,
        name: 'Inicio',
        subMenu: false,
        subModules: {
          count: 0,
          mod: []
        },
        pages: [{
          disabled: false,
          name: 'Inicio',
          link: 'home',
          icon: 'icon-dt-doublet-75',
          iconPack: 'doublet',
          permissions: []
        }],
      },
      {
        id: 1,
        name: 'Empresa',
        subMenu: true,
        
        subModules: {
          count: 0,
          mod: []
        },
        pages: [
          {
            disabled: false,
            name: 'Perfil',
            link: '',
            icon: ' icon-dt-doublet-147',
            iconPack: 'doublet',
            permissions: []
          },
          {
            disabled: false,
            name: 'Organigrama',
            link: 'organizationChart',
            icon: ' icon-dt-doublet-147',
            iconPack: 'doublet',
            permissions: []
          },
          {
            disabled: false,
            name: 'Plantilla',
            link: '',
            icon: ' icon-dt-doublet-147',
            iconPack: 'doublet',
            permissions: []
          },
          {
            disabled: false,
            name: 'Areas',
            link: 'listArea',
            icon: ' icon-dt-doublet-147',
            iconPack: 'doublet',
            permissions: []
          },
        ],
      },
      {
        id: 2,
        name: 'RRHH',
        subMenu: true,
        
        subModules: {
          count: 0,
          mod: []
        },
        pages: [
          {
            disabled: false,
            name: 'Listado Personas',
            link: 'listPerson',
            icon: ' icon-dt-doublet-28',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Cargo',
            link: 'listTypePosition',
            icon: ' icon-dt-doublet-28',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Contrato',
            link: 'listTypeContract',
            icon: ' icon-dt-doublet-28',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Plaza',
            link: 'listTypeWorkplace',
            icon: ' icon-dt-doublet-28',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Personas',
            link: 'listTypePerson',
            icon: ' icon-dt-doublet-28',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Clasificación de Personas',
            link: 'listClassificationPerson',
            icon: ' icon-dt-doublet-28',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Atributos de Personas',
            link: 'attrPerson',
            icon: ' icon-dt-doublet-28',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Licencia',
            link: 'listTypeLicense',
            icon: ' icon-dt-doublet-28',
            iconPack: 'doublet',
            permissions: []
          },
        ],
      },
      {
        id: 3,
        name: 'Administraci&oacute;n',
        subMenu: true,
        
        subModules: {
          count: 0,
          mod: []
        },
        pages: [
          {
            disabled: false,
            name: 'Tareas',
            link: 'listTasks',
            icon: ' icon-dt-doublet-28',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Cargo',
            link: 'listTypePosition',
            icon: ' icon-dt-doublet-157',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Calendario',
            link: 'taskCalendar',
            icon: ' icon-dt-doublet-157',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tablero de Tareas',
            link: 'taskBoard',
            icon: ' icon-dt-doublet-157',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Incidencias',
            link: 'listIncidents',
            icon: ' icon-dt-doublet-157',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Incidencias',
            link: 'listTypeIncidents',
            icon: ' icon-dt-doublet-157',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Atributos de Personas',
            link: 'attrPerson',
            icon: ' icon-dt-doublet-157',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Licencia',
            link: 'listTypeLicense',
            icon: ' icon-dt-doublet-157',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Tarea',
            link: 'listTypeTask',
            icon: ' icon-dt-doublet-157',
            iconPack: 'doublet',
            permissions: []
          },
        ],
      },
      {
        id: 4,
        name: 'Servicios',
        subMenu: true,
        
        subModules: {
          count: 0,
          mod: []
        },
        pages: [
          {
            disabled: false,
            name: 'Historial',
            link: 'allServices',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Proveedores de Mensajeria',
            link: 'listMessengerProvider',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Zona de distribucion',
            link: 'listDistributionZone',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Mensajeria',
            link: 'formServiceMessenger',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Ofertas',
            link: 'listOffers',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Incidencias',
            link: 'listTypeIncidents',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Renta',
            link: 'formServiceRent',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Taller',
            link: 'formServiceTaller',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Servicios',
            link: 'listTypeService',
            icon: ' icon-dt-doublet-157',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Devolución',
            link: 'listTypeRefund',
            icon: ' icon-dt-doublet-157',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Oferta',
            link: 'listTypeOffer',
            icon: ' icon-dt-doublet-157',
            iconPack: 'doublet',
            permissions: []
          },
        ],
      },
      {
        id: 5,
        name: 'Contabilidad',
        subMenu: true,
        
        subModules: {
          count: 0,
          mod: []
        },
        pages: [
          {
            disabled: true,
            name: 'Nóminas',
            link: '',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Cuentas',
            link: 'listAccounts',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Pago',
            link: 'listTypePay',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Gasto',
            link: 'listTypeExpenses',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Ingresos',
            link: 'listTypeIncome',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Moneda',
            link: 'listTypeCash',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },
        ],
      },
      {
        id: 5,
        name: 'Almacen',
        subMenu: true,
        
        subModules: {
          count: 0,
          mod: []
        },
        pages: [
          {
            disabled: true,
            name: 'Almacenes',
            link: 'listWarehouse',
            icon: ' icon-dt-doublet-108',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Activos Fijos',
            link: 'listAft',
            icon: ' icon-dt-doublet-108',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Insumos',
            link: 'listSupplies',
            icon: ' icon-dt-doublet-108',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Productos',
            link: 'listProducts',
            icon: ' icon-dt-doublet-108',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Movimientos',
            link: 'listMovement',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Productos',
            link: 'listTypeProduct',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Tipos de Insumo',
            link: 'listTypSupplies',
            icon: ' icon-dt-doublet-27',
            iconPack: 'doublet',
            permissions: []
          },
        ],
      },
      {
        id: 6,
        name: 'Configuracion',
        subMenu: true,
        
        subModules: {
          count: 1,
          mod: [
            {
              id:0,
              name:'Seguridad',
              subMenu:true,
              
              mod:[],
              pages:[
                {
                  disabled: true,
                  name: 'Usuarios',
                  link: 'ListUsers',
                  icon: ' icon-dt-doublet-58',
                  iconPack: 'doublet',
                  permissions: []
                },{
                  disabled: false,
                  name: 'Roles',
                  link: 'ListRoles',
                  icon: ' icon-dt-doublet-58',
                  iconPack: 'doublet',
                  permissions: []
                },
              ]
            }
          ]
        },
        pages: [
          {
            disabled: true,
            name: 'Tipos de Empresa',
            link: 'listTypeEnterprise',
            icon: ' icon-dt-doublet-58',
            iconPack: 'doublet',
            permissions: []
          },{
            disabled: false,
            name: 'Clasificación de Empresas',
            link: 'listClassificationEnterprise',
            icon: ' icon-dt-doublet-108',
            iconPack: 'doublet',
            permissions: []
          },
        ],
      },
    ]

  }),
  getters: {
    GET_MENU_MODULES(state) {
      return state.modules
    },
  }
}