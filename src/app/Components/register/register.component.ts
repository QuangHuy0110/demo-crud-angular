import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, RegisterRequest } from '../../Service/auth.service';
import {  Router } from '@angular/router';
import { checkMatchValidator } from '../../utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router) {

  }
  
  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, { validators: checkMatchValidator() });
  }


  onSubmit() {
    const { email, password} = this.formRegister.getRawValue()
    if(!this.formRegister.valid){
      return
    }

    this.authService.register({ email, password}).subscribe(
      data =>{
        console.log(`daata: `, data),
        this.router.navigate(['/login'])
      },
      err =>{
        console.log(err)
      }
    )
  }  
}
