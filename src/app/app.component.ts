import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { passwordChecker } from './custom-validators/password-checker'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'signup-reactive';


  signUpForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      isAccepted: [false, Validators.requiredTrue]
    }, {
      validators: passwordChecker('password', 'confirmPassword')
    })
  }

  get Helper() {
    return this.signUpForm.controls
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.signUpForm)
    console.log(this.Helper);
    
    if (this.signUpForm.invalid) {
      return;
    }

    console.table(this.signUpForm.value)
    console.table(this.signUpForm)

    alert('success')
  }

  onReset() {
    this.submitted = false;
    this.signUpForm.reset();
  }
}
