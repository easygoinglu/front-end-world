<template>
    <div class="message-modal">
        <AppModal
            @close="closeModal"
        >
            <template #default>
                <p class="message">
                    {{ message }}
                </p>
            </template>
            <template #footer>
                <AppButton
                    class="button"
                    @action="action"
                >
                    {{ buttonText }}
                </AppButton>
                <AppButton
                    class="button"
                    name="cancel"
                    @action="closeModal"
                >
                    Cancel
                </AppButton>
            </template>
        </AppModal>
    </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import AppModal from '@/components/AppModal.vue';

defineProps<{
    message: string,
    buttonText: string,
}>();

const emit = defineEmits<{
    (e: 'action'): void,
    (e: 'close'): void,
}>();

const action = () => {
    emit('action');
};

const closeModal = () => {
    emit('close');
};
</script>

<style scoped lang="postcss">
.message {
    font-size: 1.8rem;
    line-height: 15rem;
    text-align: center;
}

.button {
    & + & {
        margin-left: 1rem;
    }
}
</style>

