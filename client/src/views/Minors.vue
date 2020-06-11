<template>
    <div class="page page--padding">
        <div class="row border-bottom">
            <div class="col-12 course-top">
                <router-link class="button button--secondary button-back" to="/trajecten">
                    <svg
                        class="button__only-icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 20 14.8"
                        style="overflow:visible;enable-background:new 0 0 20 14.8;"
                        xml:space="preserve"
                    >
                        <path
                            id="Path_29_1_"
                            d="M0.3,8.1l6.3,6.3c0.4,0.4,1.1,0.4,1.6,0l0,0c0.4-0.4,0.4-1.1,0-1.6L3.8,8.5h15.1C19.5,8.5,20,8,20,7.4l0,0 	c0-0.6-0.5-1.1-1.1-1.1H3.8l4.4-4.4c0.4-0.4,0.4-1.1,0-1.6l0,0c-0.4-0.4-1.1-0.4-1.6,0L0.3,6.6C-0.1,7.1-0.1,7.7,0.3,8.1z"
                        />
                    </svg>
                </router-link>
                <h1 class="h3">{{ $route.params.course.replace('-', '.') }} | Minors</h1>
            </div>
        </div>

        <LoadingIcon v-if="loading" />

        <div class="course-content" v-if="!loading">
            <div class="row">
                <h4 class="col-12">Minors</h4>
            </div>
            <div class="row margin-yb">
                <Minor v-for="minor in minors" :key="minor._id" :minorInfo="minor" />
            </div>

            <div class="row">
                <h4 class="col-12">Studenten</h4>
            </div>
            <div class="row">
                <UserCardSmall v-for="student in students" :key="student.user_id" :studentInfo="student" />
            </div>
            <p v-if="error">{{ error }}</p>
        </div>
    </div>
</template>

<script>
import MinorService from "@/api/course/MinorService";
import UsersService from "@/api/user/UsersService";
import Minor from "@/components/partials/courses/Minor";
import LoadingIcon from "@/components/partials/ui/LoadingIcon";
import UserCardSmall from '@/components/partials/user/UserCardSmall'

export default {
    name: "Minors",
    data() {
        return {
            error: "",
            loading: true,
            minors: [],
            students: [],
            studentIds: []
        };
    },
    components: {
        Minor,
        LoadingIcon,
        UserCardSmall
    },
    methods: {
        async getAllMinorsInCourse() {
            try {
                const accessToken = await this.$auth.getTokenSilently();
                const data = await MinorService.getAllMinorsInCourse(
                    this.$route.params.course,
                    accessToken
                );
                const studentList = [];

                data.forEach(minor => {
                    minor.students.forEach(student => {
                        if (!studentList.includes(student) && student !== '') {
                            studentList.push(student);
                        }
                    });
                });

                this.studentIds = studentList;
                
                await this.getUsers(studentList);

                this.minors = data;
            } catch (err) {
                this.error = err.message;
            }
        },
        async getUsers(students) {
            
            try {
                const accessToken = await this.$auth.getTokenSilently();
                const users = await UsersService.getUsers(students, accessToken);
                this.students = users;
            } catch (err) {
                this.error = err.message;
            }
        }
    },
    async created() {
        await this.getAllMinorsInCourse();
        this.loading = false;
    }
};
</script>

<style lang="scss" scoped>
.button-back {
    display: inline-flex;
    margin-bottom: $space-sm;
    padding: 20px 18px;
}
</style>