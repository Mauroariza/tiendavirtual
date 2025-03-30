import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    template: `
        <ion-content class="ion-padding">
            <div class="auth-container">
                <ion-card>
                    <ion-card-header class="ion-text-center">
                        <ion-card-title>
                            <ion-text color="primary">
                                <h1>Tienda Virtual</h1>
                            </ion-text>
                        </ion-card-title>
                        <ion-card-subtitle>Bienvenido a nuestra tienda</ion-card-subtitle>
                    </ion-card-header>

                    <ion-card-content>
                        <ion-segment [(ngModel)]="authMode" class="ion-margin-bottom">
                            <ion-segment-button value="login">
                                <ion-label>Iniciar Sesión</ion-label>
                            </ion-segment-button>
                            <ion-segment-button value="register">
                                <ion-label>Registrarse</ion-label>
                            </ion-segment-button>
                        </ion-segment>

                        <!-- Login Form -->
                        <form *ngIf="authMode === 'login'" (ngSubmit)="onLogin()">
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

                        <!-- Register Form -->
                        <form *ngIf="authMode === 'register'" (ngSubmit)="onRegister()">
                            <ion-item>
                                <ion-label position="floating">Nombre</ion-label>
                                <ion-input type="text" [(ngModel)]="name" name="name" required></ion-input>
                            </ion-item>

                            <ion-item>
                                <ion-label position="floating">Email</ion-label>
                                <ion-input type="email" [(ngModel)]="email" name="email" required></ion-input>
                            </ion-item>

                            <ion-item>
                                <ion-label position="floating">Contraseña</ion-label>
                                <ion-input type="password" [(ngModel)]="password" name="password" required></ion-input>
                            </ion-item>

                            <ion-button expand="block" type="submit" class="ion-margin-top">
                                Registrarse
                            </ion-button>
                        </form>
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
    `,
    styles: [`
        .auth-container {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--ion-color-light);
        }
        ion-card {
            width: 100%;
            max-width: 400px;
            margin: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        ion-card-header {
            background: var(--ion-color-light);
            border-radius: 15px 15px 0 0;
        }
        h1 {
            font-size: 2em;
            font-weight: bold;
            margin: 0;
        }
        ion-segment {
            margin-bottom: 20px;
        }
        form {
            padding: 10px;
        }
        ion-button {
            margin-top: 20px;
        }
    `],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage {
    authMode: 'login' | 'register' = 'login';
    email: string = '';
    password: string = '';
    name: string = '';

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

    onRegister() {
        if (this.email && this.password && this.name) {
            // Simulamos el registro exitoso y procedemos con el login
            this.authService.login(this.email, this.password).subscribe({
                next: () => {
                    this.router.navigate(['/products']);
                },
                error: (error) => {
                    console.error('Error en registro:', error);
                }
            });
        }
    }
} 