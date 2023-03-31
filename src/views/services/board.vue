<template>
    <div class="content-page">
        <section>
            <top-bar page-title="Servicios"/>
            <div class="mt-3 bg-withe p-5 card board">
                <section>
                    <div class="columns">
                        <div class="column pr-2 pl-2">
                            <div semi-bold class="titles">Aperturados</div>
                            <draggable
                                    class="dragArea list-group mt-3"
                                    :list="toDo"
                                    :group="{ name: 'people', put: true }"


                            >
                                <service-board class="mb-2" v-for="(item, id) of toDo" :key="id"
                                               :title="item.title"
                                               :assigned-to="item.assignedTo"
                                               :type-service="item.type"
                                />

                            </draggable>
                        </div>
                        <div class="column pr-2 pl-2">
                            <div semi-bold class="titles">En Proceso</div>
                            <draggable
                                    class="dragArea list-group mt-3"
                                    :list="inProcess"
                                    :group="{ name: 'people' , put: true }"
                                    @change="inProgressChange"

                            >
                                <service-board class="mb-2" v-for="(item, id) of inProcess" :key="id"
                                               :title="item.title"
                                               :assigned-to="item.assignedTo"
                                               :type-service="item.type"
                                />

                            </draggable>
                        </div>
                        <div class="column pr-2 pl-2">
                            <div semi-bold class="titles">Finalizados</div>
                            <draggable
                                    class="dragArea list-group mt-3"
                                    :list="done"
                                    :group="{ name: 'people', put: true }"

                            >
                                <service-board class="mb-2" v-for="(item, id) of done" :key="id"
                                               :title="item.title"
                                               :assigned-to="item.assignedTo"
                                               :type-service="item.type"
                                />

                            </draggable>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import TopBar from "../../components/top-bar/topBar";
    import ServiceBoard from "../../components/board/service-board";
    import src_avatar from '../../assets/img/profile-picture.png';

    export default {
        name: "Board",
        components: {
            ServiceBoard,
            TopBar,
            draggable
        },
        data() {
            return {
                src_avatar: src_avatar,
                toDo: [
                    {
                        title: 'Mantenimiento General', type: 'Taller', assignedTo: [
                            {nombre: 'Osmel Mojena Dubet', avatar: src_avatar},
                            {nombre: 'Jose A. Hernandez Molina', avatar: ''},
                            {nombre: 'Nayvis Diaz', avatar: src_avatar},

                        ]
                    },
                    {
                        title: 'Pitura del Cuadro', type: 'Taller', assignedTo: [
                            {nombre: 'Antonio Mojena Dubet', avatar: src_avatar},


                        ]
                    },
                    {
                        title: 'Reparacion de Viela', type: 'Taller', assignedTo: [
                            {nombre: 'Osmel Mojena Dubet', avatar: ''},
                            {nombre: 'Jose A. Hernandez Molina', avatar: src_avatar},
                            {nombre: 'Nayvis Diaz', avatar: src_avatar},

                        ]
                    },
                    {
                        title: 'Ajustar Timon', type: 'Taller', assignedTo: [
                            {nombre: 'Carlos Mojena Dubet', avatar: src_avatar},
                            {nombre: 'Alejandro Hernandez Molina', avatar: ''},
                            {nombre: 'Jose Manuel', avatar: src_avatar},

                        ]
                    },
                    {
                        title: 'Limpieza de cadena', type: 'Taller', assignedTo: [
                            {nombre: 'Pedro Mojena Dubet', avatar: ''},
                            {nombre: 'Jose Luis Hernandez Molina', avatar: ''},
                            {nombre: 'Rafael Diaz', avatar: src_avatar},

                        ]
                    },
                ],
                inProcess: [],
                done: []
            }
        },
        methods: {
            add: function () {
                this.list.push({name: "Juan"});
            },
            replace: function () {
                this.list = [{name: "Edgard"}];
            },
            clone: function (el) {
                return {
                    name: el.name + " cloned"
                };
            },
            log: function (evt) {
                window.console.log(evt);
            },
            inProgressChange: function (evt) {
                // this.inProcess.push(evt.added.element);
                console.log(evt.added.element);
                console.log(this.inProcess);
                window.console.log(evt);
            },
        }

    }
</script>

<style scoped lang="scss">
    .board {
        height: 110vh;
    }

    .titles {
        display: flex;
        justify-content: center;
        height: 35px;
        align-items: center;
        background-color: #fe5723;
        flex-basis: 3rem;
        color: #ffffff;
        font-size: 18px;
        position: relative;
    }

    .column {
        /*border: 1px solid #C2C2C2;*/
        height: 95vh;
        margin-right: 5px;
        margin-left: 5px;

    }

    .dragArea {
        height: 100%;
        overflow: auto;
        overflow-x: hidden;
    }

</style>