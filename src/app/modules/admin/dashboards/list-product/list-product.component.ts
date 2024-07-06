import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../services/product.service";
import Swal from "sweetalert2";
import {Router, RouterLink} from "@angular/router";
import {data} from "autoprefixer";

@Component({
    selector: 'app-products-list',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.scss'],
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        NgClass,
        RouterLink
    ],
    standalone: true
})
export class ListProductComponent implements OnInit{
    cart: any;
    products: any[] = [];
    totalAmount: number = 0;
    availableProducts: any[] = [];
    userId: string = "667849cef7bb9f08e3c40fec";

    constructor(private productService: ProductService, private router: Router) {
    }


    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            data=> {
                console.log(data)
                this.products = data;
                console.log(this.products) ;
            }
        )
    }

    deleteProduct(id: string): void {
        this.productService.deleteProduct(id).subscribe(
            () => {
                this.products = this.products.filter(product => product._id !== id);
            },
            (error) => {
                console.error('Error deleting product', error);
            }
        );
    }

    addProduct():void{
        this.router.navigate(["/dashboards/add-product/"])
    }

    updateProduct(id: string): void {
        this.router.navigate([`/dashboards/add-product/${id}`]);
    }
}
