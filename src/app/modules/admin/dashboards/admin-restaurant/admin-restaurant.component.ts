import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieRestaurantService } from '../services/categorie-restaurant.service';
import { RestaurantService } from '../services/restaurant.service';
import { PlatService } from '../services/plat.service';
import { FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-admin-restaurant',
    templateUrl: './admin-restaurant.component.html',
    styleUrls: ['./admin-restaurant.component.scss'],
})
export class AdminRestaurantComponent implements OnInit {
    restaurantForm: FormGroup;
    restaurants: any[] = [];
    categorieRestaurants: any[] = [];
    plats: any[] = [];
    isEditing: boolean = false;
    selectedFile: File | null = null;
    displayedColumns: string[] = [
        'name',
        'address',
        'categories',
        'plats',
        'actions',
    ];

    constructor(
        private fb: FormBuilder,
        private restaurantService: RestaurantService,
        private categorieRestaurantService: CategorieRestaurantService,
        private platService: PlatService
    ) {}

    ngOnInit(): void {
        this.restaurantForm = this.fb.group({
            _id: [null],
            nomRestaurant: [
                '',
                [Validators.required, Validators.maxLength(15)],
            ],
            adresseRestaurant: [
                '',
                [Validators.required, Validators.minLength(4)],
            ],
            plats: ['', []],
            categorieRestaurant: ['', []],
            imageRestaurant: ['', null],
        });

        this.loadRestaurants();
        this.loadCategorieRestaurants();
        this.loadPlats();
    }

    loadRestaurants() {
        this.restaurantService.getAllRestaurants().subscribe((data) => {
            this.restaurants = data;
        });
    }

    loadCategorieRestaurants() {
        this.categorieRestaurantService
            .getAllCategorieRestaurants()
            .subscribe((data) => {
                this.categorieRestaurants = data;
            });
    }

    loadPlats() {
        this.platService.getAllPlats().subscribe((data) => {
            this.plats = data;
        });
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            this.restaurantForm.patchValue({ imageRestaurant: file });
        }
    }

    placeSelected(event: any) {
        if (event && event.properties) {
            this.restaurantForm.patchValue({
                adresseRestaurant: event.properties.formatted,
            });
        }
    }

    createOrUpdateRestaurant(formDirective: FormGroupDirective) {
        if (this.restaurantForm.invalid) return;

        const formData = new FormData();
        Object.keys(this.restaurantForm.value).forEach((key) => {
            let value = this.restaurantForm.value[key];
            if (key === 'plats' || key === 'categorieRestaurant') {
                if (value != null) {
                    value = value.length ? JSON.stringify(value) : '[]';
                } else {
                    value = '[]';
                }
            }
            formData.append(key, value);
        });

        if (this.isEditing) {
            this.restaurantService
                .updateRestaurant(this.restaurantForm.value._id, formData)
                .subscribe(() => {
                    this.loadRestaurants();
                    this.cancelEdit(formDirective);
                });
        } else {
            this.restaurantService.addRestaurant(formData).subscribe(() => {
                this.loadRestaurants();
                this.clearForm(formDirective); // Reset form after successful creation
                this.restaurantForm.markAsPristine();
                this.restaurantForm.markAsUntouched();
            });
        }
    }

    editRestaurant(restaurant: any) {
        this.isEditing = true;
        const plats = restaurant.plats
            ? restaurant.plats.map((plat: any) => plat._id)
            : [];
        const categorieRestaurant = restaurant.categorieRestaurant
            ? restaurant.categorieRestaurant.map(
                  (category: any) => category._id
              )
            : [];
        this.restaurantForm.patchValue({
            ...restaurant,
            plats,
            categorieRestaurant,
        });
    }

    deleteRestaurant(id: string) {
        this.restaurantService.deleteRestaurant(id).subscribe(() => {
            this.loadRestaurants();
        });
    }

    cancelEdit(formDirective: FormGroupDirective) {
        this.isEditing = false;
        this.clearForm(formDirective);
    }

    searchRestaurants(query: string) {
        if (query) {
            this.restaurantService
                .searchRestaurantsByAddress(query)
                .subscribe((data) => {
                    this.restaurants = data;
                });
        } else {
            this.loadRestaurants();
        }
    }

    clearSearch(input: any) {
        input.value = '';
        this.loadRestaurants();
    }

    clearForm(formDirective: FormGroupDirective) {
        this.isEditing = false;
        this.restaurantForm.reset();
        this.restaurantForm.markAsPristine();
        this.restaurantForm.markAsUntouched();
        formDirective.resetForm(); // Reset the FormGroupDirective
    }
}
