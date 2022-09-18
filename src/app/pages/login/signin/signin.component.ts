import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
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
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    this.authService.signIn(this.loginForm.value);
  }

  randomBg(): string {
    return this.backgrounds[
      Math.floor(Math.random() * this.backgrounds.length)
    ];
  }
}
