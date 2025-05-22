import { Component  ,OnInit} from '@angular/core';
import { ProductService } from 'src/app/services/product.service'; 

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  description: string;
  type: string;
}


@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit{
  
    searchText: string = '';
    selectedProduct: Product | null = null;
   products: any[] = [];
    isLoading = false;
    errorMessage = '';
  
    constructor(private productService: ProductService) {}
  

    
ngOnInit() {
  this.productService.getAllProducts().subscribe(res => this.products = res);
}
   
    
  
    filteredProducts() {
      return this.products.filter(p =>
        p.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  
    showProductDetails(product: Product) {
      this.selectedProduct = product;
    }
  
    closeModal() {
      this.selectedProduct = null;
    }

}
