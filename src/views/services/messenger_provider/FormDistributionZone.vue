<template>
  <div class="content-page">
    <section>
      <top-bar :page-title="post?'Nueva Zona de Distribucion':'Editar Zona de Distribucion'"/>
      <div class="mt-3 bg-withe p-5 card form-person">
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
              <b-field label="Provincia" label-position="on-border">
                <b-select placeholder="Seleccione"
                          v-model="province"
                          required
                          validation-message="Campo requerido"
                          expanded>
                  <option v-for="(item, index) in provinceList"
                          :key="index"
                          :value="item.id">
                    {{ item.name }}
                  </option>
                </b-select>
              </b-field>
              <b-field label="Municipio" label-position="on-border">
                <b-select placeholder="Seleccione"
                          v-model="municipality"
                          required
                          validation-message="Campo requerido"
                          expanded>
                  <option v-for="(item, index) in municipalityList"
                          :key="index"
                          :value="item.id">
                    {{ item.name }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Cantidad de Kilimotros" label-position="on-border">
                <b-input placeholder="Kilometros"
                         v-model="km"
                         type="text">
                </b-input>
              </b-field>
              <b-field label="Importe" label-position="on-border">
                <b-input placeholder="Importe"
                         v-model="amount"
                         type="text">
                </b-input>
              </b-field>
            </div>
          </div>

          <div class="buttons is-pulled-right">
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

import {mapActions, mapGetters} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import BButton from "buefy/src/components/button/Button";
import {api_distribution_zone} from "@/urls";


export default {
  components: {BButton, TopBar},
  data: () => ({
    schema: {
      fields: []
    },
    name: null,
    km: null,
    address: null,
    province: null,
    municipality: null,
    amount: null,
    municipalityList: [],
    valid: true,
    post: true,
    item_id: null,

    person_object: null,
    fk_enterprise: localStorage.getItem('enterprise_id'),

  }),
  computed: {
    ...mapGetters({
      provinceList: 'GET_PROVINCE_LIST'
    })
  },
  watch: {
    province: async function () {
      this.municipalityList = await this.fetchMunicipality(this.province)
    },
    km:function () {
      this.amount = this.km * 20
    }
  },
  methods: {
    ...mapActions({
      updateValues: 'UPDATE_VALUES',
      saveMessengerProvider: 'SAVE_DISTRIBUTION_ZONE',
      editMessengerProvider: 'EDIT_DISTRIBUTION_ZONE',
      fetchProvinceList: 'FETCH_PROVINCE_LIST',
      fetchMunicipality: 'FETCH_MUNICIPALITY_LIST'
    }),

    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_distribution_zone}${id}/`)
          .then(item => {
            this.name = item.nombre;
            this.municipality = item.id_municipio.id;
            this.province = item.id_provincia.id;
            this.amount = item.importe;
            this.item_id = item.id;
          });
    },

    save() {

      let provider = {
        nombre: this.name,
        id_municipio: this.municipality,
        id_provincia: this.province,
        importe: this.amount,
        fk_empresa: parseInt(this.fk_enterprise),
        id: this.item_id
      };

      if (this.post)
        this.saveMessengerProvider(provider);
      else
        this.editMessengerProvider(provider);
    },
  },


  created() {
    let query = `page_size=100`
    this.fetchProvinceList(query).then(value => {
      this.province = value.find(f=>f.name === 'La Habana').id
    });
    if (this.$route.params.id) {
      this.update_values();
    }
  },

}
</script>
<style scoped lang="scss">

</style>
