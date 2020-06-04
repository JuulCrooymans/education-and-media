<template>
    <div class="page">
        <LoadingIcon v-if="loading" />

        <ProfileInfo  @openModal="toggleFeedbackModal" v-if="user && !loading" :userData="user" :key="$route.params.id" />

        <transition name="fade-fast" mode="out-in">
            <Modal @closeModal="toggleFeedbackModal" v-if="showFeedbackModal" :modalTitle="'Feedback'">
                <h5>Geef {{ user.nickname }} feedback</h5>
                <input type="text" placeholder="Titel" v-model="comment.title">
                <textarea placeholder="Some feedback..." v-model="comment.comment"></textarea>
                <a href="#" @click="createUserFeedback" class="button button--primary button--submit">{{ modalButton }}</a>
            </Modal>
        </transition>

        <ul >
            <li v-for="comment in feedback" :key="comment.id">
                <p>{{ comment.title }}</p>
                <p>{{ comment.comment }}</p>
            </li>
        </ul>

        <FeedbackTimeline v-if="!loading"></FeedbackTimeline>
    </div>
</template>

<script>
    import UserService from '@/api/UserService'
    import CurrentUserService from '@/api/CurrentUserService'
    import UserFeedbackService from '@/api/UserFeedbackService'
    import ProfileInfo from '@/components/partials/user/profile/ProfileInfo'
    import Modal from '@/components/partials/ui/Modal'
    import FeedbackTimeline from '@/components/partials/user/profile/FeedbackTimeline'
    import LoadingIcon from '@/components/partials/ui/LoadingIcon'

    export default {
        name: 'user',
        data() {
            return {
                user: null,
                showFeedbackModal: false,
                loading: true,
                feedback: null,
                comment: {
                    title: '',
                    comment: ''
                },
                modalButton: 'Geef feedback'
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
                await this.getUserFeedback();
                this.loading = false;
            }
        },
        async created() {
            await this.getUserData();
            await this.getUserMetaData();
            await this.getUserFeedback();
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
            },
            async getUserFeedback() {
                try {
                    const accessToken = await this.$auth.getTokenSilently();
                    const feedback = await UserFeedbackService.getUserFeedbackData(this.$route.params.id, accessToken);
                    this.feedback = feedback;
                } catch(err) {
                    this.error = err.message;
                }
            },
            async createUserFeedback(event) {
                event.preventDefault();
                if (this.modalButton === 'Sluiten') {
                    this.toggleFeedbackModal(event);
                    this.modalButton = 'Geef feedback'
                } else {
                    this.modalButton = 'Loading'
                    try {
                        if (this.comment.comment && this.comment.title) {
                            const accessToken = await this.$auth.getTokenSilently();
                            await UserFeedbackService.postUserFeedbackData(this.comment, this.$route.params.id, accessToken);
                            this.feedback = await UserFeedbackService.getUserFeedbackData(this.$route.params.id, accessToken);
                            this.comment.title = ''
                            this.comment.comment = ''
                            this.modalButton = 'Sluiten'
                        } 
                        
                    } catch(err) {
                        this.error = err.message;
                        this.modalButton = 'Sluiten'
                    }
                }
            }
            
        }
    }
</script>

<style lang="scss" scoped>

</style>