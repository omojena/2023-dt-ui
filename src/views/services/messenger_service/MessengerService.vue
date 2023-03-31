<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Servicio de mensajería"/>
      <div class="mt-3 bg-withe p-5 card">
        <div class="columns">
          <div class="column is-half">
            <section>
              <label semi-bold class="client-data">Origen</label>
            </section>

            <b-field class="mt-4" label="Provvedor del Servicio" label-position="on-border">
              <b-select placeholder="Seleccione"
                        v-model="messengerProvider"
                        required
                        validation-message="Campo requerido"
                        expanded>
                <option v-for="(item, index) in messengerProviderList"
                        :key="index"
                        :value="item.id">
                  {{ item.nombre }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Factura" label-position="on-border">
              <b-input placeholder="Factura"
                       v-model="service.factura"
                       required
                       validation-message="Campo requerido"
                       type="text">
              </b-input>
            </b-field>

    <b-field label="Importe" label-position="on-border">
              <b-input placeholder="Importe"
                       v-model="service.importe"
                       required
                       validation-message="Campo requerido"
                       type="number">
              </b-input>
            </b-field>

          </div>
          <div class="column is-half">
            <section>
              <label semi-bold class="client-data">Destino</label>
            </section>
            <b-field class="mt-4" label="Provincia" label-position="on-border">
              <b-select placeholder="Seleccione"
                        v-model="provinceDestino"
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

            <div class="columns">
              <div class="column is-half">
                <b-field label="Municipio" label-position="on-border">
                  <b-select placeholder="Seleccione"
                            v-model="service.destino.municipality"
                            required
                            validation-message="Campo requerido"
                            expanded>
                    <option v-for="(item, index) in municipalityListDestino"
                            :key="index"
                            :value="item.id">
                      {{ item.name }}
                    </option>
                  </b-select>
                </b-field>

              </div>
              <div class="column is-half">
                <b-field label="Zona" label-position="on-border">
                  <b-select placeholder="Seleccione"
                            v-model="zone"
                            required
                            validation-message="Campo requerido"
                            expanded>
                    <option v-for="(item, index) in zoneList"
                            :key="index"
                            :value="item">
                      {{ item.nombre }}
                    </option>
                  </b-select>
                </b-field>
              </div>
            </div>


          </div>
        </div>
        <div class="columns">
          <div class="column is-full">
            <b-field label="Descripcion" label-position="on-border">
                                <textarea
                                    class="textarea"
                                    placeholder="Descripcion"
                                    v-model="service.description"
                                    rows="5"
                                >
                                </textarea>
            </b-field>
          </div>
        </div>
        <div class="buttons is-flex is-justify-content-flex-end">
          <b-button @click="save" class="btn-global btn-accept is-rounded form mt-3"><span
              lg-font regular main-color>Guardar</span>
          </b-button>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import TopBar from "@/components/top-bar/topBar";
import {mapActions, mapGetters} from "vuex";
import {TYPE_SERVICE} from "@/enum";
import {api_service_messenger} from "@/urls";

export default {
  name: "MessengerService",
  components: {TopBar},
  data() {
    return {
      post: true,
      zoneList: [],
      zone: null,
      messengerProviderList: [],
      messengerProvider: null,
      municipalityListDestino: [],
      provinceList: [],
      provinceDestino: null,
      item_id: null,
      service: {
        nombre: 'Mensajeria',
        proveedor: null,
        description: null,
        type: TYPE_SERVICE.MESSENGER,
        destino: {province: null, municipality: null, address: null, lat: null, log: null, zone: null},
        importe: null,
        factura: null,

      }
    }
  },
  computed: {
    ...mapGetters({
      enterpriseAuth: 'GET_ENTERPRISE_AUTH',
    })
  },
  watch: {
    zone: function () {
      this.service.importe = this.zone.importe;
      this.service.destino.zone = this.zone.id;
    },
    messengerProvider: function () {
      this.service.proveedor = this.messengerProvider
    },
    provinceDestino: function () {
      this.service.destino.province = this.provinceDestino
      this.fetchMunicipality(`${this.provinceDestino}&page_size=50`)
          .then(value => {
            this.municipalityListDestino = value
          })
    },
    'service.destino.municipality': function () {
      this.fetchDistributionZoneList('?page_size=50')
          .then(value => {
            this.zoneList = value.results.filter(f => f.id_municipio.id === this.service.destino.municipality)
          });
    }
  },
  methods: {
    ...mapActions({
      fetchProvinceList: 'FETCH_PROVINCE_LIST',
      fetchProvince: 'FETCH_PROVINCE',
      fetchMunicipality: 'FETCH_MUNICIPALITY_LIST',
      saveService: 'SAVE_SERVICE_MESSENGER',
      editService: 'EDIT_SERVICE_MESSENGER',
      fetchMessengerProviderList: 'FETCH_MESSENGER_PROVIDER_LIST',
      fetchDistributionZoneList: 'FETCH_DISTRIBUTION_ZONE_LIST',
      updateValues: 'UPDATE_VALUES',

    }),
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_service_messenger}${id}/`)
          .then(async item => {
            this.service.nombre = item.nombre;
            this.service.description = item.descripcion;
            this.service.importe = item.importe;
            this.service.destino.municipality = item.destino.municipality;
            this.provinceDestino = item.destino.province;
            this.service.factura = item.factura;
            this.messengerProvider = item.proveedor.id;
            this.zone = item.destino.zone;
            this.item_id = item.id
          });
    },

    save() {
      if (this.post) {
        this.saveService(this.service)
      } else {
        this.service['id'] = this.item_id;
        this.editService(this.service)
      }

    }
  },
  created() {
    if (this.$route.params.id) {
      this.post = false;
      this.update_values();
    }
    this.fetchProvinceList('?page_size=100')
        .then(value => {
          this.provinceList = value
        })
    this.fetchMessengerProviderList()
        .then(value => {
          this.messengerProviderList = value.results
        });
  }
}
</script>

<style scoped lang="scss">
.client-data {
  font-size: 17px;
  color: #000000;
}
</style>
