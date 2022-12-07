import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu: boolean = false;
  counter: number = 0;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.store.myCart$.subscribe((data) => {
      this.counter = data.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
}
