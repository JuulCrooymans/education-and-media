<template>
    <div class="col-12 col-lg-6 margin-y border-left">
        <h4>Body of Knowledge &amp; Skill</h4>
        <div class="boks">
            <div class="boks__info">
                <ul>
                    <li v-for="skill in skills" :key="skill.id">
                        <div class="boks__color" :style="{background: skill.color}"></div>
                        <p>{{ skill.name }}</p>
                    </li>
                </ul>
            </div>
            <div class="boks__chart">
                <div id="boks-chart"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as d3 from "d3";

export default {
    name: "Boks",
    data() {
        return {
            skills: [
                {
                    id: 0,
                    name: "Technologies",
                    percentage: 45,
                    color: "#2EEF75"
                },
                {
                    id: 1,
                    name: "Design",
                    percentage: 30,
                    color: "#FFE354"
                },
                {
                    id: 2,
                    name: "Humanities",
                    percentage: 25,
                    color: "#69B4FF"
                },
                {
                    id: 3,
                    name: "Audio & Video",
                    percentage: 10,
                    color: "#EF64FF"
                }
            ]
        };
    },
    mounted() {
        this.generateChart();
    },
    methods: {
        generateChart() {
            const width = 400;
            const height = 400;
            const radius = Math.min(width, height) / 2;

            const svg = d3
                .select("#boks-chart")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr(
                    "transform",
                    "translate(" + width / 2 + "," + height / 2 + ")"
                );

            const pie = d3.pie().value(function(d) {
                return d.value.percentage;
            });

            const data = pie(d3.entries(this.skills));

            svg.selectAll("path")
                .data(data)
                .enter()
                .append("path")
                .attr(
                    "d",
                    d3
                        .arc()
                        .innerRadius(140)
                        .outerRadius(radius)
                )
                .attr("fill", function(d) {
                    return d.data.value.color;
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.boks {
    $self: &;
    display: flex;
    margin-top: $space-md;

    &__info {
        margin-right: $space-lg;
        ul {
            padding: 0;
            margin: 0;

            li {
                list-style: none;
                display: flex;
                margin-bottom: $space-sm;

                #{ $self }__color {
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    margin-right: $space-xs;
                }

                p {
                    opacity: 0.87;
                }
            }
        }
    }
}
</style>