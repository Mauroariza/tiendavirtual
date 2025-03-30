import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { CartService } from './data/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-menu contentId="main-content">
        <ion-header>
          <ion-toolbar>
            <ion-title>Menú</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-list>
            <ion-item routerLink="/home" routerDirection="root">
              <ion-icon name="home-outline" slot="start"></ion-icon>
              <ion-label>Inicio</ion-label>
            </ion-item>

            <ion-item *ngIf="authService.isAuthenticated()" routerLink="/products" routerDirection="root">
              <ion-icon name="grid-outline" slot="start"></ion-icon>
              <ion-label>Productos</ion-label>
            </ion-item>

            <ion-item *ngIf="authService.isAuthenticated()" (click)="logout()" button>
              <ion-icon name="log-out-outline" slot="start"></ion-icon>
              <ion-label>Cerrar Sesión</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>

      <div class="ion-page" id="main-content">
        <ion-header *ngIf="authService.isAuthenticated()">
          <ion-toolbar color="dark">
            <ion-buttons slot="start">
              <ion-menu-button color="light"></ion-menu-button>
            </ion-buttons>
            <ion-title>Tienda Virtual</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="navigateToCart()" class="cart-button">
                <div class="cart-icon-container">
                  <ion-icon name="cart" color="primary"></ion-icon>
                  <ion-badge *ngIf="(cartService.cartItems$ | async)?.length" color="danger" class="cart-badge">
                    {{ (cartService.cartItems$ | async)?.length }}
                  </ion-badge>
                </div>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-router-outlet></ion-router-outlet>
        </ion-content>
      </div>
    </ion-app>
  `,
  styles: [`
    ion-menu ion-content {
      --background: var(--ion-item-background, var(--ion-background-color, #fff));
    }

    ion-menu ion-item {
      --padding-start: 16px;
      --padding-end: 16px;
      border-radius: 4px;
    }

    ion-menu ion-item.selected {
      --background: rgba(var(--ion-color-primary-rgb), 0.14);
    }

    ion-menu ion-item.selected ion-icon {
      color: var(--ion-color-primary);
    }

    ion-menu ion-item ion-icon {
      font-size: 24px;
      margin-right: 12px;
    }

    ion-menu ion-list {
      padding: 20px 0;
    }

    .cart-button {
      --padding-end: 16px;
      --padding-start: 16px;
    }

    .cart-icon-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cart-icon-container ion-icon {
      font-size: 28px;
      --ionicon-stroke-width: 32px;
    }

    .cart-badge {
      position: absolute;
      top: -8px;
      right: -12px;
      border-radius: 50%;
      padding: 4px;
      min-width: 18px;
      min-height: 18px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ion-toolbar {
      --ion-toolbar-background: var(--ion-color-dark);
      --ion-toolbar-color: var(--ion-color-light);
    }
  `],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
  }

  navigateToCart() {
    this.router.navigate(['/cart'], { replaceUrl: true });
  }
}
