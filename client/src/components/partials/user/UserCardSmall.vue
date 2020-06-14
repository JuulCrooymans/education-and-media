<template>
    <div class="col-3">
        <router-link class="userCard" :to="`/users/${studentInfo.user_id.replace('auth0|', '')}`">
            <img class="userCard__picture" :src="studentInfo.picture" alt="user profile picture" >
            <div class="userCard__info">
                <p class="userCard__userName">{{ studentInfo.nickname }}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'UserCardSmall',
        props: {
            studentInfo: {
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
    text-decoration: none;
    color: $dark;

    &__picture {
        height: 60px;
        border-radius: 50%;
        margin-right: $space-sm;
    }
}
</style>