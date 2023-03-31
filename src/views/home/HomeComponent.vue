<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Inicio"/>
    </section>

    <section class="card pt-3 pb-3">

      <b-tabs>

        <b-tab-item label="Almacen">
          <iframe
              src="https://ms-report.herokuapp.com/public/dashboard/be680202-6653-4973-8b34-f06677801e51"
              frameborder="0"
              width="100%"
              height="1000px"
              allowtransparency
          ></iframe>
        </b-tab-item>

        <b-tab-item label="Ingresos y Gastos">
          <iframe
              src="https://ms-report.herokuapp.com/public/dashboard/3e440a97-01c7-4491-96f3-73ed917a36ae"
              frameborder="0"
              width="100%"
              height="1000px"
              allowtransparency
          ></iframe>
        </b-tab-item>

        <b-tab-item label="Tipo de Contrato y Genero">
          <iframe
              src="https://ms-report.herokuapp.com/public/dashboard/2831ffa3-6827-4fb8-b88e-ba73d2b5bb58"
              frameborder="0"
              width="100%"
              height="1000px"
              allowtransparency
          ></iframe>
        </b-tab-item>

        <b-tab-item label="Viajes y Estaciones">
          <iframe
              src="https://ms-report.herokuapp.com/public/dashboard/1d9cce90-9344-4fa3-857d-e298717a2782"
              frameborder="0"
              width="100%"
              height="1000px"
              allowtransparency
          ></iframe>
        </b-tab-item>
        <b-tab-item label="RRHH Personal">
          <iframe
              src="https://ms-report.herokuapp.com/public/dashboard/91701028-2511-401e-ae9f-c2b1ca11842b"
              frameborder="0"
              width="100%"
              height="1000px"
              allowtransparency
          ></iframe>
        </b-tab-item>
      </b-tabs>
    </section>
  </div>


</template>

<script>
import TopBar from "../../components/top-bar/topBar";
import src_avatar from '../../assets/img/profile-picture.png';
import {mapGetters} from 'vuex'

export default {
  name: "HomeComponent",
  components: {TopBar},
  data() {
    return {
      src_avatar: src_avatar,
      assignedTo: [
        {nombre: 'Osmel Mojena Dubet', avatar: src_avatar},
        {nombre: 'Jose A. Hernandez Molina', avatar: ''},
        {nombre: 'Nayvis Diaz', avatar: src_avatar},

      ]

    }
  },

  computed: {
    ...mapGetters({})
  }
}
</script>

<style scoped lang="scss">
@import "../../../theme/app";


</style>