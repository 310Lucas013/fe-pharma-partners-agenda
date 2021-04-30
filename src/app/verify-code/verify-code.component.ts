import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {VerificationcodeService} from '../shared/services/auth/verificationcode.service';
import {TokenStorageService} from '../shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {
  verificationcode = '';

  constructor(private verifyService: VerificationcodeService, private tokenService: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
  }

  verify(): void {
    this.verifyService.verify(this.verificationcode)
      .subscribe(data => {
        sessionStorage.clear();

        setTimeout(() => {                           // <<<---using ()=> syntax
          this.tokenService.saveToken(data.token);
          this.router.navigate(['/agenda/' + this.tokenService.getId()]);
        }, 1000);
      }, error => console.log(error));
  }
}
