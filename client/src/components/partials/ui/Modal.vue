<template>
    <div class="modal">
        <div class="row">
            <div class="modal__wrapper col-6 offset-3">
                <div class="modal__nav">
                    <p class="modal__title">{{ modalTitle }}</p>
                    <a href="#" class="modal__close" @click="$emit('closeModal', $event)">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 59.9 59.9" style="overflow:visible;enable-background:new 0 0 59.9 59.9;" xml:space="preserve"><path class="st0" d="M36.3,30l22.3,22.3c1.8,1.8,1.8,4.6,0,6.4l0,0c-1.8,1.8-4.6,1.8-6.4,0L30,36.3L7.7,58.6c-1.8,1.8-4.6,1.8-6.4,0 l0,0c-1.8-1.8-1.8-4.6,0-6.4L23.6,30L1.3,7.7c-1.8-1.8-1.8-4.6,0-6.4l0,0c1.8-1.8,4.6-1.8,6.4,0L30,23.6L52.2,1.3 c1.8-1.8,4.6-1.8,6.4,0l0,0c1.8,1.8,1.8,4.6,0,6.4L36.3,30z"/></svg>
                    </a>
                </div>
                <div class="modal__content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
        props: {
            modalTitle: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
.modal {
    $self: &;

    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
    background: rgba(0, 0, 0, .8);
    display: flex;
    justify-content: center;
    align-items: center;

    input[type=text], textarea {
        width: 100%;
    }

    .row {
        width: 100%;
    }

    &__wrapper {
        background: #fff;
        padding: $space-md;
        border-radius: $border-radius;
        box-shadow: 0 10px 50px rgba(0,0,0, .3);

        #{ $self }__nav {
            display: flex;
            justify-content: space-between;
            margin-bottom: $space-sm;

            #{ $self }__title {
                color: darken($light, 30%);
                font-family: $font-title;
                font-weight: bold;
            }

            #{ $self }__close {
                svg {
                    height: 20px;
                    fill: $red;
                }
            }
        }
        
        #{ $self }__content { 
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .button--submit {
                margin: $space-md 0 0;
                align-self: center;
            }
        }
    }
}
</style>