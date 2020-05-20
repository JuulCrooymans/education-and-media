<template>
  <div class="about container">
    <div class="row">
      <div class="col-12">
        <h1>This is an about page</h1>
      </div>
    </div>
    
    <div class="row">
      <div class="col-12">
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="!error">{{ user }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/api/UserService'

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
      this.user = await UserService.getUserData(this.$auth.user.sub, accessToken);
    } catch(err) {
      this.error = err.message;
    }
  }
}
</script>
