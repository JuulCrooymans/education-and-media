<template>
    <div class="container">
        <transition name="fade-fast" mode="out-in">
            <Profile v-if="user" :userData="user" :key="$route.params.id" />
        </transition>
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
        watch: {
            '$route.params.id': function (id) {
                this.getUserData();
            }
        },
        created() {
            this.getUserData();
        },
        methods: {
            async getUserData() {
                try {
                    const accessToken = await this.$auth.getTokenSilently();
                    this.user = await UserService.getUserData(this.$route.params.id, accessToken);
                } catch(err) {
                    this.error = err.message;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>