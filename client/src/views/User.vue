<template>
    <div class="container">
        <Profile v-if="user" :userData="user" />
    </div>
</template>

<script>
    import UserService from '@/api/UserService'
    import Profile from '@/components/partials/user/Profile'

    export default {
        name: 'user',
        data() {
            return {
                user: null
            }
        },
        components: {
            Profile
        },
        async created() {
            try {
                const accessToken = await this.$auth.getTokenSilently();
                this.user = await UserService.getUserData(this.$route.params.id, accessToken);
            } catch(err) {
                this.error = err.message;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>