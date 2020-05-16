<template>
    <div class="nav">
        <div class="nav__cont container">
            <div class="nav__pages">
                <router-link class="nav__button" to="/">Home</router-link>
                <router-link class="nav__button" to="/about">About</router-link>
            </div>
            <div class="nav__user" v-if="!$auth.loading === true">
                <a class="nav__login" v-if="!$auth.isAuthenticated" @click="login">Sign in</a>
                <a class="nav__logout" v-if="$auth.isAuthenticated" @click="logout">Log out</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Navigation',
        methods: {
            login() {
                this.$auth.loginWithRedirect();
            },
            logout() {
                this.$auth.logout({
                    returnTo: window.location.origin
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nav {
        background: #f2f2f2;
        $self: &;

        &__cont {
            display: flex;
            height: 80px;
            justify-content: space-between;
            align-items: center;

            #{ $self }__button {
                margin-right: 50px;
                font-weight: bold;
                color: black;
                text-decoration: none;
            }

            #{ $self }__logout {
                font-weight: bold;
                cursor: pointer;
                padding: 14px 20px;
                background: #F81F48;
                color: #fff;
                border-radius: 10px;
            }
        } 
    }
</style>