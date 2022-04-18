import React from "react";
import { Line } from "react-chartjs-2";

const options = {
  scales: {
    y: {
      display: true,
      title: {
        display: true, 
        text: 'Percentage of Incidents Involving Stolen Guns'
      }
    }
}}

function LineChart({ chartData }) {
  return <Line data={chartData} options={options} />;
}

export default LineChart;