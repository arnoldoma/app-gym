import React from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as Chartjs, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

Chartjs.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export const Dashboard = ({barData,barPie }) => {


  return (
    <>
      <section className="container">
        <div className="grafics">
          <h2>Grafico de barras</h2>
          <Bar data={barData}></Bar>
        </div>
        <div className="grafics">
          <h2>Grafico de Circular</h2>
          <Pie data={barPie}></Pie>
        </div>
      </section>
    </>
  )
}
