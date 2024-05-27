import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarService, Car } from '../../../services/car.service';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true,
})
export class EditCarComponent implements OnInit {
  carForm: FormGroup;
  carId!: number;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      license_plate: ['', Validators.required],
      rental_rate: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  ngOnInit(): void {
    this.carId = +this.route.snapshot.paramMap.get('id')!;
    this.carService.getCar(this.carId).subscribe((car: Car) => {
      this.carForm.patchValue(car);
    });
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      this.carService.updateCar(this.carId, this.carForm.value).subscribe(
        () => {
          Swal.fire('Success', 'Car updated successfully', 'success');
          this.router.navigate(['/cars']);
        },
        () => {
          Swal.fire('Error', 'Failed to update car', 'error');
        }
      );
    } else {
      // Display SweetAlert error message if the form is invalid
      Swal.fire('Error', 'Please fill out all required fields', 'error');
      return;
    }
  }

  onCancel(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Changes will not be saved',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel',
      cancelButtonText: 'No, keep creating'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/cars']);
      }
    });
  }
}
