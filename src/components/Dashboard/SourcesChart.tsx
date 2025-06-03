import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SourceDataPoint {
  name: string;
  value: number;
  percentage: number;
  deals: number;
  color: string;
}

const sourcesData: SourceDataPoint[] = [
  { name: 'Clutch', value: 50, percentage: 50, deals: 3000, color: '#F06548' }, // destructive
  { name: 'Behance', value: 40, percentage: 40, deals: 1000, color: '#F9B115' }, // accentOrange
  { name: 'Instagram', value: 10, percentage: 10, deals: 1000, color: '#0AB39C' }, // accent
  { name: 'Dribbble', value: 10, percentage: 10, deals: 1000, color: '#6EE7B7' }, // emerald-400 as example
];

interface SourcesChartProps {
  className?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover text-popover-foreground p-2 rounded shadow-md border border-border">
        <p className="label">{`${payload[0].name} : ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const SourcesChart: React.FC<SourcesChartProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leadsConverted');

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">Sources</CardTitle>
        {/* Small tooltip as in image - can be added if specific data for it exists */}
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs bg-gray-700 text-white px-2 py-0.5 rounded cursor-default">from leads total</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Data aggregated from total leads.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6 items-center">
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={sourcesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="hsl(var(--card))"
                  strokeWidth={3}
                >
                  {sourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {sourcesData.map((source) => (
              <div key={source.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span style={{ backgroundColor: source.color }} className="w-3 h-3 rounded-sm mr-2"></span>
                  <span className="text-foreground">{source.name}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className="text-muted-foreground tabular-nums">$ {source.deals.toLocaleString()}</span>
                  <span className="text-muted-foreground tabular-nums w-10 text-right">{source.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="bg-muted p-1 h-auto">
              <TabsTrigger value="leadsCame" className="px-3 py-1.5 text-xs data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">Leads came</TabsTrigger>
              <TabsTrigger value="leadsConverted" className="px-3 py-1.5 text-xs data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">Leads Converted</TabsTrigger>
              <TabsTrigger value="totalDealsSize" className="px-3 py-1.5 text-xs data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">Total deals size</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default SourcesChart;
