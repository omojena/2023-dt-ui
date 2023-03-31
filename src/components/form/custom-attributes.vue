<template>
    <section>
        <div class="columns">
            <div class="column is-half panel">
                <label semi-bold class="titles">Atributos</label>
                <b-button class="button is-small is-pulled-right btn-global btn-accept mb-2">
                    Nuevo
                </b-button>
                <draggable
                        class="dragArea list-group mt-3"
                        :list="attributes"
                        :group="{ name: 'people', pull: 'clone', put: false }"
                        @change="log"
                >
                    <div class="block"
                         v-for="(element)  in attributes"
                         :key="element.name"
                    >
                  <span class="tag is-light w-full is-flex is-justify-content-space-between">
                      <span md-font class="is-pulled-left"><i :class="getTypeAttribute(element.type)"></i>{{ element.name }}</span>
                  </span>
                    </div>
                </draggable>

            </div>

            <div class="column is-half panel">
                <label semi-bold class="titles">Arrastre aqui los nuevos campos</label>
                <b-button @click="setCustomAttributes([])" v-if="newAttributes.length > 2"
                          class="button is-small is-pulled-right btn-global btn-close mb-2">
                    Borrar Todo
                </b-button>
                <draggable
                        class="dragArea list-group mt-3"
                        :list="newAttributes"
                        group="people"
                        @change="setCustomAttributes(newAttributes)"
                >


                    <div class="block"
                         v-for="(element, idx)  in newAttributes"
                         :key="element.name"
                    >
                  <span class="tag is-light w-full is-flex is-justify-content-space-between">
                     <span md-font class="is-pulled-left"><i :class="getTypeAttribute(element.type)"></i>{{ element.name }}</span>
                    <i @click="removeAt(idx)" class="icon-dt-cancel-circle-2 is-small is-pulled-right"></i>
                  </span>
                    </div>

                </draggable>

            </div>
        </div>
    </section>

</template>

<script>
    import draggable from 'vuedraggable'
    import {mapMutations, mapGetters} from 'vuex'
    import BButton from "buefy/src/components/button/Button";

    export default {
        name: "CustomAttributes",
        display: "CustomAttributes",
        order: 2,
        components: {
            BButton,
            draggable
        },
        data() {
            return {};
        },
        methods: {
            ...mapMutations({
                setCustomAttributes: 'SET_CUSTOM_ATTRIBUTES'
            }),
            removeAt(idx) {
                this.newAttributes.splice(idx, 1);
            },
            log: function () {

            },
            getTypeAttribute(type) {
                switch (type) {
                    case 'text':
                        return 'icon-dt-text-width';
                    case 'correo':
                        return 'icon-dt-email';
                    case 'fecha':
                        return 'icon-dt-calendar';
                    case 'imagen':
                        return 'icon-dt-file-image';
                    case 'select_all':
                        return 'icon-dt-th-4';
                    case 'select':
                        return 'icon-dt-th-list-5';
                    case 'qr_code':
                        return 'icon-dt-qrcode';
                    case 'bar_code':
                        return 'icon-dt-barcode';
                    default:
                        return 'icon-dt-cancel-circle';

                }
            }
        },
        computed: {
            ...mapGetters({
                newAttributes: 'GET_CUSTOM_ATTRIBUTES',
                attributes: 'GET_ATTRIBUTES_LIST'
            }),

        }


    };
</script>
<style scoped>
    .block {
        margin-bottom: 0.5rem !important;
        border: 1px solid #4C4765;
        border-radius: 5px;
    }

    .panel {
        padding: 15px;
    }

    .titles {
        font-size: 17px;
        color: #000000;
    }

    .dragArea {
        height: 100%;
    }
</style>