import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router) {

  }
  
  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.formLogin = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required],
    })
  }

  onSubmit() {
    const { email, password} = this.formLogin.getRawValue()
    if(!this.formLogin.valid){
      return
    }

    this.authService.login({ email, password}).subscribe(
      data =>{
        console.log(`daata: `, data),
        this.router.navigate(['/products'])
      },
      err =>{
        console.log(err)
      }
    )
  }  
}
