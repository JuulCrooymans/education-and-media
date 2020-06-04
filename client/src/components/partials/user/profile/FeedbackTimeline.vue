<template>
<div class="margin-y">
    <div class="row">
        <h4 class="col-12">Feedback</h4>
        <div class="filter col-12">
            <Dropdown :dropdownName="'Filter 1'"> 
                <ul>
                    <li>
                        <label><input type="checkbox" >filter option 1</label>
                    </li>
                    <li>
                        <label><input type="checkbox" >filter option 2</label>
                    </li>
                </ul>       
            </Dropdown>
            <Dropdown :dropdownName="'Filter 2'"> 
                <ul>
                    <li>
                        <label><input type="checkbox" >filter option 1</label>
                    </li>
                    <li>
                        <label><input type="checkbox" >filter option 2</label>
                    </li>
                    <li>
                        <label><input type="checkbox" >filter option 3</label>
                    </li>
                </ul>          
            </Dropdown>
        </div>
        <div class="timeline col-12"></div>
    </div>
</div>
</template>

<script>
    import Dropdown from '@/components/partials/ui/Dropdown'

    export default {
        name: 'FeedbackTimeline',
        components: {
            Dropdown
        }
    }
</script>

<style lang="scss" scoped>
    .timeline {
        $self: &;

        background: $xlight;
        height: 200px;
        border-bottom: solid $dark 2px;
    }

    .filter {
        display: flex;
        justify-content: flex-start;
    }
</style>