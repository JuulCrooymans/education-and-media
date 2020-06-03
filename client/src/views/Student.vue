<template>
    <div class="page">
        <transition name="fade-fast" mode="out-in">
            <ProfileInfo @openModal="toggleFeedbackModal" v-if="user" :userData="user" :key="$route.params.id" />
        </transition>
        <transition name="fade-fast" mode="out-in">
            <Modal @closeModal="toggleFeedbackModal" v-if="showFeedbackModal" :modalTitle="'Feedback'">
                <h5>Geef {{ user.nickname }} feedback</h5>
                <input type="text" placeholder="Titel">
                <textarea placeholder="Some feedback..."></textarea>
                <a href="#" class="button button--disabled button--submit">Geef feedback</a>
            </Modal>
        </transition>
    </div>
</template>

<script>
    import UserService from '@/api/UserService'
    import ProfileInfo from '@/components/partials/user/profile/ProfileInfo'
    import CurrentUserService from '@/api/CurrentUserService'
    import Modal from '@/components/partials/user/Modal'

    export default {
        name: 'user',
        data() {
            return {
                user: null,
                showFeedbackModal: false
            }
        },
        head() {
            return {
                title: 'test'
            }
        },
        components: {
            ProfileInfo,
            Modal
        },
        watch: {
            '$route.params.id': function (id) {
                this.getUserData();
            }
        },
        async created() {
            this.getUserData();
        },
        methods: {
            toggleFeedbackModal(event) {
                event.preventDefault();
                this.showFeedbackModal = !this.showFeedbackModal;
            },
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