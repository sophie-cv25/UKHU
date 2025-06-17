import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-2',
  templateUrl: './card-2.component.html',
  styleUrls: ['./card-2.component.scss'],
  standalone: false
})
export class Card2Component implements OnInit {
  @Input() restaurante: any;

  constructor() { }

  ngOnInit() {}
}