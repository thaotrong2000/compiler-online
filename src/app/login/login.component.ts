import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.validateFormRegister = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  validateForm!: FormGroup;
  validateFormRegister!: FormGroup;
  isVisibleNewUser = false;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

  // Create new user:
  openCreateUser(): void {
    this.isVisibleNewUser = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisibleNewUser = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleNewUser = false;
    this.validateFormRegister = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  submitFormRegister() {
    if (this.validateFormRegister.valid) {
      console.log('submit', this.validateFormRegister.value);
    } else {
      Object.values(this.validateFormRegister.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

  // Forgot password:
}
