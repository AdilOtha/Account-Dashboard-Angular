import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';


import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortable.directive';
import { HttpClient } from '@angular/common/http';

// interface SearchResult {
//   bills: BillTransaction[];
//   total: number;
// }

interface State {
  rows: number
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

// const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

// function sort(bills: BillTransaction[], column: SortColumn, direction: string): BillTransaction[] {
//   if (direction === '' || column === '') {
//     //console.log(direction + " " + column)
//     return bills;
//   } else {
//     bills = bills.sort((a, b) => {
//       const res = compare(`${a[column]}`, `${b[column]}`);
//       return direction === 'asc' ? res : -res;
//     });
//     return bills;
//   }
// }


//SEARCH FUNCTION
function matches(record: any, property: string, term: string) {
  // console.log(bill.transaction_id.includes(term))  
  console.log(record[property])
  return record[property].startsWith(term);
  // || pipe.transform(bill.area).includes(term)
  // || pipe.transform(bill.population).includes(term);
}

@Injectable({ providedIn: 'root' })
export class DynamicTableService {
  private apiRoute: string
  private searchProperty: string
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _getData$ = new Subject<void>();
  private _search$ = new Subject<void>();

  //response data
  private _data$ = new BehaviorSubject<any[]>([]);
  //response data count
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    rows: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, private http: HttpClient) {

    // GET DATA PIPE
    this._getData$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._getData()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      console.log(result)
      let total = result[0].rowcount;
      this._data$.next(result);
      this._total$.next(total);
    });

    //SEARCH PIPE
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      //filter
      result = result.filter(record => {
        const { searchTerm } = this._state
        return matches(record, this.searchProperty, searchTerm)
      });
      console.log(result)
      this._total$.next(result.length)
      //paginate
      const { pageSize, page } = this._state;
      result = result.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      console.log(result)
      this._data$.next(result)

    });

    this._getData$.next();

  }

  get data$() { return this._data$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    console.log(this._state)
    if (this._state.searchTerm.length == 0) {
      this._getData$.next();
    }
    else
      this._search$.next();
  }

  private _getData(): Observable<any> {
    //Get Data from Server    
    //console.log((this._state.page - 1) * this._state.pageSize)    
    let limitParams: string = "?rows=" + this._state.pageSize + "&offset=" + (this._state.page - 1) * this._state.pageSize;
    if (this._state.sortColumn.length > 0 && this._state.sortDirection.length > 0) {
      let sortParams: string = "&sortCol=" + this._state.sortColumn + "&orderby=" + this._state.sortDirection;
      return this.http.get(this.apiRoute + limitParams + sortParams)
    }
    else
      return this.http.get(this.apiRoute + limitParams)
  }

  private _search(): Observable<any> {
    //console.log(this._state.sortDirection)    
    if (this._state.sortColumn.length > 0 && this._state.sortDirection.length > 0) {
      let sortParams: string = "?sortCol=" + this._state.sortColumn + "&orderby=" + this._state.sortDirection;
      return this.http.get(this.apiRoute + sortParams)
    }
    else
      return this.http.get(this.apiRoute)
  }

  setApiRoute(api: string): void {
    this.apiRoute = api;
  }

  setSearchProperty(str: string) {
    this.searchProperty = str;
  }
}
