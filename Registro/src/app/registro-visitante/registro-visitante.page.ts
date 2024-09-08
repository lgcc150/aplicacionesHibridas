import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { VisitorRegistrationService } from '../services/visitor-registration.service'; 
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro-visitante',
  templateUrl: './registro-visitante.page.html',
  styleUrls: ['./registro-visitante.page.scss'],
})
export class RegistroVisitantePage implements OnInit {

  nombrePaciente!: string;
  cama!: string;
  pabellon!: string;
  cedulaPaciente!: number | null;
  edad!: string;
  datos!: string;
  numeroDocumento!: number | null;
  apellidoVisitante!: string;
  nombreVisitante!: string;
  genero!: string;
  telefono!: number | null;
  parentezco!: string;
  generos = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
    // Agrega más opciones según sea necesario
  ];

  @ViewChild('video', { static: false }) video!: ElementRef;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef;
  @ViewChild('listaDeDispositivos', { static: false }) listaDeDispositivos!: ElementRef;
  @ViewChild('estado', { static: false }) estado!: ElementRef;

  private routerSubscription: Subscription;
  private stream: MediaStream | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private visitorRegistrationService: VisitorRegistrationService,
    private alertController: AlertController // Inyecta AlertController para mostrar alertas
  ) {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/registro-visitante') {
          this.startCamera();
        } else {
          this.stopCamera();
        }
        this.resetForm();
      }
    });
  }

  ngOnInit() {
    // La cámara se iniciará automáticamente cuando se navegue a esta página
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    this.stopCamera();
  }

  getQueryParam(param: string): string {
    // Extrae parámetros de la URL o usa otro método para obtener datos
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || '';
  }

  async guardarVisitante() {
    // Validar que todos los campos estén completos
    if (!this.isFormValid()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos requeridos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Prepara los datos para el envío
    const visitorData = {
      numeroDocumento: this.numeroDocumento,
      apellidoVisitante: this.apellidoVisitante,
      nombreVisitante: this.nombreVisitante,
      genero: this.genero,
      telefono: this.telefono,
      parentezco: this.parentezco,
      fotoBase64: this.getPhotoBase64(), // Obtener la foto en base64
      cama: this.cama,
      pabellon: this.pabellon,
      cedulaPaciente: this.cedulaPaciente,
      nombrePaciente: this.nombrePaciente
    };

    // Llamar al servicio para guardar los datos
    this.visitorRegistrationService.saveVisitor(visitorData).subscribe({
      next: async (response) => {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: response.message || 'Datos del visitante guardados correctamente.',
          buttons: ['OK']
        });
        await alert.present();
        this.resetForm(); // Limpiar el formulario después de enviar los datos
        this.goMostrarPaciente();
      },
      error: async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error al guardar los datos del visitante.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  goMostrarPaciente() {
    this.router.navigate(['/mostrar-paciente']);
  }

  startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Lo siento. Tu navegador no soporta esta característica");
      return;
    }

    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        if (videoDevices.length > 0) {
          this.showStream(videoDevices[0].deviceId);
        }
      });
  }

  showStream(deviceId: string) {
    navigator.mediaDevices.getUserMedia({
      video: { deviceId: deviceId }
    })
    .then(stream => {
      this.stream = stream;
      const videoElement = this.video.nativeElement;
      videoElement.srcObject = stream;
      videoElement.play();

      const listaDeDispositivosElement = this.listaDeDispositivos.nativeElement;
      listaDeDispositivosElement.innerHTML = ''; // Clear previous options

      navigator.mediaDevices.enumerateDevices().then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        videoDevices.forEach(device => {
          const option = document.createElement('ion-select-option');
          option.value = device.deviceId;
          option.innerHTML = device.label || `Camera ${device.deviceId}`;
          listaDeDispositivosElement.appendChild(option);
        });

        listaDeDispositivosElement.addEventListener('ionChange', (event: any) => {
          const newDeviceId = event.detail.value;
          this.showStream(newDeviceId);
        });
      });
    })
    .catch(error => {
      console.error("Permiso denegado o error: ", error);
      if (this.estado && this.estado.nativeElement) {
        this.estado.nativeElement.innerHTML = "No se puede acceder a la cámara, o no diste permiso.";
      }
    });
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    const videoElement = this.video.nativeElement;
    videoElement.srcObject = null;
  }

  takePhoto() {
    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photoDataUrl = canvas.toDataURL();
    console.log("Foto tomada:", photoDataUrl);

    // Aquí se  maneja el envío de la foto al servidor si es necesario
    fetch("http://localhost:8100/save_visitor.php", { 
      method: "POST",
      body: JSON.stringify({
        numeroDocumento: this.numeroDocumento,
        apellidoVisitante: this.apellidoVisitante,
        nombreVisitante: this.nombreVisitante,
        genero: this.genero,
        telefono: this.telefono,
        parentezco: this.parentezco,
        fotoBase64: photoDataUrl.split(',')[1], // Enviar solo la parte base64
        cama: this.cama,
        pabellon: this.pabellon,
        cedulaPaciente: this.cedulaPaciente,
        nombrePaciente: this.nombrePaciente
      }),
      headers: {
        "Content-type": "application/json",
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error al guardar los datos:', data.error);
      } else {
        console.log("Datos del visitante guardados correctamente:", data.message);
        this.resetForm(); // Limpiar el formulario después de enviar los datos
      }
    })
    .catch(error => console.error('Error al guardar los datos:', error));
  }

  getPhotoBase64(): string {
    const canvas = this.canvas.nativeElement;
    return canvas.toDataURL().split(',')[1]; // Obtener solo la parte base64
  }

  resumeVideo() {
    const video = this.video.nativeElement;
    video.play();
  }

  private isFormValid(): boolean {
    return !!(this.numeroDocumento && this.apellidoVisitante && this.nombreVisitante &&
              this.genero && this.telefono && this.parentezco && this.cama &&
              this.pabellon && this.cedulaPaciente && this.nombrePaciente);
  }

  private resetForm() {
    this.numeroDocumento = null;
    this.apellidoVisitante = '';
    this.nombreVisitante = '';
    this.genero = '';
    this.telefono = null;
    this.parentezco = '';
    this.cama = '';
    this.pabellon = '';
    this.cedulaPaciente = null;
    this.nombrePaciente = '';
  }
}
