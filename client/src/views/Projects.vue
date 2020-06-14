<template>
    <div class="page page--padding">
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
                <h1 class="h3">Projecten</h1>
            </div>
        </div>

        <LoadingIcon v-if="loading" />

        <div class="course-content" v-if="!loading">
            <div class="row" v-if="projects.length > 0">
                <Project v-for="project in projects" :key="project._id" :projectInfo="project" />
            </div>

            <div class="row" v-else>
                <p class="col-12">Geen projecten</p>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectService from "@/api/course/ProjectService";
import LoadingIcon from "@/components/partials/ui/LoadingIcon";
import Project from "@/components/partials/courses/Project";

export default {
    name: "Projects",
    data() {
        return {
            error: "",
            loading: true,
            projects: []
        };
    },
    components: {
        LoadingIcon,
        Project
    },
    methods: {
        async getAllProjectsInMinor() {
            try {
                const accessToken = await this.$auth.getTokenSilently();
                const course = this.$route.params.course;
                const minor = this.$route.params.minor;
                const projects = await ProjectService.getAllProjectsInMinor(
                    course,
                    minor,
                    accessToken
                );

                this.projects = projects.filter(el => el.isActive === true);
                
            } catch (err) {
                this.error = err.message;
            }
        }
    },
    async created() {
        await this.getAllProjectsInMinor();
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