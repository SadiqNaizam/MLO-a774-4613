import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LossReason {
  id: string;
  percentage: number;
  description: string;
}

const lossReasonsData: LossReason[] = [
  { id: 'unclearProposal1', percentage: 40, description: 'The proposal is unclear' },
  { id: 'venturePursuit', percentage: 20, description: 'However venture pursuit' },
  { id: 'other', percentage: 10, description: 'Other' },
  { id: 'unclearProposal2', percentage: 30, description: 'The proposal is unclear' }, // Assuming this is a distinct item as per image layout
];

interface LossReasonsListProps {
  className?: string;
}

const LossReasonsList: React.FC<LossReasonsListProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Reasons of leads lost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {lossReasonsData.map((reason) => (
            <div key={reason.id}>
              <p className="text-3xl font-bold text-foreground">{reason.percentage}%</p>
              <p className="text-sm text-muted-foreground mt-1">{reason.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LossReasonsList;
