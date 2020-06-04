<template>
  <div class="page page--padding  ">
    <div class="row">
      <div class="col-12">
        <h1 class="h3">Studenten</h1>
      </div>
    </div>
    
    <div class="row">
      <div class="col-12">
        <div v-if="error" class="error">{{ error }}</div>
        <ul v-if="!error">
          <li v-for="el in $store.state.userRoles" :key="el">
            {{ el }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CurrentUserService from '@/api/CurrentUserService'

export default {
  name: 'about',
  data() {
    return {
      user: null,
      error: null
    }
  },
  methods: {
    async getUserMetaData() {
      if (this.$store.state.userRoles === null) {
        try {
          const accessToken = await this.$auth.getTokenSilently();
          const user = await CurrentUserService.getUserData(this.$auth.user.sub, accessToken);
          await this.$store.commit('setUserData', user)
        } catch(err) {
          this.error = err.message;
        }
      }
    }
  },
  created() {
    this.getUserMetaData();
  }
}
</script>
