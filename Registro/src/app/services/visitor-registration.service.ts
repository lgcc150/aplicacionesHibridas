import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorRegistrationService {

  private apiUrl = 'http://192.168.1.9:8080/Registro/API/save_visitor.php';

  constructor(private http: HttpClient) { }

  saveVisitor(visitorData: any): Observable<any> {
    // Configurar los headers para enviar JSON
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Enviar los datos al servidor
    return this.http.post<any>(this.apiUrl, JSON.stringify(visitorData), { headers });
  }
}
 