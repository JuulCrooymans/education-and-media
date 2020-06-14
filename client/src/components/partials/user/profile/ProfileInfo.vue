<template>
    <div class="row profile">
        <div class="col-12">
            <div class="profile__wrapper">
                <img class="profile__picture" :src="userData.picture" alt="profile picture" />
                <div class="profile__info">
                    <h4 class="profile__name">{{ userData.nickname }}</h4>
                    <div class="profile__actions">
                        <a
                            href="#"
                            @click="$emit('openModal', $event)"
                            class="button button--primary feedback-button"
                            v-if="$store.state.userRoles.includes('teacher')"
                        >
                            <p>Geef feedback</p>
                            <svg
                                class="button__icon"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 20 17.5"
                                style="overflow:visible;enable-background:new 0 0 20 17.5;"
                                xml:space="preserve"
                            >
                                <path
                                    id="Path_25_1_"
                                    class="st0"
                                    d="M20,8.8c0,4.8-4.5,8.8-10,8.8c-1.6,0-3.2-0.3-4.6-1l-4.5,0.6c-0.3,0-0.5-0.1-0.5-0.4 c0,0,0-0.1,0-0.1l0.6-4.1C0.3,11.3,0,10,0,8.8C0,3.9,4.5,0,10,0S20,3.9,20,8.8z"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            class="button button--secondary profile-options-button"
                            v-if="$store.state.userRoles.includes('teacher')"
                        >
                            <svg
                                class="button__only-icon"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 72 18"
                                style="overflow:visible;enable-background:new 0 0 72 18;"
                                xml:space="preserve"
                            >
                                <circle cx="9" cy="9" r="9" />
                                <circle cx="36" cy="9" r="9" />
                                <circle cx="63" cy="9" r="9" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Profile",
    props: {
        userData: {
            type: Object,
            require: true
        }
    }
};
</script>

<style lang="scss" scoped>
.profile {
    $self: &;
    background: $xlight;
    padding-top: $space-lg !important;
    height: 210px;

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
            margin: $space-sm 0;
        }

        #{ $self }__actions {
            display: flex;
            align-items: center;

            .feedback-button {
                margin-right: $space-sm;
            }

            .profile-options-button {
                border-radius: 50%;
                padding: 16px 9px;
            }
        }
    }
}
</style>