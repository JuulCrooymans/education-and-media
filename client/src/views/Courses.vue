<template>
    <div class="page page--padding">
        <div class="row border-bottom  page-title">
            <h1 class="col-12 h3">Trajecten</h1>
        </div>
        <div class="row course-year">
            <h4 class="col-12">Leerjaar 1</h4>
        </div>

        <div class="row courses">
            <Course v-for="course in courses.yearOne" :key="course.id" :course="course" />
        </div>

        <div class="row course-year">
            <h4 class="col-12">Leerjaar 2</h4>
        </div>

        <div class="row courses">
            <Course v-for="course in courses.yearTwo" :key="course.id" :course="course" />
        </div>

        <div class="row course-year">
            <h4 class="col-12">Leerjaar 3</h4>
        </div>

        <div class="row courses">
            <Course v-for="course in courses.yearThree" :key="course.id" :course="course" />
        </div>

        <div class="row course-year">
            <h4 class="col-12">Leerjaar 4</h4>
        </div>

        <div class="row courses">
            <Course v-for="course in courses.yearFour" :key="course.id" :course="course" />
        </div>

        <div class="row trajecten">
            



            <a @click="toggleModalTraject" class="trajecten__add col-1" href="#">
                <div class="trajecten__icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 99 99" style="overflow:visible;enable-background:new 0 0 99 99;" xml:space="preserve"><path d="M99,49.5c0,1.2-0.5,2.4-1.3,3.2c-0.8,0.8-1.9,1.3-3.2,1.3H54v40.5c0,2.5-2,4.5-4.5,4.5S45,97,45,94.5V54H4.5 C2,54,0,52,0,49.5S2,45,4.5,45H45V4.5C45,2,47,0,49.5,0c1.2,0,2.4,0.5,3.2,1.3C53.5,2.1,54,3.3,54,4.5V45h40.5C97,45,99,47,99,49.5z"/></svg>
                </div>
            </a>
        </div>

        <transition name="fade-fast" mode="out-in">
            <Modal @closeModal="toggleModalTraject" v-if="showTrajectModal" :modalTitle="'Traject toevoegen'">
                <p>test</p>
            </Modal>
        </transition>
    </div>
</template>

<script>
    import Course from '@/components/partials/courses/Course'
    import Modal from '@/components/partials/ui/Modal'

    export default {
        name: 'Periods',
        components: {
            Course,
            Modal
        },
        data() {
            return {
                showTrajectModal: false,
                trajecten: [],
                courses: {
                    yearOne: [
                        {
                            id: 0,
                            name: 'Lorem ipsum',
                            course: '1.1'
                        },
                        {
                            id: 1,
                            name: 'Lorem ipsum',
                            course: '1.2'
                        },
                        {
                            id: 2,
                            name: 'Lorem ipsum',
                            course: '1.3'
                        },
                        {
                            id: 3,
                            name: 'Lorem ipsum',
                            course: '1.4'
                        }
                    ],
                    yearTwo: [
                        {
                            id: 0,
                            name: 'Lorem ipsum',
                            course: '2.1'
                        },
                        {
                            id: 1,
                            name: 'Lorem ipsum',
                            course: '2.2'
                        },
                        {
                            id: 2,
                            name: 'Lorem ipsum',
                            course: '2.3'
                        },
                        {
                            id: 3,
                            name: 'Lorem ipsum',
                            course: '2.4'
                        }
                    ],
                    yearThree: [
                        {
                            id: 0,
                            name: 'Lorem ipsum',
                            course: '3.3'
                        },
                        {
                            id: 1,
                            name: 'Lorem ipsum',
                            course: '3.4'
                        }
                    ],
                    yearFour: [
                        {
                            id: 0,
                            name: 'Lorem ipsum',
                            course: '4.1'
                        },
                        {
                            id: 1,
                            name: 'Lorem ipsum',
                            course: '4.2'
                        }

                    ]
                }
            }
        },
        methods: {
            toggleModalTraject(event) {
                if (event) event.preventDefault();
                this.showTrajectModal = !this.showTrajectModal;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-title {
        margin-bottom: $space-md;
    }

    .course-year {
        margin-bottom: $space-sm;
    }

    .courses {
        margin-bottom: $space-md;
    }

    .trajecten {
        $self: &;

        &__add {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 200px;

            #{ $self }__icon {
                background: $blue;
                height: 60px;
                width: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all .15s ease;

                svg {
                    height: 20px;
                    fill: #fff;
                }
            }

            &:hover {
                #{ $self }__icon {
                    width: 70px;
                    height: 70px;
                }
            }
        }
    }
</style>