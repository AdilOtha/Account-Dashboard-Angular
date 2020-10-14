import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-ai-bot',
  templateUrl: './ai-bot.component.html',
  styleUrls: ['./ai-bot.component.scss']
})
export class AiBotComponent implements OnInit {
  closeResult = '';
  title = "Chat Bot"
  chatBotData: any
  botBuilderUrl = environment.botBuilderUrl;
  demoUrl = environment.demoUrl;
  deleteBotError: any;
  deleteBotId: string;

  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.http.get(environment.chatBotsRoute).subscribe((data: any) => {
      this.chatBotData = data
      console.log(this.chatBotData)
    }, error => {
      console.log("There was an error generating the data from the server", error);
    })
  }

  // MODAL METHODS
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openDeleteModal(content,chatBotId) {
    console.log(chatBotId)
    this.deleteBotId=chatBotId;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    this.deleteBotId="";
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // DELETE BOT  
  deleteBot(botID) {
    console.log(botID)
    const headers = new HttpHeaders()
    let obj = {
      botID: botID
    }
    // console.log(JSON.stringify(obj))
    headers.set('content-type', 'application/json');
    this.http.post(environment.chatBotDeleteRoute, obj, { headers: headers }).subscribe((response: any) => {
      console.log(response);
      this.deleteBotId="";
      if (response.affectedRows == 1) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/', 'ai-bot']);
        })
      }
      else {
        this.deleteBotError=response;
      }
    },
      (error) => {
        console.log(error);
      })
  }
}