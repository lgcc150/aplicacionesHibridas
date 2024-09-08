import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VisitorService } from '../services/visitor.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage{

  pacientes: any[] = []; // Lista de visitantes/pacientes

  constructor(
    private visitorService: VisitorService,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.loadVisitors();
  }

  async loadVisitors() {
    try {
      const response = await lastValueFrom(this.visitorService.getVisitors());
      console.log('Respuesta de la API:', response);
      //if (response && response.visitors) {
        if ( Array.isArray(response)) {
        //this.pacientes = response.visitors;
        this.pacientes = response;
      } else {
        throw new Error('Respuesta de API inválida');
      }
    } catch (error) {
      console.error('Error al obtener visitantes:', error);
      this.presentAlert('Error', 'Error al obtener la lista de visitantes.');
    }
  }
  

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  goHome() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
