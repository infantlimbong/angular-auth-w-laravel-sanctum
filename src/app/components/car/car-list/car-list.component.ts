import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../services/car.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { formatWithThousandsSeparator } from '../../../utils/thousands-separator.util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
  imports: [
    NgFor
  ],
  standalone: true,
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe(
      (data: Car[]) => {
        console.log('Cars fetched from API:', data);
        this.cars = data;
      },
      (error) => {
        console.error('Error fetching cars:', error);
      }
    );
  }

  deleteCar(id: number | undefined): void {
    if (id !== undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this car!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          this.carService.deleteCar(id).subscribe(() => {
            this.cars = this.cars.filter(car => car.id !== id);
            Swal.fire('Deleted!', 'Car has been deleted.', 'success');
          });
        }
      });
    }
  }

  navigateToEdit(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/car/edit', id]);
    }
  }

  navigateToAddCar() {
    this.router.navigate(['/car/new']);
  }

  formatRentalRate(rate: number): string {
    return formatWithThousandsSeparator(rate);
  }
}
