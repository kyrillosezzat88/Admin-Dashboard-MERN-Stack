import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { OrderChartProps } from './OredersChart.types';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function OrdersChart({ options, data }: OrderChartProps) {
    return <Bar options={options} data={data} updateMode="resize" />;

}

export default OrdersChart