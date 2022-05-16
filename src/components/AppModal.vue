<template>
    <section class="modal">
        <div
            v-click-outside="close"
            class="modal-wrapper"
        >
            <header class="header"> 
                <i
                    class="close-icon"
                    @click="close"
                />
            </header>
            <main class="main">
                <slot />
            </main>
            <footer class="footer">
                <slot name="footer" />
            </footer>
        </div>
        <AppMask />
    </section>
</template>

<script setup lang="ts">
import AppMask from '@/components/AppMask.vue';
import vClickOutside from '@/common/directives/click-outside';

const emit = defineEmits<{
    (e: 'close'): void,
}>();

const close = () => {
    emit('close');
};
</script>

<style scoped lang="postcss">
.modal-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: $layer_layout_top;
    width: 50rem;
    max-width: 90%;
    background-color: $color_white;
    border-radius: .5rem;
    transform: translate(-50%, -50%);
}

.header {
    height: 4rem;
    text-align: right;
    background-color: $color_gray;
    border-radius: .5rem .5rem 0 0;

    .close-icon {
        position: relative;
        top: 50%;
        right: .5rem;
        display: inline-block;
        width: 3rem;
        height: 3rem;
        background-image: url("icons/close.svg");
        background-size: cover;
        background-repeat: no-repeat;
        transform: translateY(-50%);
        cursor: pointer;
    }
}

.main {
    overflow-y: auto;
    min-height: 15rem;
    max-height: 50vh;
}

.footer {
    padding: 1rem;
    border-top: .1rem solid $color_gray_light_secondary;
    text-align: center;
    background-color: $color_gray_light_primary;
    border-radius: 0 0 .5rem .5rem;
}
</style>