<template>
  <div class="page">
    <PostComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import PostComponent from '@/components/PostComponent.vue'
import CurrentUserService from '@/api/CurrentUserService'


export default {
  name: 'home',
  data() {
    return {
      user: ''
    }
  },
  components: {
    PostComponent
  },
  async created() {
    try {
      const accessToken = await this.$auth.getTokenSilently();
      this.user = await CurrentUserService.getUserData(this.$auth.user.sub, accessToken);
      await this.$store.commit('setUserData', this.user);
    } catch(err) {
      this.error = err.message;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
