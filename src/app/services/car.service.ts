import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8000/api/cars';

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<{ data: Car[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getCar(id: number): Observable<Car> {
    return this.http.get<{ data: Car }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<{ data: Car }>(this.apiUrl, car).pipe(
      map(response => response.data)
    );
  }

  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<{ data: Car }>(`${this.apiUrl}/${id}`, car).pipe(
      map(response => response.data)
    );
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

export interface Car {
  id?: number;
  brand: string;
  model: string;
  license_plate: string;
  rental_rate: number;
}
