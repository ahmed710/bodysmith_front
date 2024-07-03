import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieRestaurantService } from '../services/categorie-restaurant.service';
import { RestaurantService } from '../services/restaurant.service';

@Component({
    selector: 'app-admin-categorie-restaurant',
    templateUrl: './admin-categorie-restaurant.component.html',
    styleUrls: ['./admin-categorie-restaurant.component.scss'],
})
export class AdminCategorieRestaurantComponent implements OnInit {
    categorieRestaurantForm: FormGroup;
    categorieRestaurants: any[] = [];
    restaurants: any[] = [];
    isEditing: boolean = false;
    selectedFile: File | null = null;
    displayedColumns: string[] = ['libelle', 'restaurants', 'actions'];

    constructor(
        private fb: FormBuilder,
        private categorieRestaurantService: CategorieRestaurantService,
        private restaurantService: RestaurantService
    ) {}

    ngOnInit(): void {
        this.categorieRestaurantForm = this.fb.group({
            _id: [null],
            libelle: ['', [Validators.required, Validators.maxLength(20)]],
            restaurants: [[]],
            imageCategorieRestaurant: [null],
        });

        this.loadCategorieRestaurants();
        this.loadRestaurants();
    }

    loadCategorieRestaurants() {
        this.categorieRestaurantService
            .getAllCategorieRestaurants()
            .subscribe((data) => {
                this.categorieRestaurants = data;
            });
    }

    loadRestaurants() {
        this.restaurantService.getAllRestaurants().subscribe((data) => {
            this.restaurants = data;
        });
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            this.categorieRestaurantForm.patchValue({
                imageCategorieRestaurant: file,
            });
        }
    }

    createOrUpdateCategorieRestaurant() {
        if (this.categorieRestaurantForm.invalid) return;

        const formData = new FormData();
        Object.keys(this.categorieRestaurantForm.value).forEach((key) => {
            let value = this.categorieRestaurantForm.value[key];
            if (key === 'restaurants') {
                value = value && value.length ? JSON.stringify(value) : '[]';
            }
            formData.append(key, value);
        });

        if (this.isEditing) {
            this.categorieRestaurantService
                .updateCategorieRestaurant(
                    this.categorieRestaurantForm.value._id,
                    formData
                )
                .subscribe(() => {
                    this.loadCategorieRestaurants();
                    this.cancelEdit();
                });
        } else {
            this.categorieRestaurantService
                .addCategorieRestaurant(formData)
                .subscribe(() => {
                    this.loadCategorieRestaurants();
                    this.categorieRestaurantForm.reset();
                });
        }
    }

    editCategorieRestaurant(categorieRestaurant: any) {
        this.isEditing = true;
        const restaurants = categorieRestaurant.restaurants
            ? categorieRestaurant.restaurants.map(
                  (restaurant: any) => restaurant._id
              )
            : [];
        this.categorieRestaurantForm.patchValue({
            ...categorieRestaurant,
            restaurants,
        });
    }

    deleteCategorieRestaurant(id: string) {
        this.categorieRestaurantService
            .deleteCategorieRestaurant(id)
            .subscribe(() => {
                this.loadCategorieRestaurants();
            });
    }

    cancelEdit() {
        this.isEditing = false;
        this.categorieRestaurantForm.reset();
    }
}
