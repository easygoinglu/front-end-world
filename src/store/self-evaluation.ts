import { defineStore } from 'pinia';

type CategoryItem = {
    category: string;
    info: TypeItem[];
}

type TypeItem = {
    type: string;
    score: number;
}

type EvaluationData = {
    category: string;
    type: string;
    score: number;
}

export const selfEvaluationStore = defineStore('selfEvaluation', {
    state: () => {
        if (localStorage.getItem('selfEvaluationState')) {
            return JSON.parse(localStorage.getItem('selfEvaluationState') || '');
        } 

        return {
            evaluationList: [
                {
                    category: 'HTML',
                    info: [
                        {
                            type: 'HTML5',
                            score: 0,
                        },    
                    ],
                },
                {
                    category: 'CSS',
                    info: [
                        {
                            type: 'CSS3',
                            score: 0,
                        },
                        {
                            type: 'Sass',
                            score: 0,
                        },
                        {
                            type: 'PostCSS',
                            score: 0,
                        },  
                        {
                            type: 'styled-components',
                            score: 0,
                        }, 
                        {
                            type: 'Emotion',
                            score: 0,
                        }, 
                        {
                            type: 'BEM',
                            score: 0,
                        },  
                        {
                            type: 'OOCSS',
                            score: 0,
                        },
                        {
                            type: 'SMACSS',
                            score: 0,
                        },       
                    ],
                }, 
                {
                    category: 'JavaScript',
                    info: [
                        {
                            type: 'ES6+',
                            score: 0,
                        },  
                        {
                            type: 'React',
                            score: 0,
                        },  
                        {
                            type: 'Redux',
                            score: 0,
                        },  
                        {
                            type: 'Vue.js',
                            score: 0,
                        },  
                        {
                            type: 'Vuex',
                            score: 0,
                        },  
                        {
                            type: 'Angular',
                            score: 0,
                        }, 
                    ],
                }, 
                {
                    category: 'Package Manager',
                    info: [
                        {
                            type: 'Node Package Manager',
                            score: 0,
                        }, 
                        {
                            type: 'Yarn',
                            score: 0,
                        }, 
                    ],
                },                
                {
                    category: 'Build Tool',
                    info: [
                        {
                            type: 'Webpack',
                            score: 0,
                        }, 
                        {
                            type: 'Rollup',
                            score: 0,
                        }, 
                        {
                            type: 'Vite',
                            score: 0,
                        }, 
                    ],
                },
                {
                    category: 'Testing Tool',
                    info: [
                        {
                            type: 'Jest',
                            score: 0,
                        }, 
                        {
                            type: 'Cypress',
                            score: 0,
                        }, 
                        {
                            type: 'Enzyme',
                            score: 0,
                        }, 
                        {
                            type: 'Mocha',
                            score: 0,
                        }, 
                        {
                            type: 'Chi',
                            score: 0,
                        }, 
                    ],
                },
            ],
        };    
    },
    getters: {
        getTypeItem: (state) => {
            return (categoryName: string) => {
                const categoryItem = Object.values(<CategoryItem[]>state.evaluationList).filter(
                    (item) => (item.category === categoryName));
                return categoryItem[0]?.info;
            };
        },
        getRadarChartData: (state) => {
            type ChartData = {
                category: string;
                score: number;
            };
            
            const chartData = state.evaluationList.map((evaluation: CategoryItem) => {
                const totalScore = evaluation.info.reduce(
                    (accumulator: number, value: TypeItem) => {
                        return accumulator + value.score;
                    }, 0);
    
                return {
                    category: evaluation.category,
                    score: totalScore * 100 / evaluation.info.length / 5,
                };
            });
    
            return {
                labels: chartData.map((item: ChartData) => item.category),
                data: chartData.map((item: ChartData) => item.score),
            };
        },
    },
    actions: {
        updateEvaluation (data: EvaluationData) {
            const evaluation = this.evaluationList.find(
                (evaluation: CategoryItem) => evaluation.category === data.category); 
    
            // new category
            if (!evaluation) {
                this.evaluationList = [...this.evaluationList, {
                    category: data.category,
                    info: [{
                        type: data.type,
                        score: data.score,
                    }],
                }];
    
                return;
            }
    
            // new type
            const typeItem = evaluation.info.find(
                (typeItem: TypeItem) => typeItem.type === data.type); 
    
            if (!typeItem) {
                evaluation.info = [...evaluation.info, {
                    type: data.type, 
                    score: data.score,
                }];
    
                return;
            }
    
            // modify score
            typeItem.score = data.score;
        },
        deleteCategory (data: EvaluationData) {  
            this.evaluationList.forEach((categoryItem: CategoryItem, categoryIndex: number) => {
                if (categoryItem.category === data.category) {
                    this.evaluationList.splice(categoryIndex, 1);
                }
            });
        },
        deleteType (data: EvaluationData) {  
            this.evaluationList.forEach((categoryItem: CategoryItem, categoryIndex: number) => {
                if (categoryItem.category === data.category) {
                    categoryItem.info.forEach((typeItem: TypeItem, typeIndex: number) => {
                        if (typeItem.type === data.type) {
                            this.evaluationList[categoryIndex]['info'].splice(typeIndex, 1);
                        }
                    });
                }
            });
        },
    },
});