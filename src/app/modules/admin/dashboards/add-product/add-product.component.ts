import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../services/product.service';
import {CategoryService} from '../services/category.service';
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgForOf,
        NgIf
    ]
})
export class AddProductComponent {
    productId: string | null = null;

    productForm: FormGroup = new FormGroup({
        title: new FormControl("", [
            Validators.required,
            Validators.minLength(6),
            this.noSpecialCharactersValidator()
        ]),
        description: new FormControl("", [
            this.noSpecialCharactersValidator()
        ]),
        price: new FormControl("", [
            Validators.required,
            Validators.min(0.01)
        ]),
        idCategorie: new FormControl("", Validators.required),
        quantity: new FormControl("", [
            Validators.required,
            Validators.min(1)
        ]),
        image: new FormControl('', [Validators.required]),
    });

    maxFileSize = 5 * 1024 * 1024;
    allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    categories: any[] | undefined;
    imgUrl: any = null;
    currentProduct: any = {};

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private categoryService: CategoryService,
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            this.productId = params.get('id?');
            if (this.productId) {
                this.productService.getProductById(this.productId).subscribe(
                    data => {
                        this.currentProduct = data
                        this.imgUrl = data.image
                        this.productForm.patchValue({
                            title: data.title,
                            description: data.description,
                            price: data.price,
                            idCategorie: data.idCategorie,
                            quantity: data.quantity,
                            image: data.image
                        });
                    }
                )
            } else {
                // Handle the case when there is no ID
                console.log('No Product ID');
            }
        });

        this.categoryService.getAllCategories().subscribe(
            data => {
                this.categories = data;
            },
            error => console.log(error)
        )

        this.imgUrl = "/assets/images/not_found.jpg"
    }

    updateProduct() {
        if (this.productForm.valid) {
            this.productService.updateProduct(this.productId, this.productForm.value).subscribe({
                next: (newProduct) => {
                    console.log('Product updated successfully:', newProduct);
                    this.productForm.reset();
                    this.router.navigate(["/dashboards/list-product"])
                },
                error: (err) => {
                    console.error('Error updating the product:', err);
                }
            });
        } else {
            this.markFormGroupTouched(this.productForm);
        }
    }

    addProduct() {
        if (this.productForm.valid) {
            this.productService.addProduct(this.productForm.value).subscribe({
                next: (newProduct) => {
                    console.log('Product added successfully:', newProduct);
                    this.productForm.reset();
                    // Navigate or perform further actions
                },
                error: (err) => {
                    console.error('Error adding product:', err);
                }
            });
        } else {
            this.markFormGroupTouched(this.productForm);
        }

        this.imgUrl = null;
    }

    noSpecialCharactersValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const regex = /^[a-zA-Z0-9\u00C0-\u00FF ]*$/;
            const isValid = regex.test(control.value);
            return isValid ? null : {specialCharacters: true};
        };
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            if (file.size > this.maxFileSize) {
                alert(`File size exceeds limit (Max: ${this.maxFileSize / (1024 * 1024)} MB)!`);
                this.productForm.get('image')!.setValue('');
                return;
            }
            if (!this.allowedFileTypes.includes(file.type)) {
                alert(`Invalid file type. Allowed types: ${this.allowedFileTypes.join(', ')}.`);
                this.productForm.get('image')!.setValue('');
                return;
            }
            this.productForm.get('image')!.setValue(`/assets/images/${file.name}`);
            this.imgUrl = this.productForm.get('image')?.value;
        }
    }

    markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();
        });
    }

    onSubmit() {
        if (this.productId) {
            this.updateProduct();
        } else {
            this.addProduct();
        }
    }

    matchedValue(category: any): any {
        if (this.productId) {
            return this.productForm.get("idCategorie").value._id;
        }

        return category._id;
    }

    filtredCategories(): any {
        return this.categories.filter(categorie => categorie._id != this.productForm.get("idCategorie").value._id)
    }
}

