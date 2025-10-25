export type PipelineStage =
  | 'leads'
  | 'first-contact'
  | 'negotiation'
  | 'invoice'
  | 'paid'
  | 'product-sourced'
  | 'awaiting-shipment'
  | 'ready-to-ship'
  | 'shipped'
  | 'closed'
  | 'dead'
  | 'follow-up';

export type DealBadge = 'DOM' | 'HK' | 'DROPSHIP';

export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
  supplier?: string;
}

export interface Contact {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string;
}

export interface Deal {
  id: string;
  masterOrderNumber: string;
  stage: PipelineStage;
  contact: Contact;
  interestedProducts: Product[];
  estimatedBudget: number;
  totalValue: number;
  margin: number;
  marginPercentage: number;
  tradeInCredit: number;
  paid: number;
  totalPaid: number;
  shipDate: string;
  badges: DealBadge[];
  productsCount: number;
}

export interface PipelineColumn {
  id: PipelineStage;
  title: string;
  dealCount: number;
  totalValue: number;
  deals: Deal[];
}

export interface PipelineSummary {
  totalPipeline: number;
  margin: number;
  dealCount: number;
}
