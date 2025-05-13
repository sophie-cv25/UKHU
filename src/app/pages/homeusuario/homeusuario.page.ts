import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import {register} from 'swiper/element/bundle';
register();


@Component({
  selector: 'app-homeusuario',
  templateUrl: './homeusuario.page.html',
  styleUrls: ['./homeusuario.page.scss'],
  standalone: false,
})
export class HomeusuarioPage implements OnInit {
restaurantes: any[] = [];
slideOpts = {
    slidesPerView: 1,
    pagination: true,
    navigation: true,
    autoplay: true,
    loop: true
  };
  constructor( private databaseService: DatabaseService ) { }

  ngOnInit() {
    this.databaseService.fetchFirestoreCollection('restaurantes').subscribe((data: any) => {
      this.restaurantes = data;
      console.log("Restaurantes:", this.restaurantes);
  });
  }

}
