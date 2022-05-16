<template>
    <button
        class="button"
        type="button"
        :name="name"
        @click="action"
    >
        <slot />
    </button>
</template>
                
<script setup lang="ts">
defineProps<{
    name?: string,
}>();

const emit = defineEmits<{
    (e: 'action'): void,
}>();

const action = () => {
    emit('action');
};
</script>

<style scoped lang="postcss">
.button {
    border: .1rem solid $color_gray_light_secondary;
    padding: 1rem 2rem;
    font-weight: 600;
    font-size: 1.8rem;
    color: $color_black_light;
    background-color: $color_white;
    border-radius: .7rem;
    cursor: pointer;
}
</style>