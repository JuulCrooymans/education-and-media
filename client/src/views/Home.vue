<template>
  <div class="home container">
    <PostComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import PostComponent from '@/components/PostComponent.vue'
// import UserService from '@/api/UserService'


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
  mounted() {
    console.log(this.$auth.user);
    
  }
}
</script>

<style lang="scss" scoped>
</style>
