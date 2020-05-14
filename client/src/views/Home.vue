<template>
  <div class="home container">
    <PostComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import PostComponent from '@/components/PostComponent.vue'

export default {
  name: 'home',
  components: {
    PostComponent
  }
}
</script>

<style lang="scss" scoped>
</style>
