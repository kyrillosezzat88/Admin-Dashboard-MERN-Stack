import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { TopProductProps } from './TopProduct.types';
ChartJS.register(ArcElement, Tooltip, Legend);

function TopProductsChart({data}:TopProductProps) {
  return <Doughnut data={data} />;
}

export default TopProductsChart