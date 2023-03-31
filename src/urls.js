const BASE_URL_API = process.env.VUE_APP_BASE_URL;
const PATH = process.env.VUE_APP_BASE_PATH;
export const URL_API = `${BASE_URL_API}/${PATH}`


export const api_token = `${BASE_URL_API}/auth/login/`;

export const api_token_refresh = `${URL_API}/token/refresh/`;

export const api_permisos = `${URL_API}/permisos/`;
export const api_permissions = `${URL_API}/permissions/`;

export const api_roles = `${URL_API}/roles/`;

export const api_users = `${URL_API}/user/`;
export const api_type_position = `${URL_API}/position-type/`;

export const api_users_roles = `${URL_API}/users_roles/`;

export const api_atributos = `${URL_API}/atributos/`;

export const api_province = `${URL_API}/province/`;

export const api_municipality = `${URL_API}/municipality/`;

export const api_producto = `${URL_API}/producto/`;

export const api_aft = `${URL_API}/aft/`;

export const api_almacen = `${URL_API}/warehouse/`;

export const api_cuenta = `${URL_API}/cuenta/`;

export const api_client = `${URL_API}/client/`;

export const api_empresa = `${URL_API}/enterprise/`;

export const api_incidencia = `${URL_API}/incidencia/`;

export const api_insumos = `${URL_API}/insumos/`;

export const api_nomvalue = `${URL_API}/nomvalue/`;

export const api_attributenomvalue = `${URL_API}/attributenomvalue/`;

export const api_attributenomtype = `${URL_API}/attributenomtype/`;

export const api_get_atributes_byid_nomtype = `${URL_API}/get_atributes_byid_nomtype/`;

export const api_organigrama = `${URL_API}/organigrama/`;

export const api_plaza = `${URL_API}/plaza/`;

export const api_oferta = `${URL_API}/oferta/`;

export const api_oferta_simple = `${URL_API}/oferta_simple/`;

export const api_oferta_agrupada = `${URL_API}/oferta_agrupada/`;

export const api_oferta_variable = `${URL_API}/ferta_variable/`;

export const api_oferta_variable_combinaciones = `${URL_API}/oferta_variable_combinaciones/`;

export const api_comentario = `${URL_API}/comentario/`;

export const api_workflow = `${URL_API}/workflow/`;

export const api_estado = `${URL_API}/estado/`;

export const api_area = `${URL_API}/area/`;

export const api_get_estado_by_workflow = `${URL_API}/get_estado_by_workflow/#{id}#/`;

export const api_complete_status = `${URL_API}/complete_status/#{id}#/`;

export const api_tipo_gasto = `${URL_API}/tipo_gasto/`;

export const api_tipo_ingreso = `${URL_API}/tipo_ingreso/`;

export const api_tipo_servicio = `${URL_API}/tipo_servicio/`;

export const api_servicio = `${URL_API}/servicio/`;

export const api_tarea = `${URL_API}/tarea/`;

export const api_get_servicio_byID = `${URL_API}/servicio/#{id}#/`;

export const api_persona = `${URL_API}/persona/`;

export const api_worker = `${URL_API}/worker/`;

export const api_venta = `${URL_API}/venta/`;

export const api_module = `${URL_API}/modulo/`;
export const api_pagina = `${URL_API}/pagina/`;

export const api_open_service = `${URL_API}/open_servicio/`;
export const api_stats_open_service = `${URL_API}/open_service/stats_open_service/`;

export const api_change_status_service = `${URL_API}/change_status_service/`;

export const api_tipo_persona = `${URL_API}/tipo_persona/`;

export const api_nomina = `${URL_API}/nomina/`;

export const api_tipo_atributo_nomvalue = `${URL_API}/tipo_atributo_nomvalue/`;

export const api_clasificacion_empresa_nomvalue = `${URL_API}/clasificacion_empresa_nomvalue/`;

export const api_clasificacion_persona_nomvalue = `${URL_API}/clasificacion_persona_nomvalue/`;

export const api_tipo_cargo_nomvalue = `${URL_API}/tipo_cargo_nomvalue/`;

export const api_cargo = `${URL_API}/cargo/`;

export const api_tipo_devolucion_nomvalue = `${URL_API}/tipo_devolucion_nomvalue/`;

export const api_tipo_empresa_nomvalue = `${URL_API}/tipo_empresa_nomvalue/`;

export const api_tipo_oferta_nomvalue = `${URL_API}/tipo_oferta_nomvalue/`;

export const api_tipo_licencia_nomvalue = `${URL_API}/tipo_licencia_nomvalue/`;

export const api_tipo_incidencia_nomvalue = `${URL_API}/tipo_incidencia_nomvalue/`;

export const api_tipo_pago_nomvalue = `${URL_API}/tipo_pago_nomvalue/`;

export const api_type_task_nomvalue = `${URL_API}/tipo_tarea_nomvalue/`;

export const api_tipo_expresion_regular_nomvalue = `${URL_API}/tipo_expresion_regular_nomvalue/`;

export const api_tipo_moneda_nomvalue = `${URL_API}/tipo_moneda_nomvalue/`;

export const api_tipo_plaza_nomvalue = `${URL_API}/tipo_plaza_nomvalue/`;

export const api_tipo_contrato_nomvalue = `${URL_API}/tipo_contrato_nomvalue/`;

export const api_tipo_fixtures_menu_nomvalue = `${URL_API}/tipo_fixtures_menu_nomvalue/`;
//Crear menu

export const api_menu_servicio = `${URL_API}/menu_servicio`;

export const api_picture = `${URL_API}/picture/`;

export const api_log_menu = `${URL_API}/log_menu/`;

export const api_session = `${URL_API}/session/`;

export const api_change_password = `${URL_API}/change_password/`;

export const api_update_profile = `${URL_API}/update_profile/`;

export const api_empresas_list = `${URL_API}/empresas_list/`;

export const api_get_attributes = `${URL_API}/get_attributes/`;

export const api_get_nomtypes = `${URL_API}/get_nomtypes/`;

export const api_get_type_product = `${URL_API}/get_nomtypes/type_product/`;

export const api_get_type_service = `${URL_API}/get_nomtypes/type_service/`;

export const api_get_type_service_by_id_nomtype = `${URL_API}/get_type_service_by_id_nomtype/`;

export const api_get_type_insumo = `${URL_API}/get_nomtypes/type_supplies/`;

export const api_get_type_aft = `${URL_API}/get_nomtypes/type_aft/`;

export const api_get_nomvalues = `${URL_API}/get_nomvalues/`;

export const api_get_areas_by_empresa = `${URL_API}/get_areas_by_empresa/`;

export const api_get_aft_by_almacen = `${URL_API}/get_aft_by_almacen/`;

export const api_get_aft_by_area = `${URL_API}/get_aft_by_area/`;
//insumos
export const api_get_insumos_by_almacen = `${URL_API}/get_insumo_by_almacen/`;

export const api_get_insumos_by_area = `${URL_API}/get_insumo_by_area/`;
//produtos
export const api_get_productos_by_almacen = `${URL_API}/get_product_by_almacen/`;

export const api_get_productos_by_area = `${URL_API}/get_product_by_area/`;

export const api_movimiento_objeto_almacen = `${URL_API}/movimiento_objeto_almacen/`;


export const api_get_user_by_username = `${URL_API}/get_user_by_username/`;

export const api_get_empresa_by_user_id = `${URL_API}/get_empresa_by_user_id/`;

export const api_empresa_users = `${URL_API}/empresa-users/`;

export const api_save_empresa_login = `${URL_API}/save_empresa_login/`;

export const api_get_master_almacen = `${URL_API}/get_master_almacen/`;

export const api_get_permisions_by_user = `${URL_API}/get_permisions_by_user/`;

export const api_update_persona_proveedor = `${URL_API}/update_persona_proveedor/`;

export const api_change_master_false = `${URL_API}/change_master_false/`;

export const api_get_almacen_by_id = `${URL_API}/get_almacen_by_id/`;

export const api_get_person_byId = `${URL_API}/get_person_byId/`;

export const api_make_super_user = `${URL_API}/make_super_user/`;

export const api_register = `${URL_API}/register/`;
export const api_movimientos = `${URL_API}/movimientos/`;
export const api_objeto_almacen_area = `${URL_API}/objeto_almacen_area/`;
export const api_objeto_almacen = `${URL_API}/objeto_almacen/`;

export const api_quitar_super_user = `${URL_API}/quitar_super_user/`;

export const api_services = `${URL_API}/servicio/`;
export const api_rental_service = `${URL_API}/rental-service/`;
export const api_service_taller = `${URL_API}/servicio_taller/`;
export const api_service_messenger = `${URL_API}/servicio_mensajeria/`;
export const api_messenger_provider = `${URL_API}/proveedor_mensajeria/`;
export const api_distribution_zone = `${URL_API}/zona_distribucion/`;
export const api_partial_update_service = `${URL_API}/service/update-partial/`;







