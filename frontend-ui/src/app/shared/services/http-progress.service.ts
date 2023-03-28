import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpProgressService {
  private progressDataSource = new BehaviorSubject(false);

  progressCheck = this.progressDataSource.asObservable();

  constructor() {}

  updateProgressCheck(isLoading: boolean): void {
    this.progressDataSource.next(isLoading);
  }
}
