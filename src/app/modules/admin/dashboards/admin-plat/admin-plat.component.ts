import { Component, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormGroupDirective,
    ValidatorFn,
    AbstractControl,
} from '@angular/forms';
import { PlatService } from '../services/plat.service';
import { RestaurantService } from '../services/restaurant.service';

@Component({
    selector: 'app-admin-plat',
    templateUrl: './admin-plat.component.html',
    styleUrls: ['./admin-plat.component.scss'],
})
export class AdminPlatComponent implements OnInit {
    platForm: FormGroup;
    plats: any[] = [];
    restaurants: any[] = [];
    isEditing: boolean = false;
    selectedFile: File | null = null;
    categories: string[] = ['entree', 'plat principale', 'dessert'];
    displayedColumns: string[] = [
        'nomPlat',
        'prixPlat',
        'cuisine',
        'calories',
        'categoriePlat',
        'restaurants',
        'actions',
    ];

    @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

    constructor(
        private fb: FormBuilder,
        private platService: PlatService,
        private restaurantService: RestaurantService
    ) {}

    ngOnInit(): void {
        this.platForm = this.fb.group({
            _id: [null],
            nomPlat: ['', [Validators.required, Validators.maxLength(30)]],
            prixPlat: [
                '',
                [Validators.required, this.positiveNumberValidator()],
            ],
            cuisine: ['', Validators.required],
            calories: [
                '',
                [Validators.required, this.positiveNumberValidator()],
            ],
            imagePlat: [null],
            categoriePlat: ['', Validators.required],
            restaurants: [[]],
        });

        this.loadPlats();
        this.loadRestaurants();
    }

    loadPlats() {
        this.platService.getAllPlats().subscribe((data) => {
            this.plats = data;
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
            this.platForm.patchValue({ imagePlat: file });
        }
    }

    createOrUpdatePlat(platForm: FormGroupDirective) {
        if (this.platForm.invalid) return;

        const formData = new FormData();
        Object.keys(this.platForm.value).forEach((key) => {
            let value = this.platForm.value[key];
            if (key === 'restaurants') {
                if (value != null) {
                    value = value.length ? JSON.stringify(value) : '[]';
                } else {
                    value = '[]';
                }
            }
            formData.append(key, value);
        });

        if (this.isEditing) {
            this.platService
                .updatePlat(this.platForm.value._id, formData)
                .subscribe(() => {
                    this.loadPlats();
                    this.cancelEdit(platForm);
                });
        } else {
            this.platService.addPlat(formData).subscribe(() => {
                this.loadPlats();
                this.resetForm(platForm);
            });
        }
    }

    editPlat(plat: any) {
        this.isEditing = true;

        // Ensure restaurants are an array of IDs
        const restaurantIds = plat.restaurants.map(
            (restaurant: any) => restaurant._id
        );
        this.platForm.patchValue({ ...plat, restaurants: restaurantIds });
    }

    deletePlat(id: string) {
        this.platService.deletePlat(id).subscribe(() => {
            this.loadPlats();
        });
    }

    cancelEdit(platForm: FormGroupDirective) {
        this.isEditing = false;
        this.resetForm(platForm);
    }

    private resetForm(platForm: FormGroupDirective) {
        platForm.resetForm();
        this.platForm.reset();
    }

    private positiveNumberValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const isValid = control.value > 0;
            return isValid
                ? null
                : { positiveNumber: { value: control.value } };
        };
    }

    isLast(item: any, array: any[]): boolean {
        return array.indexOf(item) === array.length - 1;
    }
}
