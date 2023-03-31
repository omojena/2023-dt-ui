<template>
    <div class="content-page">
        <section>
            <top-bar page-title="Organigrama de la Empresa" :is_search="false"/>
            <div class="mt-3 bg-withe p-5 card">
                <div class="is-flex is-justify-content-space-between">
                    <h-list :go-to-url="addUrl"
                        :only-new="isEmpty"
                        :records="desserts.length"
                        :per-page="perPage"
                        @btn-view-all="viewAll"
                        class="mb-6"/>
                </div>
                    <organization-chart
                            pan
                            zoom
                            :node-click="nodeClick"
                            :datasource="ds"></organization-chart>

            </div>
        </section>
    </div>

</template>

<script>
    import OrganizationChart from 'vue-organization-chart'
    import TopBar from "../../../components/top-bar/topBar";
    import chart from '../../../assets/svg/organizationChart.svg'
    import HList from "../../../components/header-list/headerList";
    export default {
        name: "OChart",
        components: {
            TopBar,
            OrganizationChart,
            HList
        },
        data() {
            return {
                search: '',
                checkedRows: [],
                desserts: [],
                isEmpty: false,
                isPaginated: false,
                currentPage: 1,
                perPage: 5,
                addUrl: '/organizationchart/form',
                imgChart: chart,
                ds: {
                    'id': '1',
                    'name': 'Director',
                    'title': 'Director',
                    'children': [
                        {
                            'id': '2', 'name': 'Administracion', 'title': 'Jefe Admon',
                            'children': [
                                {'id': '3', 'name': 'Administracion', 'title': 'Administrador',},
                                {'id': '4', 'name': 'Administracion', 'title': 'Secretaria',},
                            ]
                        },
                        {
                            'id': '4', 'name': 'Talleres', 'title': 'Jefe Taller',
                            'children': [
                                {'id': '6', 'name': 'Taller 1', 'title': 'Mecanicos'},
                                {
                                    'id': '5', 'name': 'Taller 2', 'title': 'Mecanicos',
                                }
                            ]
                        },
                        {'id': '8', 'name': 'Almacén', 'title': 'Almacenero'},
                        {'id': '9', 'name': 'Recepción', 'title': 'Recepcionista'}
                    ]
                }
            }
        },
        methods: {
            nodeClick() {
                alert('node')
            },
            goTo(){

            }
        }
    }

</script>

<style scoped lang="scss">
    @import '../../../../theme/orgchart.css';
    .btn-new {
        width: 92px;
        height: 31px;
        .label-new {
            color: #FFFFFF;
        }
        .label-all {
            color: #009FE3;
        }
    }
    .char-size {
        width: 300px;
        height: 300px;
    }

</style>