import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Person {
  id: number,
  nome: string,
  cpf: string,
}

interface Result<T> {
  pageSize: number;
  totalPages: number;
  currentPage: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  data: T[];
}

export interface Filter {
  pageSize: number;
  currentPage: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() {}

  getPeople(filter: Filter): Observable<Result<Person>> {
    const delay = Math.trunc(Math.random() * 1);
    return new Observable(observer => {
      setTimeout(() => {
        const result = {
          ...filter,
          totalPages: 4,
          data: [{
            id: 1,
            nome: `Person 1`,
            cpf: '343.334.321-43'
          }]
        };

        observer.next(result);
        observer.complete();
      }, delay);
    })
  }



}
