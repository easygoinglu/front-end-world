<template>
    <a 
        v-if="isExternalLink" 
        class="external-link"
        :href="to"
        target="_blank"
        rel="noopener"
    >
        <slot />
    </a>
    <router-link
        v-else
        class="internal-link"
        v-bind="$props"
    >
        <slot />
    </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...RouterLink.props,
});

const isExternalLink = computed(() => typeof props.to === 'string' && props.to.startsWith('http'));
</script>