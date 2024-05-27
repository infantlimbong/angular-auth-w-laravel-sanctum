import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { CarFormComponent } from './components/car/car-form/car-form.component';
import { EditCarComponent } from './components/car/car-edit/car-edit.component';

export const routes: Routes = [
    { pathMatch: 'full', redirectTo: 'login', path: '' },
    { path: '', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cars', component: CarListComponent },
    { path: 'car/new', component: CarFormComponent },
    { path: 'car/edit/:id', component: EditCarComponent },
];
