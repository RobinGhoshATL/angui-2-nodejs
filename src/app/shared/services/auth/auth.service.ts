import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MsalService, BroadcastService } from "@azure/msal-angular";
import { Client } from "@microsoft/microsoft-graph-client";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { User } from "./../../../shared/Models/user";
import { environment } from "../../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { NavigationService } from "../navigation.service";
import { InteractionRequiredAuthError } from "msal";
import { getMsalConfig } from "../../helpers/msal-config";

@Injectable({
  providedIn: "root",
})

export class AuthService {

  graphUrl = environment.graph_url;
  private graphClient: Client;
  _headers: HttpHeaders;

  public myUser: BehaviorSubject<User> = new BehaviorSubject<User>({
    name: "",
    principleName: "",
    jobTitle: "",
    companyName: "",
    department: "",
    userType: "",
    roleAssigned: "",
    website: "",
    mail: "",
    contactNumber: "",
    address: "",
  });
  private accessToken: any;
  public myUserProfilePhoto: BehaviorSubject<any> = new BehaviorSubject<any>(
    ""
  );
  constructor(
    private auth: MsalService,
    private router: Router,
    private http: HttpClient,
    private navigation: NavigationService
  ) {}

  public GetAccessToken(): Observable<any> {
    if (
      localStorage.getItem("msal.idtoken") !== undefined &&
      localStorage.getItem("msal.idtoken") != null
    ) {
      this.accessToken = localStorage.getItem("msal.idtoken");
    }
    return this.accessToken;
  }

  public authCallback(errorDesc, token, error, tokenType) {
    if (token) {
    } else {
      console.log(error + ":" + errorDesc);
    }
  }

  // get user details
  getLoggedInUser(): any {
   return (this.auth.getAccount().idToken as any);
  }

  async getToken(){
    var request = {
        scopes: [`api://${getMsalConfig().clientId}/access_as_user`]
    };

    return await this.auth
      .acquireTokenSilent(request)
        .then(result => {
          return result.accessToken;
    }).catch(error => {
    if (error instanceof InteractionRequiredAuthError) {
        return this.auth.acquireTokenRedirect(request)
    }
    return this.auth.getAccount().idTokenClaims;
  });
}

  // get user details
  getRoles(): any {
    return (this.auth.getAccount().idToken as any).roles;
  }

// Generates a GET request the user endpoint.
  async getProfile() {
    return await this.http.get<any>(`${this.graphUrl}/me`).toPromise();
  }

  // Generates a GET request for the user's profile photo.
  async getProfileImage() {
    return await this.http
      .get(`${this.graphUrl}me/photo/$value`, {
        observe: "response",
        responseType: "arraybuffer",
      })
      .toPromise();
  }
  setSidebarMenu() {
    const roles = (this.auth.getAccount().idToken as any).roles;
    this.navigation.publishNavigationChange(roles);
  }

  logout() {
    this.auth.logout();
    localStorage.clear();
    this.router.navigate(["/"]).then(
      (nav) => {
        console.log(nav);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
