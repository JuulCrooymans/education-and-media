<template>
  <div id="app">
    <TopBar />
    <transition mode="out-in" name="page">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import TopBar from '@/components/partials/TopBar'

export default {
  components: {
    TopBar
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

</style>
