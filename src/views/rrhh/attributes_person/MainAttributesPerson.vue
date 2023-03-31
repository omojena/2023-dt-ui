<template>
    <div class="content-page">
        <section>
            <top-bar page-title="Persona"/>
            <div class="mt-3 bg-withe p-5 card">
                <section>
                    <div class="columns ">
                        <div class="column is-half">
                            <b-field>
                                <b-input placeholder="Nombre"
                                         v-model="name"
                                         required
                                         validation-message="Campo requerido"
                                         type="text">
                                </b-input>
                            </b-field>
                        </div>
                        <div class="column is-half">
                            <b-field>
                                <b-input type="textarea"
                                         v-model="description"
                                         minlength="1"
                                         maxlength="300"
                                         placeholder="Descripcion">
                                </b-input>
                            </b-field>
                        </div>
                    </div>
                    <!--<attributes-component :selected="selected" @selected="atributos_selected = $event"/>-->
                    <CustomAttributes/>
                    <div class="buttons is-pulled-right">
                        <b-button class="btn-global btn-accept is-rounded form mt-3"><span
                                lg-font regular main-color>Guardar</span>
                        </b-button>
                    </div>

                </section>
            </div>
        </section>
    </div>


</template>

<script>
    import {api_get_atributes_byid_nomtype, api_attributenomtype} from '@/urls'
    import axios from 'axios'
    import {mapMutations, mapActions} from 'vuex'
    import TopBar from "../../../components/top-bar/topBar";
    import BButton from "buefy/src/components/button/Button";
    import CustomAttributes from "../../../components/form/custom-attributes";


    export default {
        name: "MainAttributesPerson",
        components: {
            CustomAttributes,
            BButton,
            TopBar,

        },
        data() {
            return {
                selected: [],
                id: 1,
                name: '',
                description: '',
                attributes_selected: [],
            }
        },
        methods: {
            ...mapMutations({
                openModalDelete: 'OPEN_MODAL_DELETE',
                loadUrlDelete: 'LOAD_URL_DELETE',
                loadUrlData: 'LOAD_URL_DATA',
                setLoading: 'SET_OVERLAY',
                setToast: 'SET_TOAST',
                setStatusError: 'SET_STATUS_ERROR',
                hideAttrAction: 'SET_HIDE_ACTION_ATTR',
                setCustomAttributes:'SET_CUSTOM_ATTRIBUTES'
            }),
            ...mapActions({
                showToast: 'TOAST_MESSAGE',
            }),
            getPersonAttributes() {
                this.setLoading(true);
                axios.get(`${api_attributenomtype}${this.id}/`)
                    .then(response => {
                        this.setLoading(false);
                        let item = response.data;
                        this.name = item.nombre;
                        this.description = item.descripcion;
                        this.setLoading(false);
                        axios.get(`${api_get_atributes_byid_nomtype}${this.id}/`)
                            .then(attributes => {
                                this.setLoading(false);
                                this.selected = attributes.data;
                                console.log(this.selected)
                            })
                            .catch(err => {
                                this.setLoading(false);
                                this.setToast({
                                    type: 'is-danger',
                                    message: 'Ha ocurrido un error al obtener los atributos'
                                });
                                this.setStatusError(err.response.status);
                                console.log(err)
                            });
                    }).catch(() => {
                    this.setLoading(false);
                });
            },
            save() {
                this.setLoading(true);
                let attr = [];
                this.attributes_selected.forEach(result => {
                    attr.push(result.id)
                });
                let personTypeObject = {
                    id: this.id,
                    nomtype: 18,
                    nombre: this.name,
                    descripcion: this.description,
                    slug: "type_person",
                    fk_atributo: attr,
                };
                axios.put(`${api_attributenomtype}${this.id}/`, personTypeObject)
                    .then(result => {
                        this.setLoading(false);
                        this.setToast({
                            type: 'is-success',
                            message: 'Atributos agregados correctamente'
                        });
                        this.$emit('attributes-person', result.data)
                    }, (err => {
                        this.setLoading(false);
                        this.setToast({
                            type: 'is-danger',
                            message: 'Ha ocurrido un error al agregar los atributos'
                        });
                        this.setStatusError(err.response.status);
                        console.log(err)
                    }));
                this.$router.push({name: 'nomenclator'});
            },
        },
        created() {
            this.setCustomAttributes();
            this.getPersonAttributes();
            this.hideAttrAction(true)
        },
        destroyed() {
            this.hideAttrAction(true)
        },
    }
</script>

<style scoped>

</style>
