<template>
    <div class="page page--padding">
        <div class="home-title">
            <h2>Welkom</h2>
            <h2 class="home-title__user">{{ $auth.user.nickname }}</h2>
        </div>
        <div class="content-placeholder">
            <p>Content placeholder</p>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import PostComponent from "@/components/PostComponent.vue";
import CurrentUserService from "@/api/user/CurrentUserService";

export default {
    name: "home",
    data() {
        return {
            user: ""
        };
    },
    components: {
        PostComponent
    },
    methods: {
        async getUserMetaData() {
            if (this.$store.state.userRoles === null) {
                try {
                    const accessToken = await this.$auth.getTokenSilently();
                    const user = await CurrentUserService.getUserData(
                        this.$auth.user.sub,
                        accessToken
                    );
                    await this.$store.commit("setUserData", user);
                } catch (err) {
                    this.error = err.message;
                }
            }
        }
    },
    created() {
        this.getUserMetaData();
    }
};
</script>

<style lang="scss" scoped>
.home-title {
    display: flex;
    margin-bottom: 60px;

    &__user {
        font-weight: 400;
        margin-left: 30px;
    }
}

.content-placeholder {
    height: 500px;
    width: 100%;
    background: $xlight;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        color: $dark;
        opacity: .3;
    }
}
</style>
