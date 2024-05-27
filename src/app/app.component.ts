import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { CarFormComponent } from './components/car/car-form/car-form.component';
import { EditCarComponent } from './components/car/car-edit/car-edit.component';
import { HttpTokenService } from './http-token.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, DashboardComponent, HeaderComponent, FooterComponent, CarListComponent, CarFormComponent, EditCarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'test_jasamedika_fe';

  constructor(private tSvc: HttpTokenService){}

  $tokeSvc = inject(HttpTokenService)

  ngOnInit(): void {
    this.tSvc.getCsrfToken()
    .subscribe(x => console.log(x))
  }
}
