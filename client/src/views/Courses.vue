<template>
    <div class="page page--padding">
        <div class="row border-bottom page-title">
            <h1 class="col-12 h3">Trajecten</h1>
        </div>

        <LoadingIcon v-if="loading" />

        <div v-if="!loading">
            <div class="row">
                <h4 class="col-12">Leerjaar 3</h4>
            </div>
            <div class="row courses">
                <div class="col-3" v-for="course in courses.yearThree" :key="course._id">
                    <Course :courseInfo="course" />
                </div>
            </div>

            <div class="row">
                <h4 class="col-12">Leerjaar 4</h4>
            </div>
            <div class="row courses">
                <div class="col-3" v-for="course in courses.yearFour" :key="course._id">
                    <Course :courseInfo="course" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CourseService from "@/api/course/CourseService";
import Course from "@/components/partials/courses/Course";
import Modal from "@/components/partials/ui/Modal";
import LoadingIcon from "@/components/partials/ui/LoadingIcon";

export default {
    name: "Periods",
    components: {
        Course,
        Modal,
        LoadingIcon
    },
    data() {
        return {
            loading: true,
            showTrajectModal: false,
            courses: []
        };
    },
    async created() {
        await this.getAllCourses();
        this.loading = false;
    },
    methods: {
        async getAllCourses() {
            try {
                const accessToken = await this.$auth.getTokenSilently();
                const courses = await CourseService.getAllCourses(accessToken);

                const courseData = {
                    yearThree: courses.filter(el => el.year === 3),
                    yearFour: courses.filter(el => el.year === 4)
                };

                this.courses = courseData;
            } catch (err) {
                this.error = err.message;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.page-title {
    margin-bottom: $space-md;
}

.trajecten {
    $self: &;

    &__add {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;

        #{ $self }__icon {
            background: $blue;
            height: 60px;
            width: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s ease;

            svg {
                height: 20px;
                fill: #fff;
            }
        }

        &:hover {
            #{ $self }__icon {
                width: 70px;
                height: 70px;
            }
        }
    }
}

.courses {
    margin-bottom: $space-md;
}
</style>