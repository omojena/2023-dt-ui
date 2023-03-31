<template>

  <b-navbar class="h-nav">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/home' }">
        <logo-component logo-class="nav-logo"/>
      </b-navbar-item>
    </template>
    <template slot="start">
      <div light xl-font class="enterprise-name">
        {{ enterprise.enterprise_name }}
      </div>

    </template>

    <template slot="end">
      <b-navbar-item tag="div" class="end-nav">
        <span class="icon-bar icon-dt-doublet-97"></span>
        <span @click="logout" class="icon-bar icon-bar icon-dt-doublet-72 logout"></span>
        <span class="ml-5 pointer" @click="openModal">
              <b-dropdown
                  position="is-bottom-left"
                  append-to-body
                  aria-role="menu"
                  trap-focus
              >
      <template #trigger>
         <avatar class="avatar-size" color="#FFFFFF" backgroundColor="#1F1C39" :size="40"
                 :username="enterpriseName"
                 :src="null"/>
      </template>
      <b-dropdown-item
          v-for="(item, idx) in enterpriseUserList"
          :key="idx"
          aria-role="menu-item"
          :focusable="false"
          custom
          paddingless>
          <div class="title-collapse is-flex is-align-items-center pointer p-3">
            <avatar class="avatar-size" color="#FFFFFF" backgroundColor="#1F1C39" :size="20"
                    :username="item.empresa.empresa"
                    :src="null"/>
            <div class="is-flex is-flex-direction-column">
              <span @click="login_in(item)" bold class="ml-3">{{ item.empresa.empresa }}</span>
              <span @click="login_in(item)" sm-font class="ml-3">{{ item.user.email }}</span>

            </div>
          </div>
      </b-dropdown-item>
    </b-dropdown>



        </span>
      </b-navbar-item>
    </template>
  </b-navbar>

</template>

<script>
import Avatar from 'vue-avatar'
import LogoComponent from "../logo/logoComponent";
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {getStorage, notificationError, saveStorage} from "@/utils";
import axios from "axios";
import {api_session} from "@/urls";
import router from "@/router";

export default {
  name: "NavComponent",
  components: {LogoComponent, Avatar},
  data() {
    return {
      lang: 'ESP',
      user: null,
      enterpriseUserList: [],
      isComponentModalActive: true,
    }
  },
  computed: {
    ...mapGetters({
      enterprise: 'GET_ENTERPRISE_AUTH',
    })
  },
  methods: {
    openModal() {
      this.user = getStorage('user');
      this.enterpriseUserList = getStorage('enterpriseUserList')
      console.log(this.enterpriseUserList);
    },
    login_in(enterprise) {
      let session = {
        'fk_user': enterprise.fk_user,
        'fk_empresa': enterprise.fk_empresa
      };
      saveStorage('enterprise_name', enterprise.empresa, false)
      saveStorage('enterprise_id', enterprise.fk_empresa, false)
      axios.post(api_session, session)
          .then(response => {
            this.$emit('response', response);
            this.loginEnterpriseAction(enterprise);
            window.location.reload()
          })
          .catch((err) => {
            localStorage.clear();
            notificationError('No se pudo crear la session', err.response)
            router.push({name: 'login'})
          });
    },
    ...mapActions({
      loginEnterpriseAction: 'LOGIN_ENTERPRISE_ACTION'

    }),
    ...mapMutations({
      logout: 'LOGOUT',
    }),
  },
  props: {
    enterpriseName: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
.pointer {
  cursor: pointer;
}

.h-nav {
  height: 57px;
}

.enterprise-name {
  margin-left: 125px;
  color: #4C4765;
  display: flex;
  align-items: center;
}

.end-nav {
  margin-right: 15px;
  align-items: center;
}

.lang {
  padding: 0 20px;

  &.is-light {
    background-color: transparent;
    padding: 0 10px;

    &:hover {
      background-color: transparent;
    }

    &:focus {
      background-color: transparent;
    }
  }
}

.icon-bar {
  font-size: 35px;

  &.logout {
    transform: rotate(90deg);
    padding-bottom: 20px;
  }
}

</style>
