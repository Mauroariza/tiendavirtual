import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../domain/entities/product.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private mockProducts: Product[] = [
        {
            id: '1',
            name: 'iPhone 14 Pro',
            description: 'El último iPhone con tecnología de punta y cámara profesional',
            price: 999.99,
            image: 'https://picsum.photos/seed/iphone/300/300',
            category: 'Smartphones',
            stock: 10
        },
        {
            id: '2',
            name: 'MacBook Pro M2',
            description: 'Laptop profesional con el chip M2 de Apple',
            price: 1499.99,
            image: 'https://picsum.photos/seed/macbook/300/300',
            category: 'Laptops',
            stock: 5
        },
        {
            id: '3',
            name: 'Sony WH-1000XM4',
            description: 'Auriculares con cancelación de ruido premium',
            price: 349.99,
            image: 'https://picsum.photos/seed/headphones/300/300',
            category: 'Audio',
            stock: 15
        },
        {
            id: '4',
            name: 'iPad Air',
            description: 'Tablet versátil para creativos y profesionales',
            price: 599.99,
            image: 'https://picsum.photos/seed/ipad/300/300',
            category: 'Tablets',
            stock: 8
        },
        {
            id: '5',
            name: 'Samsung Galaxy Watch 5',
            description: 'Smartwatch con monitoreo avanzado de salud',
            price: 299.99,
            image: 'https://picsum.photos/seed/watch/300/300',
            category: 'Wearables',
            stock: 12
        },
        {
            id: '6',
            name: 'Nintendo Switch OLED',
            description: 'Consola híbrida con pantalla OLED mejorada',
            price: 349.99,
            image: 'https://picsum.photos/seed/switch/300/300',
            category: 'Gaming',
            stock: 7
        },
        {
            id: '7',
            name: 'Canon EOS R6',
            description: 'Cámara mirrorless profesional full-frame',
            price: 2499.99,
            image: 'https://picsum.photos/seed/camera/300/300',
            category: 'Fotografía',
            stock: 3
        },
        {
            id: '8',
            name: 'DJI Mini 3 Pro',
            description: 'Drone compacto con cámara 4K',
            price: 749.99,
            image: 'https://picsum.photos/seed/drone/300/300',
            category: 'Drones',
            stock: 6
        }
    ];

    getProducts(): Observable<Product[]> {
        return of(this.mockProducts);
    }

    getProduct(id: string): Observable<Product | undefined> {
        return of(this.mockProducts.find(p => p.id === id));
    }
} 