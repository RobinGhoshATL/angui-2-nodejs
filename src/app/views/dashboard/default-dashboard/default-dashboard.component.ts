import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { ThemeService } from 'app/shared/services/theme.service';
import tinyColor from 'tinycolor2';
import { AuthService } from 'app/shared/services/auth/auth.service';

@Component({
  selector: 'app-default-dashboard',
  templateUrl: './default-dashboard.component.html',
  styleUrls: ['./default-dashboard.component.scss'],
  animations: egretAnimations
})
export class DefaultDashboardComponent implements OnInit {
 counts:any;
  constructor(
    private themeService: ThemeService,
    private auth:AuthService
  ) {}

  ngOnInit() {  
   
  }



}
