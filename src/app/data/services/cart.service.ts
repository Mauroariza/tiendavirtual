import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../domain/entities/product.interface';

export interface CartItem extends Product {
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems = new BehaviorSubject<CartItem[]>([]);
    public cartItems$ = this.cartItems.asObservable();

    private _total = new BehaviorSubject<number>(0);
    public total$ = this._total.asObservable();

    constructor() {}

    addToCart(product: Product, quantity: number = 1) {
        const currentItems = this.cartItems.value;
        const existingItem = currentItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
            this.cartItems.next([...currentItems]);
        } else {
            this.cartItems.next([...currentItems, { ...product, quantity }]);
        }
        this.calculateTotal();
    }

    removeFromCart(productId: string) {
        const currentItems = this.cartItems.value;
        const updatedItems = currentItems.filter(item => item.id !== productId);
        this.cartItems.next(updatedItems);
        this.calculateTotal();
    }

    updateQuantity(productId: string, quantity: number) {
        const currentItems = this.cartItems.value;
        const item = currentItems.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.cartItems.next([...currentItems]);
                this.calculateTotal();
            }
        }
    }

    private calculateTotal() {
        const total = this.cartItems.value.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        this._total.next(total);
    }

    clearCart() {
        this.cartItems.next([]);
        this._total.next(0);
    }

    getItemQuantity(productId: string): number {
        const item = this.cartItems.value.find(item => item.id === productId);
        return item ? item.quantity : 0;
    }
} 