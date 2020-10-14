import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {
  
  title='Add Agent'
  chatBotData: any
  numbers: any
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/chatbots').subscribe((data: any) => {
      this.chatBotData = data
      console.log(this.chatBotData)
    }, error => {
      console.log("There was an error generating the data from the server", error);
    });

    this.numbers=Array(4).fill(0).map((x,i)=>i);
  }  
  ngOnInit(): void {
  }

}
