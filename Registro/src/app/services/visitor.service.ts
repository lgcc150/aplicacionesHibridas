import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private apiUrl = 'http://192.168.1.9:8080/Registro/API/get_visitors.php'; // URL de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de visitantes
  getVisitors(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
