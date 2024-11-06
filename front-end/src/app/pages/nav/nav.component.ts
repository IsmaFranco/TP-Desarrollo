import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  menuOption: string = '';
  onOption(menuOption: string){
    this.menuOption = menuOption;
  }

}
