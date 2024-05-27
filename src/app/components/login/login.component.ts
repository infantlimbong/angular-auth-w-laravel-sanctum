import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpTokenService } from '../../http-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  errMessage!: string | null
  loginForm!: FormGroup

  constructor(
    private svc: HttpTokenService,
    private router: Router,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  onSubmit(){
    let {
      email,
      password
    } = this.loginForm.value
    this.svc.login(email, password)
    .subscribe({
      next: res => this.router.navigate(['/']),
      error: err => this.errMessage = err
    })
  }
}
