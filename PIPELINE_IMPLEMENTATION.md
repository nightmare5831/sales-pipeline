# Sales Pipeline Kanban Board - Implementation Guide

## Overview

This is a fully functional sales pipeline management system built with Next.js, TypeScript, and Tailwind CSS. The application features a kanban-style board for managing deals through various stages of the sales process.

## Features Implemented

### ✅ Core Features

1. **Kanban Board Layout**
   - 12 pipeline stages: Leads, First Contact, Negotiation, Invoice, Paid, Product Sourced, Awaiting Shipment, Ready to Ship, Shipped, Closed, Dead, Follow-up
   - Horizontal scrolling for all columns
   - Responsive column design (320px width)

2. **Drag & Drop Functionality**
   - Smooth drag-and-drop between columns using @dnd-kit
   - Visual feedback during dragging
   - Persistent state updates

3. **Deal Cards**
   - Master Order Number display
   - Status badges (DOM, HK, DROPSHIP)
   - Contact information with initials avatar
   - Product list with images and quantities
   - Financial metrics:
     - Total Value
     - Margin (with percentage and color coding)
     - Trade-in Credit
     - Payment progress bar
   - Ship date display
   - Supplier information

4. **Summary Statistics**
   - Total Pipeline value
   - Total Margin
   - Deal count
   - Displayed in header

5. **Add Deal Modal**
   - Clean modal interface
   - Form fields:
     - Stage selection
     - Master Order Number
     - Contact name
     - Interested Product
     - Estimated Budget
   - Cancel and Submit actions

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/
│   │   └── pipeline/
│   │       └── page.tsx           # Main pipeline page
│   └── page.tsx                    # Home page with navigation
├── components/
│   └── pipeline/
│       ├── PipelineBoard.tsx       # Main board container with DnD logic
│       ├── PipelineColumn.tsx      # Column component for each stage
│       ├── DealCard.tsx            # Individual deal card
│       └── AddDealModal.tsx        # Modal for adding new deals
├── lib/
│   └── mock-data.ts                # Mock data for deals, products, contacts
└── types/
    └── pipeline.ts                 # TypeScript types and interfaces
```

## Key Components

### 1. PipelineBoard
Main container component that:
- Manages deal state
- Handles drag-and-drop logic
- Calculates summary statistics
- Controls modal visibility

### 2. PipelineColumn
Reusable column component with:
- Stage title and deal count
- Total value for stage
- Droppable area for deals
- Vertical scrolling for cards

### 3. DealCard
Comprehensive card showing:
- Deal metadata (ID, badges, contact)
- Product information with images
- Financial details with color-coded margins
- Payment progress visualization
- Ship dates and supplier info

### 4. AddDealModal
Modal form for creating deals with validation

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **@dnd-kit** - Drag and drop functionality
  - `@dnd-kit/core` - Core DnD logic
  - `@dnd-kit/sortable` - Sortable lists
  - `@dnd-kit/utilities` - Helper utilities

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

### Access the Pipeline

Navigate to `/pipeline` or click "View Pipeline" from the home page.

## Mock Data

The application includes comprehensive mock data:

- **11 sample deals** across different stages
- **10 contacts** with initials
- **13 products** (luxury watches) with realistic pricing
- Product images from Unsplash
- Realistic financial data (margins, payments, trade-ins)

### Data Location
All mock data is in [src/lib/mock-data.ts](src/lib/mock-data.ts)

## Features Breakdown

### Deal States
- **Leads**: Basic contact info and estimated budget
- **Active Deals**: Full product details, pricing, margins
- **Completed**: Payment history and shipping info

### Visual Indicators

1. **Margin Colors**:
   - Green (≥20%): Excellent margin
   - Blue (15-19%): Good margin
   - Orange (<15%): Low margin

2. **Payment Progress**:
   - Green (≥80% paid)
   - Blue (50-79% paid)
   - Orange (<50% paid)

3. **Badges**:
   - **DOM**: Domestic orders (blue)
   - **HK**: Hong Kong orders (purple)
   - **DROPSHIP**: Dropship orders (orange)

## Customization

### Adding New Stages

Edit [src/lib/mock-data.ts](src/lib/mock-data.ts):

```typescript
export const pipelineStages: { id: PipelineStage; title: string }[] = [
  // Add your new stage here
  { id: 'your-stage', title: 'Your Stage' },
];
```

Update the type in [src/types/pipeline.ts](src/types/pipeline.ts):

```typescript
export type PipelineStage =
  | 'leads'
  | 'your-stage'  // Add your stage
  | '...';
```

### Customizing Deal Cards

Edit [src/components/pipeline/DealCard.tsx](src/components/pipeline/DealCard.tsx) to modify:
- Card layout
- Displayed information
- Colors and styling

### Modifying Mock Data

Edit [src/lib/mock-data.ts](src/lib/mock-data.ts) to:
- Add more deals
- Change product catalog
- Update contact information
- Modify financial data

## Next Steps (Not Yet Implemented)

The following features are part of the full requirements but use mock data currently:

### Phase 2 - Backend Integration
- [ ] Connect to database (Supabase/Prisma)
- [ ] User authentication
- [ ] Real-time updates
- [ ] Deal persistence

### Phase 3 - API Integrations
- [ ] Gmail API integration
- [ ] Twilio SMS integration
- [ ] Shopify order sync

### Phase 4 - Advanced Features
- [ ] Deal detail view/edit
- [ ] Activity timeline
- [ ] File attachments
- [ ] Email notifications
- [ ] Reporting dashboard

## Design Fidelity

This implementation closely matches the Figma design with:
- ✅ Exact pipeline stages
- ✅ Card layout and content
- ✅ Color scheme and badges
- ✅ Summary statistics
- ✅ Add Deal modal
- ✅ Drag-and-drop interaction
- ✅ Responsive design

## Performance Considerations

- Optimized drag-and-drop with pointer sensor activation distance
- Efficient re-renders with React state management
- Horizontal and vertical scrolling for large datasets
- Image optimization with specified dimensions

## Browser Support

Tested and working in:
- Chrome/Edge (Chromium)
- Firefox
- Safari

## Deployment Ready

The application is ready for deployment to Vercel:

```bash
npm run build
npm start
```

Or deploy directly to Vercel:

```bash
vercel deploy
```

## Support

For issues or questions about the implementation:
1. Check the component files for inline comments
2. Review the type definitions in `src/types/pipeline.ts`
3. Examine the mock data structure in `src/lib/mock-data.ts`

---

**Built with** ❤️ **using Next.js, TypeScript, and Tailwind CSS**
