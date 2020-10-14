import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { pswdMatchValidator } from '../validators/pswd-match-validator.directive';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {

  myForm: FormGroup;
  userData: any;
  res:any;
  title = 'Change Password'

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      id: new FormControl(''),
      email: new FormControl(''),
      oldpswd: new FormControl('', Validators.required),
      newpswd1: new FormControl('', Validators.required),
      newpswd2: new FormControl('', Validators.required)
    }, {
      validators: pswdMatchValidator
    })
    this.http.get(environment.usersRoute).subscribe((data: any) => {
      this.userData = data
      this.setEmail(this.userData[0].email_address)
      this.setId(this.userData[0].id)
      console.log(this.userData[0].email_address)
    }, error => {
      console.log("There was an error generating the data from the server", error);
    })
  }

  get oldpswd() { return this.myForm.get('oldpswd'); }
  get newpswd1() { return this.myForm.get('newpswd1'); }
  get newpswd2() { return this.myForm.get('newpswd2'); }

  setEmail(name: string) {
    this.myForm.controls.email.setValue(name);
    this.myForm.controls.email.disable();
  }

  setId(id: string) {
    this.myForm.controls.id.setValue(id);
  }

  submitForm() {
    console.log(this.myForm.errors)
    const headers = new HttpHeaders()
    headers.set('content-type', 'application/json');
    console.log(JSON.stringify(this.myForm.getRawValue()))
    this.http.post(environment.updatePasswordRoute, this.myForm.getRawValue(), { headers: headers })
      .subscribe((response:any) => {
        console.log(response.error)        
        this.res=response;  
      },
      (error) => {
        console.log(error)
      })
  }
}
