<template>
    <div class="page">
        <LoadingIcon v-if="loading" />

        <ProfileInfo
            @openModal="toggleFeedbackModal"
            v-if="user && !loading"
            :userData="user"
            :key="$route.params.id"
        />

        <transition name="fade-fast" mode="out-in">
            <Modal
                @closeModal="toggleFeedbackModal"
                v-if="showFeedbackModal"
                :modalTitle="'Feedback'"
            >
                <h5>Geef {{ user.nickname }} feedback</h5>
                <input type="text" placeholder="Titel" v-model="comment.title" />
                <textarea placeholder="Some feedback..." v-model="comment.comment"></textarea>
                <a
                    href="#"
                    @click="createUserFeedback"
                    class="button button--primary button--submit"
                >{{ modalButton }}</a>
            </Modal>
        </transition>

        <transition name="fade-fast" mode="out-in">
            <Modal
                @closeModal="toggleCommentModal"
                v-if="showCommentModal"
                :modalTitle="'Feedback'"
            >
                <div class="comment">
                    <div class="comment__top">
                        <h6>{{ getCurrentFeedback().title }}</h6>
                    </div>
                    <div class="comment__body">
                        <p class="comment__text">{{ getCurrentFeedback().comment }}</p>
                    </div>
                    <div class="comment__bottom">
                        <p class="comment__date">{{ getCurrentFeedback().date }}</p>
                        <a href="#" @click="deleteUserFeedback" class="comment__delete">
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 81 107.5"
                                style="overflow:visible;enable-background:new 0 0 81 107.5;"
                                xml:space="preserve"
                            >
                                <g>
                                    <path
                                        d="M31.2,88.3h-0.6c-2.5,0-4.5-2-4.5-4.5V40c0-2.5,2-4.5,4.5-4.5h0.6c2.5,0,4.5,2,4.5,4.5v43.8C35.7,86.3,33.7,88.3,31.2,88.3 z"
                                    />
                                    <path
                                        d="M50.4,88.3h-0.6c-2.5,0-4.5-2-4.5-4.5V40c0-2.5,2-4.5,4.5-4.5h0.6c2.5,0,4.5,2,4.5,4.5v43.8C54.9,86.3,52.9,88.3,50.4,88.3 z"
                                    />
                                    <path
                                        d="M74.1,40.3v57.6c0,5.3-4.3,9.6-9.6,9.6h-48c-5.3,0-9.6-4.3-9.6-9.6V40.3c0-2.7,2.1-4.8,4.8-4.8h0c2.7,0,4.8,2.1,4.8,4.8 v54.2c0,1.9,1.5,3.4,3.4,3.4h41.2c1.9,0,3.4-1.5,3.4-3.4V40.3c0-2.7,2.1-4.8,4.8-4.8h0C72,35.5,74.1,37.6,74.1,40.3z"
                                    />
                                    <path
                                        d="M76.5,22.5H63C63,7.9,51.4,0,40.5,0S18,7.9,18,22.5H4.5c-1.2,0-2.4,0.5-3.2,1.3C0.5,24.6,0,25.8,0,27c0,2.5,2,4.5,4.5,4.5 h72c1.2,0,2.4-0.5,3.2-1.3c0.8-0.8,1.3-1.9,1.3-3.2C81,24.5,79,22.5,76.5,22.5z M27,22.5C27,13.5,33.8,9,40.5,9S54,13.5,54,22.5H27 z"
                                    />
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
            </Modal>
        </transition>

        <FeedbackTimeline @openModal="toggleCommentModal" v-if="!loading" :feedback="feedback"></FeedbackTimeline>

        <div class="row" v-if="!loading">
            <Competencies />
            <Boks />
        </div>
    </div>
</template>

<script>
import UserService from "@/api/UserService";
import CurrentUserService from "@/api/CurrentUserService";
import UserFeedbackService from "@/api/UserFeedbackService";
import ProfileInfo from "@/components/partials/user/profile/ProfileInfo";
import Modal from "@/components/partials/ui/Modal";
import FeedbackTimeline from "@/components/partials/user/profile/FeedbackTimeline";
import LoadingIcon from "@/components/partials/ui/LoadingIcon";
import Competencies from "@/components/partials/user/profile/Competencies";
import Boks from "@/components/partials/user/profile/Boks";

export default {
    name: "user",
    data() {
        return {
            user: null,
            showFeedbackModal: false,
            loading: true,
            feedback: null,
            comment: {
                title: "",
                comment: ""
            },
            modalButton: "Geef feedback",
            showCommentModal: false
        };
    },
    components: {
        ProfileInfo,
        Modal,
        FeedbackTimeline,
        LoadingIcon,
        Competencies,
        Boks
    },
    watch: {
        "$route.params.id": async function(id) {
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
        if (this.$route.query.feedback) {
            setTimeout(() => {
                this.toggleCommentModal();
            }, 200);
        }
        this.loading = false;
    },
    methods: {
        getCurrentFeedback() {
            return this.feedback.find(
                comment => comment.id === this.$route.query.feedback
            );
        },
        toggleCommentModal(event) {
            if (event) event.preventDefault();
            if (this.showCommentModal === true) {
                this.$router.push(this.$route.path);
            }
            this.showCommentModal = !this.showCommentModal;
        },
        toggleFeedbackModal(event) {
            event.preventDefault();

            if (this.modalButton === "Sluiten") {
                this.showFeedbackModal = !this.showFeedbackModal;
                this.modalButton = "Geef feedback";
            } else {
                this.showFeedbackModal = !this.showFeedbackModal;
            }
        },
        async getUserData() {
            try {
                const accessToken = await this.$auth.getTokenSilently();
                this.user = await UserService.getUserData(
                    this.$route.params.id,
                    accessToken
                );
            } catch (err) {
                this.error = err.message;
            }
        },
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
        async getUserFeedback() {
            try {
                const accessToken = await this.$auth.getTokenSilently();
                const feedback = await UserFeedbackService.getUserFeedbackData(
                    this.$route.params.id,
                    accessToken
                );
                this.feedback = feedback;
            } catch (err) {
                this.error = err.message;
            }
        },
        async createUserFeedback(event) {
            event.preventDefault();
            if (this.modalButton === "Sluiten") {
                this.toggleFeedbackModal(event);
            } else {
                this.modalButton = "Loading";
                try {
                    if (this.comment.comment && this.comment.title) {
                        const accessToken = await this.$auth.getTokenSilently();
                        await UserFeedbackService.postUserFeedbackData(
                            this.comment,
                            this.$route.params.id,
                            accessToken
                        );
                        this.feedback = await UserFeedbackService.getUserFeedbackData(
                            this.$route.params.id,
                            accessToken
                        );
                        this.comment.title = "";
                        this.comment.comment = "";
                        this.showFeedbackModal = !this.showFeedbackModal;
                        this.modalButton = "Geef feedback";
                    }
                } catch (err) {
                    this.error = err.message;
                    this.modalButton = "Sluiten";
                }
            }
        },
        async deleteUserFeedback(event) {
            event.preventDefault();

            const accessToken = await this.$auth.getTokenSilently();
            await UserFeedbackService.deleteUserFeedbackData(
                this.$route.params.id,
                this.$route.query.feedback,
                accessToken
            );
            this.toggleCommentModal();
            this.feedback = await UserFeedbackService.getUserFeedbackData(
                this.$route.params.id,
                accessToken
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.comment {
    $self: &;

    &__top {
        display: flex;
        margin-bottom: $space-xs;
        align-items: center;
    }

    &__body {
        #{ $self }__text {
            opacity: 0.87;
            margin-bottom: $space-sm;
        }
    }

    &__bottom {
        display: flex;
        align-items: center;

        #{ $self }__date {
            opacity: 0.6;
        }

        #{ $self }__delete {
            margin-left: $space-sm;
            padding: 5px 10px;
            border-radius: 5px;
            transition: background 0.15s ease;

            svg {
                height: 25px;
                fill: $red;
            }

            &:hover {
                background: lighten($red, 40%);
            }
        }
    }
}
</style>