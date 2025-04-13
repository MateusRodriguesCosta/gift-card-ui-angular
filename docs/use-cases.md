# Frontend Use Cases

This document outlines the use cases for the Angular Gift Card Control Panel which interacts with the Gift Card API.

---

### 🔁 Dashboard & Overview

- **Dashboard View:**
  - **Purpose:** Present a summary of active, inactive, expired, and pending gift cards including metrics such as total cards issued, current balances, and upcoming expirations.
  - **Features:**
    - Interactive charts/graphs (via libraries like **ngx-charts**)
    - Status indicators (e.g., colored badges for ACTIVE, CANCELED, EXPIRED)
    - Quick links to detailed views

### 🔁 Create New Gift Card

- **New Gift Card Form:**
  - **Purpose:** Allow administrators to issue a new gift card with an initial balance (starting at zero).
  - **Features:**
    - Angular Reactive Forms for input
    - Client-side validation
    - Secure card code generation preview in alignment with backend logic

### 🔁 Update Gift Card Balance

- **Balance Update Screen/Form:**
  - **Purpose:** Enable credit and debit operations on a gift card.
  - **Features:**
    - Input validation using RxJS (e.g., for debouncing)
    - Verification that the card status permits updates
    - Confirmation dialogs before the operation is completed

### 🔁 Update Gift Card Expiration Date

- **Expiration Date Management:**
  - **Purpose:** Provide the ability to update a card’s expiration date.
  - **Features:**
    - Date picker components (from Angular Material or PrimeNG)
    - Validation to ensure a valid and future date selection
    - Instant feedback via API integration

### 🔁 Cancel Gift Card

- **Cancellation Workflow:**
  - **Purpose:** Enable administrators to cancel a gift card.
  - **Features:**
    - Cancel button within card details
    - Modal confirmation to prevent unintended cancellations
    - Clear status update messaging after cancellation

### 🔁 Exchange Balance Between Cards

- **Balance Transfer Form:**
  - **Purpose:** Allow the transfer of balance between two valid gift cards.
  - **Features:**
    - Dual input fields for source and destination cards
    - Checks ensuring both cards are active and the source has sufficient funds
    - Transaction history logging for tracking transfers

### 🔁 Bulk Operations

- **Bulk Management Screen:**
  - **Purpose:** Execute bulk actions (such as status updates, balance reloads, or cancellations) on multiple gift cards at once.
  - **Features:**
    - Support for file uploads (CSV/Excel) for batch processing
    - Batch validations with inline error reporting per card
    - Progress indicators and a summary of success/failure results

### 🔁 Security and PCI Considerations

- **Security Controls:**
  - **Purpose:** Ensure that the client-side adheres to PCI DSS best practices.
  - **Features:**
    - Secure handling of card data (no sensitive storage on the client)
    - HTTPS for all API communications
    - Input sanitization and robust error handling mechanisms
