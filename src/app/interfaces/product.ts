export interface ProductFormData {
  productName: string;
  category_id: number;
  description: string;
  actualQuantity: number;
  soldItem: number;
  costPrice: number;
  sellingPrice: number;
  brandId: number;
  discountPercentage: number;
  points?: number;
  is_archived?: boolean;
  Profit: number;
  image: File | string;
  picturlUrl?: string;
  favorited?: boolean;
  isDiscounted?: boolean;
  id: number;
  rating?: number;
  reviews?: number;
  isNew?: boolean;

}



//  productName: string;
//   categoryId: number;

//   description: string;
//   actualQuantity: number;
//   costPrice: number;
//   sellingPrice: number;
//   picturlUrl
// : string;
//   brandId: number;

//   discountPercentage: number;
//   points: number;
//   isArchived: boolean;
//   id: number;
// soldItem?: number;

//     favorited?: boolean;
//   rating?: number;
//   reviews?: number;
//   isNew?: boolean;
//   isDiscounted?: boolean;