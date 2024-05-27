import { Component, OnInit } from '@angular/core';
import { HttpTokenService } from '../../http-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent{
  
  errMessage!: string | null
  user!: any | null

  constructor(
    private svc: HttpTokenService,
    private router: Router
  ){}
}
