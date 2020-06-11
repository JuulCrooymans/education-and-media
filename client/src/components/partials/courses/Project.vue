<template>
    <div class="col-3">
        <router-link class="project" :to="`/trajecten/${$route.params.course}/minors/${$route.params.minor}/projects/${projectInfo._id}`">
            <div class="project__info">
                <p>{{ projectInfo.name }}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "Project",
    props: {
        projectInfo: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.project {
    $self: &;

    background: $light;
    padding: $space-sm;
    border-radius: 15px;
    display: inline-block;
    text-decoration: none;
    color: $dark;
    width: 100%;


    &__info {
        opacity: 0.87;
    }
}
</style>