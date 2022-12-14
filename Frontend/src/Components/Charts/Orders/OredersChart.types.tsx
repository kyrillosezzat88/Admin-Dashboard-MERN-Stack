export type OrderChartProps = {
    options:{
        responsive:boolean,
        plugins?: {
            legend?: {
                position?:'top',
            },
            title: {
                display?: boolean,
                text: string,
            },
        },
    },
    data:{
        labels:string[],
        datasets:{
            label: string,
            data:number[],
            backgroundColor?:string,
        }[]
    },
}