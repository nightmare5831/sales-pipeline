'use client';

import { Deal } from '@/types/pipeline';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getMarginColor = (percentage: number) => {
    if (percentage >= 20) return 'text-green-600';
    if (percentage >= 15) return 'text-blue-600';
    return 'text-orange-600';
  };

  const getProgressBarColor = (percentage: number) => {
    const paidPercentage = (deal.paid / deal.totalPaid) * 100;
    if (paidPercentage >= 80) return 'bg-green-500';
    if (paidPercentage >= 50) return 'bg-blue-500';
    return 'bg-orange-500';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg border border-gray-200 p-4 mb-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            {deal.masterOrderNumber}
          </span>
        </div>
        <div className="flex gap-1">
          {deal.badges.map((badge) => (
            <span
              key={badge}
              className={`text-xs px-2 py-0.5 rounded ${
                badge === 'DOM'
                  ? 'bg-blue-100 text-blue-700'
                  : badge === 'HK'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-orange-100 text-orange-700'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
          {deal.contact.initials}
        </div>
        <span className="text-sm text-gray-700">{deal.contact.name}</span>
      </div>

      {/* Products */}
      {deal.interestedProducts.length > 0 && (
        <div className="mb-3 space-y-2">
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span>
              {deal.productsCount > 0 ? deal.productsCount : deal.interestedProducts.length} Products
            </span>
          </div>
          {deal.interestedProducts.map((product) => (
            <div key={product.id} className="flex items-center gap-2">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-10 h-10 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-700 truncate">
                  {product.name}
                </div>
                <div className="text-xs text-gray-500">Qty {product.quantity}</div>
              </div>
              <div className="text-xs font-medium text-gray-700">
                ${product.price.toLocaleString()}
              </div>
            </div>
          ))}
          {deal.interestedProducts.length > 0 && deal.supplier && (
            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>{deal.interestedProducts[0].supplier}</span>
            </div>
          )}
        </div>
      )}

      {/* Interested Product (for Leads stage) */}
      {deal.stage === 'leads' && deal.interestedProducts.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span>Interested in</span>
          </div>
          <div className="text-sm text-gray-700">{deal.interestedProducts[0].name}</div>
        </div>
      )}

      {/* Estimated Budget (for Leads stage) */}
      {deal.stage === 'leads' && deal.estimatedBudget > 0 && (
        <div className="mb-3">
          <div className="text-xs text-gray-500 mb-1">Est. Budget</div>
          <div className="text-lg font-semibold text-gray-900">
            ${deal.estimatedBudget.toLocaleString()}
          </div>
        </div>
      )}

      {/* Total Value & Margin */}
      {deal.totalValue > 0 && (
        <>
          <div className="border-t border-gray-100 pt-3 mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">Total Value</span>
              <span className="text-sm font-semibold text-gray-900">
                ${deal.totalValue.toLocaleString()}
              </span>
            </div>
            {deal.margin > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Margin</span>
                <span className={`text-sm font-semibold ${getMarginColor(deal.marginPercentage)}`}>
                  ${deal.margin.toLocaleString()}{' '}
                  <span className="text-xs">({deal.marginPercentage}%)</span>
                </span>
              </div>
            )}
          </div>

          {/* Trade-in Credit */}
          {deal.tradeInCredit !== 0 && (
            <div className="mb-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Trade-in Credit</span>
                <span className="text-sm font-medium text-red-600">
                  ${deal.tradeInCredit.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Payment Progress */}
          {deal.totalPaid > 0 && (
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">Paid</span>
                <span className="text-xs text-gray-700">
                  ${deal.paid.toLocaleString()} / ${deal.totalPaid.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${getProgressBarColor(deal.marginPercentage)}`}
                  style={{ width: `${(deal.paid / deal.totalPaid) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Ship Date */}
      {deal.shipDate && (
        <div className="flex items-center gap-1 text-xs text-gray-500 mt-3">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Ships {deal.shipDate}</span>
        </div>
      )}
    </div>
  );
}
