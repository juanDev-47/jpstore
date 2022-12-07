import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {
  @Input() img: string = '';
  @Output() loaded = new EventEmitter();
  imageDefaul: string = 'https://www.picsum.photos/200/300'

  constructor() { }

  imgError() {
    this.img = this.imageDefaul;
  }

  imgLoaded() {
    this.loaded.emit();
  }

}
