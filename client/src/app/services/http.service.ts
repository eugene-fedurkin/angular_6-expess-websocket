import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../models/register.model';

@Injectable()
export class HttpService {

  private url: string = 'http://localhost:4000';
  private options = {
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
    },
  };

  constructor(private readonly http: HttpClient) {}

  public signUp(name: Register): Observable<Register> {
    return this.http.post<Register>(`${this.url}/register`, name, this.options);
  }

  public signIn(name: Register): Observable<Register> {
    return this.http.post<Register>(`${this.url}/signin`, name, this.options);
  }
}
