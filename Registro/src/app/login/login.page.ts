import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertController: AlertController
  ) { }

  async onSubmit() {
    if (this.username && this.password) {
      try {
        const response = await firstValueFrom(this.authService.login(this.username, this.password));
        if (response.success) {
          // Guardar el perfil y otros detalles en el almacenamiento local o en un servicio
          localStorage.setItem('userProfile', response.perfil_id);
          localStorage.setItem('userId', response.id);

          // Redirigir según el perfil
          if (response.perfil_id == '1') {
            await this.router.navigate(['/home']);
          } else if (response.perfil_id == '2') {
            await this.router.navigate(['/mostrar-paciente']);
          }
        } else {
          // Mostrar mensaje de error
          this.presentAlert('Error', response.message);
        }
      } catch (error) {
        console.error('Error en el login:', error);
        this.presentAlert('Error', 'Error en la autenticación. Intenta de nuevo.');
      }
    } else {
      this.presentAlert('Error', 'Por favor, ingrese usuario y contraseña.');
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
}
