<template>
    <div class="margin-y">
        <div class="row">
            <h4 class="col-12">Feedback</h4>
            <div class="filter col-12">
                <input type="date" class="filter__date" v-model="timeline.startDate" />
                <input type="date" class="filter__date" v-model="timeline.endDate" />
                <Dropdown :dropdownName="'Filter 1'">
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox" />filter option 1
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />filter option 2
                            </label>
                        </li>
                    </ul>
                </Dropdown>
                <Dropdown :dropdownName="'Filter 2'">
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox" />filter option 1
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />filter option 2
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />filter option 3
                            </label>
                        </li>
                    </ul>
                </Dropdown>
            </div>
            <div class="timeline col-12">
                <transition-group name="feedback-list" class="timeline__comments" tag="div">
                    <div
                        class="timeline__comment"
                        v-for="comment in feedback"
                        :key="comment.id"
                        :style="{left: getDatePercentage(Date.parse(comment.createdAt)) + '%'}"
                    >
                        <router-link
                            @click.native="$emit('openModal', $event)"
                            :to="{ query: {feedback: comment.id} }"
                            class="comment"
                        >
                            <svg
                                class="comment__icon"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 71.6 63"
                                style="overflow:visible;enable-background:new 0 0 71.6 63;"
                                xml:space="preserve"
                            >
                                <path
                                    id="Path_25_2_"
                                    d="M71.6,31.5C71.6,48.7,55.5,63,35.8,63c-5.7,0-11.5-1.1-16.5-3.6L3.2,61.6c-1.1,0-1.8-0.4-1.8-1.4v-0.4 l2.1-14.7C1.1,40.4,0,35.8,0,31.5C0,14,16.1,0,35.8,0S71.6,14,71.6,31.5z"
                                />
                            </svg>
                        </router-link>
                    </div>
                </transition-group>
                <div class="timeline__dates">
                    <p class="timeline__date">{{ timeline.startDate }}</p>
                    <p class="timeline__date">{{ timeline.endDate }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Dropdown from "@/components/partials/ui/Dropdown";

export default {
    name: "FeedbackTimeline",
    components: {
        Dropdown
    },
    props: {
        feedback: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
            timeline: {
                startDate: "2020-06-05",
                endDate: ""
            }
        };
    },
    methods: {
        getDatePercentage(value) {
            const unixStartDate = Date.parse(this.timeline.startDate);
            const unixEndDate = Date.parse(this.timeline.endDate);

            return (
                ((value - unixStartDate) * (100 - 0)) /
                    (unixEndDate - unixStartDate) +
                0
            );
        },
        toUnixTimestamp(date) {
            return Date.parse(date);
        }
    },
    created() {
        const today = new Date();
        const year = today.getFullYear();
        const date = `${today.getFullYear()}-${(
            "0" +
            (today.getMonth() + 1)
        ).slice(-2)}-${("0" + (today.getDate() + 1)).slice(-2)}`; //return date tomorrow in yyyy-mm-dd format

        this.timeline.endDate = date;
    }
};
</script>

<style lang="scss" scoped>
.timeline {
    $self: &;

    height: 200px;
    border-bottom: solid $dark 2px;
    position: relative;

    &__comments {
        position: relative;
        height: 100%;
        width: 100%;
        overflow-x: hidden;

        #{ $self }__comment {
            position: absolute;
            bottom: 0px;
            padding-bottom: 10px;
            transition: all 0.3s ease;
        }
    }

    &__dates {
        display: flex;
        justify-content: space-between;
        padding-top: $space-sm;

        #{ $self }__date {
            opacity: 0.6;
        }
    }
}

.comment {
    $self: &;
    display: inline-block;
    transition: transform 0.15s ease;
    transform: translate(-100%, 0px);

    &__icon {
        width: 50px;
        fill: $dark;
    }

    &:hover {
        transform: translate(-100%, -10px);
    }
}

.filter {
    display: flex;
    justify-content: flex-start;

    &__date {
        border: 2px solid $light;
        padding: 8px 15px 8px 20px;
        border-radius: 50px;
        margin: $space-sm $space-sm $space-sm 0;
        font-weight: bold;
        font-family: $font-title;
        color: $dark;

        &::-webkit-clear-button {
            display: none;
        }

        &:focus {
            outline: none;
        }

        &::-webkit-calendar-picker-indicator {
            cursor: pointer;
            color: $blue;
            background: url("~@/assets/img/icons/arrowdown.svg") no-repeat
                center;
            margin: 0;
        }
    }
}

.feedback-list-enter-active,
.feedback-list-leave-active {
    transition: all 0.3s ease;
}
.feedback-list-enter,
.feedback-list-leave-to {
    opacity: 0;
    transform: translateY(-80px) scale(1.2);
}
</style>

