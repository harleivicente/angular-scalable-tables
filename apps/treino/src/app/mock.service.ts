import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Person {
  id: number,
  nome: string,
  cpf: string,
  idade: number
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
    const delay = 150;
    return new Observable(observer => {
      setTimeout(() => {
        const result = {
          ...filter,
          totalPages: 4,
          data: makeListOfRandomPeople(filter.pageSize)
        };

        observer.next(result);
        observer.complete();
      }, delay);
    })
  }

}

function makeListOfRandomPeople(number) {
  const result = [];
  for (let index = 0; index < number; index++) {
    result.push(makeRandomPerson());
  }
  return result;
}

function makeRandomPerson(): Person {
  return {
    cpf: '124.234.423-45',
    id: random(),
    idade: random(),
    nome: `Person #${random()}`
  }
}

function random() {
  return Math.trunc(Math.random() * 10000);
}