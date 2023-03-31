<template>
    <div class="card">
        <div class="card-content">
            <div class="content">
                <h3 class="title-card">{{title}}</h3>

                <b-taglist attached>
                    <b-tag size="is-medium" type="is-dark">Tipo de Tarea</b-tag>
                    <b-tag size="is-medium" type="is-info">{{typeTask}}</b-tag>
                </b-taglist>

                <div class="is-flex is-align-items-center">
                    <b-tag class="mr-2" type="is-dark">Responsable (s)</b-tag>

                    <b-tooltip v-for="(item, id) of assignedTo" :key="id"
                               type="is-primary-light"
                               :label="item.nombre"
                               position="is-top">
                        <avatar class="mr-1 ml-1" :size="35"
                                color="#ffffff"
                                :src="item.avatar || ''"
                                :username="item.nombre"/>
                    </b-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BTaglist from "buefy/src/components/tag/Taglist";
    import BTag from "buefy/src/components/tag/Tag";
    import Avatar from 'vue-avatar';
    import BTooltip from "buefy/src/components/tooltip/Tooltip";


    export default {
        name: "TaskBoard",
        components: {BTooltip, BTag, BTaglist, Avatar},
        data() {
            return {}
        },
        props: {
            title: {
                type: String
            },
            assignedTo: {
                type: Array
            },
            typeTask: {
                type: String
            }
        },
        computed: {}
    }
</script>

<style scoped lang="scss">
    @import "../../../theme/app";

    .card {
        background-color: #d1c3f9;
        border: 1px solid #3827B3;
        .card-content {
            padding: 0.5rem;
            .content {
                h3 {
                    color: #000000;
                }
            }
        }

    }
</style>