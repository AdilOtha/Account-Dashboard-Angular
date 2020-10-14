import { OnInit, Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { DynamicTableService } from '../dynamic-table.service';
import { NgbdSortableHeader, SortEvent } from '../sortable.directive';

@Component({
  selector: 'app-bill-transaction',
  templateUrl: './bill-transaction.component.html',
  styleUrls: ['./bill-transaction.component.scss'],
  providers: [DynamicTableService]
})
export class BillTransactionComponent implements OnInit {
  title = 'Bill Transaction'
  bills$: Observable<any[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: DynamicTableService) {
    service.setApiRoute(environment.billTransactionRoute)
    service.setSearchProperty("transaction_id")
    this.bills$ = service.data$;    
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
    // this.service.sortColumn = 'transaction_id';
    // this.service.sortDirection = 'asc';
  }

}
