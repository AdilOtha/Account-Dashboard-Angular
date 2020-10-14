import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DynamicTableService } from '../dynamic-table.service';
import { NgbdSortableHeader, SortEvent } from '../sortable.directive';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sub-users',
  templateUrl: './sub-users.component.html',
  styleUrls: ['./sub-users.component.scss'],
  providers: [NgbModalConfig, NgbModal, DynamicTableService]
})
export class SubUsersComponent implements OnInit {

  //nav active tab
  active:string = "ngb-nav-1";

  chatBotData: any;
  subUserData$: Observable<any[]>;
  total$: Observable<number>;
  title: string;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  //CHECKBOX DATA
  data: any;
  count: number;

  constructor(config: NgbModalConfig, private modalService: NgbModal, public service: DynamicTableService, private http: HttpClient) {
    this.title = "Sub-Users"
    config.size = 'lg';
    config.scrollable = true;
    service.setApiRoute(environment.subUsersRoute)
    service.setSearchProperty("name")
    this.subUserData$ = service.data$;
    this.total$ = service.total$;


    //INITIALIZE CHECKBOX DATA
    this.data = {};
    this.data.isAllSelected = false;
    this.count = 1;

    //List object having hierarchy of parents and its children
    this.data.list = [
      {
        id: 1, value: 'WORKFLOW', isSelected: false, name: "Toggle",
        childList: [
          {
            id: 1, parent_id: 1, value: 'UPDATE_FLOW_ITEM', isSelected: false, name: "Can Update Flow"
          },
          {
            id: 2, parent_id: 1, value: 'DELETE_FLOW_ITEM', isSelected: false, name: "Can Delete Flow"
          },
          {
            id: 3, parent_id: 1, value: 'CREATE_FLOW_ITEM', isSelected: false, name: "Can Create Flow"
          }
        ]
      },
      {
        id: 2, value: 'AI', isSelected: false, name:"AI", childList: [
          {
            id: 1, parent_id: 1, value: 'ADD_INTENT_ENTITIES', isSelected: false, name: "Can Add Intent"
          },
          {
            id: 2, parent_id: 1, value: 'UPDATE_INTENT_ENTITIES', isSelected: false, name: "Can Update Intent"
          },
          {
            id: 3, parent_id: 1, value: 'DELETE_INTENT_ENTITIES', isSelected: false, name: "Can Delete Intent"
          },
          {
            id: 4, parent_id: 1, value: 'UPDATE_CONFIDENCE', isSelected: false, name: "Can Change Bot Confidence"
          },
          {
            id: 5, parent_id: 1, value: 'BUILD_AI', isSelected: false, name: "Can Train Bot"
          },
          {
            id: 6, parent_id: 1, value: 'SMALLTALK', isSelected: false, name: "Can View Smalltalk"
          }
        ]
      },
      {
        id: 3, value: 'ENGAGE', isSelected: false, name:"Engage",
        childList: [
          {
            id: 1, parent_id: 1, value: 'SEND_BROADCAST', isSelected: false,name:"Send Broadcast"
          },
          {
            id: 2, parent_id: 1, value: 'BROADCAST_HISTORY', isSelected: false,name:"View History"
          }
        ]
      },
      {
        id: 4, value: 'ANALYZE', isSelected: false, name:"Analyze", childList: [
          {
            id: 1, parent_id: 1, value: 'ANALYZE_OVERVIEW', isSelected: false,name:"overview"
          },
          {
            id: 2, parent_id: 1, value: 'VIEW_USER_SAYS', isSelected: false,name:"Can View User Query"
          },
          {
            id: 3, parent_id: 1, value: 'VIEW_SESSIONS', isSelected: false,name:"Can View User Sessions"
          },
          {
            id: 4, parent_id: 1, value: 'EXPORT_CHAT', isSelected: false,name:"Export Chat"
          },
          {
            id: 5, parent_id: 1, value: 'USE_DEVELOPER_OPTIONS', isSelected: false,name:"Use Developer Options"
          },
          {
            id: 6, parent_id: 1, value: 'TEST_AI_SEC', isSelected: false,name:"Test AI"
          },
          {
            id: 6, parent_id: 1, value: 'API_LOG', isSelected: false,name:"View API logs"
          }
        ]
      },
      {
        id: 5, value: 'CONFIGURE_BOT', isSelected: false, name:"Configure Bot", childList: [
          {
            id: 1, parent_id: 1, value: 'PYMENT_CONFIGURE', isSelected: false,name:"Payment Configure"
          },
          {
            id: 2, parent_id: 1, value: 'EDIT_AGENT_CHAT', isSelected: false,name:"Agent chat Setting"
          },
          {
            id: 3, parent_id: 1, value: 'UPDATE_AI_LANGUAGE', isSelected: false,name:"Update AI language"
          },
          {
            id: 4, parent_id: 1, value: 'MAP_SETTINGS', isSelected: false,name:"Map settings"
          },
          {
            id: 5, parent_id: 1, value: 'IMPORT_EXPORT_BOT', isSelected: false,name:"Import/Export Bot"
          },
          {
            id: 6, parent_id: 1, value: 'BOT_SETTINGS', isSelected: false,name:"Bot Settings"
          },
          {
            id: 6, parent_id: 1, value: 'INTEGRATIONS', isSelected: false,name:"Send Broadcast"
          }
        ]
      }
    ];
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit(): void {
    this.http.get(environment.chatBotsRoute).subscribe((data: any) => {
      this.chatBotData = data
      console.log(this.chatBotData)
    }, error => {
      console.log("There was an error generating the data from the server", error);
    })
  }
  open(content) {
    this.modalService.open(content);
  }

  //Click event on parent checkbox  
  parentCheck(parentObj) {
    for (var i = 0; i < parentObj.childList.length; i++) {
      parentObj.childList[i].isSelected = parentObj.isSelected;
    }
  }

  get ngbNavItem(){    
    this.count=(this.count+1)%7;
    return this.count;
  }

}
