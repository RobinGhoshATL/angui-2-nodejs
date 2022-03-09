import { Injectable, Inject, Renderer2, RendererFactory2, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface ITheme {
  name: string,
  baseColor?: string,
  isActive?: boolean
}

@Injectable()
export class ThemeService {
  public onThemeChange :EventEmitter<ITheme> = new EventEmitter();

  public egretThemes :ITheme[]  = [
  {
    "name": "plenarea-blue",
    "baseColor": "#212529",
    "isActive": true 
  }];
  public activatedTheme: ITheme;
  private renderer: Renderer2;
  count;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  // Invoked in AppComponent and apply 'activatedTheme' on startup
  applyMatTheme( themeName: string) {

    this.activatedTheme = this.egretThemes.find(t => t.name === themeName); 
    this.flipActiveFlag(themeName);
    // this.changeTheme(themeName);
    this.renderer.addClass(this.document.body, themeName);

  }

  flipActiveFlag(themeName:string) {
    this.egretThemes.forEach((t) => {
      t.isActive = false;
      if(t.name === themeName) {
        t.isActive = true;
        this.activatedTheme = t;
      }
    });
  }



}
