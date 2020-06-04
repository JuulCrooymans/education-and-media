<template>
    <div class="page">
        <LoadingIcon v-if="loading" />

        <ProfileInfo  @openModal="toggleFeedbackModal" v-if="user && !loading" :userData="user" :key="$route.params.id" />

        <transition name="fade-fast" mode="out-in">
            <Modal @closeModal="toggleFeedbackModal" v-if="showFeedbackModal" :modalTitle="'Feedback'">
                <h5>Geef {{ user.nickname }} feedback</h5>
                <input type="text" placeholder="Titel">
                <textarea placeholder="Some feedback..."></textarea>
                <a href="#" class="button button--disabled button--submit">Geef feedback</a>
            </Modal>
        </transition>

        <FeedbackTimeline v-if="!loading"></FeedbackTimeline>
    </div>
</template>

<script>
    import UserService from '@/api/UserService'
    import ProfileInfo from '@/components/partials/user/profile/ProfileInfo'
    import CurrentUserService from '@/api/CurrentUserService'
    import Modal from '@/components/partials/ui/Modal'
    import FeedbackTimeline from '@/components/partials/user/profile/FeedbackTimeline'
    import LoadingIcon from '@/components/partials/ui/LoadingIcon'

    export default {
        name: 'user',
        data() {
            return {
                user: null,
                showFeedbackModal: false,
                loading: true
            }
        },
        components: {
            ProfileInfo,
            Modal,
            FeedbackTimeline,
            LoadingIcon
        },
        watch: {
            '$route.params.id': async function (id) {
                this.loading = true;
                await this.getUserData();
                this.loading = false;
            }
        },
        async created() {
            await this.getUserData();
            await this.getUserMetaData();
            this.loading = false;
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
            },
            async getUserMetaData() {
                if (this.$store.state.userRoles === null) {
                    try {
                        const accessToken = await this.$auth.getTokenSilently();
                        const user = await CurrentUserService.getUserData(this.$auth.user.sub, accessToken);
                        await this.$store.commit('setUserData', user)
                    } catch(err) {
                        this.error = err.message;
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>