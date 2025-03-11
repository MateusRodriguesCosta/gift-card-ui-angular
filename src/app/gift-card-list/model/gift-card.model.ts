export interface GiftCard {
    id?: number;
    code: string;
    balance: number;
    status: string;
    expirationDate: Date;
  }