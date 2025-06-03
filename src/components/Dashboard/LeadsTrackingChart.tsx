import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: LeadsTrackingDataPoint[] = [
  { month: 'March', closedWon: 88, closedLost: 65 },
  { month: 'April', closedWon: 55, closedLost: 38 },
  { month: 'May', closedWon: 70, closedLost: 42 },
  { month: 'June', closedWon: 85, closedLost: 10 },
  { month: 'July', closedWon: 75, closedLost: 45 },
  { month: 'August', closedWon: 30, closedLost: 95 },
];

const totalClosed = 680;
const totalLost = 70;

interface LeadsTrackingChartProps {
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover text-popover-foreground p-2 rounded shadow-md border border-border">
        <p className="label font-semibold">{label}</p>
        {payload.map((pld: any) => (
          <p key={pld.dataKey} style={{ color: pld.color }}>
            {pld.name}: {pld.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const LeadsTrackingChart: React.FC<LeadsTrackingChartProps> = ({ className }) => {
  return (
    <Card className={cn('w-full col-span-2', className)}> {/* col-span-2 to make it wider */}
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">Leads tracking</CardTitle>
          <div className="mt-2 flex items-baseline space-x-4">
            <div>
              <span className="text-3xl font-bold text-foreground">{totalClosed}</span>
              <span className="ml-1.5 text-sm text-muted-foreground">total closed</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-foreground">{totalLost}</span>
              <span className="ml-1.5 text-sm text-muted-foreground">total lost</span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-muted-foreground">
              <CalendarDays className="h-4 w-4 mr-2" />
              Last 6 months
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem>Last 3 months</DropdownMenuItem>
            <DropdownMenuItem>Last 6 months</DropdownMenuItem>
            <DropdownMenuItem>Last 12 months</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0AB39C" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#0AB39C" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F06548" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#F06548" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} dy={10} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '3 3' }}/>
              <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="#0AB39C" strokeWidth={2} fillOpacity={1} fill="url(#colorClosedWon)" dot={{ r: 4, strokeWidth: 2, fill: '#0AB39C', stroke: 'hsl(var(--card))' }} activeDot={{ r: 6, strokeWidth: 2, fill: '#0AB39C', stroke: 'hsl(var(--card))' }} />
              <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="#F06548" strokeWidth={2} fillOpacity={1} fill="url(#colorClosedLost)" dot={{ r: 4, strokeWidth: 2, fill: '#F06548', stroke: 'hsl(var(--card))' }} activeDot={{ r: 6, strokeWidth: 2, fill: '#F06548', stroke: 'hsl(var(--card))' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="w-3 h-3 rounded-sm bg-accent mr-2"></span> Closed won
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="w-3 h-3 rounded-sm bg-destructive mr-2"></span> Closed lost
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingChart;
