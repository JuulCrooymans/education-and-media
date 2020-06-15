<template>
    <div class="dropdown">
        <a
            href="#"
            @click="openDropdown"
            class="dropdown__button"
            :class="{'dropdown__button--active': showFilters}"
        >
            <p>{{ dropdownName }}</p>
            <svg
                class="dropdown__icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 15 8.1"
                style="overflow:visible;enable-background:new 0 0 15 8.1;"
                xml:space="preserve"
            >
                <path
                    id="Path_23_1_"
                    class="st0"
                    d="M15,1.3c0,0.4-0.2,0.8-0.5,1.1L8.3,7.9c-0.5,0.4-1.1,0.4-1.6,0l0,0L0.5,2.4 c-0.6-0.5-0.7-1.3-0.2-1.9C0.5,0.2,0.9,0,1.3,0c0.3,0,0.6,0.1,0.8,0.3l0,0l5.3,4.8l5.4-4.8c0.6-0.4,1.4-0.3,1.9,0.3 C14.9,0.8,15,1,15,1.3L15,1.3z"
                />
            </svg>
        </a>
        <div class="dropdown__filters" :class="{'dropdown__filters--active': showFilters}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Dropdown",
    data() {
        return {
            showFilters: false
        };
    },
    props: {
        dropdownName: {
            type: String,
            required: true
        }
    },
    methods: {
        openDropdown(e) {
            e.preventDefault();

            this.showFilters = !this.showFilters;
        }
    }
};
</script>

<style lang="scss" scoped>
.dropdown {
    $self: &;
    display: inline-block;
    margin: $space-sm $space-sm $space-sm 0;
    position: relative;

    &__button {
        color: $dark;
        padding: 10px 20px;
        border-radius: 30px;
        font-weight: bold;
        text-decoration: none;
        display: flex;
        align-items: center;
        border: solid 2px $light;

        #{ $self }__icon {
            width: 15px;
            fill: $blue;
            margin-left: $space-sm;
            transition: transform 0.2s ease;
        }
    }

    &__button--active {
        #{ $self }__icon {
            transform: rotate(-180deg);
        }
    }

    &__filters {
        position: absolute;
        top: 100%;
        left: 0;
        background: #fff;
        padding: $space-sm;
        color: $dark;
        font-weight: bold;
        display: none;
        border-radius: 15px;
        box-shadow: $shadow-small;
        margin-top: $space-xs;
        z-index: 2;

        ul {
            margin: 0;
            padding: 0;
            width: 300px;

            li {
                list-style: none;
                margin-bottom: $space-xs;
                width: 100%;

                label {
                    width: 100%;
                    display: block;
                    cursor: pointer;
                    text-indent: -23px;
                    padding-left: 23px;

                    input {
                        margin-right: $space-xs * 2;
                        margin-bottom: auto;
                    }
                }
            }
        }
    }

    &__filters--active {
        display: inline-block;
    }
}
</style>