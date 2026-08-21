'use client';

import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  groupLabel?: string;
}

export function ProgressIndicator({ current, total, groupLabel }: ProgressIndicatorProps) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-2 text-sm text-accent font-medium">
        <span>{groupLabel}</span>
        <span>{current} / {total}</span>
      </div>
      <Progress value={pct} />
    </div>
  );
}
