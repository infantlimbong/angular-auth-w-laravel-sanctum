import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../../services/car.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class CarFormComponent implements OnInit {
  carForm: FormGroup;
  carId: number;

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
      rental_rate: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });

    // This is the error section
    this.carId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    if (this.carId) {
      this.carService.getCar(this.carId).subscribe((car: Car) => {
        this.carForm.patchValue(car);
      });
    }
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      this.carService.createCar(this.carForm.value).subscribe(
        () => {
          Swal.fire('Success', 'Car created successfully', 'success');
          this.router.navigate(['/cars']);
        },
        () => {
          Swal.fire('Error', 'Failed to create car', 'error');
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
