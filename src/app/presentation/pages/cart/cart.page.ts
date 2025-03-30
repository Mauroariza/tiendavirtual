import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../../../data/services/cart.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
    selector: 'app-cart',
    template: `
        <ion-content class="ion-padding">
            <ng-container *ngIf="(cartService.cartItems$ | async) as items">
                <ion-list *ngIf="items.length > 0; else emptyCart">
                    <ion-item-sliding *ngFor="let item of items">
                        <ion-item>
                            <ion-thumbnail slot="start">
                                <img [src]="item.image" [alt]="item.name">
                            </ion-thumbnail>
                            <ion-label>
                                <h2>{{ item.name }}</h2>
                                <p>{{ item.price | currency }}</p>
                            </ion-label>
                            <ion-buttons slot="end">
                                <ion-button (click)="updateQuantity(item.id, item.quantity - 1)" color="medium">
                                    <ion-icon name="remove-circle-outline"></ion-icon>
                                </ion-button>
                                <ion-text>{{ item.quantity }}</ion-text>
                                <ion-button (click)="updateQuantity(item.id, item.quantity + 1)" color="medium">
                                    <ion-icon name="add-circle-outline"></ion-icon>
                                </ion-button>
                            </ion-buttons>
                        </ion-item>
                        <ion-item-options side="end">
                            <ion-item-option color="danger" (click)="removeItem(item.id)">
                                <ion-icon name="trash-outline" slot="icon-only"></ion-icon>
                            </ion-item-option>
                        </ion-item-options>
                    </ion-item-sliding>

                    <ion-item lines="none" class="ion-margin-top">
                        <ion-label>
                            <h2>Total</h2>
                        </ion-label>
                        <ion-text slot="end">
                            <h2>{{ cartService.total$ | async | currency }}</h2>
                        </ion-text>
                    </ion-item>

                    <ion-button expand="block" class="ion-margin-top" (click)="checkout()" color="dark">
                        <ion-icon name="card-outline" slot="start"></ion-icon>
                        Proceder al pago
                    </ion-button>
                </ion-list>
            </ng-container>

            <ng-template #emptyCart>
                <div class="ion-text-center ion-padding">
                    <ion-icon name="cart-outline" style="font-size: 64px; color: var(--ion-color-medium)"></ion-icon>
                    <h2>Tu carrito está vacío</h2>
                    <p>¡Agrega algunos productos!</p>
                    <ion-button expand="block" (click)="navigateToProducts()" color="dark">
                        <ion-icon name="grid-outline" slot="start"></ion-icon>
                        Ir a productos
                    </ion-button>
                </div>
            </ng-template>
        </ion-content>
    `,
    styles: [`
        ion-thumbnail {
            --size: 80px;
            margin-right: 16px;
        }
        ion-thumbnail img {
            border-radius: 8px;
            object-fit: cover;
        }
        ion-text {
            margin: 0 8px;
        }
        ion-button[color="dark"] {
            --ion-color-contrast: white;
        }
    `],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class CartPage {
    constructor(
        public cartService: CartService,
        private router: Router,
        public authService: AuthService
    ) {}

    navigateToProducts() {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/products']);
        } else {
            this.router.navigate(['/home']);
            // Opcionalmente, puedes mostrar un mensaje al usuario
            // alert('Debes iniciar sesión para ver los productos');
        }
    }

    updateQuantity(productId: string, quantity: number) {
        this.cartService.updateQuantity(productId, quantity);
    }

    removeItem(productId: string) {
        this.cartService.removeFromCart(productId);
    }

    clearCart() {
        this.cartService.clearCart();
    }

    checkout() {
        // Aquí iría la lógica de checkout
        alert('¡Gracias por tu compra!');
        this.cartService.clearCart();
        this.router.navigate(['/products']);
    }
}