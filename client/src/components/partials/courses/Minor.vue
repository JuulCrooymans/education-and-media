<template>
    <div class="col-3">
        <router-link
            :to="`/trajecten/${$route.params.course}/minors/${minorInfo.slug}/projects`"
            class="minor"
        >
            <div class="minor__info">
                <p>{{ minorInfo.name }}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "Minor",
    props: {
        minorInfo: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.minor {
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