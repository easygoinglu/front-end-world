<template>
    <nav class="menu">
        <i
            class="menu-icon menu-burger-icon"
            @click.stop="showMenu"
        />
        <ul           
            v-click-outside="hideMenu"
            class="menu-list"
            :style="`--menu-active: ${isHideMenu}`"
            @click.stop="hideMenu"
        >
            <li
                class="menu-icon menu-close-icon"
                @click="hideMenu"
            />
            <li 
                v-for="menu in MAIN_MENU"
                :key="menu.id"  
                class="menu-item"
            >
                <AppLink 
                    class="menu-link" 
                    :to="menu.id"
                >
                    {{ menu.name }}
                </AppLink>
            </li>    
        </ul>
        <AppMask v-show="!isHideMenu" />
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import vClickOutside from '@/common/directives/click-outside';
import AppMask from '@/components/AppMask.vue';

const MAIN_MENU = [
    {
        id: 'front-end-overview',
        name: 'Overview',
    },
    {
        id: 'self-evaluation',
        name: 'Self-Evaluation',
    },
];

const isHideMenu = ref(1);

const showMenu = () => {
    isHideMenu.value = 0;
};

const hideMenu = () => {
    isHideMenu.value = 1;
};
</script>

<style scoped lang="postcss">
.menu {
    height: 4.5rem;
    padding: 0 2rem;

    @media (min-width: $breakpoint_large) {
        max-width: 96rem;
        border-top: none;
        border-bottom: none;
        margin: 0 auto;
    }
}

@media not all and (min-width: $breakpoint_medium) {
    .menu-icon {
        display: inline-block;
        width: 3rem;
        height: 3rem;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .menu-burger-icon {
        position: absolute;
        top: calc((4.5rem - 3rem) / 2);
        right: 1rem;
        background-image: url("@/assets/icons/menu.svg");
    }

    .menu-close-icon {
        margin: 1rem;
        background-image: url("@/assets/icons/close_circle.svg");
    }
}

.menu-list {
    display: flex;

    @media not all and (min-width: $breakpoint_medium) {
        position: fixed;
        top: 0;
        right: 0;
        z-index: $layer_layout_top;
        flex-direction: column;
        height: 100vh;
        background-color: #53b2db;
        transform: translateX(calc(var(--menu-active) * 100%));
    }

    @media (min-width: $breakpoint_medium) {
        justify-content: flex-end;
        align-items: center;
    }
}

.menu-item {
    @media (min-width: $breakpoint_medium) {
        border-left: .2rem solid rgb(44 151 146 / 60%);

        &:last-child {
            border-right: .2rem solid rgb(44 151 146 / 60%);
        }
    }
}

.menu-link {
    display: block;
    padding: 0 2rem;
    font-weight: 600;
    font-size: 2rem;
    line-height: 4.5rem;
    color: $color_white;

    &:hover {
        background-color: rgb(175 175 175 / 50%);
    }

    &.router-link-active {
        background-color: rgb(44 151 146 / 60%);
    }
}
</style>