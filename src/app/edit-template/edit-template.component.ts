import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent implements OnInit {

  title='Edit Template'
  constructor() { }

  ngOnInit(): void {
  }

}
