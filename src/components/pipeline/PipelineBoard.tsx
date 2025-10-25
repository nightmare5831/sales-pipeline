'use client';

import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Deal, PipelineStage } from '@/types/pipeline';
import { mockDeals, pipelineStages } from '@/lib/mock-data';
import { PipelineColumn } from './PipelineColumn';
import { DealCard } from './DealCard';
import { AddDealModal } from './AddDealModal';

export function PipelineBoard() {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Calculate summary statistics
  const summary = {
    totalPipeline: deals.reduce((sum, deal) => sum + deal.totalValue, 0),
    margin: deals.reduce((sum, deal) => sum + deal.margin, 0),
    dealCount: deals.length,
  };

  // Group deals by stage
  const dealsByStage = pipelineStages.map((stage) => ({
    ...stage,
    deals: deals.filter((deal) => deal.stage === stage.id),
    totalValue: deals
      .filter((deal) => deal.stage === stage.id)
      .reduce((sum, deal) => sum + deal.totalValue, 0),
  }));

  const handleDragStart = (event: DragStartEvent) => {
    const deal = deals.find((d) => d.id === event.active.id);
    setActiveDeal(deal || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const dealId = active.id as string;
    const newStage = over.id as PipelineStage;

    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal.id === dealId ? { ...deal, stage: newStage } : deal
      )
    );

    setActiveDeal(null);
  };

  const handleAddDeal = (data: {
    stage: PipelineStage;
    masterOrderNumber: string;
    contact: string;
    interestedProduct: string;
    estimatedBudget: number;
  }) => {
    const newDeal: Deal = {
      id: `d-${Date.now()}`,
      masterOrderNumber: data.masterOrderNumber,
      stage: data.stage,
      contact: {
        id: `c-${Date.now()}`,
        name: data.contact,
        initials: data.contact
          .split(' ')
          .map((n) => n[0])
          .join(''),
      },
      interestedProducts: [
        {
          id: `p-${Date.now()}`,
          name: data.interestedProduct,
          quantity: 1,
          price: 0,
          imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
        },
      ],
      estimatedBudget: data.estimatedBudget,
      totalValue: 0,
      margin: 0,
      marginPercentage: 0,
      tradeInCredit: 0,
      paid: 0,
      totalPaid: 0,
      shipDate: '',
      badges: [],
      productsCount: 0,
    };

    setDeals((prevDeals) => [...prevDeals, newDeal]);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Sales Pipeline</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium text-sm flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Deal
            </button>
          </div>

          {/* Summary Stats */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span className="text-gray-500">Total Pipeline:</span>
              <span className="font-semibold text-gray-900">
                ${summary.totalPipeline.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Margin:</span>
              <span className="font-semibold text-gray-900">
                ${summary.margin.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">{summary.dealCount} deals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex h-full">
            {dealsByStage.map((column) => (
              <PipelineColumn
                key={column.id}
                id={column.id}
                title={column.title}
                deals={column.deals}
                totalValue={column.totalValue}
              />
            ))}
          </div>

          <DragOverlay>
            {activeDeal ? <DealCard deal={activeDeal} /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Add Deal Modal */}
      <AddDealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddDeal}
      />
    </div>
  );
}
