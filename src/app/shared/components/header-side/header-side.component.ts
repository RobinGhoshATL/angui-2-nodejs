import { Component, OnInit, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;

  public egretThemes;
  public layoutConf:any;
  username: any;
  profileImage: string;
  profileAvaiable: boolean=false;
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2,
    private auth:AuthService,
    private sanitizer: DomSanitizer,

  ) {}
  ngOnInit() {
    this.username = this.auth.getLoggedInUser().name;
    console.log("username", this.username);
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;

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
  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if(this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  toggleCollapse() {
    // compact --> full
    if(this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      }, {transitionClass: true})
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    }, {transitionClass: true})

  }

  logout(){
      this.auth.logout();
  }

  onSearch(e) {
    //   console.log(e)
  }
}