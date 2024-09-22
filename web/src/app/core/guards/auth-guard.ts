import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthenticatedUserService} from "../services/authenticated-user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticatedUserService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['auth', 'login']).then(() => {
      this.toastr.error('Você precisa estar logado para acessar esta página.', 'Acesso Negado');
    });

    return false;
  }
}
