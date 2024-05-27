import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { HttpTokenService } from '../../http-token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  errMessage!: string | null
  user!: any | null

  isDashboardActive: boolean = false;
  isCarsActive: boolean = false;

  constructor(private router: Router, private svc:HttpTokenService) {
    this.isDashboardActive = this.router.url === '/';
    this.router.events.subscribe(() => {
      this.isDashboardActive = this.router.url === '/';
    });
    this.isCarsActive = this.router.url === '/cars' || this.router.url === '/car/new' || this.router.url.startsWith('/car/edit');
    this.router.events.subscribe(() => {
      this.isCarsActive = this.router.url === '/cars' || this.router.url === '/car/new' || this.router.url.startsWith('/car/edit');
    });
  }

  navigateToCarList() {
    this.router.navigate(['cars']);
  }

  navigateToDashboard() {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.svc.getUser()
    .subscribe({
      next: res => this.user = res,
      error: err => this.errMessage = err.error.message
    })
    
  }

}
