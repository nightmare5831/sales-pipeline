'use client';

import { Deal, PipelineStage } from '@/types/pipeline';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DealCard } from './DealCard';

interface PipelineColumnProps {
  id: PipelineStage;
  title: string;
  deals: Deal[];
  totalValue: number;
}

export function PipelineColumn({
  id,
  title,
  deals,
  totalValue,
}: PipelineColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex flex-col min-w-[320px] max-w-[320px]">
      {/* Column Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">
            {deals.length}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          ${totalValue.toLocaleString()}
        </div>
      </div>

      {/* Column Content */}
      <div
        ref={setNodeRef}
        className="flex-1 p-4 bg-gray-50 overflow-y-auto"
        style={{ minHeight: '500px' }}
      >
        <SortableContext
          items={deals.map((d) => d.id)}
          strategy={verticalListSortingStrategy}
        >
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </SortableContext>

        {deals.length === 0 && (
          <div className="text-center text-gray-400 text-sm mt-8">
            No deals in this stage
          </div>
        )}
      </div>
    </div>
  );
}
