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
                <h5 class="modal-title">Geef {{ user.nickname }} feedback</h5>
                <div class="add-tags">
                    <Dropdown :dropdownName="'Beroepscompententie'">
                        <ul>
                            <li>
                                <label>
                                    <input
                                        value="Oriënteren en begrijpen"
                                        v-model="comment.tags"
                                        type="checkbox"
                                    />Oriënteren en begrijpen
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        value="Conceptualiseren"
                                        v-model="comment.tags"
                                        type="checkbox"
                                    />Conceptualiseren
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        value="Verbeelden en prototypes maken"
                                        v-model="comment.tags"
                                        type="checkbox"
                                    />Verbeelden en prototypes maken
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input value="Evalueren" v-model="comment.tags" type="checkbox" />Evalueren
                                </label>
                            </li>
                        </ul>
                    </Dropdown>

                    <Dropdown :dropdownName="'Generieke compententie'">
                        <ul>
                            <li>
                                <label>
                                    <input
                                        value="Inter- en multidisciplinaire samenwerken"
                                        v-model="comment.tags"
                                        type="checkbox"
                                    />Inter- en multidisciplinaire samenwerken
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        value="Initiëren, organiseren en regisseren"
                                        v-model="comment.tags"
                                        type="checkbox"
                                    />Initiëren, organiseren en regisseren
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        value="Manifesteren en presenteren"
                                        v-model="comment.tags"
                                        type="checkbox"
                                    />Manifesteren en presenteren
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        value="Ontwikkelen en reflecteren"
                                        v-model="comment.tags"
                                        type="checkbox"
                                    />Ontwikkelen en reflecteren
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        value="Onderzoeken"
                                        v-model="comment.tags"
                                        type="checkbox"
                                    />Onderzoeken
                                </label>
                            </li>
                        </ul>
                    </Dropdown>

                    <Dropdown :dropdownName="'BoKS'">
                        <ul>
                            <li>
                                <label>
                                    <input
                                        value="Technologies"
                                        v-model="comment.tags"
                                        type="checkbox"
                                    />Technologies
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        value="Design"
                                        v-model="comment.tags"
                                        type="checkbox"
                                    />Design
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        value="Humanities"
                                        v-model="comment.tags"
                                        type="checkbox"
                                    />Humanities
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        value="Audio en Video"
                                        v-model="comment.tags"
                                        type="checkbox"
                                    />Audio en Video
                                </label>
                            </li>
                        </ul>
                    </Dropdown>
                </div>
                <textarea placeholder="Feedback" v-model="comment.comment"></textarea>
                <a
                    href="#"
                    @click="createUserFeedback"
                    class="button button--primary button--submit"
                >{{ modalButton }}</a>
            </Modal>
        </transition>

        <FeedbackTimeline @openModal="toggleCommentModal" v-if="!loading" :feedback="feedback"></FeedbackTimeline>

        <div class="row" v-if="!loading">
            <Competencies />
            <Boks />
        </div>

        <div class="row" v-if="!loading">
            <div class="col-12">
                <h4>Projecten</h4>
            </div>
        </div>
        <UserProjects v-if="!loading && userProjects[0] !== ''" :userProjects="userProjects" />

        <div class="row" v-if="!loading && userProjects[0] === ''">
            <div class="col-12">
                <p>Deze student heeft geen projecten.</p>
            </div>
        </div>

        <transition name="fade-fast" mode="out-in">
            <Modal
                @closeModal="toggleCommentModal"
                v-if="showCommentModal"
                :modalTitle="'Feedback'"
            >
                <div class="comment">
                    <div class="comment__top">
                        

                        <div class="comment__user">
                            <img
                                :src="getCurrentFeedback().user.picture"
                                alt="profile picture"
                                class="comment__picture"
                            />
                            <h6 class="comment__username">{{ getCurrentFeedback().user.name }}</h6>
                        </div>

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
                    <div class="comment__body">
                        <p class="comment__text">{{ getCurrentFeedback().comment }}</p>
                    </div>
                    <div class="comment__bottom">

                        <div class="comment__tags">
                            <ul class="comment__tags-list">
                                <li
                                    class="comment__tag"
                                    v-for="(tag, index) in getCurrentFeedback().tags"
                                    :key="index"
                                >
                                    <p>{{ tag }}</p>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </Modal>
        </transition>
    </div>
</template>

<script>
import UserService from "@/api/user/UserService";
import CurrentUserService from "@/api/user/CurrentUserService";
import UserFeedbackService from "@/api/user/UserFeedbackService";
import UserProjectsService from "@/api/user/UserProjectsService";

import ProfileInfo from "@/components/partials/user/profile/ProfileInfo";
import Modal from "@/components/partials/ui/Modal";
import FeedbackTimeline from "@/components/partials/user/profile/FeedbackTimeline";
import LoadingIcon from "@/components/partials/ui/LoadingIcon";
import Competencies from "@/components/partials/user/profile/Competencies";
import Boks from "@/components/partials/user/profile/Boks";
import UserProjects from "@/components/partials/user/profile/UserProjects";
import Dropdown from "@/components/partials/ui/Dropdown";

export default {
    name: "user",
    data() {
        return {
            user: null,
            showFeedbackModal: false,
            loading: true,
            feedback: null,
            comment: {
                comment: "",
                tags: [],
                currentUser: {
                    name: this.$auth.user.nickname,
                    picture: this.$auth.user.picture
                }
            },
            modalButton: "Geef feedback",
            showCommentModal: false,
            userProjects: []
        };
    },
    components: {
        Dropdown,
        ProfileInfo,
        Modal,
        FeedbackTimeline,
        LoadingIcon,
        Competencies,
        Boks,
        UserProjects
    },
    watch: {
        "$route.params.id": async function(id) {
            this.loading = true;
            await this.getUserData();
            await this.getUserFeedback();
            await this.getUserProjects();
            this.loading = false;
        }
    },
    async created() {
        await this.getUserData();
        await this.getUserMetaData();
        await this.getUserFeedback();
        await this.getUserProjects();
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
        async getUserProjects() {
            const accessToken = await this.$auth.getTokenSilently();
            this.userProjects = await UserProjectsService.getUserProjectsIds(
                this.$route.params.id,
                accessToken
            );
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
                    if (this.comment.comment) {
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
                        this.comment.comment = "";
                        this.comment.tags = [];
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
.add-tags-title {
    font-weight: bold;
    font-family: $font-title;
    margin: $space-sm 0 0;
}

.modal-title {
    margin-bottom: $space-sm;
}

.comment {
    $self: &;

    &__bottom {
        #{ $self }__tags {
            #{ $self }__tags-list {
                padding: 0;
                display: flex;
                flex-wrap: wrap;

                #{ $self }__tag {
                    background: $light;
                    list-style: none;
                    padding: 5px 10px;
                    margin: 0 $space-xs $space-xs 0;
                    border-radius: 20px;

                    p {
                        font-weight: 800;
                        letter-spacing: .8px;
                        font-size: .8rem;
                        color: darken($light, 65%);

                    }
                }
            }
        }
    }

    &__body {
        margin-bottom: $space-md;
        #{ $self }__text {
            opacity: 0.87;
            line-height: 1.3rem;
        }
    }

    &__top {
        display: flex;
        align-items: center;
        margin-bottom: $space-md;

        #{ $self }__user {
            display: flex;
            align-items: center;
            margin-right: $space-md;

            #{ $self }__picture {
                height: 50px;
                border-radius: 50%;
                margin-right: $space-sm;
            }
        }

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