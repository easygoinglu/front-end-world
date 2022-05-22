<template>
    <div>
        <section class="introduction">
            <p class="description">
                Let's explore the front-end world!
            </p>
            <img
                class="universe"
                src="@/assets/images/universe.jpg"
                height="300"
                width="450"
                alt="front-end world"
            >
        </section>
    </div>
</template>

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

    .universe {
        max-width: 90%;
        height: auto;
    }
}
</style>