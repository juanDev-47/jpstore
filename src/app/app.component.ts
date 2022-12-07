import { Component } from '@angular/core';
import { Product } from './models/prodduct.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'jp-store';
  imgParent: string =
    'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';


  onLoaded() {
    console.log('loaded');
  }

  // onRegister() {
  //   console.log(this.register);
  // }
}
