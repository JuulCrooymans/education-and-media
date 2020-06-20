<template>
    <div class="page page--padding">
        <div class="row">
            <div class="col-12">
                <h1 class="h3">Gebruikers</h1>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <LoadingIcon v-if="loading" />
                <div v-if="error" class="error">{{ error }}</div>
                <ul class="userList" v-if="!error">
                    <li
                        class="userList__item"
                        v-for="(el, index) in users"
                        :key="el.user_id"
                        :class="{'border-bottom': (index + 1 !== users.length)}"
                    >
                        <UserCard :user="el" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import CurrentUserService from "@/api/user/CurrentUserService";
import UsersService from "@/api/user/UsersService";
import UserCard from "@/components/partials/user/UserCard";
import LoadingIcon from "@/components/partials/ui/LoadingIcon";

export default {
    name: "about",
    components: {
        UserCard,
        LoadingIcon
    },
    data() {
        return {
            user: null,
            error: null,
            users: [],
            loading: true
        };
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
        },
        async getUsers() {
            try {
                const accessToken = await this.$auth.getTokenSilently();
                const users = await UsersService.getUsers([] ,accessToken);
                this.users = users;
            } catch (err) {
                this.error = err.message;
            }
        }
    },
    async created() {
        await this.getUserMetaData();
        await this.getUsers();
        this.loading = false;
    }
};
</script>


<style lang="scss" scoped>
.userList {
    margin: 0;
    padding: 0;

    &__item {
        list-style: none;
    }
}
</style>