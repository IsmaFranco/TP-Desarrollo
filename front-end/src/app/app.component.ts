import { AfterViewInit, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavComponent } from './pages/nav/nav.component';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'front-end';

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private tokenService: TokenService,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Verificar estado de autenticación después de que el cliente se hidrate
      setTimeout(() => {
        this.tokenService.isAutenticated;
        this.cdr.detectChanges();
      }, 0);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Otra verificación después de que la vista se inicialice
      this.tokenService.isAutenticated();
      this.cdr.detectChanges();
    }
  }
}
