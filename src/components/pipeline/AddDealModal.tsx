'use client';

import { useState } from 'react';
import { PipelineStage } from '@/types/pipeline';
import { pipelineStages } from '@/lib/mock-data';

interface AddDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    stage: PipelineStage;
    masterOrderNumber: string;
    contact: string;
    interestedProduct: string;
    estimatedBudget: number;
  }) => void;
}

export function AddDealModal({ isOpen, onClose, onSubmit }: AddDealModalProps) {
  const [formData, setFormData] = useState({
    stage: 'leads' as PipelineStage,
    masterOrderNumber: 'MON-2025-001',
    contact: 'John Smith',
    interestedProduct: 'Rolex Submariner',
    estimatedBudget: 15000,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add New Deal</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Stage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stage
            </label>
            <select
              value={formData.stage}
              onChange={(e) =>
                setFormData({ ...formData, stage: e.target.value as PipelineStage })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {pipelineStages.map((stage) => (
                <option key={stage.id} value={stage.id}>
                  {stage.title}
                </option>
              ))}
            </select>
          </div>

          {/* Master Order Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Master Order Number
            </label>
            <input
              type="text"
              value={formData.masterOrderNumber}
              onChange={(e) =>
                setFormData({ ...formData, masterOrderNumber: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MON-2025-001"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact
            </label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Smith"
            />
          </div>

          {/* Interested Product */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interested Product
            </label>
            <input
              type="text"
              value={formData.interestedProduct}
              onChange={(e) =>
                setFormData({ ...formData, interestedProduct: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Rolex Submariner"
            />
          </div>

          {/* Estimated Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Budget
            </label>
            <input
              type="number"
              value={formData.estimatedBudget}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  estimatedBudget: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="15000"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
            >
              Add Deal
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
