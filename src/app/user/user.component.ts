import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public id = '65dbd72a-6136-4e29-8ae5-0c3329e1e3dd';
  public firstName = '';
  public lastName = '';
  public message = '';
  constructor(private _apiservice: ApiService) {}

  ngOnInit(): void {}

  submit() {
    this._apiservice
      .post(`${environment.apiURL}/User`, {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
      })
      .subscribe();
    this.message = 'Save successfully';
  }
}
