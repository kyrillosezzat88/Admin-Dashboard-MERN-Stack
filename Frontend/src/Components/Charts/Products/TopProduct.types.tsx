export type TopProductProps = {
    data: {
        labels: string[],
        datasets: {
            label: string,
            data: number[],
            backgroundColor: string[],
        }[]
    }
}