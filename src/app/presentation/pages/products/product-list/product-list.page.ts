import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductService } from '../../../../data/services/product.service';
import { CartService } from '../../../../data/services/cart.service';
import { Product } from '../../../../domain/entities/product.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-product-list',
    template: `
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="6" size-md="4" *ngFor="let product of products">
                        <ion-card>
                            <img [src]="product.image" />
                            <ion-card-header>
                                <ion-card-title>{{ product.name }}</ion-card-title>
                                <ion-card-subtitle>{{ product.price | currency }}</ion-card-subtitle>
                            </ion-card-header>
                            <ion-card-content>
                                <p>{{ product.description }}</p>
                                <p><small>Categoría: {{ product.category }}</small></p>
                                <p><small>Stock disponible: {{ getAvailableStock(product) }}</small></p>
                                
                                <div class="quantity-selector">
                                    <ion-button fill="clear" (click)="decrementQuantity(product)" color="medium">
                                        <ion-icon name="remove-circle-outline"></ion-icon>
                                    </ion-button>
                                    <ion-input
                                        type="number"
                                        [value]="getQuantityForProduct(product)"
                                        (ionInput)="updateQuantity(product, $event)"
                                        [min]="1"
                                        [max]="getAvailableStock(product)"
                                    ></ion-input>
                                    <ion-button fill="clear" (click)="incrementQuantity(product)" color="medium">
                                        <ion-icon name="add-circle-outline"></ion-icon>
                                    </ion-button>
                                </div>
                            </ion-card-content>
                            <ion-button 
                                expand="block" 
                                (click)="addToCart(product)" 
                                [disabled]="getAvailableStock(product) === 0 || getQuantityForProduct(product) === 0"
                                color="dark"
                            >
                                <ion-icon name="cart-outline" slot="start"></ion-icon>
                                Agregar al carrito
                            </ion-button>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    `,
    styles: [`
        ion-card {
            margin: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        ion-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        ion-badge {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 12px;
        }
        ion-button ion-icon {
            margin-right: 8px;
        }
        .quantity-selector {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 10px 0;
        }
        .quantity-selector ion-input {
            width: 60px;
            text-align: center;
            --padding-start: 8px;
            --padding-end: 8px;
        }
        .quantity-selector ion-button {
            --padding-start: 4px;
            --padding-end: 4px;
        }
        ion-button[color="dark"] {
            --ion-color-contrast: white;
        }
    `],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class ProductListPage implements OnInit {
    products: Product[] = [];
    quantities: Map<string, number> = new Map();

    constructor(
        private productService: ProductService,
        public cartService: CartService,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.productService.getProducts().subscribe(products => {
            this.products = products;
            this.initializeQuantities();
        });
    }

    initializeQuantities() {
        this.products.forEach(product => {
            if (!this.quantities.has(product.id)) {
                this.quantities.set(product.id, 1);
            }
        });
    }

    getQuantityForProduct(product: Product): number {
        return this.quantities.get(product.id) || 1;
    }

    getAvailableStock(product: Product): number {
        const inCart = this.cartService.getItemQuantity(product.id);
        return product.stock - inCart;
    }

    incrementQuantity(product: Product) {
        const currentQuantity = this.quantities.get(product.id) || 1;
        const availableStock = this.getAvailableStock(product);
        if (currentQuantity < availableStock) {
            this.quantities.set(product.id, currentQuantity + 1);
        }
    }

    decrementQuantity(product: Product) {
        const currentQuantity = this.quantities.get(product.id) || 1;
        if (currentQuantity > 1) {
            this.quantities.set(product.id, currentQuantity - 1);
        }
    }

    updateQuantity(product: Product, event: any) {
        const value = parseInt(event.target.value);
        const availableStock = this.getAvailableStock(product);
        if (!isNaN(value) && value >= 1 && value <= availableStock) {
            this.quantities.set(product.id, value);
        }
    }

    addToCart(product: Product) {
        const quantity = this.quantities.get(product.id) || 1;
        this.cartService.addToCart(product, quantity);
        // Resetear la cantidad después de agregar al carrito
        this.quantities.set(product.id, 1);
    }

    goToCart() {
        this.router.navigate(['/cart']);
    }
} 