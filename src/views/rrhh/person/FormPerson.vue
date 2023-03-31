<template>
  <div class="content-page">
    <section>
      <top-bar :page-title="post?'Nueva Persona':'Editar Persona'"/>
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
              <b-field label="Tipo de Persona" label-position="on-border">
                <multiselect
                    track-by="id"
                    v-model="typePersonValue"
                    :multiple="true"
                    :custom-label="selectText"
                    open-direction="bottom"
                    :show-no-results="false"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :options="type_person_list">
                </multiselect>
              </b-field>
              <b-field label="Provincia" label-position="on-border">
                <multiselect
                    placeholder="Provincia"
                    v-model="provinceValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="provinceList">
                </multiselect>
              </b-field>
              <b-field label="Municipio" label-position="on-border">
                <multiselect
                    placeholder="Municipio"
                    v-model="municipalityValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="municipalityList">
                </multiselect>
              </b-field>


            </div>
            <div class="column is-half">
              <b-field label="Apellidos" label-position="on-border">
                <b-input placeholder="Apellidos"
                         v-model="last_name"
                         required
                         validation-message="Campo requerido"
                         type="text">
                </b-input>
              </b-field>
              <b-field label="CI/DNI/Pasaporte" label-position="on-border">
                <b-input placeholder="CI/DNI/Pasaporte"
                         v-model="dni"
                         required
                         validation-message="Campo requerido"
                         type="text">
                </b-input>
              </b-field>
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
          <div class="columns" v-if="isClient">
            <div class="column is-half">
              <b-field label="Tipo de Cliente" label-position="on-border">
                <multiselect
                    placeholder="Tipo de Cliente"
                    v-model="client.typeClient"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="typeClientList">
                </multiselect>
              </b-field>
              <b-checkbox v-model="client.active">Activo</b-checkbox>
              <div class="is-flex is-justify-content-space-between mt-5 mb-5">
                <b-checkbox v-model="client.haveDiscount">Tiene Descuento</b-checkbox>
                <b-field v-if="client.haveDiscount" label="Monto del Descuento" label-position="on-border">
                  <b-input placeholder="Monto del Descuento"
                           v-model="client.discount"
                           :required="client.discount"
                           validation-message="Campo requerido"
                           type="number">
                  </b-input>
                </b-field>
              </div>
              <b-checkbox v-model="client.blackList">Lista Negra</b-checkbox>

            </div>
            <div class="column is-half" v-if="isHabitual">
              <b-field label="Tipo de Subscripcion" label-position="on-border">
                <multiselect
                    placeholder="Tipo de Subscripcion"
                    v-model="client.typeSubscription"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="typeSubscriptionList">
                </multiselect>
              </b-field>

              <b-field label="Cantidad de Horas" label-position="on-border">
                <b-input placeholder="Cantidad de Horas"
                         v-model="client.countHours"
                         type="text">
                </b-input>
              </b-field>
              <b-field label="Fecha de Inscripcion" label-position="on-border">
                <b-datepicker
                    v-model="client.initDate"
                    :show-week-number="false"
                    placeholder="Fecha de Inscripcion"
                    trap-focus
                >
                </b-datepicker>
              </b-field>
              <b-field label="Fecha de Vencimiento" label-position="on-border">
                <b-datepicker
                    v-model="client.endDate"
                    :show-week-number="false"
                    placeholder="Fecha de Vencimiento"
                    trap-focus
                >
                </b-datepicker>
              </b-field>
            </div>
          </div>

          <vue-form-generator :schema="schema"></vue-form-generator>
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
import {api_persona} from "@/urls";
import VueFormGenerator from "vue-form-generator";
import Multiselect from "vue-multiselect";
import {SUBSCRIPTION_TYPE, TYPE_CLIENT} from '@/enum';


export default {
  components: {Multiselect, BButton, TopBar, "vue-form-generator": VueFormGenerator.component},
  data: () => ({
    schema: {
      fields: []
    },
    name: null,
    last_name: null,
    dni: null,
    address: null,
    phone: null,
    province: null,
    provinceValue: null,
    municipality: null,
    municipalityValue: null,
    type_person: [],
    typePersonValue: [],
    municipalityList: [],
    type_person_list: [],
    type_person_selected: [],
    valid: true,
    post: true,
    item_id: null,

    person_object: null,
    attributes_img: [],
    renderImageName: [],
    attributes: [],
    fk_enterprise: localStorage.getItem('enterprise_id'),
    typeClientList: Object.values(TYPE_CLIENT),
    typeSubscriptionList: Object.values(SUBSCRIPTION_TYPE),
    isHabitual: false,
    isClient: false,
    client: {
      typeClient: null,
      typeSubscription: null,
      initDate: null,
      endDate: null,
      active: true,
      haveDiscount: false,
      discount: null,
      countHours: null,
      blackList: false
    }

  }),
  computed: {
    ...mapGetters({
      attributesRender: 'GET_ATTRIBUTES_RENDER',
      provinceList: 'GET_PROVINCE_LIST'
    })
  },
  watch: {
    provinceValue: async function () {
      this.province = this.provinceValue.id
      this.municipalityList = await this.fetchMunicipality(this.provinceValue.id)
    },
    municipalityValue: async function () {
      this.municipality = this.municipalityValue.id
    },
    'typePersonValue': function () {
      let temp = [];
      this.typePersonValue.forEach(item => {
        this.isClient = item.nombre.toLowerCase() === 'cliente';
        temp.push(item.id)
      })
      this.type_person_selected = temp
    },
    'client.typeClient': function () {
      this.isHabitual = this.client.typeClient === TYPE_CLIENT.HABITUAL;
    }
  },
  methods: {
    ...mapActions({
      getAttributesNomType: 'GET_ATTRIBUTES_NOM_TYPE',
      updateValues: 'UPDATE_VALUES',
      savePerson: 'SAVE_PERSON',
      saveClient: 'SAVE_CLIENT',
      editClient: 'SAVE_CLIENT',
      editPerson: 'EDIT_PERSON',
      fetchTypePersons: 'FETCH_TYPE_PERSON',
      fetchProvinceList: 'FETCH_PROVINCE_LIST',
      fetchMunicipality: 'FETCH_MUNICIPALITY_LIST'
    }),
    formatYYYYMMDD(value) {
      const date = new Date(value)
      if (value && !isNaN(date)) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return year + '-' +
            ((month < 10 ? '0' : '') + month) + '-' +
            ((day < 10 ? '0' : '') + day)
      }
      return ''
    },
    selectName({name}) {
      return name
    },
    selectText({nombre}) {
      return nombre
    },
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_persona}${id}/`)
          .then(async item => {
            this.name = item.nombre;
            this.last_name = item.apellidos;
            this.dni = item.dni;
            this.address = item.direccion;
            this.provinceValue = this.provinceList.find(f => f.id === item.provincia);
            this.municipalityList = await this.fetchMunicipality(item.provincia)
            this.municipalityValue = this.municipalityList.find(f => f.id === item.municipio);
            this.phone = item.telefono;
            item.fk_tipo_persona.forEach(val => {
              this.typePersonValue.push(val)
            })
            console.log(this.type_person);
            this.item_id = item.id;
            this.getAttributesNomType(1);

          });
    },

    async save() {
      let object = {
        nombre: this.name,
        apellidos: this.last_name,
        dni: this.dni,
        provincia: this.province,
        municipio: this.municipality,
        direccion: this.address,
        telefono: this.phone,
        fk_tipo_persona: this.type_person_selected,
        fk_empresa_id: parseInt(this.fk_enterprise),
        atributos: JSON.stringify(this.attributes),
        isClient: this.isClient,
        id: this.item_id
      };

      if (this.post){
        const person = await this.savePerson(object)
        if (this.isClient){
          let client = {
            fk_cliente: person.id,
            tipo_cliente: this.client.typeClient,
            tipo_suscripcion: this.client.typeSubscription,
            descuento: this.client.discount,
            tiene_descuento: this.client.haveDiscount,
            activo: this.client.active,
            lista_negra: this.client.blackList,
            fk_empresa_id: parseInt(this.fk_enterprise),
            fecha_incripcion: this.formatYYYYMMDD(this.client.initDate),
            fecha_vencimiento: this.formatYYYYMMDD(this.client.endDate),
            cantidad_horas: this.client.countHours
          }
          this.saveClient(client)
        }
      }
      else{
        this.editPerson(object);
      }
    },
    getTypePerson() {
      let query = '?page_size=100'
      this.fetchTypePersons(query)
          .then(response => {
            this.type_person_list = response.results.filter(item => item.deleted === false);
          });
    },
  },


  created() {
    this.getAttributesNomType(1);
    this.getTypePerson();
    this.fetchProvinceList();
    if (this.$route.params.id) {
      this.update_values();
    }
  },

}
</script>
<style scoped lang="scss">

</style>
