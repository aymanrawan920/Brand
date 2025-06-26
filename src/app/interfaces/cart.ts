

export interface Cart {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentIntentId: number;
  clientSecret: string;
  deliveryMethodId: number;

  basket_item: {
    $id: string;
    $values: Array<{
      product_id: number;
      id: number;
      product_name: string;
      category: string;
      image: string[];
      selling_price: number;
      selling_quantity: number;
      brand: string;
    }>
  }
}

