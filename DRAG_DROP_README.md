# Drag and Drop Order Line Priority Management

## Overview
This feature allows users to drag and drop order line cards to change their priority within a production order. The priority field is automatically updated in the database when items are reordered.

## Features
- **Drag and Drop**: Order line cards can be dragged and dropped to reorder them
- **Visual Feedback**: Cards show visual feedback during dragging (color changes, shadows)
- **Priority Updates**: Automatically updates the priority field in the database
- **Error Handling**: Reverts to original order if database update fails
- **Responsive UI**: Immediate visual feedback while database operations happen in background

## Components

### DraggableOrderLineCard
- Individual draggable card component
- Shows priority number in the title
- Visual feedback during drag operations
- Expandable to show detailed information

### DraggableOrderLinesList
- Container component that manages drag and drop logic
- Handles database updates when order changes
- Provides error handling and rollback functionality

## Database Schema Changes
- Added `priority: Int` field to `Pporderlines2` type
- Added `updatePporderlinePriority` mutation
- Added `UpdatePporderlinePriorityInput` input type

## GraphQL Mutations
```graphql
mutation updatePporderlinePriority($input: UpdatePporderlinePriorityInput!) {
  updatePporderlinePriority(input: $input) {
    id
    priority
    pporderno
    custporderno
    status
    upDate
  }
}
```

## Usage
The drag and drop functionality is automatically available in the OrderLines component. Users can:
1. Click and drag any order line card
2. Drop it in a new position
3. The priority will be automatically updated
4. Visual feedback shows the new order immediately

## Error Handling
- If database update fails, the order reverts to the original position
- User receives success/error messages
- No data loss occurs during failed operations

## Dependencies
- `react-beautiful-dnd`: For drag and drop functionality
- `@types/react-beautiful-dnd`: TypeScript definitions

