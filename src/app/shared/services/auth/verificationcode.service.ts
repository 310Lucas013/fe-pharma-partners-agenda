import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from '../token-storage/token-storage.service';

const AUTH_API = 'http://localhost:8888/credentials/';

@Injectable({
    providedIn: 'root',
})
export class VerificationcodeService {

    constructor(
        private http: HttpClient,
        private tokenStorage: TokenStorageService
    ) { }

    verify(verificationcode: string): Observable<any> {
        const header = {
            headers: new HttpHeaders()
                .set('Authorization', this.tokenStorage.getToken())
        };

        return this.http.post(
            AUTH_API + 'verify',
            {
                code: verificationcode
            },
            header
        );
    }
}
