import { createPinia } from 'pinia';
import { watch } from 'vue';

const pinia = createPinia();

watch(
    () => pinia.state.value.selfEvaluation,
    (state) => {
        localStorage.setItem('selfEvaluationState', JSON.stringify(state))
    },
    { 
        deep: true, 
    },
);

export default pinia;
