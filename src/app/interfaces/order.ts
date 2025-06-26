
export interface Order {
  id: number;
  buyerEmaiil: string;
  orderDate: string;
  total: number;
  status: string;
  shippingAddress?: {
    country: string;
    city: string;
    district: string;
  };
  deliveryMethod?: {
    shortName: string;
    description: string;
    price: number;
  };
  
}
