import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  isLogIn: boolean = false;
  isLoading: boolean = false;
  authForm: FormGroup;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        this.isLogIn = data['isLogin'];
      }
    );
    this.onInitForm();
  }

  onInitForm() {
    if (this.isLogIn) {
      this.authForm = new FormGroup({
        'login': new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required)
      });
    }
    else {
      this.authForm = new FormGroup({
        'userName': new FormControl(null, [Validators.required, Validators.minLength(2)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'passwordConfirm': new FormControl(null, [Validators.required])
      }, this.validatePassword);
    }
  }

  onSubmit() {
    this.isLoading = true;
    let formObs: Observable<any>;

    if(this.isLogIn) {
      formObs = this.authService.login(this.authForm.value);
    }
    else {
      formObs = this.authService.register(this.authForm.value);
    }

    formObs.subscribe(data => {
      this.isLoading = false;
      console.log(data);
    }, error => {
      this.isLoading = false;
      console.log(error);
      this.errorMessage = error;
    });
  }

  validatePassword(group: FormGroup): {[s: string]: boolean} {
    if(group.get("password").value !== group.get("passwordConfirm").value) {
      return { "passwordsMismatch" : true };
    }
    return null;
  }

}
