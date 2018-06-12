import { Component, OnInit, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'best-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  @Input() booksNumber: number;

  constructor() { }

  ngOnInit() {
  }

}
