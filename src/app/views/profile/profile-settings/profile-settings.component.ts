import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from 'app/shared/services/auth/auth.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;
  user;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  
    
    this.auth.myUser.subscribe((data) => {
        this.user = data;
    });

  }

  // this.user.profile.roles[0]

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}
