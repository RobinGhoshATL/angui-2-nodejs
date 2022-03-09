import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";
import { ILayoutConf, LayoutService } from "app/shared/services/layout.service";
import { AuthService } from "app/shared/services/auth/auth.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-sidebar-side",
  templateUrl: "./sidebar-side.component.html"
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;
  public username;
  profileImage: string;
  profileAvaiable: boolean=false;
  user: any;
  constructor(
    private navService: NavigationService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private auth: AuthService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
        item => item.type === "icon"
      ).length;
    });
    this.layoutConf = this.layout.layoutConf;

    this.username = this.auth.getLoggedInUser().name;

    this.auth.getProfileImage().then(data => {
          this.profileAvaiable = true;
          const blob = new Blob([data.body], { type: 'image/jpeg' });
          const imageUrl = window.URL.createObjectURL(blob);
          localStorage.setItem("profileUrl", imageUrl);
          this.auth.myUserProfilePhoto.next(imageUrl);
          this.profileImage = imageUrl;
      });


  }

  public getSanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


  ngAfterViewInit() {}
  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }
  toggleCollapse() {
    if (
      this.layoutConf.sidebarCompactToggle
    ) {
        this.layout.publishLayoutChange({
        sidebarCompactToggle: false
      });
    } else {
        this.layout.publishLayoutChange({
            // sidebarStyle: "compact",
            sidebarCompactToggle: true
          });
    }
  }

  logout(){
    this.auth.logout();
}

}
