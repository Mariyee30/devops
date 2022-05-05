import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  //Form Validables 
  registerForm:any = FormGroup;
  submitted = false;

  //Add user form actions
  get f() { 
    return this.registerForm.controls; 
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    //True if all the fields are filled
    if(this.submitted)
    {
      alert("Great!!");
    }
  }

  //login form
  ngOnInit(): void {
    //login form
    //Add User form validations
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      });
  }
}
