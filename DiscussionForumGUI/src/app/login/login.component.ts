import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {UserModel} from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  registerHide = true;
  authenticateForm: FormGroup;
  authenticateHide = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) {
    window.localStorage.removeItem('token');
  }

  ngOnInit(): void {
    window.localStorage.removeItem('token');
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.compose([Validators.required])],
      passWord: ['', Validators.required]
    });

    this.authenticateForm = this.formBuilder.group({
      userName: ['', Validators.compose([Validators.required])],
      passWord: ['', Validators.required]
    });
  }

  onSubmitRegister() {
    if (this.registerForm.invalid) {
      alert('All fields are required.');
      return;
    }

    this.apiService.register(this.registerForm.value).subscribe(data => {
      alert('User ' + (data as UserModel).userName + ' has been registered.');
    });
  }

  onSubmitAuthenticate() {
    if (this.authenticateForm.invalid) {
      alert('All fields are required.');
      return;
    }

    this.apiService.authenticate(this.authenticateForm.value).subscribe(data => {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('userId');
      window.localStorage.setItem('token', (data as UserModel).token);
      window.localStorage.setItem('userId', (data as UserModel).id.toString());
      this.router.navigate(['list-user-article']);
    });
  }

}
