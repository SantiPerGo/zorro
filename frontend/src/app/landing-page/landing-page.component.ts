import { Component } from '@angular/core';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { BottomFooterComponent } from './components/bottom-footer/bottom-footer.component';

@Component({
  selector: 'landing-page',
  imports: [TopMenuComponent, NavbarComponent, MainContentComponent, BottomFooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
