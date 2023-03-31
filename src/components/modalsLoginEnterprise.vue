<template>
  <div class="modal-card modal-form-login rounded-10">
    <section class="modal-card-body">
      <div class="content">
        <div class="is-flex is-justify-content-space-between is-align-items-center">
          <div class="title-new-modal">Seleccione la empresa</div>
          <button @click="closed" class="delete" aria-label="close"></button>
        </div>
        <section class="pl-20 pr-10 pt-15">
          <div class="columns is-flex  is-align-items-center">
            <div class="column is-full">
              <div v-for="(item, idx) in enterpriseList" :key="idx"
                   class="title-collapse is-flex is-align-items-center pointer p-3">
                <avatar class="avatar-size" color="#FFFFFF" backgroundColor="#1F1C39" :size="40"
                        :username="item.empresa"
                        :src="null"/>
                <span @click="login_in(item)" class="ml-3">{{ item.empresa }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>

</template>

<script>
import {mapActions} from "vuex";
import {notificationError, saveStorage} from "@/utils";
import axios from "axios";
import {api_session} from "@/urls";
import router from "@/router";
import Avatar from 'vue-avatar'

export default {
  name: "modalsLoginEnterprise",
  components: {Avatar},
  data() {
    return {
      enterprise: null,
    }
  },
  props: ['enterpriseList', 'user'],
  methods: {
    ...mapActions({
      loginEnterpriseAction: 'LOGIN_ENTERPRISE_ACTION'

    }),
    selectName({empresa}) {
      return empresa
    },
    login_in(enterprise) {
      let session = {
        'fk_user': this.user,
        'fk_empresa': enterprise.fk_empresa
      };
      saveStorage('enterprise_name', enterprise.empresa, false)
      saveStorage('enterprise_id', enterprise.fk_empresa, false)
      saveStorage('classification_enterprise', enterprise.clasificacion, false)
      axios.post(api_session, session)
          .then(response => {
            this.$emit('response', response);
            this.loginEnterpriseAction(enterprise)
            this.$emit('close')
          })
          .catch((err) => {
            localStorage.clear();
            notificationError('NO se pudo crear la session', err.response)
            router.push({name: 'login'})
          });
    },
    closed() {
      this.$emit('close')
    }
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
.modal-form-login {
  height: auto !important;
  width: auto !important;
  min-width: 350px !important;
  border-radius: 10px;
}

.title-collapse {
  cursor: pointer;
}
</style>