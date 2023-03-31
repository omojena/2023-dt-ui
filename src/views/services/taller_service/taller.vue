<template>
  <div class="content-page">
    <section>
      <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          :manual-pagination="false"
          :pdf-quality="2"
          pdf-format="a4"
          filename="Vale Taller"
          pdf-content-width="800"
          @progress="onProgress($event)"
          @hasStartedGeneration="hasStartedGeneration()"
          @hasGenerated="hasGenerated($event)"
          ref="html2Pdf"

      >
        <section class="report-pdf" slot="pdf-content" id="vale">
          <table>
            <tr class="px-5">
              <th v-if="taller"><span class="taller">Taller:</span> {{taller.nombre}} <span class="ml-3">Atiende:
              <span v-for="(item, idx) in workerValue" :key="idx">
                {{ item.nombre }}<span v-if="idx < workerValue.length -1">,</span>
              </span>
            </span></th>
              <th><span>Fecha</span> <span>{{ formatYYYYMMDD(tallerObject.date_start) }}</span></th>
            </tr>
            <tr>
              <td>
                <table class="no-border">
                  <tr>
                    <td style="padding: 0 5px;"><span bold>Servicios</span></td>
                    <td style="padding: 0 5px;"><span bold>Precios</span></td>
                  </tr>
                </table>
              </td>

              <td>
                <table class="no-border">
                  <tr>
                    <td style="padding: 0 5px;"><span bold>Productos</span></td>
                    <td style="padding: 0 5px;"><span bold>Precios</span></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table style="border-right: 1px solid">
                  <tr v-for="(item, idx) in servicesValue" :key="idx+'_service'">
                    <td style="padding: 0 5px;"><span>{{item.nombre}}</span></td>
                    <td style="padding: 0 5px;"><span>{{item.precio}} CUP</span></td>
                  </tr>
                </table>
              </td>

              <td>
                <table style="border-left: 1px solid">
                  <tr v-for="(item, idx) in productsValue" :key="idx+'_products'">
                    <td style="padding: 0 5px;"><span>{{item.nombre}}</span></td>
                    <td style="padding: 0 5px;"><span>
                    {{item.precio_venta}}x{{tallerObject.product_selected_count[item.id]}}=
                    {{item.precio_venta * tallerObject.product_selected_count[item.id]}} CUP
                  </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table>
                  <td style="padding: 0 5px;"><span bold>Subtotal:</span></td>
                  <td style="padding: 0 5px;"><span>{{subTotalService}} CUP</span></td>
                </table>
              </td>

              <td>
                <table>
                  <td style="padding: 0 5px;"><span bold>Subtotal:</span></td>
                  <td style="padding: 0 5px;"><span>{{subTotalProduct}} CUP</span></td>
                </table>
              </td>
            </tr>
            <tr><td style="padding: 0 5px;"><span bold>Total: </span> {{subTotalService + subTotalProduct}} CUP</td></tr>
            <tr><td style="padding: 0 5px;"><span bold>Cliente:</span> {{tallerObject.name}}</td></tr>
          </table>
          <table>
            <tr>
              <td style="padding: 0 5px;">
                <span bold>Garant&iacute;a:</span>
                <span bold> SI <b-checkbox v-if="tallerObject.is_warranty" :value="true"></b-checkbox> <span v-else>___</span></span>
                <span bold>D&iacute;as: <span v-if="!tallerObject.warranty">___</span><span v-else style="text-decoration: underline">{{tallerObject.warranty}}</span></span> ,
                <span bold>NO ____</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 5px;"><span bold>Observaciones:</span> <br>
                <textarea
                    readonly
                    v-model="tallerObject.description"
                    class="textarea"
                    rows="5"
                >
                                </textarea>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 5px;" v-if="taller"><span bold>Tel&eacute;fonos:</span>{{taller.telefono}}</td>
            </tr>
            <tr class="is-flex is-justify-content-space-between px-5">
              <td><span bold>Marca:</span> {{tallerObject.brand}}</td>
              <td><span bold>Tama&ntilde;o:</span> {{tallerObject.size}}</td>
              <td><span bold>Color:</span> {{tallerObject.color}}</td>
            </tr>
          </table>
        </section>
      </vue-html2pdf>

      <top-bar page-title="Servicio de Taller"/>
      <div class="mt-3 bg-withe p-5 card">
        <section>
<!--          <section>-->
<!--            <label semi-bold class="client-data">Datos del Cliente</label>-->
<!--          </section>-->
<!--          <div class="columns mt-1">-->
<!--            <div class="column is-half">-->
<!--              <b-field label="CI/DNI/Pasaporte" label-position="on-border">-->
<!--                <b-input placeholder="CI/DNI/Pasaporte"-->
<!--                         v-model="tallerObject.dni"-->
<!--                         required-->
<!--                         validation-message="Campo requerido"-->
<!--                         icon-right-clickable-->
<!--                         @icon-right-click="searchClient"-->
<!--                         icon-right="account-search"-->
<!--                         type="text">-->
<!--                </b-input>-->
<!--              </b-field>-->
<!--              <div class="columns">-->
<!--                <div class="column is-6">-->
<!--                  <b-field label="Nombre" label-position="on-border">-->
<!--                    <b-input placeholder="Nombre"-->
<!--                             v-model="tallerObject.name"-->
<!--                             required-->
<!--                             validation-message="Campo requerido"-->
<!--                             type="text">-->
<!--                    </b-input>-->
<!--                  </b-field>-->
<!--                </div>-->
<!--                <div class="column is-6">-->
<!--                  <b-field label="Apellidos" label-position="on-border">-->
<!--                    <b-input placeholder="Nombre"-->
<!--                             v-model="tallerObject.last_name"-->
<!--                             required-->
<!--                             validation-message="Campo requerido"-->
<!--                             type="text">-->
<!--                    </b-input>-->
<!--                  </b-field>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="columns mb-0">-->
<!--                <div class="column">-->
<!--                  <b-field label="Nacionalidad" label-position="on-border">-->
<!--                    <b-input placeholder="Nacionalidad"-->
<!--                             v-model="tallerObject.nationality"-->
<!--                             validation-message="Campo requerido"-->
<!--                             type="text">-->
<!--                    </b-input>-->
<!--                  </b-field>-->
<!--                </div>-->
<!--                <div class="column">-->
<!--                  <b-field label="Teléfono" label-position="on-border">-->
<!--                    <b-input placeholder="Teléfono"-->
<!--                             v-model="tallerObject.phone"-->
<!--                             validation-message="Campo requerido"-->
<!--                             type="text">-->
<!--                    </b-input>-->
<!--                  </b-field>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="column is-half">-->
<!--              <div class="columns">-->
<!--                <div class="column is-6">-->
<!--                  <b-field label="Provincia" label-position="on-border">-->
<!--                    <b-select placeholder="Seleccione"-->
<!--                              v-model="province"-->
<!--                              required-->
<!--                              validation-message="Campo requerido"-->
<!--                              expanded>-->
<!--                      <option v-for="(item, index) in provinceList"-->
<!--                              :key="index"-->
<!--                              :value="item.id">-->
<!--                        {{ item.name }}-->
<!--                      </option>-->
<!--                    </b-select>-->
<!--                  </b-field>-->
<!--                </div>-->
<!--                <div class="column is-6">-->
<!--                  <b-field label="Municipio" label-position="on-border">-->
<!--                    <b-select placeholder="Seleccione"-->
<!--                              v-model="tallerObject.municipality"-->
<!--                              required-->
<!--                              validation-message="Campo requerido"-->
<!--                              expanded>-->
<!--                      <option v-for="(item, index) in municipalityList"-->
<!--                              :key="index"-->
<!--                              :value="item.id">-->
<!--                        {{ item.name }}-->
<!--                      </option>-->
<!--                    </b-select>-->
<!--                  </b-field>-->
<!--                </div>-->
<!--              </div>-->
<!--              <b-field class="mt-1" label="Dirección" label-position="on-border">-->
<!--                <b-input placeholder="Domicilio temporal o permanente en Cuba"-->
<!--                         v-model="tallerObject.address"-->
<!--                         validation-message="Campo requerido"-->
<!--                         type="text">-->
<!--                </b-input>-->
<!--              </b-field>-->
<!--              <div class="columns">-->
<!--                <div class="column">-->
<!--                  <b-field label="Correo Electrónico" label-position="on-border">-->
<!--                    <b-input placeholder="Correo Electrónico"-->
<!--                             v-model="tallerObject.email"-->
<!--                             validation-message="Formato incorrecto"-->
<!--                             type="email">-->
<!--                    </b-input>-->
<!--                  </b-field>-->
<!--                </div>-->
<!--                <div class="column">-->
<!--                  <b-field label="Fecha de Nacimiento" label-position="on-border">-->
<!--                    <b-datepicker-->
<!--                        v-model="tallerObject.birthdate"-->
<!--                        :show-week-number="false"-->
<!--                        placeholder="Fecha de Nacimiento"-->
<!--                        trap-focus-->
<!--                    >-->
<!--                    </b-datepicker>-->
<!--                  </b-field>-->
<!--                </div>-->
<!--              </div>-->

<!--            </div>-->
<!--          </div>-->
          <section>
            <label semi-bold class="client-data">Datos del Servicio</label>
            <div class="columns mt-3">
              <div class="column">
                <b-field label="Taller" label-position="on-border">
                  <multiselect
                      placeholder="Taller"
                      v-model="taller"
                      :custom-label="selectName"
                      open-direction="bottom"
                      :show-no-results="false"
                      :options="tallerList">
                  </multiselect>
                </b-field>
              </div>
            </div>
          </section>
          <div class="columns ">
            <div class="column">
              <div class="columns">
                <div class="column">
                  <b-field label="Entrada" label-position="on-border">
                    <b-datepicker
                        v-model="tallerObject.entry_date"
                        :show-week-number="false"
                        placeholder="Fecha de Entrada"
                        trap-focus
                    >
                    </b-datepicker>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="Salida" label-position="on-border">
                    <b-datepicker
                        v-model="tallerObject.departure_date"
                        :show-week-number="false"
                        placeholder="Fecha de Salida"
                        trap-focus
                    >
                    </b-datepicker>
                  </b-field>
                </div>
              </div>

            </div>
            <div class="column">
              <b-field label="Cuenta de Ingreso" label-position="on-border">
                <b-select placeholder="Cuenta de Ingreso"
                          v-model="tallerObject.type_income"
                          expanded>
                  <option
                      v-for="item in list_type_income.results"
                      :key="item.id"
                      :value="item.id">
                    {{ item.nombre }}
                  </option>
                </b-select>
              </b-field>
            </div>
          </div>
          <div class="columns ">
            <div class="column is-half">
              <b-field label="Servicios" label-position="on-border">
                <multiselect
                    :multiple="true"
                    placeholder="Servicios"
                    v-model="servicesValue"
                    track-by="id"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :options="service_list">
                </multiselect>
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Productos" label-position="on-border">
                <multiselect
                    :multiple="true"
                    placeholder="Productos"
                    v-model="productsValue"
                    track-by="id"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :options="product_list">
                </multiselect>
              </b-field>

            </div>
          </div>

          <section v-if="tallerObject.product_selected_all.length">
            <div class="columns is-flex is-justify-content-center"
                 v-for="(item, idx) in tallerObject.product_selected_all" :key="idx"
            >
              <div class="column">
                {{ item.nombre }}-- Precio --> {{ item.precio_venta }}
              </div>
              <div class="column is-flex is-justify-content-center">
                <b-field label="Cantidad" label-position="on-border">
                  <b-input :value="1" v-model="tallerObject.product_selected_count[item.id]" placeholder="Cantidad"
                           type="number">
                  </b-input>
                </b-field>
              </div>
            </div>
          </section>

          <div class="columns mt-1">
            <div class="column is-half">
              <b-field label="Trabajadores" label-position="on-border">
                <multiselect
                    :multiple="true"
                    placeholder="Trabajadores"
                    v-model="workerValue"
                    track-by="id"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :options="workers_list">
                </multiselect>
              </b-field>
            </div>
            <div class="column is-half">

              <div class="columns">
                <div class="column is-5">
                  <b-field label="Importe Total" label-position="on-border">
                    <b-input placeholder="Importe Total"
                             v-model="tallerObject.total"
                             required
                             type="number">
                    </b-input>
                  </b-field>
                </div>
                <div class="column is-7">
                  <div class="is-flex is-justify-content-space-between mb-5">
                    <b-checkbox v-model="tallerObject.have_guarantee"><span bold>Garantia</span></b-checkbox>
                    <b-field v-if="tallerObject.have_guarantee" label="Dias" label-position="on-border">
                      <b-input v-model="tallerObject.warranty" placeholder="Cant. Dias"
                               type="number">
                      </b-input>
                    </b-field>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <section>
            <label semi-bold class="client-data">Datos de la Bicicleta</label>
          </section>
          <div class="columns mt-1">
            <div class="column is-half">
              <b-field label="Marca" label-position="on-border">
                <b-input placeholder="Marca"
                         v-model="tallerObject.brand"
                         required
                         validation-message="Campo requerido"
                         type="text">
                </b-input>
              </b-field>
              <div class="columns">
                <div class="column">
                  <b-field label="Tamaño" label-position="on-border">
                    <b-input placeholder="Tamaño"
                             v-model="tallerObject.size"
                             required
                             validation-message="Campo requerido"
                             type="text">
                    </b-input>
                  </b-field>
                  <b-field class="file is-btn-color"
                           :class="{'has-name':!!tallerObject.before_pic}">
                    <b-upload v-model="file_before_pic" class="file-label">
                                    <span class="file-cta">
                                        <b-icon class="file-icon" icon="upload"></b-icon>
                                        <span class="file-label">Foto Antes</span>
                                    </span>
                    </b-upload>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="Color" label-position="on-border">
                    <b-input placeholder="Color"
                             v-model="tallerObject.color"
                             required
                             validation-message="Campo requerido"
                             type="text">
                    </b-input>
                  </b-field>
                  <b-field class="file is-btn-color"
                           :class="{'has-name':!!tallerObject.after_pic}">
                    <b-upload v-model="file_after_pic" class="file-label">
                                    <span class="file-cta">
                                        <b-icon class="file-icon" icon="upload"></b-icon>
                                        <span class="file-label">Foto Después</span>
                                    </span>
                    </b-upload>
                  </b-field>
                </div>
              </div>
            </div>
            <div class="column is-half">
              <b-field label="Modelo" label-position="on-border">
                <b-input placeholder="Modelo"
                         v-model="tallerObject.model"
                         required
                         validation-message="Campo requerido"
                         type="text">
                </b-input>
              </b-field>
              <b-field label="Tipo" label-position="on-border">
                <b-input placeholder="Tipo"
                         v-model="tallerObject.type"
                         required
                         validation-message="Campo requerido"
                         type="text">
                </b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-7">
              <b-field label="Observaciones" label-position="on-border">
                                <textarea
                                    v-model="tallerObject.observations"
                                    class="textarea"
                                    placeholder="Observaciones"
                                    rows="5"
                                >
                                </textarea>
              </b-field>
            </div>
            <div class="column is-5" v-if="attaches.length">
              <div class="columns is-flex is-flex-direction-column">
                <div class="column is-3">
                  <b-button class="btn-new btn-global btn-clean"
                            @click="attach=!attach">
                    <span lg-font regular>Ver Adjuntos</span>
                  </b-button>

                </div>
                <div class="column is-9" v-if="attach">
                  <b-carousel
                      :autoplay="false"
                      with-carousel-list
                      :indicator="false"
                      :overlay="gallery"
                  >
                    <b-carousel-item v-for="(item, i) in attaches" :key="i">
                      <figure @click="showImg(item)" class="image">
                        <img :src="item" alt="">
                      </figure>
                    </b-carousel-item>
                    <span v-if="gallery" class="modal-close is-large"></span>
                    <template slot="list" slot-scope="props">
                      <b-carousel-list
                          v-model="props.active"
                          :data="attaches"
                          v-bind="al"
                          @switch="props.switch($event, false)"
                          as-indicator
                      ></b-carousel-list>
                    </template>

                  </b-carousel>
                  <b-modal v-model="isImageModalActive" :width="640" scroll="keep">
                    <p class="image is-4by3">
                      <img :src="imgModal">
                    </p>
                  </b-modal>
                </div>
              </div>
            </div>
          </div>

          <div class="buttons is-flex is-justify-content-center">
            <b-button @click="generateReport" class="btn-global btn-accept is-rounded form mt-3"><span
                lg-font regular main-color>Guardar</span>
            </b-button>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import TopBar from "../../../components/top-bar/topBar";
import BDatepicker from "buefy/src/components/datepicker/Datepicker";
import BCarousel from "buefy/src/components/carousel/Carousel";
import BCarouselItem from "buefy/src/components/carousel/CarouselItem";
import BCarouselList from "buefy/src/components/carousel/CarouselList";
import {api_service_taller} from "@/urls";
import {mapGetters, mapActions} from "vuex";
import {TYPE_SERVICE} from "@/enum";
import Multiselect from "vue-multiselect";
import VueHtml2pdf from '@/components/vue-html2pdf'

export default {
  name: "taller",
  components: {BCarouselList, BCarouselItem, BCarousel, BDatepicker, TopBar, Multiselect, VueHtml2pdf
  },
  data() {
    return {
      taller:null,
      tallerList: [],
      workerValue: [],
      servicesValue: [],
      productsValue: [],
      workers_list: [],
      workers_list_custom: [],
      product_list: [],
      service_list: [],
      keepFirst: false,
      openOnFocus: false,
      selected: null,
      clearable: false,
      municipalityList: [],
      province: null,
      subTotalService:0,
      subTotalProduct:0,

      tallerObject: {
        deleted: true,
        name: '',
        description: '',
        warranty: 0,
        have_guarantee: true,
        brand: '',
        model: '',
        size: '',
        color: '',
        type: TYPE_SERVICE.TALLER,
        entry_date: null,
        departure_date: null,
        total: 0,
        observations: '',
        slug: '',
        created_by: null,
        updated_by: null,
        fk_enterprise: null,
        fk_account: null,
        fk_income_type: null,
        fk_client: null,
        services: null,


        last_name: '',
        dni: null,
        phone: null,
        province: null,
        nationality: null,
        municipality: null,
        address: null,
        email: null,
        birthdate: null,

        is_warranty: false,
        workers_selected: [],
        workers_selected_all: [],
        product_selected: [],
        product_selected_count: {},
        product_selected_all: [],
        service_selected: [],
        date_start: null,
        date_end: null,
        amount_service: null,

        kind: null,
        type_income: null,
        after_pic: null,
        before_pic: null,
      },

      file_after_pic: null,
      file_before_pic: null,
      gallery: false,
      attach: false,

      post: true,
      isImageModalActive: false,
      imgModal: null,
      al: {
        hasGrayscale: false,
        itemsToShow: 2,
      },
      attaches: []

    }
  },
  methods: {
    ...mapActions({
      fetchPersonList: 'FETCH_PERSON_LIST',
      fetchProductList: 'FETCH_PRODUCT',
      fetchSimpleOffer: 'FETCH_SIMPLE_OFFERS',
      fetchGroupedOffer: 'FETCH_GROUP_OFFERS',
      saveService: 'SAVE_SERVICE_TALLER',
      editService: 'EDIT_SERVICE_TALLER',
      fetchMunicipality: 'FETCH_MUNICIPALITY_LIST',
      fetchProvinceList: 'FETCH_PROVINCE_LIST',
      fetchTypeIncome: 'FETCH_TYPE_INCOME',
      updateValues: 'UPDATE_VALUES',
      fetchTaller: 'FETCH_AREAS'

    }),

    selectName({nombre}) {
      return nombre;
    },
    onProgress(event) {
      console.log(event);
    },
    hasGenerated(event) {
      console.log(event);
    },
    hasStartedGeneration() {
    },
    generateReport() {
      this.save().then(value => {
        if (value){
          this.$refs.html2Pdf.generatePdf()
        }
      })

    },

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
    getServicesList() {
      let query = `?page_size=1000`
      this.fetchSimpleOffer(query).then(list => {
        list.results.forEach(item => {
          this.service_list.push(item)
        })
      })
      this.fetchGroupedOffer().then(list => {
        list.results.forEach(item => {
          this.service_list.push(item)
        })
      })
    },
    getProductList() {
      let query = `?page_size=1000`
      this.fetchProductList(query).then(list => {
        list.results.forEach(item => {
          if (item.producto_final) {
            this.product_list.push(item)
          }
        })
      })
    },
    getTallerList() {
      let query = `?page_size=1000`
      this.fetchTaller(query).then(list => {
        list.results.forEach(item => {
          if (item.is_taller) {
            this.tallerList.push(item)
          }
        })
      })
    },
    getPersonList() {
      let query = `?page_size=1000`
      this.fetchPersonList(query).then(value => {
        value.results.forEach(item => {
          this.workers_list_custom = value.results;
          if (item.fk_tipo_persona.find(p => p.nombre.toLowerCase() === 'trabajador')) {
            this.workers_list.push(item)
          }
        })
      })
    },
    searchClient() {
      let person = this.workers_list_custom.find(el => el.dni === this.tallerObject.dni);
      if (person) {
        this.tallerObject.name = person.nombre
        this.tallerObject.last_name = person.apellidos
        this.tallerObject.dni = person.dni
        this.province = person.provincia.id
        this.tallerObject.municipality = person.municipio.id
        this.tallerObject.address = person.direccion
        this.tallerObject.phone = person.telefono
      }
    },
    showImg(img) {
      this.isImageModalActive = true;
      this.imgModal = img;
    },
    getImgUrl(file, id) {

      if (file !== undefined) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener('load', () => {
          switch (id) {
            case 1:
              this.tallerObject.after_pic = fr.result;
              break;
            case 2:
              this.tallerObject.before_pic = fr.result;
              break;
            default:
              return fr.result;
          }
          this.setAttaches(fr.result)
        })
      }
    },

    setAttaches(img) {
      if (this.attaches.indexOf(img) === -1) {
        this.attaches.push(img)
      }
    },
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_service_taller}${id}/`)
          .then(item => {
            this.tallerObject.name = item.nombre_cliente;
            this.tallerObject.last_name = item.apellidos_cliente;
            this.tallerObject.dni = item.dni;
            this.tallerObject.nationality = item.nacionalidad;
            this.province = item.provincia;
            this.tallerObject.municipality = item.municipio;
            this.tallerObject.address = item.direccion;
            this.tallerObject.email = item.correo;
            this.tallerObject.birthdate = item.fecha_nacimiento;
            this.tallerObject.phone = item.movil;

            this.tallerObject.service_selected = item.servicios;
            this.tallerObject.product_selected = item.productos
            this.tallerObject.warranty = item.garantia;
            this.tallerObject.is_warranty = item.is_garantia;
            this.tallerObject.brand = item.marca;
            this.tallerObject.model = item.modelo;
            this.tallerObject.size = item.tamano;
            this.tallerObject.color = item.color;
            this.tallerObject.kind = item.tipo;
            this.tallerObject.date_start = item.fecha_entrada;
            this.tallerObject.date_end = item.fecha_salida;
            this.tallerObject.amount_service = item.importe_total;
            this.tallerObject.description = item.observaciones;
            this.tallerObject.before_pic = item.foto_antes;
            this.tallerObject.after_pic = item.foto_despues;
            this.tallerObject.type_income = item.tipo_ingreso;
            this.item_id = item.id
          });
    },
    getTotalProducts(){
      this.subTotalProduct = 0;
      for (const key in this.tallerObject.product_selected_count) {
        let prod = this.productsValue.find(f=>f.id === Number(key))
        this.subTotalProduct += prod.precio_venta * this.tallerObject.product_selected_count[key]
      }
    },
    save() {
      this.getTotalProducts();
      this.tallerObject.amount_service = this.total
      let saveObjetc = {
        nombre: 'Servicio de Taller',
        nombre_cliente: this.tallerObject.name,
        apellidos_cliente: this.tallerObject.last_name,
        dni: this.tallerObject.dni,
        nacionalidad: this.tallerObject.nationality,
        provincia: this.province,
        municipio: this.tallerObject.municipality,
        direccion: this.tallerObject.address,
        correo: this.tallerObject.email,
        fecha_nacimiento: this.formatYYYYMMDD(this.tallerObject.birthdate),
        movil: this.tallerObject.phone,
        servicios: this.tallerObject.service_selected,
        productos: this.tallerObject.product_selected,
        productos_count: this.tallerObject.product_selected_count,
        garantia: this.tallerObject.warranty,
        is_garantia: this.tallerObject.is_warranty,
        marca: this.tallerObject.brand,
        modelo: this.tallerObject.model,
        tamano: this.tallerObject.size,
        color: this.tallerObject.color,
        tipo: this.tallerObject.kind,
        fecha_entrada: this.formatYYYYMMDD(this.tallerObject.date_start),
        fecha_salida: this.formatYYYYMMDD(this.tallerObject.date_end),
        importe_total: this.tallerObject.amount_service,
        observaciones: this.tallerObject.description,
        foto_antes: this.tallerObject.before_pic,
        foto_despues: this.tallerObject.after_pic,
        tipo_ingreso: this.tallerObject.type_income,
        id: this.item_id
      };
      return new Promise(resolve => {
        if (this.post) {
          this.saveService(saveObjetc);
          resolve(true)
        } else {
          this.editService(saveObjetc);
          resolve(true)
        }
      })

    }
  },
  computed: {
    ...mapGetters({
      list_cash_type: 'GET_TYPE_CASH',
      clientList: 'GET_PERSON_LIST',
      provinceList: 'GET_PROVINCE_LIST',
      list_type_income: 'GET_TYPE_INCOME'
    }),
    total(){
      return this.subTotalProduct + this.subTotalService
    }
  },
  watch: {
    workerValue: function () {
      let temp = [];
      this.tallerObject.workers_selected = [];
      this.tallerObject.workers_selected_all = [];
      this.workerValue.forEach(item => {
        temp.push(item.id)
        this.tallerObject.workers_selected_all.push(item.nombre)
      })
      this.tallerObject.workers_selected = temp;
    },
    servicesValue: function () {
      let temp = [];
      this.subTotalService = 0;
      this.tallerObject.service_selected = [];
      this.servicesValue.forEach(item => {
        temp.push(item.id);
        this.subTotalService += item.precio;
      })
      this.tallerObject.service_selected = temp;
    },
    productsValue: function () {
      let temp = [];
      this.subTotalProduct = 0;
      this.tallerObject.product_selected = [];
      this.tallerObject.product_selected_all = [];
      this.productsValue.forEach(item => {
        temp.push(item.id)
        this.tallerObject.product_selected_all.push(item);
      })
      this.tallerObject.product_selected = temp;
    },
    file_after_pic: function () {
      this.getImgUrl(this.file_after_pic, 1);
    },
    file_before_pic: function () {
      this.getImgUrl(this.file_before_pic, 2);
    },
    province: function () {
      this.tallerObject.province = this.province
      this.fetchMunicipality(this.province)
          .then(value => {
            this.municipalityList = value
          })
    },
    'tallerObject.is_warranty':function () {
      if (!this.tallerObject.is_warranty){
        this.tallerObject.warranty = null
      }
    },
    'tallerObject.product_selected_count': function () {
      this.getTotalProducts()
    }
  },
  created() {
    let query = `?page_size=1000`
    this.getPersonList();
    this.getProductList();
    this.getServicesList();
    this.fetchProvinceList(query);
    this.fetchTypeIncome(query);
    this.getTallerList()
    if (this.$route.params.id) {
      this.update_values();
    }
  }
}
</script>

<style scoped lang="scss">
.client-data {
  font-size: 17px;
  color: #000000;
}

.mobile {
  width: 65% !important;
}


.report-pdf {
  background-color: #FFFFFF;
  width: 100%;
  height: 100%;
  padding: 15px;

  .taller {
    text-transform: uppercase;
    color: #ff171f;
  }

  table {
    font-size: 12px;
    line-height: 1.5;
    width: 100%;
  }
}

</style>
