import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  standalone: false
})
export class BienvenidaPage implements OnInit, OnDestroy {
  // Rutas de las páginas de onboarding en el orden correcto
  pages: string[] = ['/onboarding1', '/onboarding2', '/onboarding3'];
  currentIndex = 0;
  autoTransitionTimer: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startAutoTransition();
  }

  // Inicia la transición automática cada 5 segundos
  startAutoTransition(): void {
    this.autoTransitionTimer = setInterval(() => {
      this.nextPage();
    }, 500);
  }

  // Navega a la siguiente pantalla
  nextPage(): void {
    if (this.currentIndex < this.pages.length) {
      this.router.navigate([this.pages[this.currentIndex]]);
      this.currentIndex++;
    } else {
      clearInterval(this.autoTransitionTimer);
      // Cuando se han mostrado todas las pantallas, redirige a la página final (por ejemplo, /home)
      this.router.navigate(['/home']);
    }
  }

  // Al dar click se limpia el temporizador y se pasa de inmediato
  userClick(): void {
    clearInterval(this.autoTransitionTimer);
    this.nextPage();
  }

  ngOnDestroy(): void {
    if (this.autoTransitionTimer) {
      clearInterval(this.autoTransitionTimer);
    }
  }
}
