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

enum WebTypes {
    Overview = 'Overview',
    Browser = 'Browser',
    HTML = 'HTML',
    CSS = 'CSS',
    JavaScript = 'JavaScript',
    Other = 'Other',
}

const webHistoryData = reactive([
    {     
        year: 1989,
        entry: [
            {
                type: [WebTypes.Overview],
                description: 'Web',
            },
        ],
    },
    {
        year: 1993,
        entry: [
            {
                type: [WebTypes.Overview, WebTypes.HTML],
                description: 'HTML',
            },
        ],
    },
    {
        year: 1994,
        entry: [
            {
                type: [WebTypes.Browser],
                description: 'Netscape',
            },
        ],
    },  
    {
        year: 1995,
        entry: [
            {
                type: [WebTypes.Overview, WebTypes.Browser],
                description: 'IE1',
            },
            {
                type: [WebTypes.HTML],
                description: 'HTML2',
            },  
        ],
    },   
    {
        year: 1996,
        entry: [
            {
                type: [WebTypes.Overview, WebTypes.CSS],
                description: 'CSS1',
            },
        ],
    },
    {
        year: 1997,
        entry: [
            {
                type: [WebTypes.Overview, WebTypes.JavaScript],
                description: 'ECMAScript1',
            },
            {
                type: [WebTypes.HTML],
                description: 'HTML3 / HTM4',
            }, 
        ],
    },
    {
        year: 1998,
        entry: [
            {
                type: [WebTypes.CSS],
                description: 'CSS2',
            },
        ],
    },
    {
        year: 2003,
        entry: [
            {
                type: [WebTypes.Overview, WebTypes.Browser],
                description: 'Safari',
            },
        ],
    },
    {
        year: 2004,
        entry: [
            {
                type: [WebTypes.Browser],
                description: 'Firefox',
            },
        ],
    },
    {
        year: 2005,
        entry: [
            {
                type: [WebTypes.Overview],
                description: 'Ajax',
            },
        ],
    },
    {
        year: 2007,
        entry: [
            {
                type: [WebTypes.CSS],
                description: 'Sass',
            },
        ],
    },
    {
        year: 2008,
        entry: [
            {
                type: [WebTypes.Overview, WebTypes.Browser],
                description: 'Chrome',
            },
        ],
    },
    {
        year: 2009,
        entry: [
            {
                type: [WebTypes.Overview, WebTypes.Other],
                description: 'Node.js',
            },
            {
                type: [WebTypes.Overview, WebTypes.JavaScript],
                description: 'ECMAScript 5',
            },
        ],
    },
    {
        year: 2010,
        entry: [
            {
                type: [WebTypes.Overview, WebTypes.Other],
                description: 'Node Package Manager',
            },
            {
                type: [WebTypes.JavaScript],
                description: 'AngularJS',
            },  
        ],
    },
    {
        year: 2011,
        entry: [
            {
                type: [WebTypes.Overview, WebTypes.CSS],
                description: 'CSS3',
            },
            {
                type: [WebTypes.Other],
                description: 'Mocha',
            },  
        ],
    },
    {
        year: 2012,
        entry: [
            {
                type: [WebTypes.Other],
                description: 'Webpack',
            },
        ],
    },
    {
        year: 2013,
        entry: [
            {
                type: [WebTypes.CSS],
                description: 'PostCSS',
            },
            {
                type: [WebTypes.Browser],
                description: 'IE11',
            },  
            {
                type: [WebTypes.Overview, WebTypes.JavaScript],
                description: 'React',
            }, 
        ],
    },
    {
        year: 2014,
        entry: [
            {
                type: [WebTypes.Overview, WebTypes.HTML],
                description: 'HTML5',
            },
            {
                type: [WebTypes.Overview, WebTypes.JavaScript],
                description: 'Vue.js',
            }, 
        ],
    },
    {
        year: 2015,
        entry: [
            {
                type: [WebTypes.Browser],
                description: 'Edge',
            },
            {
                type: [WebTypes.Overview, WebTypes.JavaScript],
                description: 'ECMAScript 6',
            }, 
            {
                type: [WebTypes.Other],
                description: 'Rollup',
            },  
            {
                type: [WebTypes.Other],
                description: 'Cypress',
            },  
        ],
    },
    {
        year: 2016,
        entry: [
            {
                type: [WebTypes.Other],
                description: 'Yarn',
            }, 
            {
                type: [WebTypes.JavaScript],
                description: 'ECMAScript 7',
            },
            {
                type: [WebTypes.JavaScript],
                description: 'Angular',
            },
            {
                type: [WebTypes.CSS],
                description: 'styled-components',
            },
        ],
    },
    {
        year: 2017,
        entry: [
            {
                type: [WebTypes.JavaScript],
                description: 'ECMAScript 8',
            },
            {
                type: [WebTypes.CSS],
                description: 'Emotion',
            },
        ],
    },
    {
        year: 2018,
        entry: [
            {
                type: [WebTypes.JavaScript],
                description: 'ECMAScript 9',
            },
        ],
    },
    {
        year: 2019,
        entry: [
            {
                type: [WebTypes.JavaScript],
                description: 'ECMAScript 10',
            },
            {
                type: [WebTypes.Other],
                description: 'Jest',
            }, 
        ],
    },
    {
        year: 2020,
        entry: [
            {
                type: [WebTypes.JavaScript],
                description: 'ECMAScript 11',
            },
        ],
    },
    {
        year: 2021,
        entry: [
            {
                type: [WebTypes.JavaScript],
                description: 'ECMAScript 12',
            },
            {
                type: [WebTypes.Other],
                description: 'Vite',
            },   
        ],
    },
    {
        year: 2022,
        entry: [
            {
                type: [WebTypes.Overview, WebTypes.JavaScript],
                description: 'ECMAScript 13',
            },
        ],
    },
]);

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
