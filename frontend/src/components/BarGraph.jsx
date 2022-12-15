import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const BarGraph = ({ data, plugins }) => {
  return (
    <Bar
      data={data}
      plugins={plugins}
      options={{ maintainAspectRatio: false }}
    />
  );
};
export default BarGraph;
