export enum WebTypes {
    Overview = 'Overview',
    Browser = 'Browser',
    HTML = 'HTML',
    CSS = 'CSS',
    JavaScript = 'JavaScript',
    Other = 'Other',
}

export const webHistoryEntries = [{     
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
}];