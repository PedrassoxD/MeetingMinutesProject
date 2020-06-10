import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Archivos } from '../clases/archivos';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  private baseUrl = 'https://mm-project.herokuapp.com/archivos/';

  extensiones: string[];
  extension: string;

  constructor(private http: HttpClient) { }

  /** Método para enviar un archivo al Backend */

  adjuntarArchivo(nombre: string, archivo: File, codReunion: number): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('archivo', archivo);

    const req = new HttpRequest('POST', `${this.baseUrl}adjuntar/${nombre}/${codReunion}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  /** Método para recibir los archivos desde el Backend */

  getArchivosByCodReunion(codreunion: number): Observable<any> {
    return this.http.get<Archivos>(`${this.baseUrl}` + 'listar/' + codreunion);
  }

  /** Método que sirve para descargar el archivo seleccionado dependiendo de su extension */

  ejecutarArchivo(codarchivo: number, nombreArchivo: string) {
    this.extensiones = nombreArchivo.split('.');

    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.extensiones.length; index++) {
        if (this.extensiones[index] === 'pdf') {
          this.extension = this.extensiones[index];
        } else if (this.extensiones[index] === 'jpg') {
          this.extension = this.extensiones[index];
        } else if (this.extensiones[index] === 'txt') {
          this.extension = this.extensiones[index];
        } else if (this.extensiones[index] === 'png') {
          this.extension = this.extensiones[index];
        } else if (this.extensiones[index] === 'xlsx') {
          this.extension = this.extensiones[index];
        } else if (this.extensiones[index] === 'doc') {
          this.extension = this.extensiones[index];
        } else if (this.extensiones[index] === 'docx') {
          this.extension = this.extensiones[index];
        } else if (this.extensiones[index] === 'pptx') {
          this.extension = this.extensiones[index];
        }
    }

    if (this.extension === 'pdf') {
      return this.http.get(`${this.baseUrl}verarchivo/${codarchivo}`, {responseType: 'arraybuffer'}).subscribe(data => {
        const file = new Blob([data], {type: 'application/pdf'});
        saveAs(file, nombreArchivo);
    });

    } else if (this.extension === 'jpg') {
      return this.http.get(`${this.baseUrl}verarchivo/${codarchivo}`, {responseType: 'arraybuffer'}).subscribe(data => {
        const file = new Blob([data], {type: 'image/jpg'});
        saveAs(file, nombreArchivo);
    });

    } else if (this.extension === 'png') {
      return this.http.get(`${this.baseUrl}verarchivo/${codarchivo}`, {responseType: 'arraybuffer'}).subscribe(data => {
        const file = new Blob([data], {type: 'image/png'});
        saveAs(file, nombreArchivo);
    });

    } else if (this.extension === 'txt') {
      return this.http.get(`${this.baseUrl}verarchivo/${codarchivo}`, {responseType: 'arraybuffer'}).subscribe(data => {
        const file = new Blob([data], {type: 'text/plain'});
        saveAs(file, nombreArchivo);
    });

    } else if (this.extension === 'doc') {
      return this.http.get(`${this.baseUrl}verarchivo/${codarchivo}`, {responseType: 'arraybuffer'}).subscribe(data => {
        const file = new Blob([data], {type: 'application/msword'});
        saveAs(file, nombreArchivo);
    });

    } else if (this.extension === 'docx') {
      return this.http.get(`${this.baseUrl}verarchivo/${codarchivo}`, {responseType: 'arraybuffer'}).subscribe(data => {
        const file = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
        saveAs(file, nombreArchivo);
    });

    } else if (this.extension === 'xlsx') {
      return this.http.get(`${this.baseUrl}verarchivo/${codarchivo}`, {responseType: 'arraybuffer'}).subscribe(data => {
        const file = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        saveAs(file, nombreArchivo);
    });

    } else if (this.extension === 'pptx') {
      return this.http.get(`${this.baseUrl}verarchivo/${codarchivo}`, {responseType: 'arraybuffer'}).subscribe(data => {
        const file = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'});
        saveAs(file, nombreArchivo);
    });

    }

  }

  /** Método para eliminar el archivo desde el Backend */

  borrarArchivo(codarchivo: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + 'borrar/' + codarchivo);
  }

}
