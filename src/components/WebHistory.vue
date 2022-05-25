<template>
    <section class="web-history">
        <h2 class="web-history-title">
            Web History
        </h2>
        <ul
            class="web-types"
            @click="clickType"
        >
            <li
                v-for="webType in WebTypes"
                :key="webType"
                :class="['web-type', webType.toLowerCase()]"
                :data-web-type="webType"
            >
                {{ webType }}
            </li>
        </ul>   
        <AppTimeline
            :title="currentWebType"
            :timeline="timeline"
        />      
    </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import AppTimeline from '@/components/AppTimeline.vue';
import { WebTypes, webHistoryEntries } from '@/data/web-history';

const webHistoryData = reactive(webHistoryEntries);

const currentWebType = ref(WebTypes.Overview);

const timeline = computed(() => {
    const timelineData = webHistoryData.map((historyData) => {
        const description = historyData.entry.filter(
            (item) => item.type.includes(currentWebType.value),
        ).reduce((accumulator, item) => {
            if (accumulator) {
                return `${accumulator} / ${item.description}`;
            } 
            return item.description;
        }, '');
        
        return {
            year: historyData.year,
            description,
        }
    }).filter((historyData) => historyData.description);
        
    return timelineData;
});

const clickType = (e: Event) => {
    if (!(e !== undefined && e.target instanceof HTMLElement)) {
        return;
    }

    currentWebType.value = WebTypes[e.target.dataset.webType as keyof typeof WebTypes];
};
</script>

<style scoped lang="postcss">
.web-history {
    @media not all and (min-width: $breakpoint_medium) {
        margin: 2rem 0;
    }

    @media (min-width: $breakpoint_medium) {
        margin: 5rem 0;
    }

    .web-history-title {
        margin-top: 5rem;
        margin-bottom: 2rem;
        font-size: 2.5rem;
        text-align: center;
    }

    .web-types {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(10rem, auto));
        grid-gap: 1rem;
    }

    .web-type {
        height: 15rem;
        padding: 1rem;
        font-weight: 600;
        color: $color_white;
        background-repeat: no-repeat;
        cursor: pointer;

        &.overview {
            background-image: url("@/assets/images/solar_system.jpg");
            background-position: center;
            background-size: cover;
            grid-column: 1/-1;

            @media (min-width: $breakpoint_medium) {
                grid-column: span 2;
            }
        }

        &:not(.overview) {
            background-image: url("@/assets/images/planet_sprites.jpg");
            background-size: auto 500%;
        }

        &.browser {
            background-position: 40.9% 75%;   /* 40.9% = 50% - ((662-602)/662) * 100% */
        }

        &.html {
            background-position: 40.9% 100%;
        }

        &.css {
            background-position: 40.9% 25%;
        }

        &.javascript {
            background-position: 40.9% 50%;
        }

        &.other {
            background-position: 50% 0;

            @media not all and (min-width: $breakpoint_medium) {
                &:nth-child(3n) {
                    background-position: 50% 2%;
                    background-size: auto 600%;
                    grid-column: span 2;
                }

                &:nth-child(3n-1) {
                    background-position: 50% 5%;
                    background-size: auto 900%;
                    grid-column: span 3;
                }
            }
        }
    }
}
</style>
