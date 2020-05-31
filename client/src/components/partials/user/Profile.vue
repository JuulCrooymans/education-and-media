<template>
    <div class="row profile">
        <div class="col-12">
            <div class="border-bottom profile__wrapper">
                <img class="profile__picture" :src="userData.picture" alt="profile picture">
                <div class="profile__info">
                    <h4 class="profile__name">{{ userData.nickname }}</h4>
                    <ul class="profile__tags">
                        <li v-for="role in userData.app_metadata.roles" :key="role" class="profile__tag">{{ role }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Profile',
        props: {
            userData: {
                type: Object,
                require: true
            }
        }
    }
</script>

<style lang="scss" scoped>
.profile {
    $self: &;

    &__wrapper {
        display: flex;
        padding-bottom: $space-md;
    }
    
    &__picture {
        width: 120px;
        border-radius: 50%;
        margin-right: 30px;
        height: 120px;
    }

    &__info {
        #{ $self }__name {
            margin: 16px 0 0;
        }

        #{ $self }__tags {
            display: flex;
            padding: 0;

            #{ $self }__tag {
                padding: 5px 10px;
                background: $light;
                border-radius: 5px;
                list-style: none;
                margin-right: 10px;
                font-weight: bold;
            }
        }
    }
}
</style>