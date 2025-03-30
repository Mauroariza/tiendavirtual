import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
    selector: 'app-login',
    template: `
        <ion-header>
            <ion-toolbar>
                <ion-title>Iniciar Sesión</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <form (ngSubmit)="onLogin()">
                <ion-item>
                    <ion-label position="floating">Email</ion-label>
                    <ion-input type="email" [(ngModel)]="email" name="email" required></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="floating">Contraseña</ion-label>
                    <ion-input type="password" [(ngModel)]="password" name="password" required></ion-input>
                </ion-item>

                <ion-button expand="block" type="submit" class="ion-margin-top">
                    Iniciar Sesión
                </ion-button>
            </form>
        </ion-content>
    `,
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
    email: string = '';
    password: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onLogin() {
        if (this.email && this.password) {
            this.authService.login(this.email, this.password).subscribe({
                next: () => {
                    this.router.navigate(['/products']);
                },
                error: (error) => {
                    console.error('Error en login:', error);
                }
            });
        }
    }
} 