<template>
  <div class="content-page">
    <section>
      <top-bar is_back :page-title="post?'Nueva Area':'Editar Area'"/>
      <div class="mt-3 bg-withe p-5 card">
        <section>
          <div class="columns">
            <div class="column is-half">
              <b-field label="Nombre" label-position="on-border">
                <b-input placeholder="Nombre"
                         v-model="area.name"
                         required
                         validation-message="Campo requerido"
                         type="text">
                </b-input>
              </b-field>
              <div class="columns">
                <div class="column is-6">
                  <b-field label="Telefono" label-position="on-border">
                    <b-input placeholder="Telefono"
                             v-model="area.phone"
                             type="text">
                    </b-input>
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field label="Tipo de Area" label-position="on-border">
                    <multiselect
                        placeholder="Tipo de Area"
                        v-model="area.type"
                        open-direction="bottom"
                        :show-no-results="false"
                        :options="typeAreaList">
                    </multiselect>
                  </b-field>
                </div>
              </div>
              <div class="columns" v-if="area.type === TYPE_AREA.OTRO ">
                <div class="column is-full">
                  <b-field label="Especifique el tipo de Area" label-position="on-border">
                    <b-input placeholder="Tipo de Area"
                             v-model="area.typeOther"
                             type="text">
                    </b-input>
                  </b-field>
                </div>
              </div>

              <div class="columns">
                <div class="column is-6">
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
                </div>
                <div class="column is-6">
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
              </div>
              <b-field label="Dirección" label-position="on-border">
                <b-input placeholder="Domicilio temporal o permanente en Cuba"
                         v-model="area.address"
                         type="text">
                </b-input>
              </b-field>

            </div>

            <div class="column is-half">
              <b-field label="Area Padre" label-position="on-border">
                <multiselect
                    placeholder="Area Padre"
                    v-model="fk_parentValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="parent_list">
                </multiselect>
              </b-field>
              <b-field label="Descripcion" label-position="on-border">
                                <textarea
                                    v-model="area.description"
                                    class="textarea"
                                    placeholder="Descripcion"
                                    rows="5"
                                >
                                </textarea>
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
import {api_area} from "@/urls";
import {mapMutations, mapActions, mapGetters} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import Multiselect from "vue-multiselect";
import {getStorage} from "@/utils";
import {TYPE_AREA} from '@/enum'

export default {
  components: {TopBar, Multiselect},
  data: () => ({
    area: {
      id: null,
      name: null,
      description: null,
      address: null,
      phone: null,
      type: null,
      typeOther: null,
      fk_enterprise: getStorage("enterprise_id", false),
      fk_parent: null,
      province: null,
      municipality: null
    },
    valid: true,
    post: true,
    item_id: null,
    fk_enterprise: getStorage('enterprise_id', false),
    fk_parentValue: null,
    municipalityList: [],
    provinceValue: null,
    province: null,
    municipality: null,
    municipalityValue: null,
    parent_list: [],
    provinceList: [],
    typeAreaList: Object.values(TYPE_AREA),
    TYPE_AREA,

  }),
  computed: {
    ...mapGetters({
      areasList: 'GET_AREAS',
    })
  },
  methods: {
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
    }),
    ...mapActions({
      goBack: 'GO_BACK',
      updateValues: 'UPDATE_VALUES',
      saveArea: 'SAVE_AREA',
      editArea: 'EDIT_AREA',
      fetchAreas: 'FETCH_AREAS',
      fetchProvinceList: 'FETCH_PROVINCE_LIST',
      fetchMunicipality: 'FETCH_MUNICIPALITY_LIST'
    }),
    selectName({name}) {
      return name
    },
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_area}${id}/`).then(async item => {
        this.area = item
        this.area.fk_enterprise = item.fk_enterprise.id;
        this.provinceValue = this.provinceList.find(f => f.id === item.province.id);
        this.municipalityList = await this.fetchMunicipality(item.province.id)
        this.municipalityValue = this.municipalityList.find(f => f.id === item.municipality.id);
        this.fk_parentValue = item.fk_parent;
        this.item_id = item.id;
      });
    },
    save() {
      this.area.province = this.province
      this.area.municipality = this.municipality
      this.id = this.item_id
      if (this.post) this.saveArea(this.area); else this.editArea(this.area);
    },
    getParents() {
      let query = `?page_size=1000`
      this.fetchAreas(query).then(value => {
        this.parent_list = value.results.filter(item => item.deleted === false);
      });
    },
    getProvinces() {
      let query = `?page_size=1000`
      this.fetchProvinceList(query).then(value => {
        this.provinceList = value;
      });
    },
  },
  watch: {
    provinceValue: async function () {
      this.province = this.provinceValue.id
      this.municipalityList = await this.fetchMunicipality(this.provinceValue.id)
    },
    municipalityValue: async function () {
      this.municipality = this.municipalityValue.id
    },
    fk_parentValue: function () {
      this.fk_parent = this.fk_parentValue.id
    },
  },


  created() {
    this.getParents();
    this.getProvinces();
    if (this.$route.params.id) {
      this.update_values();
    }
  }
}
</script>
