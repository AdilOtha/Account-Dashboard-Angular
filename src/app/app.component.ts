import { Component } from '@angular/core';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'account-dashboard';
  botBuilderUrl=environment.botBuilderUrl;
  status=true;
  footerYear = 2020;
  collapse(event){
      this.status=!this.status;
  }
}
