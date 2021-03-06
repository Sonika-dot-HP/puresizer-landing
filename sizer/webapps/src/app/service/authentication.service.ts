import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { RestService } from 'src/shared/services/http/rest.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/shared/services/http/http.service';
import { ApplicationDataService, APP_DATA_KEYS } from '../../shared/services/application-data.service';


@Injectable()
export class AuthenticationService extends RestService {

  protected baseUrl = environment.http.baseUrl;
  protected queryName = 'AUTHENTICATION';
  protected ajaxLoaderEnabled = true;

  userInfo$ : BehaviorSubject<any> = new BehaviorSubject('');

  constructor(
      httpService: HttpService,
      private router: Router,
      private applicationDataService: ApplicationDataService
  ) {
      super(httpService);
  }

  /* login(payload: { username: string, password: string }): Observable<any> {
    const url = `${this.baseUrl}/login/local`;
    return this.post({url}, null, payload, 'LOCAL_LOGIN', {
      responseType: 'text/html'
    });
  }*/

  oktaLogin(): Observable<any> {
    const url = `${this.baseUrl}/landing/login/authzero`;
    return this.post({url}, null, null, 'OKTA_LOGIN');
  }

  /*logout(): Observable<any> {
    const url = `${this.baseUrl}/logout`;
    this.clearApplicationData();
    return this.post({url}, null, null, 'LOGOUT', {
      responseType: 'text/html'
    });
  } */

  redirectToLogin(hasUnAuthorizedError: boolean = false) {
    this.clearApplicationData();
    this.applicationDataService.setAppData(APP_DATA_KEYS.HAS_UNAUTHORIZED_ERROR, hasUnAuthorizedError);
    this.router.navigate(['/login']);
  }



  getLandingInfo() {
    const url = `${this.baseUrl}/landing/appaccess`;
    return this.get({url}, null, '');
  }

  // postProjectDetails(){
  //   let payload = 
  //     {
  //       "username": 'admin',
  //       "app": 'fa-sizer'
  //     }
  //   const url = `${this.baseUrl}/landing/appaccess`;
  //   return this.save({url}, null, payload, '');
  // }
  private clearApplicationData() {
    this.applicationDataService.deleteAppData();
    this.applicationDataService.deleteStorageData();
  }

}

