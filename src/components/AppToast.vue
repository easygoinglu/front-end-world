<template>
    <div
        :class="['toast', type, {'is-active': isActive}]"
    >
        <p class="message">
            {{ message }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { onUpdated } from 'vue';

const props = defineProps<{
    type: string,
    message: string,
    isActive: boolean,
}>();

const emit = defineEmits<{
    (e: 'hide'): void,
}>();

const hide = () => {
    emit('hide');
};

onUpdated(() => {
    if (props.isActive) {
        const toastTimer = setTimeout(() => {
            clearTimeout(toastTimer);

            hide();
        }, 2000);
    }
});
</script>

<style scoped lang="postcss">
.toast {
    position: fixed;
    top: -4rem;
    left: 50%;
    z-index: $layer_layout_top;
    width: 28rem;
    padding: 1rem;
    color: $color_black;
    background-position: 1.5rem center;
    background-size: 2.5rem;
    background-repeat: no-repeat;
    border-radius: 2rem;
    opacity: 0;
    transform: translateX(-50%);
    transition: .4s;

    &.error {
        background-color: $color_red_light_primary;
        background-image: url("icons/error.svg");
    }

    &.is-active {
        top: 3rem;
        opacity: 1;
    }
}

.message {
    display: inline-block;
    margin-left: 4rem;
}
</style>