<template>
    <div class="col-3">
        <div class="course">
            <div class="course__info">
                <h6>{{ course.course }}</h6>
                <h5>{{ course.name }}</h5>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Traject',
        props: {
            course: {
                type: Object,
                require: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .course {
        $self: &;

        background: $light;
        padding: $space-sm;
        border-radius: 15px;

        &__info {
            opacity: .87;
        }
    }
</style>