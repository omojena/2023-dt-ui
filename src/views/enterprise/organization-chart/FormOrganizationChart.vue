<template>
    <div class="content-page">
        <section>
            <top-bar :page-title="post?'Crear Organigrama':'Editar Organigrama'"/>
            <div class="mt-3 bg-withe p-5 card">
                <section>
                    <div class="columns">
                        <div class="column is-half">
                            <b-field label="Nombre" label-position="on-border">
                                <b-input placeholder="Nombre"
                                         v-model="name"
                                         required
                                         validation-message="Campo requerido"
                                         type="text">
                                </b-input>
                            </b-field>
                            <b-field label="Titulo" label-position="on-border">
                                <b-input placeholder="Titulo"
                                         v-model="title"
                                         required
                                         validation-message="Campo requerido"
                                         type="text">
                                </b-input>
                            </b-field>


                        </div>

                        <div class="column is-half">
                            <b-field label="Padre" label-position="on-border">
                                <b-select placeholder="Padre"
                                          v-model="father"
                                          expanded>
                                    <option
                                            v-for="item in parent_list"
                                            :key="item.value"
                                            :value="item.value">
                                        {{item.text}}
                                    </option>
                                </b-select>
                            </b-field>
                            <b-field label-position="on-border">

                                <b-checkbox v-model="isFather">Es Padre?</b-checkbox>

                            </b-field>
                        </div>
                    </div>
                    <div class="buttons is-pulled-right">
                        <b-button class="btn-global btn-accept is-rounded form mt-3"><span
                                lg-font regular main-color @click="save">Guardar</span>
                        </b-button>

                    </div>
                </section>
            </div>
        </section>
    </div>

</template>

<script>
    import axios from 'axios'
    import {api_area, api_organigrama} from "../../../urls";
    import {mapMutations} from 'vuex'
    import TopBar from "../../../components/top-bar/topBar";

    export default {
        components: {TopBar},
        data: () => ({
            name: '',
            title: '',
            isFather: null,
            father:null,
            valid: true,
            post: true,
            item_id: null,
            fk_enterprise: localStorage.getItem('enterprise_id'),
            fk_parent: null,
            parent_list: [],
            organization_object: null,
            ds: []

        }),

        methods: {
            ...mapMutations({
                openModalDelete: 'OPEN_MODAL_DELETE',
                loadUrlDelete: 'LOAD_URL_DELETE',
                loadUrlData: 'LOAD_URL_DATA',
                setLoading: 'SET_OVERLAY',
                confirmDelete: 'CONFIRM_DELETE',
                setToast: 'SET_TOAST',
                setStatusError: 'SET_STATUS_ERROR'
            }),
            update_values() {
                let id = this.$route.params.id;
                this.post = false;
                this.setLoading(true);
                axios.get(`${api_area}${id}/`)
                    .then(response => {
                        this.setLoading(false);
                        let item = response.data;
                        this.name = item.nombre;
                        this.description = item.descripcion;
                        this.phone = item.telefono;
                        this.address = item.direccion;
                        this.fk_parent = item.fk_parent;
                        this.fk_enterprise = item.fk_empresa;
                        this.item_id = item.id;
                    }).catch((err) => {
                    this.setLoading(false);
                    this.setToast({
                        type: 'is-danger',
                        message: 'Ha ocurrido un error al obtener los valores'
                    });
                    this.setStatusError(err.response.status);
                });
            },
            save() {
                this.setLoading(true);
                this.organization_object = {
                    name: this.name,
                    title: this.title,
                    isFather: this.isFather,
                    father: this.father
                };

                if (this.post)
                    axios.post(`${api_organigrama}`, this.organization_object)
                        .then(result => {
                            this.setLoading(false);
                            this.setToast({
                                type: 'is-success',
                                message: 'Se ha agregada correctamnete'
                            });
                            this.$router.push({name: 'organizationChart'}).then(() => {
                                this.$emit('organigrama', result.data)
                            });
                        }, (err => {
                            this.setLoading(false);
                            this.setToast({
                                type: 'is-danger',
                                message: 'Ha ocurrido un error al agregar'
                            });
                            this.setStatusError(err.response.status);
                            console.log(err)
                        }));
                else
                    axios.put(`${api_organigrama}${this.item_id}/`, this.organization_object)
                        .then(result => {
                            this.setLoading(false);
                            this.setToast({
                                type: 'is-success',
                                message: 'Editada correctamnete'
                            });
                            this.$router.push({name: 'organizationChart'}).then(() => {
                                this.$emit('area', result.data)
                            });
                        }, (err => {
                            this.setToast({
                                type: 'is-danger',
                                message: 'Ha ocurrido un error al editar'
                            });
                            this.setStatusError(err.response.status);
                            console.log(err)
                        }));
            },
            getParents() {
                this.setLoading(true);
                axios.get(`${api_organigrama}`)
                    .then(response => {
                        this.setLoading(false);
                        response.data.forEach(result => {
                            this.parent_list.push({text: `${result.nombre}`, value: result.id})
                        });
                    })
                    .catch((err) => {
                        this.setLoading(false);
                        this.setToast({
                            type: 'is-danger',
                            message: 'Ha ocurrido un error al obtener'
                        });
                        this.setStatusError(err.response.status);
                    });
            },
        },

        created() {
            this.setLoading(true);
            this.getParents();
            if (this.$route.params.id) {
                this.update_values();
            }
        }
    }
</script>
