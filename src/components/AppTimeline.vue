<template>
    <div class="timeline">
        <p class="title">
            {{ title }}
        </p>
        <ul class="entry-list">
            <li
                v-for="entry in timeline"
                :key="entry.year"
                class="entry"
            >
                <h2 class="entry-title">
                    {{ entry.year }}
                </h2>
                <p class="entry-description">
                    {{ entry.description }}
                </p>
            </li>
        </ul>
    </div> 
</template>

<script setup lang="ts">
defineProps<{
    title: string,
    timeline: {
        year: number,
        description: string,  
    }[],
}>();
</script>

<style scoped lang="postcss">
.timeline {
    margin: 1rem auto;
    padding: 2rem 2rem 0;
    background-color: $color_black;
    border-radius: .5rem;
}

.title {
    margin-bottom: 3rem;
    font-weight: 600;
    font-size: 3rem;
    color: $color_yellow_light;
}

.entry-list {
    &::after {
        content: "";
        clear: both;
        display: block;
        width: 100%;
        height: 0;
    }
}

.entry {
    position: relative;
    width: 50%;
    min-height: 20rem;

    &::before {
        content: "";
        position: absolute;
        z-index: $layer_content_top;
        width: 2rem;
        height: 2rem;
        border: .3rem solid $color_white;
        background-color: $color_black;
        border-radius: 100%;
    }

    &:nth-child(odd) {
        float: left;
        padding-right: 3rem;
        text-align: right;

        &::before {
            right: 0;
            transform: translateX(50%);
        }

        &:not(:last-child)::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 50%;
            width: .5rem;
            background-color: $color_white;
            transform: translateX(50%);
        }
    }

    &:nth-child(even) {
        float: right;
        padding-left: 3rem;
        transform: translateY(50%);

        &::before {
            left: 0;
            transform: translateX(-50%);
        }

        &:not(:last-child)::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 50%;
            left: 0;
            width: .5rem;
            background-color: $color_white;
            transform: translateX(-50%);
        }
    }

    &:last-child {
        min-height: 10rem;

        &:nth-child(even) {
            transform: translateY(100%);
        }
    }

    .entry-title {
        font-size: 2.5rem;
        color: $color_white;
    }

    .entry-description {
        margin-top: 1rem;
        font-size: 1.6rem;
        line-height: 1.5;
        color: $color_white;
        word-wrap: break-word;
    }
}
</style>