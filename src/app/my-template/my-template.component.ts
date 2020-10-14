import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../environments/environment';
import { env } from 'process';

@Component({
  selector: 'app-my-template',
  templateUrl: './my-template.component.html',
  styleUrls: ['./my-template.component.scss']
})
export class MyTemplateComponent implements OnInit {

  botBuilderUrl:string;
  demoUrl:string;
  title="My Templates"
  button1="Bot Builder"
  button2="Demo"
  button3="Settings"
  constructor(private modalService: NgbModal) {
    this.botBuilderUrl=environment.botBuilderUrl;
    this.demoUrl=environment.demoUrl;
  }

  ngOnInit(): void {
  }
  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }
}
