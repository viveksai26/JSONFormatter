import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from '../../constants/api-urls';

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {
  constructor(private http: HttpClient) {}
  isLoggedIn: boolean = false;
  verifyGToken(idToken): Observable<any> {
    return this.http.get<any>(ApiUrls.verifyGIdToken.replace('{idToken}', idToken));
  }
}
