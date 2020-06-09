<template>
    <div id="app" class="container-fluid">
        <TopNav />
        <div class="row">
            <SideNav />
            <transition mode="out-in" name="page">
                <router-view class="col-10 offset-2" />
            </transition>
        </div>
    </div>
</template>

<script>
import TopNav from "@/components/partials/navigation/TopNav";
import SideNav from "@/components/partials/navigation/SideNav";

export default {
    data() {
        return {
            user: ""
        };
    },
    components: {
        TopNav,
        SideNav
    }
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

#app {
    padding-top: 80px;
}
</style>
