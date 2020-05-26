<template>
    <div class="nav">
        <div class="nav__cont container">
            <div class="nav__pages col-6">
                <router-link class="nav__button" to="/">Home</router-link>
                <router-link class="nav__button" to="/about">About</router-link>
            </div>
            <div class="nav__user col-6" v-if="!$auth.loading === true">
                <router-link :to="`/user/${$auth.user.sub.replace('auth0|', '')}`" class="nav__profile">
                    <img class="nav__image" :src="$auth.user.picture" alt="profile picture">
                    <p class="nav__username">{{ $auth.user.nickname }}</p>
                </router-link>
                <a class="nav__login" v-if="!$auth.isAuthenticated" @click="login">Sign in</a>
                <a class="nav__logout" v-if="$auth.isAuthenticated" @click="logout">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79 76.3"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M79,36.4A4,4,0,0,1,78.74,38a2.47,2.47,0,0,1-.3.73,2.69,2.69,0,0,1-.63.93L65,52.41a4.35,4.35,0,0,1-3.1,1.32A4.18,4.18,0,0,1,59,46.59l5.41-5.29H25a4.3,4.3,0,0,1,0-8.6H64.58L59,26.89a4.59,4.59,0,0,1,0-6.3,4.24,4.24,0,0,1,6,0l12.71,12.8a2.5,2.5,0,0,1,.39.52l.2.27.24.24.15.45A4.7,4.7,0,0,1,79,36.4Z"/><path class="cls-1" d="M45.2,25V8.5H8.5V67.8H45.2V50.2h8.5V69.8a6.36,6.36,0,0,1-6.2,6.5H6.2A6.36,6.36,0,0,1,0,69.8V6.5A6.36,6.36,0,0,1,6.2,0H47.5a6.36,6.36,0,0,1,6.2,6.5V25Z"/></g></g></svg>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TopBar',
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
        margin-bottom: 30px;
        $self: &;

        &__cont {
            display: flex;
            height: 80px;
            align-items: center;

            #{ $self }__pages {
                #{$self}__button {
                    color: black;
                    margin-right: 50px;
                    text-decoration: none;
                    
                    &.router-link-exact-active {
                        font-weight: bold;
                    }
                }
            }

            #{ $self }__user {
                display: flex;
                align-items: center;
                justify-content: flex-end;

                #{ $self }__profile {
                    margin-right: 32px;
                    display: flex;
                    align-items: center;
                    text-decoration: none;

                    #{ $self }__username {
                        font-weight: bold;
                        margin-left: 10px;
                        color: black;
                        text-decoration: none;
                    }

                    #{ $self }__image {
                        height: 40px;
                        border-radius: 50%;
                    }
                }

                #{ $self }__logout {
                    cursor: pointer;
                    svg {
                        height: 30px;

                        .cls-1{
                            fill:#242424;
                        }
                    }
                }
            }
        } 
    }
</style>