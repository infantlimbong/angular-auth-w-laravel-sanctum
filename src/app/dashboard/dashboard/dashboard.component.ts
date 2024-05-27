import { Component } from '@angular/core';
import { HttpTokenService } from '../../http-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  errMessage!: string | null
  user!: any | null

  constructor(
    private svc: HttpTokenService,
    private router: Router
  ){}

}
