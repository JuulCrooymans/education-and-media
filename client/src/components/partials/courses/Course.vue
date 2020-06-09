<template>
<div>
    <div class="row course-year">
        <h4 class="col-12">{{ course.name }}</h4>
    </div>
    <div class="row courses">
        <div class="col-3" v-for="period in course.periods" :key="period.id">
            <div class="course">
                <div class="course__info">
                    <h6>{{ period.course }}</h6>
                    <h5>{{ period.name }}</h5>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'Course',
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

    .course-year {
        margin-bottom: $space-sm;
    }

    .courses {
        margin-bottom: $space-md;
    }
</style>