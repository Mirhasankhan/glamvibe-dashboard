"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {  
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useServiceBookingsQuery } from "@/redux/features/booking/booking.api";

export const description = "A simple pie chart";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
];

export function ServiceChart() {
  const { data } = useServiceBookingsQuery("");

  const chartData =
    data?.result?.map((item: any, index: any) => ({
      serviceName: item.serviceName,
      visitors: item.totalBookings,
      fill: COLORS[index % COLORS.length],
    })) || [];

  const chartConfig = chartData.reduce(
    (acc: any, item: any, index: any) => {
      acc[item.serviceName] = {
        label: item.serviceName,
        color: COLORS[index % COLORS.length],
      };
      return acc;
    },
    { visitors: { label: "Bookings" } } as Record<string, any>
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Service Bookings Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="serviceName"
              cx="50%"
              cy="50%"
              outerRadius="100%"
              label
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total bookings for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
