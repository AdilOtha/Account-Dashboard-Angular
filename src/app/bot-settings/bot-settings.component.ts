import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-bot-settings',
  templateUrl: './bot-settings.component.html',
  styleUrls: ['./bot-settings.component.scss']
})
export class BotSettingsComponent implements OnInit {

  title = "Bot Settings"
  active = 1
  botID: string;
  myForm: FormGroup;
  chatBotData = {
    ai_type: 1,
    android_push_key: "0",
    api_security_key: "",
    channel_bot_id: "",
    floatbot_client_token: "",
    floatbot_developer_token: "",
    is_ai_set: 1,
    notification_type: 0
  };
  isAiSet: string = "No";
  aiType: string;
  res:any; //Response of Form Submit

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {

    this.botID = this.route.snapshot.paramMap.get('botID');
    let queryParams = "?botID=" + this.botID;
    this.http.get(environment.chatBotSettingsRoute + queryParams).subscribe((data: any) => {
      this.chatBotData = data[0]

      if (this.chatBotData.is_ai_set === 1) {
        this.isAiSet = "Yes"
      }
      switch (this.chatBotData.ai_type) {
        case 1:
          {
            this.aiType = "Floatbot";
            break;
          }
        case 2:
          {
            this.aiType = "Wit";
            break;
          }
        case 3:
          {
            this.aiType = "Api";
            break;
          }
      }
      console.log(this.chatBotData)
    }, error => {
      console.log("There was an error generating the data from the server", error);
    })
    
    this.myForm = new FormGroup({
      isAiSetInput: new FormControl({value: this.isAiSet, disabled: true}),
      aiType: new FormControl({value: "", disabled: true}),
      floatbotDevToken: new FormControl({value: "", disabled: true}),
      floatbotClientToken: new FormControl({value: "", disabled: true}),     
      botIdInput: new FormControl({value: this.botID, disabled: true}),
      apiKey: new FormControl({value: this.botID, disabled: true}),
      iosCertificate: new FormControl(''),
      iosCertificateSource: new FormControl('')
    })
  }

  submitForm() {    
    const headers = new HttpHeaders()
    headers.set('content-type', 'multi-part/form-data');
    console.log(this.myForm.getRawValue())
    const formData = new FormData();
    formData.append('file', this.myForm.get('iosCertificateSource').value);
    this.http.post(environment.chatBotUpdateSettingsRoute, formData)
      .subscribe((response:any) => {
        //console.log(response.error)        
        this.res=response;
      },
      (error) => {
        console.log(error)
      })
  }

  onFileChange(event) {  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.myForm.patchValue({
        iosCertificateSource: file
      });
    }
  }
}
