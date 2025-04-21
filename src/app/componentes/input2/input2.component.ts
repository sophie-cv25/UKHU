import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input2',
  templateUrl: './input2.component.html',
  styleUrls: ['./input2.component.scss'],
  standalone:false
})
export class Input2Component  implements OnInit {

  constructor() { }
  @Input() labelText2: string = '';
  ngOnInit() {}

}
