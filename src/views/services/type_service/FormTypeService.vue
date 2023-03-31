<template>
    <div class="content-page">
        <section>
            <top-bar :page-title="post?'Nuevo Tipo de Servicio':'Editar Tipo de Servicio'"/>
            <div class="mt-3 bg-withe p-5 card">
                <section>
                    <div class="columns ">
                        <div class="column is-half">
                            <b-field label="Nombre" label-position="on-border">
                                <b-input placeholder="Nombre"
                                         v-model="name"
                                         required
                                         validation-message="Campo requerido"
                                         type="text">
                                </b-input>
                            </b-field>
                            <b-field label="Workflow" label-position="on-border">
                                <b-select placeholder="Workflow"
                                          v-model="fk_workflow"
                                          expanded>
                                    <option
                                            v-for="w in list_workflow"
                                            :key="w.value"
                                            :value="w.value">
                                        {{w.text}}
                                    </option>
                                </b-select>
                            </b-field>
                            <b-field label="Tipo de Ingreso" label-position="on-border">
                                <b-select placeholder="Tipo de Ingreso"
                                          required
                                          v-model="fk_type_income"
                                          expanded>
                                    <option
                                            v-for="income in list_type_income"
                                            :key="income.value"
                                            :value="income.value">
                                        {{w.text}}
                                    </option>
                                </b-select>
                            </b-field>
                            <b-field label="Tipo de Servicio Padre" label-position="on-border">
                                <b-select placeholder="Tipo de Servicio Padre"
                                          v-model="fk_parent"
                                          expanded>
                                    <option
                                            v-for="ts in fk_parent"
                                            :key="ts.value"
                                            :value="ts.value">
                                        {{ts.text}}
                                    </option>
                                </b-select>
                            </b-field>
                        </div>
                        <div class="column is-half">

                            <b-field label="Tipo de Gasto" label-position="on-border">
                                <b-select placeholder="Tipo de Gasto"
                                          v-model="fk_type_expenses"
                                          expanded>
                                    <option
                                            v-for="ex in list_type_expenses"
                                            :key="ex.value"
                                            :value="ex.value">
                                        {{ts.text}}
                                    </option>
                                </b-select>
                            </b-field>
                            <b-field label="Descripcion" label-position="on-border">
                                <textarea
                                        class="textarea"
                                        placeholder="Descripcion"
                                        v-model="description"
                                        rows="5"
                                >
                                </textarea>
                            </b-field>
                        </div>

                    </div>
                    <!--<attributes-component :selected="selected" @selected="atributos_selected = $event"/>-->
                    <CustomAttributes/>

                    <div class="buttons is-pulled-right mt-4">
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
    import axios from 'axios'
    import {
        api_attributenomtype,
        api_attributenomvalue,
        api_get_atributes_byid_nomtype,
        api_get_type_service,
        api_get_type_service_by_id_nomtype,
        api_tipo_gasto,
        api_tipo_ingreso,
        api_workflow
    } from "../../../urls";
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import TopBar from "../../../components/top-bar/topBar";
    import BSelect from "buefy/src/components/select/Select";
    import CustomAttributes from "../../../components/form/custom-attributes";


    export default {
        components: {CustomAttributes, BSelect, TopBar},
        data: () => ({
            attributes: [{name: "John", id: 1},
                {name: "Joao", id: 2},
                {name: "Jean", id: 3},
                {name: "Gerard", id: 4}],
            valid: true,
            post: true,
            item_id: null,

            name: '',
            slug: 'type_service',
            image: null,
            nomType_id: 21,
            description: '',
            fk_workflow: null,
            list_workflow: [],
            fk_parent: null,
            list_parent: [],
            list_offers: [],
            fk_type_income: [],
            list_type_income: [],
            fk_type_expenses: [],
            list_type_expenses: [],
            attributes_selected: [],
            selected: [],


        }),

        methods: {
            ...mapMutations({
                openModalDelete: 'OPEN_MODAL_DELETE',
                loadUrlDelete: 'LOAD_URL_DELETE',
                loadUrlData: 'LOAD_URL_DATA',
                setLoading: 'SET_OVERLAY',
                setToast: 'SET_TOAST',
                setStatusError: 'SET_STATUS_ERROR',
                setCustomAttributes: 'SET_CUSTOM_ATTRIBUTES',
                addTypeServiceStore: 'ADD_TYPE_SERVICE'
            }),
            ...mapActions({
                showToast: 'TOAST_MESSAGE',
            }),
            update_values() {
                this.setLoading(true);
                let id = this.$route.params.id;
                this.post = false;
                axios.get(`${api_attributenomtype}${id}/`)
                    .then(response => {
                        this.setLoading(false);
                        let item = response.data;
                        this.name = item.nombre;
                        this.description = item.descripcion;
                        this.item_id = item.id;
                        axios.get(`${api_get_type_service_by_id_nomtype}${item.id}/`)
                            .then(ts => {
                                this.setLoading(false);
                                let service = ts.data;
                                this.fk_workflow = service.fk_workflow;
                                this.fk_parent = service.fk_parent;
                                this.fk_type_income = service.fk_tipo_ingreso;
                                this.fk_type_expenses = service.fk_tipo_gasto;
                            })
                            .catch((err) => {
                                this.setLoading(false);
                                this.setToast({
                                    type: 'is-danger',
                                    message: 'Ha ocurrido un error al obtener los valores'
                                });
                                this.setStatusError(err.response.status);
                            });
                        axios.get(`${api_get_atributes_byid_nomtype}${item.id}/`)
                            .then(attributes => {
                                this.setLoading(false);
                                this.selected = attributes.data;
                                console.log(this.selected)
                            })
                            .catch((err) => {
                                this.setLoading(false);
                                this.setToast({
                                    type: 'is-danger',
                                    message: 'Ha ocurrido un error al obtener los atributos'
                                });
                                this.setStatusError(err.response.status);
                            });
                    });
            },
            save() {
                this.setLoading(true);
                let attr = [];
                this.attributes_render.forEach(result => {
                    attr.push(result.id)
                });
                let serviceTypeObject = {
                    nomtype: this.nomType_id,
                    nombre: this.name,
                    slug: "type_service",
                    descripcion: this.description,
                    imagen: this.image,
                    fk_workflow: this.fk_workflow,
                    fk_parent: this.fk_parent,
                    fk_empresa: parseInt(this.enterpriseAuth.enterprise_id),
                    fk_tipo_ingreso: this.fk_type_income,
                    fk_tipo_gasto: this.fk_type_expenses,
                    fk_atributo: attr,
                };

                if (this.post) {
                    this.addTypeServiceStore(serviceTypeObject);
                    axios.post(`${api_attributenomvalue}`, serviceTypeObject)
                        .then(result => {
                            this.setLoading(false);
                            this.setToast({
                                type: 'is-success',
                                message: 'Tipo de servicio agregado correctamente'
                            });
                            this.$router.push({name: 'listTypeService'}).then(() => {
                                this.$emit('type-service', result.data)
                            });
                        }, (err => {
                            this.setLoading(false);
                            this.setToast({
                                type: 'is-success',
                                message: 'Ha ocurrido un error al agregar el tipo de servicio'
                            });
                            this.setStatusError(err.response.status);
                            console.log(err)
                        }));

                } else {
                    axios.put(`${api_attributenomtype}${this.item_id}/`, serviceTypeObject)
                        .then(result => {
                            this.setToast({
                                type: 'is-success',
                                message: 'Tipo de servicio editado correctamente'
                            });
                            this.$router.push({name: 'listTypeService'}).then(() => {
                                this.$emit('type-service', result.data)
                            });
                        }, (err => {
                            this.setLoading(false);
                            this.setToast({
                                type: 'is-success',
                                message: 'Ha ocurrido un error al editar el tipo de servicio'
                            });
                            this.setStatusError(err.response.status);
                            console.log(err)
                        }));

                }

            },
            getWorkflow() {
                this.setLoading(true);
                axios.get(`${api_workflow}`)
                    .then(response => {
                        response.data.forEach(wf => {
                            this.setLoading(false);
                            this.list_workflow.push(
                                {
                                    text: `${wf.nombre}`,
                                    value: wf.id
                                }
                            )
                        })
                    }).catch((err) => {
                    this.setLoading(false);
                    this.setToast({
                        type: 'is-danger',
                        message: 'Ha ocurrido un error al obtener los workflow'
                    });
                    this.setStatusError(err.response.status);
                });
            },
            getTypeService() {
                this.setLoading(true);
                axios.get(`${api_get_type_service}`)
                    .then(response => {
                        this.setLoading(false);
                        response.data.forEach(ts => {
                            this.list_parent.push(
                                {
                                    text: `${ts.nombre}`,
                                    value: ts.id
                                }
                            )
                        })
                    }).catch((err) => {
                    this.setLoading(false);
                    this.setToast({
                        type: 'is-danger',
                        message: 'Ha ocurrido un error al obtener los tipos de servicios'
                    });
                    this.setStatusError(err.response.status);
                });
            },
            getTypeSupplies() {
                this.setLoading(true);
                axios.get(`${api_tipo_ingreso}`)
                    .then(response => {
                        this.setLoading(false);
                        response.data.forEach(ti => {
                            this.list_type_income.push(
                                {
                                    text: `${ti.nombre}`,
                                    value: ti.id
                                }
                            )
                        })
                    }).catch((err) => {
                    this.setLoading(false);
                    this.setToast({
                        type: 'is-danger',
                        message: 'Ha ocurrido un error al obtener los tipos de ingreso'
                    });
                    this.setStatusError(err.response.status);
                });
            },
            getTypeExpenses() {
                this.setLoading(true);
                axios.get(`${api_tipo_gasto}`)
                    .then(response => {
                        this.setLoading(false);
                        response.data.forEach(tg => {
                            this.list_type_expenses.push(
                                {
                                    text: `${tg.nombre}`,
                                    value: tg.id
                                }
                            )
                        })
                    }).catch((err) => {
                    this.setLoading(false);
                    this.setToast({
                        type: 'is-danger',
                        message: 'Ha ocurrido un error al obtener los tipos de gasto'
                    });
                    this.setStatusError(err.response.status);
                });
            },
        },
        created() {
            this.setCustomAttributes([]);
            this.getTypeExpenses();
            this.getTypeSupplies();
            this.getTypeService();
            this.getWorkflow();
            if (this.$route.params.id) {
                this.update_values();
            }

        },
        computed: {
            ...mapGetters({
                enterpriseAuth: 'GET_ENTERPRISE_AUTH',
                attributes_render: 'GET_ATTRIBUTES_RENDER'
            }),
        },

    }
</script>
<style lang="scss" scoped>

</style>
