<template>
    <div class="col-12 col-lg-6 margin-y">
        <h4>Competenties</h4>
        <div class="competencies">
            <div class="competencies__generic competencies__list">
                <ul>
                    <li v-for="el in competencies.generic" :key="el.id">
                        <p>{{ el.name }}</p>
                        <div class="progress">
                            <div class="progress__bg"></div>
                            <div class="progress__indicator" :style="{width: `${el.percentage}%`}"></div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="competencies__profession competencies__list">
                <ul>
                    <li v-for="el in competencies.profession" :key="el.id">
                        <p>{{ el.name }}</p>
                        <div class="progress">
                            <div class="progress__indicator" :style="{width: `${el.percentage}%`}"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Competencies',
        data() {
            return {
                competencies: {
                    generic: [
                        {
                            id: 0,
                            name: 'Oriënteren & begrijpen',
                            percentage: 25
                        },
                        {
                            id: 1,
                            name: 'Conceptualiseren',
                            percentage: 25
                        },
                        {
                            id: 2,
                            name: 'Verbeelden & prototypes maken',
                            percentage: 25
                        },
                        {
                            id: 3,
                            name: 'Evalueren',
                            percentage: 25
                        }
                    ],
                    profession: [
                        {
                            id: 0,
                            name: 'Inter- en multidisciplinaire samenwerken',
                            percentage: 25
                        },
                        {
                            id: 1,
                            name: 'Initiëren, organiseren en regisseren',
                            percentage: 25
                        },
                        {
                            id: 2,
                            name: 'Manifesteren en presenteren',
                            percentage: 25
                        },
                        {
                            id: 3,
                            name: 'Ontwikkelen en reflecteren',
                            percentage: 25
                        },
                        {
                            id: 4,
                            name: 'Onderzoeken',
                            percentage: 10
                        }
                    ]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .competencies {
        $self: &;
        display: flex;
        margin-top: $space-md;

        &__generic {
            width: 50%;
        }

        &__profession {
            width: 50%;
        }

        &__list {
            ul {
                padding: 0;
                margin: 0;

                li {
                    list-style: none;
                    margin-bottom: $space-sm;

                    p {
                        opacity: .87;
                        margin-bottom: $space-xs;
                    }

                    .progress {
                        width: calc(100% - 30px);
                        height: 15px;
                        background: $light;
                        border-radius: 15px;

                        &__indicator {
                            background: $blue;
                            height: 100%;
                            border-radius: 15px;
                        }
                    }
                }
            }
        }
    }
</style>