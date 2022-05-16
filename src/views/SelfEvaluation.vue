<template>
    <div>
        <div class="evaluation-wrapper">
            <div>
                <div
                    v-for="categoryItem in evaluationList"
                    :key="categoryItem.category"
                    class="category"
                >
                    <h2 
                        class="category-name"
                    >
                        {{ categoryItem.category }}
                    </h2>
                    <div class="info">
                        <div
                            v-for="typeItem in categoryItem.info"
                            :key="typeItem.type"
                            class="type"
                        >
                            <div class="type-name">
                                {{ typeItem.type }}
                            </div>
                            <div class="type-score">
                                {{ typeItem.score }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { selfEvaluationStore } from '@/store/self-evaluation';

const store = selfEvaluationStore();
const evaluationList = computed(() => store.evaluationList);
</script>

<style scoped lang="postcss">
.evaluation-wrapper {
    margin-bottom: 5rem;
}

.category {
    margin: 2.5rem 0;

    --color-1: $color_blue_light;
    --color-2: $color_yellow_light;
    --color-3: $color_red_light;
    --color-4: $color_green_light;
    --color-5: $color_purple_light;

    @for $i from 1 to 5 {
        &:nth-child(5n+$i) .type-name {
            /* stylelint-disable-next-line custom-property-pattern */
            background-color: var(--color-$i);
        }
    }
}

.category-name {
    margin-bottom: 1rem;
    text-align: center;
}

.info {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    background-color: $color_gray_light;
    border-radius: .5rem;
}

.type {
    position: relative;
    margin: .5rem;

    .type-name {
        padding: 1rem 2rem;
        font-weight: 600;
        border-radius: 3rem;
    }

    .type-score {
        position: absolute;
        top: -.5rem;
        width: 2rem;
        height: 2rem;
        font-weight: 600;
        line-height: 2rem;
        text-align: center;
        color: $color_white;
        background-color: $color_red;
        border-radius: 50%;
    }
}
</style>