<template>
    <a 
        v-if="isExternalLink" 
        :href="to"
        target="_blank"
        rel="noopener"
    >
        <slot />
    </a>
    <router-link
        v-else
        :to="{name: to}"
    >
        <slot />
    </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    to: string,
}>();

const isExternalLink = computed(() => typeof props.to === 'string' && props.to.startsWith('http'));
</script>