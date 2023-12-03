import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs';
import { Usuario } from '../model/Usuario';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private readonly API = '/api/usuario';

    constructor(private httpClient: HttpClient) { }


    loadByEmail(email: string) {
        return this.httpClient.get<Usuario>(`${this.API}/${email}`);
    }

}
