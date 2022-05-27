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
                v-for="(value, key, index) in WebTypes"
                :key="key"
                :class="['web-type', key.toLowerCase()]"
                :data-web-type="key"
            >
                <p class="web-type-name">
                    {{ value }}
                </p>
                <img
                    :class="['web-type-image', loadingClass[index]]"
                    :src="key === 'Overview' ? overviewImage : webTypeImageSprites"
                    :height="key === 'Overview' ? 150 : 750"
                    :alt="key"
                    @load="loadImage(index)"
                >
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
import overviewImage from '@/assets/images/solar_system.jpg';
import webTypeImageSprites from '@/assets/images/planet_sprites.jpg';

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

    let webType = e.target.dataset.webType;
    if (!e.target.dataset.webType && e.target.parentNode instanceof HTMLElement) {
        webType = e.target.parentNode.dataset.webType;
    }

    currentWebType.value = WebTypes[webType as keyof typeof WebTypes];
};

const loadingClass = reactive<string[]>(Array(5).fill('loading-placehoder'));

const loadImage = (webType: number) => {
    loadingClass[webType] = '';
};
</script>

<style scoped lang="postcss" src="@/css/style-utils.css"></style>
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
        position: relative;
        overflow: hidden;
        height: 15rem;
        font-weight: 600;
        color: $color_white;
        background-repeat: no-repeat;
        border-radius: .5rem;
        cursor: pointer;

        .web-type-name {
            position: absolute;
            z-index: $layer_content_top;
            padding-top: 1rem;
            padding-left: 1rem;
        }

        .web-type-image {
            position: absolute;
            width: 100%;
            object-fit: cover;
        }

        &.overview {
            grid-column: 1/-1;

            @media (min-width: $breakpoint_medium) {
                grid-column: span 2;
            }
        }

        &:not(.overview, .other) {
            .web-type-image {
                width: 110%;  /* 110% = 662 / 602 * 100% */
            }
        }

        &.browser {
            .web-type-image {
                top: -300%;
            }
        }

        &.html {
            .web-type-image {
                top: -400%;
            }
        }

        &.css {
            .web-type-image {
                top: -100%;
            }
        }

        &.javascript {
            .web-type-image {
                top: -200%;
            }
        }

        &.other {
            @media not all and (min-width: $breakpoint_medium) {
                &:nth-child(3n) {
                    grid-column: span 2;

                    .web-type-image {
                        top: -20%;
                        height: 700%;
                    }
                }

                &:nth-child(3n-1) {
                    grid-column: span 3;

                    .web-type-image {
                        top: -40%;
                        height: 900%;
                    }
                }
            }
        }
    }
}
</style>
