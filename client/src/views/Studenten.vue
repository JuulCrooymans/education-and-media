<template>
  <div class="page">
    <div class="row">
      <div class="col-12">
        <h1 class="h3">About</h1>
      </div>
    </div>
    
    <div class="row">
      <div class="col-12">
        <div v-if="error" class="error">{{ error }}</div>
        <ul v-if="!error">
          <li v-for="el in user" :key="el">
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
  async created() {
    try {
      const accessToken = await this.$auth.getTokenSilently();
      this.user = await CurrentUserService.getUserData(this.$auth.user.sub, accessToken);
      await this.$store.commit('setUserData', this.user)
    } catch(err) {
      this.error = err.message;
    }
  }
}
</script>
