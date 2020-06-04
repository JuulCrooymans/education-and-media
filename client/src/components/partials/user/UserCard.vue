<template>
    <router-link :to="`/users/${user.user_id.replace('auth0|', '')}`" class="userCard">
        <img class="userCard__picture" :src="user.picture" alt="User profile picture">
        <div class="userCard__info">
            <h5 class="userCard__name">{{ user.email }}</h5>
            <ul class="userCard__roles">
                <li class="userCard__role" v-for="role in user.roles" :key="role">{{ role }}</li>
            </ul>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: 'UserCard',
        props: {
            user: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .userCard {
        $self: &;

        display: flex;
        align-items: center;
        font-family: $font-title;
        margin: $space-md 0;
        text-decoration: none;

        &__picture {
            border-radius: 50%;
            height: 100px;
        }

        &__info {
            margin-left: $space-md;
            color: $dark;

            #{ $self }__name {
                font-weight: bold;
                text-decoration: none;
                display: inline-block;
                margin-bottom: 10px;
            }

            #{ $self }__roles {
                margin: 0;
                padding: 0;
                display: flex;

                #{ $self }__role {
                    text-decoration: none;
                    list-style: none;
                    display: inline-block;
                    background: $light;
                    padding: 5px 10px;
                    border-radius: 5px;
                    margin-right: $space-xs;
                }
            }
        }
    }
</style>