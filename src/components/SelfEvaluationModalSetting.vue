<template>
    <div class="evaluation-modal">
        <AppModal
            @close="closeModal"
        >
            <template #default>
                <form class="evaluation-form">
                    <label
                        class="evaluation-title"
                        for="category"
                    >Category: </label>
                    <template v-if="modalType === 'add'">
                        <p>
                            <span class="evaluation-column">
                                <input          
                                    v-model="categoryOptions.checkedCategory"
                                    class="evaluation-type-option"
                                    type="radio"
                                    value="original"
                                >
                                <select
                                    id="category"
                                    v-model="categoryOptions.selectedCategory"
                                    class="evaluation-value"
                                    @focus="handleCategory('original')"
                                >
                                    <option
                                        disabled
                                        value=""
                                    >
                                        Please select one
                                    </option>
                                    <option
                                        v-for="item in categories"
                                        :key="item.category"
                                        :value="item.category"
                                    >
                                        {{ item.category }}
                                    </option>
                                </select>
                            </span>
                            <span class="evaluation-column">
                                <input
                                    v-model="categoryOptions.checkedCategory"
                                    class="evaluation-type-option"
                                    type="radio"
                                    value="new"
                                >
                                <input
                                    v-model.trim="categoryOptions.categoryName"
                                    class="evaluation-value"
                                    placeholder="new Category"
                                    @focus="handleCategory('new')"
                                >
                            </span>
                        </p>
                    </template>
                    <template v-else>
                        <p>
                            {{ currentCategory }}
                        </p>
                    </template>
                    <label
                        class="evaluation-title"
                        for="type"
                    >
                        Type:
                    </label>
                    <template v-if="modalType === 'add'">
                        <p>
                            <span class="evaluation-column">
                                <input          
                                    v-model="typeOptions.checkedType"
                                    class="evaluation-type-option"
                                    type="radio"
                                    value="original"
                                >
                                <select
                                    id="type"
                                    v-model="typeOptions.selectedType"
                                    class="evaluation-value"
                                    @focus="handleType('original')"
                                >
                                    <option
                                        disabled
                                        value=""
                                    >
                                        Please select one
                                    </option>
                                    <option
                                        v-for="item in info"
                                        :key="item.type"
                                        :value="item.type"
                                    >
                                        {{ item.type }}
                                    </option>
                                </select>
                            </span>
                            <span class="evaluation-column">
                                <input
                                    v-model="typeOptions.checkedType"
                                    class="evaluation-type-option"
                                    type="radio"
                                    value="new"
                                >
                                <input
                                    v-model.trim="typeOptions.typeName"
                                    class="evaluation-value"
                                    placeholder="new Type"
                                    @focus="handleType('new')"
                                >
                            </span>
                        </p>
                    </template>
                    <template v-else>
                        <p>
                            {{ currentType }}
                        </p>
                    </template>
                    <label
                        class="evaluation-title"
                        for="score"
                    >
                        Score: 
                    </label>
                    <select
                        id="score"
                        v-model="selectedScore"
                        class="evaluation-value score"
                    >
                        <option
                            v-for="score in [...Array(6).keys()]"
                            :key="score"
                            :value="score"
                        >
                            {{ score }}
                        </option>
                    </select>
                </form>
            </template>
            <template #footer>
                <AppButton
                    class="button"
                    name="save"
                    @action="saveSetting"
                >
                    Save
                </AppButton>
                <AppButton
                    class="button"
                    name="cancel"
                    @action="closeModal"
                >
                    Cancel
                </AppButton>
            </template>
        </AppModal>
        <AppToast
            :type="message.type"
            :message="message.message"
            :is-active="message.isActive"
            @hide="hideToast"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { selfEvaluationStore } from '@/store/self-evaluation';
import AppButton from '@/components/AppButton.vue';
import AppModal from '@/components/AppModal.vue';
import AppToast from '@/components/AppToast.vue';

const props = defineProps<{
    modalType: string,
    currentCategory: string,
    currentType: string,
    currentScore: number,
}>();

const store = selfEvaluationStore();
const categories = ref(store.evaluationList);

const categoryOptions = reactive({
    checkedCategory: '',
    selectedCategory: '',
    categoryName: '',
});

const typeOptions = reactive({
    checkedType: '',
    selectedType: '',
    typeName: '',
});

const selectedScore = ref(props.currentScore);

const message = reactive({
    type: 'error',
    message: '',
    isActive: false,
});

const info = computed(() => store.getTypeItem(categoryOptions.selectedCategory));

const handleCategory = (optionType: string) => {
    categoryOptions.checkedCategory = optionType;
};

const handleType = (optionType: string) => {
    typeOptions.checkedType = optionType;
};

const saveSetting = () => {
    if (props.modalType === 'add' && (!categoryOptions.checkedCategory || !typeOptions.checkedType ||
        (categoryOptions.checkedCategory === 'new' && !categoryOptions.categoryName) || 
        (typeOptions.checkedType === 'new' && !typeOptions.typeName) || 
        (categoryOptions.checkedCategory === 'original' && !categoryOptions.selectedCategory) ||
        (typeOptions.checkedType === 'original' && !typeOptions.selectedType))) {
        message.type = 'error';
        message.message = 'Input is not valid';
        message.isActive = true;

        return;
    }

    store.updateEvaluation({
        category: categoryOptions.checkedCategory === 'original' ? 
            categoryOptions.selectedCategory : (categoryOptions.checkedCategory === 'new' ? 
                categoryOptions.categoryName : props.currentCategory),
        type: typeOptions.checkedType === 'original' ? typeOptions.selectedType : 
            (typeOptions.checkedType === 'new' ? typeOptions.typeName : props.currentType),
        score: selectedScore.value,
    });

    resetForm();
    closeModal();
};

const hideToast = () => {
    message.type = '';
    message.message = '';
    message.isActive = false;
};

const resetForm = () => {
    categoryOptions.checkedCategory = '';
    categoryOptions.selectedCategory = '';
    categoryOptions.categoryName =  '';
    typeOptions.checkedType =  '';
    typeOptions.selectedType =  '';
    typeOptions.typeName =  '';
    selectedScore.value = 0;
};

const emit = defineEmits<{
    (e: 'close'): void,
}>();

const closeModal = () => {
    emit('close');
};
</script>

<style scoped lang="postcss">
.evaluation-form {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1rem;
    padding: 1.5rem;
}

.evaluation-title {
    grid-column: 1 / 2;
    padding-top: .3rem;
    font-weight: 600;
}

.evaluation-column {
    display: inline-block;
    margin-bottom: .5rem;
}

.evaluation-type-option {
    margin: 1rem;
}

.evaluation-value {
    height: 2.5rem;
    border: .1rem solid $color_black_light;
    background-color: $color_white;
    border-radius: .3rem;

    &::placeholder {
        padding-left: .5rem;
    }
}

.score {
    width: 5rem;
    text-align: center;
}

.button {
    & + & {
        margin-left: 1rem;
    }
}
</style>