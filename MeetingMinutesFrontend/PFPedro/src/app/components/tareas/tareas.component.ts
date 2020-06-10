import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Temas } from '../../clases/temas';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { SeriereunionService } from '../../services/seriereunion.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../clases/usuario';
import { Tareas } from '../../clases/tareas';
import { TareasService } from '../../services/tareas.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {

  submitted = false;
  existeTarea = false;
  nuevaTareaForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    responsables: new FormControl('', [Validators.required])
  });
  usuarios: Usuario[];
  tareas: Tareas[];
  tareasAntiguas: Tareas[];
  tarea: Tareas = new Tareas();
  codsreunion: number;
  codreunion: number;
  codusu: number[];

  constructor(public route: ActivatedRoute, public us: UsuarioService, public ts: TareasService, public es: EmailService) { }

  /** Recoge las tareas, las tareas antiguas no cerradas y los usuarios por codigo de reunion */

  ngOnInit() {
    this.route.paramMap.subscribe(response => {
      this.codsreunion = parseInt(response.get('id'), 10);
      this.codreunion = parseInt(response.get('idd'), 10);
      this.getTareas(this.codreunion);
      this.getTareasAntiguasNoCerradas(this.codreunion, this.codsreunion);
      this.us.getUsuariosByCodReunion(this.codreunion).subscribe(data => {
        this.usuarios = data;
      });
    });
  }

  getTareas(id: number) {
    this.ts.getTareasByCodReunion(id).subscribe(data => {
      if (data !== null && data.length !== 0) {
        this.existeTarea = true;
        this.tareas = data;
      } else {
        this.existeTarea = false;
      }
    });
  }

  /** Las tareas de reuniones antiguas a la que estamos actualmente, las recoge y las añade a la reunión actual */

  getTareasAntiguasNoCerradas(id: number, id2: number) {
    this.ts.getTareasByCodReunionAntiguaAndNoCerrada(id, id2).subscribe(data => {
      if (data !== null && data.length !== 0) {
        this.tareasAntiguas = data;
        if (this.tareasAntiguas.length > 0) {
          this.ts.saveTareasAntiguas(this.tareasAntiguas, this.codreunion).subscribe(res => {
            this.getTareas(this.codreunion);
          }, error => console.log('Error al guardar Tareas Antiguas: ', error));
        }
      }
    });
  }

  submittedTrue() {
    this.submitted = true;
  }

  /** Método para crear una nueva tarea */

  crearTarea(form) {
    this.tarea.titulo = form.value.titulo;
    this.tarea.descripcion = form.value.descripcion;
    this.codusu = form.value.responsables;

    this.ts.crearTareas(this.tarea, this.codreunion, this.codusu, this.codsreunion).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'Tarea creado con éxito.',
        showConfirmButton: false,
        timer: 1500
      });
      this.submitted = false;
      this.nuevaTareaForm.reset();
      this.getTareas(this.codreunion);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos, ha ocurrido un problema al crear la tarea',
        text: 'Inténtelo de nuevo o mas tarde.',
        timer: 1500
      });
      this.nuevaTareaForm.reset();
      console.log('Error al crear reunion', error);
    });
  }

  /** Método para cerrar las tareas */

  cerrarTareas(codtarea: number) {

    this.tarea = new Tareas();
    this.tarea.codTarea = codtarea;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'La tarea se cerrará si aceptas.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar!'
    }).then((result) => {
      if (result.value) {
        this.ts.cerrarTareas(this.tarea).subscribe(data => {
          Swal.fire(
            'Cerrada!',
            'La tarea ha sido cerrada.',
            'success'
          );
          this.getTareas(this.codreunion);
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Lo sentimos, ha ocurrido un problema al cerrar la tarea',
            text: 'Inténtelo de nuevo o mas tarde.',
            timer: 1500
          });
          console.log('error de tarea: ', error);
        });
      }
    });
  }

  /** Método que envía las tareas por email a sus responsables */

  enviarTarea(codtarea: number) {
    Swal.fire({
      icon: 'success',
      title: 'Tarea enviada a los responsables.',
      showConfirmButton: false,
      timer: 1500
    });
    this.es.enviarTarea(codtarea).subscribe(data => {}, error => {
      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos, ha ocurrido un problema al enviar la tarea',
        text: 'Inténtelo de nuevo o mas tarde.',
        timer: 1500
      });
      console.log('error send tarea: ', error);
    });
  }

  /** Getters para recoger los campos del formulario */

  get titulo() {
    return this.nuevaTareaForm.get('titulo');
  }

  get descripcion() {
    return this.nuevaTareaForm.get('descripcion');
  }

  get responsables() {
    return this.nuevaTareaForm.get('responsables');
  }

}
