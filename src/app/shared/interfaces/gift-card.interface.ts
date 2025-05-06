export interface GiftCard {
    token: string;
    maskedCardNumber: string;
    balance: number;
    currency: string;
    region: string;
    status: 'ACTIVE' | 'PENDING' | 'EXPIRED' | 'LOST' | 'STOLEN' | 'CANCELLED';
    expiryDate: Date;
    issueDate: Date;
}