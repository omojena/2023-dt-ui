<template>
  <div class="content-page">
    <section>
      <top-bar :page-title="post?'Nuevo Proveedor de Mensajeria':'Editar  Proveedor de Mensajeria'"/>
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
              <b-field label="Telefono" label-position="on-border">
                <b-input placeholder="Telefono"
                         v-model="phone"
                         type="text">
                </b-input>
              </b-field>
              <b-field label="Dirección" label-position="on-border">
                <b-input placeholder="Domicilio temporal o permanente en Cuba"
                         v-model="address"
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
import {api_messenger_provider} from "@/urls";


export default {
  components: {BButton, TopBar},
  data: () => ({
    schema: {
      fields: []
    },
    name: null,
    address: null,
    province: null,
    municipality: null,
    phone: null,
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
    }
  },
  methods: {
    ...mapActions({
      updateValues: 'UPDATE_VALUES',
      saveMessengerProvider: 'SAVE_MESSENGER_PROVIDER',
      editMessengerProvider: 'EDIT_MESSENGER_PROVIDER',
      fetchProvinceList: 'FETCH_PROVINCE_LIST',
      fetchMunicipality: 'FETCH_MUNICIPALITY_LIST'
    }),

    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_messenger_provider}${id}/`)
          .then(item => {
            this.name = item.nombre;
            this.address = item.direccion;
            this.province = item.provincia.id;
            this.municipality = item.municipio.id;
            this.phone = item.telefono;
            this.item_id = item.id;
          });
    },

    save() {

      let provider = {
        nombre: this.name,
        provincia: this.province,
        municipio: this.municipality,
        direccion: this.address,
        telefono: this.phone,
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
    this.fetchProvinceList();
    if (this.$route.params.id) {
      this.update_values();
    }
  },

}
</script>
<style scoped lang="scss">

</style>
