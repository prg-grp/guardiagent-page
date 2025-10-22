'use client';

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const performanceData = [
  { metric: 'Read File', macNative: 0.5, macSandbox: 1.2, debianNative: 0.65, debianSandbox: 0.9 },
  { metric: 'Write File', macNative: 2.9, macSandbox: 2.9, debianNative: 0.68, debianSandbox: 0.9 },
  { metric: 'Read Env', macNative: 0.4, macSandbox: 0.8, debianNative: 0.5, debianSandbox: 0.7 },
  { metric: 'Fetch Url', macNative: 1.1, macSandbox: 2.4, debianNative: 1.2, debianSandbox: 1.7 },
];

export default function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={performanceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="metric" />
        <YAxis label={{ value: 'Average Time in Milliseconds', angle: -90, position: 'insideBottomLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="macNative" fill="var(--chart-4)" name="macOS - native" />
        <Bar dataKey="macSandbox" fill="var(--chart-2)" name="macOS - sandboxed" />
        <Bar dataKey="debianNative" fill="var(--chart-3)" name="debian - native" />
        <Bar dataKey="debianSandbox" fill="var(--chart-1)" name="debian - sandboxed" />
      </BarChart>
    </ResponsiveContainer>
  );
}
