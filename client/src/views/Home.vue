<template>
  <div class="home container">
    <PostComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import PostComponent from '@/components/PostComponent.vue'
import UserService from '@/api/UserService'


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
      this.user = await UserService.getUserData(this.$auth.user.sub, accessToken);
      await this.$store.commit('setUserData', this.user);
      console.log(this.$store.state.userData.app_metadata.roles.includes('admin'));

    } catch(err) {
      this.error = err.message;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
