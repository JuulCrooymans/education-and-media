<template>
    <div class="page page--padding">
        <LoadingIcon v-if="loading" />

        <div v-if="!loading">
            <div class="row border-bottom">
                <div class="col-12 course-top">
                    <router-link
                        class="button button--secondary button-back"
                        :to="`/trajecten/${$route.params.course}/minors`"
                    >
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
                    <h1 class="h3">{{ project.name }}</h1>
                </div>
            </div>
            <div class="course-content">
                <div class="row">
                    <h4 class="col-12">{{ project.title }}</h4>
                </div>
                <div class="row margin-yb">
                    <div class="col-6">
                        <p>{{ project.info }}</p>
                    </div>
                </div>

                <div class="row">
                    <h4 class="col-12">Studenten</h4>
                </div>

                <div class="row" v-if="students.length > 0">
                    <UserCardSmall v-for="student in students" :key="student.user_id" :studentInfo="student" />
                </div>

                <div class="row" v-else>
                    <p class="col-12">Geen studenten</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProjecService from "@/api/course/ProjectService";
import UsersService from "@/api/user/UsersService";
import LoadingIcon from "@/components/partials/ui/LoadingIcon";
import UserCardSmall from '@/components/partials/user/UserCardSmall'

export default {
    name: "ProjectPage",
    data() {
        return {
            error: "",
            loading: true,
            project: null,
            students: []
        };
    },
    components: {
        LoadingIcon,
        UserCardSmall
    },
    async created() {
        await this.getProject();
        this.loading = false;
    },
    methods: {
        async getProject() {
            try {
                const course = this.$route.params.coures;
                const minor = this.$route.params.minor;
                const project = this.$route.params.project;
                const accessToken = await this.$auth.getTokenSilently();
                const data = await ProjecService.getUniqueProject(
                    course,
                    minor,
                    project,
                    accessToken
                );
                
                await this.getUsers(data[0].students);
                this.project = data[0];

            } catch (err) {
                console.log(err);
            }
        },
        async getUsers(students) {
            if (students.length === 0) {
                students = false;
            }
            try {
                const accessToken = await this.$auth.getTokenSilently();
                const users = await UsersService.getUsers(students, accessToken);
                this.students = users;
            } catch (err) {
                this.error = err.message;
            }
        }
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