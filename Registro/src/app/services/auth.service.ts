import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://192.168.1.9:8080/Registro/API/login.php?=&='; //  URL del API

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(this.apiUrl, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  isAuthenticated(): boolean {
    // Verificar si el usuario está autenticado
    return !!localStorage.getItem('userProfile') && !!localStorage.getItem('userId');
  }

  logout(): void {
    // Limpiar el almacenamiento local y redirigir al usuario
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userId');
  }
} 
