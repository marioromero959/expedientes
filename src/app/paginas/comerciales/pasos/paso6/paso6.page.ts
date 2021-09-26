import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { FormulariosService } from 'src/app/servicios/datos/data-pasos/formularios.service';

@Component({
  selector: 'app-paso6',
  templateUrl: './paso6.page.html',
  styleUrls: ['./paso6.page.scss'],
})
export class Paso6Page implements OnInit, OnDestroy {
  
  datosP;
  paso:number;
  navegacion:string = '';
  public archivos:any = [];
  dataPaso6: FormGroup;
  claseInput:boolean = false;  
  documentos = [
    {id:1,
    name: 'Constancia de inscripción con sist registral',
    sName:'registral'},
    {id:2,
    name: 'Constancia de inscripción en ATER',
    sName:'ater'},
    {id:3,
    name: 'DNI del titular - Frente',
    sName:'DNIfrente'},
    {id:4,
    name: 'Contrato de alquiler/comodato, en caso de corresponder',
    sName:'alquiler'},
    {id:5,
    name: 'Copia de impuesto inmobiliario o tasa inmobiliaria donde conste numero de partida del inmueble',
    sName:'impuesto'},
    {id:6,
    name: 'Plano/Croquis del lugar donde se desarrollará la actividad (Opcional)',
    sName:'planos'},
    {id:7,
    name: 'DNI nuevo titular - Frente',
    sName:'nuevoDNIfrente'},
    {id:8,
    name: 'Constancia de baja anterior',
    sName:'baja'},
    // Ver esta constancia
    {id:9,
    name: 'Constancia de baja de actividad en AFIP con sistema ASDASDA',
    sName:'bajaAFIP'},
    {id:10,
    name: 'Constancia de baja de actividad en ATER',
    sName:'bajaActATER'},
    {id:11,
    name: 'Constancia de baja en AFIP con sistema registral',
    sName:'bajaRegistralAFIP'},
    {id:12,
    name: 'Constancia de baja en ATER',
    sName:'bajaAter'},
    {id:13,
    name: 'DNI del Presidente o Socio representante - Frente',
    sName:'DNIPresidenteFrente'},
    {id:14,
    name: 'Última acta de designación de autoridades',
    sName:'acta'},
    {id:15,
    name: 'Estatuto o contrato constitutivo',
    sName:'estatuto'},
    {id:16,
    name: 'Constancia de sellado',
    sName:'sellado'},
    {id:17,
    name: 'DNI nuevo titular - Dorso',
    sName:'nuevoDNIdorso'},
    {id:18,
    name: 'DNI del titular - Dorso',
    sName:'DNIdorso'},
    {id:19,
    name: 'DNI del Presidente o Socio representante - Dorso',
    sName:'DNIPresidenteDorso'},
  ];
  filtroDocs = [];

  private suscripcionForm1: Subscription;

  constructor(
    private router:Router,
    private fb:FormBuilder,
    private formData:FormulariosService,
    private alertCtrl:AlertController,) {
      // Segun la informacion del paso 1, pediremos diferentes documentos
      // Segun la informacion del paso 3 mostraremos como paso 5 o 6
    this.suscripcionForm1 =  this.formData.escucharData().subscribe(res=>{
        this.datosP = res;
        if(this.datosP[0].local == 'no'){
          this.paso = 5
        }else{
          console.log('hay local')
          this.paso = 4
            /*(this.datosP[2].domComercial.alquilado == 'Alquiler') ? this.paso = 6 : this.paso = 5;
           (this.datosP[2].domComercial.alquilado == 'Alquiler') ? this.navegacion = '/comerciales/5' : this.navegacion = '/comerciales/4'; */
        }
      })
      this.miForm();
    }
  ngOnInit() {
    this.mostrarDocs();
  }

  mostrarDocs(){
    this.filtroDocs = this.documentos.filter(res=>{


        if(this.datosP[0].tipo == 'Persona Fisica'){
          if(this.datosP[0].local == 'si'){
            const rta = res.id != 13 && res.id != 14 && res.id != 15 && res.id != 19
            return rta;
          }else{
            const rta = res.id != 13 && res.id != 14 && res.id != 15 && res.id != 19 && res.id != 4 && res.id != 5 && res.id != 6
            return rta;
          }
        }else if(this.datosP[0].tipo == 'Persona Juridica'){
          if(this.datosP[0].local == 'si'){
            const rta = res.id != 3 && res.id != 7 && res.id != 8 && res.id != 17 && res.id != 18 
            return rta;
          }else{
            const rta = res.id != 3 && res.id != 7 && res.id != 8 && res.id != 17 && res.id != 18 && res.id != 4 && res.id != 5 && res.id != 6 
            return rta;
          }
        }
    })
    console.log(this.filtroDocs)
  }

  // Agrego las imagenes en base64 al arr de archivos
select(event){
  var reader = new FileReader();
  const self = this.archivos;
  const archivoCapturado = event.target.files[0];
  if(archivoCapturado){
    reader.readAsDataURL(archivoCapturado); 
    reader.onloadend = function() {
        var base64data = reader.result;
        self.push(base64data);
      };
  }else{
    console.log('err')
  }
}

terminarP6(){

  console.log(this.dataPaso6.value)
  // this.dataPaso6.get('registral').setValue(this.archivos[0]);
  // this.dataPaso6.get('ater').setValue(this.archivos[1]);
  // this.dataPaso6.get('sellado').setValue(this.archivos[2]);
  // this.dataPaso6.get('alquiler').setValue(this.archivos[3]);
  // this.dataPaso6.get('impuesto').setValue(this.archivos[4]);
  // this.dataPaso6.get('DNIdorso').setValue(this.archivos[5]);
  // this.dataPaso6.get('DNIfrente').setValue(this.archivos[6]);
  // this.dataPaso6.get('planos').setValue(this.archivos[7]);

  if(this.archivos != ''){
    console.log('Del Form:',this.dataPaso6.value);
 }

 if(this.dataPaso6.invalid){
  this.presentAlert();
}else{
  console.log('tamoready');
}
};

private miForm(){
  this.dataPaso6 = this.fb.group({
  registral: ['',Validators.required],
  ater: ['',Validators.required],
  DNIfrente: ['',Validators.required],
  alquiler: ['',Validators.required],
  impuesto: ['',Validators.required],
  planos: ['',Validators.required],
  nuevoDNIfrente: ['',Validators.required],
  baja: ['',Validators.required],
  bajaAFIP: ['',Validators.required],
  bajaActATER: ['',Validators.required],
  bajaRegistralAFIP: ['',Validators.required],
  bajaAter: ['',Validators.required],
  DNIPresidenteFrente: ['',Validators.required],
  acta: ['',Validators.required],
  estatuto: ['',Validators.required],
  sellado: ['',Validators.required],
  nuevoDNIdorso: ['',Validators.required],
  DNIdorso: ['',Validators.required],
  DNIPresidenteDorso: ['',Validators.required],
  })
}

async presentAlert() {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Datos Incompletos',
    subHeader: 'Por favor, agregue todos los archivos para continuar.',
    buttons: ['OK']
  });
await alert.present();
};

ngOnDestroy(){
  if(this.suscripcionForm1)
  this.suscripcionForm1.unsubscribe();
}

}
