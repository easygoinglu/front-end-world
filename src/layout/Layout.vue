<template>
    <div class="wrapper">
        <header class="header">
            <TheMenu />
        </header>
        <main class="main">
            <router-view
                v-slot="{Component}"
            >
                <Transition
                    name="fade"
                    mode="out-in"
                >
                    <component
                        :is="Component"
                        :key="$route.path"
                    />
                </Transition>
            </router-view>
        </main>
    </div>
</template>

<script setup lang="ts">
import TheMenu from '@/components/TheMenu.vue';
</script>

<style lang="postcss" scoped>
.header {
    position: fixed;
    z-index: $layer_layout_bottom;
    width: 100%;
    background-color: #1d1f42;
}

.main {
    margin: 0 auto;

    @media not all and (min-width: $breakpoint_medium) {
        padding: 7rem 1.5rem 1.5rem;
    }

    @media (min-width: $breakpoint_medium) {
        max-width: 96rem;
        padding-top: 10rem;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>