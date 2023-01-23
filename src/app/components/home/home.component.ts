import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { User } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user?: User;
  
  constructor(private router: Router,
    private authService: AuthService,
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (res) => this.user = res,
      error: (err) => console.error(err)
    });
  }

  logout(){
    if(this.user != undefined) {
      this.authService.logout().subscribe();
      AuthInterceptor.accessToken = "";
      this.router.navigate(['/signup']);
    }
    
  }

}
