"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", revenue: 80 },
  { month: "February", revenue: 200 },
  { month: "March", revenue: 120 },
  { month: "April", revenue: 190 },
  { month: "May", revenue: 130 },
  { month: "June", revenue: 140 },
  { month: "July", revenue: 80 },
  { month: "August", revenue: 200 },
  { month: "September", revenue: 120 },
  { month: "October", revenue: 190 },
  { month: "November", revenue: 130 },
  { month: "December", revenue: 140 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const SalesReport = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <h1>Sales Report</h1>
          <h1>Revenue</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />

            <Bar  dataKey="revenue" fill="#00A8CC" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesReport;
