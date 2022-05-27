<template>
    <div>
        <section class="introduction">
            <p class="description">
                Let's explore the front-end world!
            </p>
            <img
                :class="['front-end-world', loadingClass]"
                src="@/assets/images/universe.jpg"
                height="300"
                width="450"
                alt="front-end world"
                @load="loadImage"
            >
        </section>
        <WebHistory />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WebHistory from '@/components/WebHistory.vue';

const loadingClass = ref('loading-placehoder');

const loadImage = () => {
    loadingClass.value = '';
};
</script>

<style scoped lang="postcss" src="@/css/style-utils.css"></style>
<style scoped lang="postcss">
.introduction {
    text-align: center;

    .description {
        margin: 0 2rem 2rem;
        font-weight: 600;
        font-size: 3.5rem;
        font-style: italic;
        font-family: "Times New Roman", arial, sans-serif;

        &::first-letter {
            font-size: 5rem;
        }
    }

    .front-end-world {
        max-width: 90%;
        height: auto;
    }
}
</style>