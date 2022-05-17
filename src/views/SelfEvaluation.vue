<template>
    <div>
        <div class="evaluation-wrapper">
            <div class="action-icons">
                <i
                    class="action-icon add-icon"
                    @click.stop="showSettingModal('add')"
                />
                <i
                    v-click-outside="hideSettingOptions"
                    class="action-icon edit-icon"
                    @click.stop="showSettingOptions('edit')"
                />
                <i
                    v-click-outside="hideSettingOptions"
                    class="action-icon delete-icon"
                    @click.stop="showSettingOptions('delete')"
                />
            </div>
            <div>
                <div
                    v-for="categoryItem in evaluationList"
                    :key="categoryItem.category"
                    class="category"
                >
                    <h2 
                        :class="['category-name', ...settingClass.category]"
                        @click.stop="selectItem({
                            category: categoryItem.category,
                        })"
                    >
                        {{ categoryItem.category }}
                    </h2>
                    <ul class="info">
                        <li
                            v-for="typeItem in categoryItem.info"
                            :key="typeItem.type"
                            :class="['type', ...settingClass.type]"
                            @click.stop="selectItem({
                                category: categoryItem.category, 
                                type: typeItem.type, 
                                score: typeItem.score
                            })"
                        >
                            <div class="type-name">
                                {{ typeItem.type }}
                            </div>
                            <div class="type-score">
                                {{ typeItem.score }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <SelfEvaluationChartRadar />
        <SelfEvaluationModalSetting
            v-if="settingModal.isShow"
            :modal-type="settingModal.type"
            :current-category="currentItem.category || ''"
            :current-type="currentItem.type || ''"
            :current-score="currentItem.score || 0"
            @close="closeSettingModal"
        />
        <AppModalMessage 
            v-if="isShowConfirmModal"
            message="Delete selected item ?"
            button-text="Confirm"
            @action="handleDelete"
            @close="closeConfirmModal"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { selfEvaluationStore } from '@/store/self-evaluation';
import vClickOutside from '@/common/directives/click-outside';
import AppModalMessage from '@/components/AppModalMessage.vue';
import SelfEvaluationChartRadar from '@/components/SelfEvaluationChartRadar.vue';
import SelfEvaluationModalSetting from '@/components/SelfEvaluationModalSetting.vue';

const store = selfEvaluationStore();
const evaluationList = computed(() => store.evaluationList);

const settingModal = reactive({
    isShow: false,
    type: '',
});

const settingClass = reactive({
    category: [''],
    type: [''],
});

const isShowConfirmModal = ref(false);

type CurrentItem = {
    category?: string,
    type?: string,
    score?: number,
};

const currentItem = ref<CurrentItem>({});

const showSettingOptions = (type: string) => {
    if (type === 'delete') {
        settingClass.category = ['settings', `${type}-type-settings`];
    } else {
        settingClass.category = [];
    }

    settingClass.type = ['settings', `${type}-type-settings`];
};

const selectItem = (item: CurrentItem) => {  
    if (!settingClass.type.length) {
        return;
    }

    currentItem.value = item;

    const typeAction = settingClass.type[1].split('-')[0];

    if (typeAction === 'edit') {
        // edit type
        showSettingModal('edit');
    } else {
        //delete category or type
        isShowConfirmModal.value = true;
    }

    hideSettingOptions();
};

const hideSettingOptions = () => {
    settingClass.category = [];
    settingClass.type = [];
};

const showSettingModal = (modalType: string) => {
    if (modalType === 'add') {
        hideSettingOptions();
    }

    settingModal.type = modalType;
    settingModal.isShow = true;
};

const handleDelete = () => {
    if (currentItem.value.type) {
        deleteType();
    } else {
        deleteCategory();
    }
    closeConfirmModal();
};

const closeSettingModal = () => {
    currentItem.value = {};
    settingModal.isShow = false;
    settingModal.type = '';
};

const closeConfirmModal = () => {
    isShowConfirmModal.value = false;
};

const deleteCategory = () => {
    store.deleteCategory({
        ...currentItem.value,
    });    
};

const deleteType = () => {
    store.deleteType({
        ...currentItem.value,
    });    
};
</script>

<style scoped lang="postcss">
.evaluation-wrapper {
    margin-bottom: 5rem;
}

.action-icons {
    position: sticky;
    top: 4.5rem;
    z-index: $layer_content_top;
    text-align: right;
    pointer-events: none;
}

.action-icon {
    display: inline-block;
    width: 5rem;
    height: 5rem;
    border: .2rem solid #ffac12;
    border-right: none;
    background-color: #fff7e8;
    background-position: center;
    background-size: 3.5rem;
    background-repeat: no-repeat;
    pointer-events: auto;
    cursor: pointer;

    &:last-child {
        border-right: .2rem solid #ffac12;
    }

    &.add-icon {
        background-image: url("icons/add_circle.svg");
    }

    &.edit-icon {
        background-image: url("icons/edit.svg");
    }

    &.delete-icon {
        background-image: url("icons/delete.svg");
    }
}

.category {
    margin: 2.5rem 0;

    --color-1: $color_blue_light;
    --color-2: $color_yellow_light;
    --color-3: $color_red_light_secondary;
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
    position: relative;
    margin-bottom: 1rem;
    text-align: center;

    &.settings {
        cursor: pointer;

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            display: inline-block;
            width: 3rem;
            height: 3rem;
            background-position: center;
            background-size: 3rem;
            background-repeat: no-repeat;
            opacity: .5;
            filter: grayscale(100%) brightness(5) brightness(40%);
        }

        &.delete-type-settings::after {
            background-image: url("icons/delete.svg");
        }
    }
}

.info {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    background-color: $color_gray_light_primary;
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

    &.settings {
        cursor: pointer;

        .type-name,
        .type-score {
            opacity: .4;
        }

        &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 2.5rem;
            height: 2.5rem;
            background-position: center;
            background-size: 2.5rem;
            background-repeat: no-repeat;
            opacity: .7;
            filter: grayscale(100%) brightness(80%);
            transform: translate(-50%, -50%);
        }

        &.edit-type-settings::after {
            background-image: url("icons/edit.svg");
        }

        &.delete-type-settings::after {
            background-image: url("icons/delete.svg");
        }
    }
}
</style>