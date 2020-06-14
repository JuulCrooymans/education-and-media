<template>
    <div class="col-12">
        <h4>Projecten</h4>
        <router-link v-for="project in projects" :key="project._id" :to="`/trajecten/${project.courses}/minors/${project.minors}/projects/${project._id}`">
            <p>{{ project.name }}</p>
        </router-link>
    </div>
</template>

<script>
import UserProjectsService from '@/api/user/UserProjectsService';

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
            const projects = await UserProjectsService.getProjects(this.userProjects, accessToken);

            this.projects = projects;
        }
    },
    created() {
        this.getProjects();
    }
};
</script>

<style lang="scss" scoped>
</style>