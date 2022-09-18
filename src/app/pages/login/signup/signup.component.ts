import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  loginForm!: FormGroup;
  backgrounds = [
    '/assets/backgrounds/aneta-voborilova-z4aFfchLht4-unsplash.jpg',
    '/assets/backgrounds/jonathan-borba-21tOEaJPM_o-unsplash.jpg',
    '/assets/backgrounds/jonathan-borba-BMpBW2476wQ-unsplash.jpg',
    '/assets/backgrounds/mariana-ibanez-qBEXJOt_9Tc-unsplash.jpg',
    '/assets/backgrounds/nathan-dumlao-Y3AqmbmtLQI-unsplash.jpg',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      avatar: [null],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  createAccount() {
    this.authService.signUp(this.loginForm.value);
  }

  randomBg(): string {
    return this.backgrounds[
      Math.floor(Math.random() * this.backgrounds.length)
    ];
  }
}
