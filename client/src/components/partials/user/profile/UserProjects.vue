<template>
    <div class="row">
        <div class="col-3" v-for="project in projects" :key="project._id">
            <router-link
                class="project"
                :to="`/trajecten/${project.courses}/minors/${project.minors}/projects/${project._id}`"
            >
                <p>{{ project.name }}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
import UserProjectsService from "@/api/user/UserProjectsService";

export default {
    name: "userProjects",
    props: {
        userProjects: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            projects: []
        };
    },
    methods: {
        async getProjects() {
            const accessToken = await this.$auth.getTokenSilently();
            const projects = await UserProjectsService.getProjects(
                this.userProjects,
                accessToken
            );

            this.projects = projects;
        }
    },
    created() {
        this.getProjects();
    }
};
</script>

<style lang="scss" scoped>
.project {
    $self: &;

    background: $light;
    display: flex;
    padding: $space-sm;
    border-radius: 15px;
    text-decoration: none;
    color: $dark;
}
</style>