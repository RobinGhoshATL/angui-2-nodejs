import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from './../../shared/services/auth/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { getMsalConfig } from '../../shared/helpers/msal-config';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  activeView : string = 'overview';
  user;

  // Doughnut
  doughnutChartColors: any[] = [{
    backgroundColor: ['#fff', 'rgba(0, 0, 0, .24)',]
  }];
  
  total1: number = 500;
  data1: number = 200;
  doughnutChartData1: number[] = [this.data1, (this.total1 - this.data1)];

  total2: number = 1000;
  data2: number = 400;
  doughnutChartData2: number[] = [this.data2, (this.total2 - this.data2)];

  doughnutChartType = 'doughnut';
  doughnutOptions: any = {
    cutoutPercentage: 85,
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
      position: 'bottom'
    },
    elements: {
      arc: {
        borderWidth: 0,
      }
    },
    tooltips: {
      enabled: false
    }
  };
  profileImage: string;
  profileAvaiable: boolean = false;
  domain: string;
  userRole: any;

  constructor(private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
      private auth: AuthService) {
  }

  public ngOnInit() {

    this.userRole = this.auth.getRoles();
    
    this.activeView = this.router.snapshot.params['view'];
    
    let localUser =  JSON.parse(localStorage.getItem("user"));
    if(!localUser){
        this.auth.getProfile().then(data =>{
         let user = {
            name: data?.displayName,
             principleName: data?.displayName,
            jobTitle: data?.jobTitle,
            companyName: data?.companyName,
            department: data?.department,
            userType: data?.userType,
            roleAssigned: this.userRole.toString(),
            website: getMsalConfig()?.domain,
            mail: data?.mail,
            contactNumber: data?.mobilePhone,
            address: `${data?.streetAddress} ${data?.state}` ,
          }
          this.user = user;
          localStorage.setItem("user", JSON.stringify(user));
          this.auth.myUser.next(user);
        }
      );
    }else{
      this.user = localUser;
      this.auth.myUser.next(localUser);
    }

  this.auth.myUserProfilePhoto.subscribe((data) => {
    if(data){
      this.profileAvaiable = true;
      this.profileImage = data;
    }
  });

  }

  public getSanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
