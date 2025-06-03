import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  days: number;
  color: string; // Tailwind color class e.g., 'bg-red-500'
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, days: 2, color: 'bg-destructive' }, // #F06548
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, days: 2, color: 'bg-accentOrange' }, // #F9B115
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, days: 0, color: 'bg-slate-700' }, // #475569 (approx)
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, days: 8, color: 'bg-accent' }, // #0AB39C
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, days: 10, color: 'bg-purple-600' }, // #7E22CE (approx)
];

const totalActiveLeads = 600;

interface FunnelAnalyticsProps {
  className?: string;
}

const FunnelAnalytics: React.FC<FunnelAnalyticsProps> = ({ className }) => {
  const totalCountForProgress = funnelData.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Funnel count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold text-foreground">{totalActiveLeads}</span>
          <span className="ml-2 text-muted-foreground">active leads</span>
        </div>
        
        <div className="w-full flex mb-4 h-3 rounded-full overflow-hidden">
          {funnelData.map(stage => (
            <TooltipProvider key={stage.id} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={cn('h-full', stage.color)}
                    style={{ width: `${(stage.count / totalCountForProgress) * 100}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stage.name}: {stage.count}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="space-y-3">
          {funnelData.map((stage) => (
            <div key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-4 text-sm">
              <div className="flex items-center">
                <span className={cn('w-3 h-3 rounded-sm mr-2', stage.color)}></span>
                <span className="text-foreground w-32 truncate">{stage.name}</span>
              </div>
              <span className="text-muted-foreground text-right tabular-nums">{stage.count}</span>
              <span className="text-muted-foreground text-right tabular-nums">$ {stage.value.toLocaleString()}</span>
              {stage.id === 'inConversation' ? (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-muted-foreground text-right tabular-nums bg-gray-700 text-white px-2 py-0.5 rounded text-xs cursor-default">
                        average time on this stage
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Average: 2 days</p> {/* Hardcoded as per image*/}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <span className="text-muted-foreground text-right tabular-nums">
                  {stage.days > 0 ? `${stage.days} days` : '-'}
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelAnalytics;
