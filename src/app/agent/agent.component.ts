import { Component, OnInit, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { DynamicTableService } from '../dynamic-table.service';
import { NgbdSortableHeader, SortEvent } from '../sortable.directive';


@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss'],
  providers: [DynamicTableService]
})
export class AgentComponent implements OnInit {

  title='Agent'
  data$: Observable<any[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: DynamicTableService) {
    service.setApiRoute(environment.agentsRoute)
    service.setSearchProperty("agent_name")
    this.data$ = service.data$;
    //console.log(this.bills$)
    this.total$ = service.total$;
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
    // this.service.sortColumn="last_modified_date";
    // this.service.sortDirection = 'asc';
  }

}
