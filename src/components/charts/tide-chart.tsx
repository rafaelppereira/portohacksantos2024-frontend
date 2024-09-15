'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'

export const description = 'A bar chart with negative values'

const chartData = [
  { month: 'Seg', visitors: 186 },
  { month: 'Ter', visitors: 205 },
  { month: 'Quar', visitors: -207 },
  { month: 'Qui', visitors: 173 },
  { month: 'Sex', visitors: -209 },
  { month: 'Sáb', visitors: 214 },
  { month: 'Dom', visitors: 214 },
]

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
} satisfies ChartConfig

export function TideChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nível de maré</CardTitle>
        <CardDescription>Análise de 1 semana de alteração</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="visitors">
              <LabelList position="top" dataKey="month" fillOpacity={1} />
              {chartData.map((item) => (
                <Cell
                  key={item.month}
                  fill={item.visitors > 0 ? '#8B5CF6' : '#6C41CC'}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none text-emerald-500">
          5,5% mais comparado a 4h atrás <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando o nível de maré semanal
        </div>
      </CardFooter>
    </Card>
  )
}
