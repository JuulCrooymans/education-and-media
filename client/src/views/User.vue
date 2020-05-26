<template>
    <div class="container">
        <h1>User</h1>
        <p>{{user}}</p>
    </div>
</template>

<script>
    import UserService from '@/api/UserService'
    export default {
        name: 'user',
        data() {
            return {
                user: null
            }
        },
        async created() {
            try {
                const accessToken = await this.$auth.getTokenSilently();
                this.user = await UserService.getUserData(this.$route.params.id, accessToken);
                console.log(await UserService.getUserData(this.$route.params.id, accessToken));
                
            } catch(err) {
                this.error = err.message;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>