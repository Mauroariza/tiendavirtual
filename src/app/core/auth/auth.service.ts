import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, AuthResponse } from '../../domain/entities/user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        // Verificar si hay un usuario en localStorage
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUserSubject.next(JSON.parse(storedUser));
        }
    }

    login(email: string, password: string, name?: string): Observable<AuthResponse> {
        // Simulación de login - En un caso real, esto sería una llamada HTTP
        const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: name || 'Usuario Demo'
        };
        
        const response: AuthResponse = {
            user: mockUser,
            token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9)
        };

        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        this.currentUserSubject.next(mockUser);
        
        return of(response);
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    isAuthenticated(): boolean {
        return this.currentUserSubject.value !== null;
    }
} 