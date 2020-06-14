<template>
    <router-link :to="`/trajecten/${courseInfo.course}/minors`" class="course">
        <div class="course__info">
            <h6>{{ courseInfo.course.replace('-', '.') }}</h6>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "Course",
    props: {
        courseInfo: {
            type: Object,
            require: true
        }
    }
};
</script>

<style lang="scss" scoped>
.course {
    $self: &;

    background: $light;
    padding: $space-sm;
    border-radius: 15px;
    display: block;
    text-decoration: none;
    color: $dark;

    &__info {
        opacity: 0.87;
    }
}
</style>