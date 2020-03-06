import {Injectable} from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Gift} from '../models/gift.model';

@Injectable({providedIn: 'root'})
export class GiftService {
  eventUrl1 = '/api/gifts';

  constructor(private http: HttpClient) {
  }

  getGifts(searchStr: string): Observable<Gift[]> {
    return this.http.get<Gift[]>(this.eventUrl1).pipe(
      tap(gifts => console.log('Number of gifts: ' + gifts.length)),
      map(res => {
        return res.filter(item => item.description.toLowerCase().includes(searchStr.toLowerCase()));
      }),
      catchError(this.handleError)
    );
  }

  getGift(giftId: string): Observable<Gift> {
    return this.http.get<Gift>(this.eventUrl1 + '/' + giftId).pipe(
      tap(gift => console.log(gift.category + ' ' + gift.description + ' ' + gift.id)),
      catchError(this.handleError)
    );
  }

  getGiftByDescription(giftDescription: string): Observable<Gift> {
    return this.http.get<Gift>(this.eventUrl1 + '?description=' + giftDescription).pipe(
      tap(gift => console.log(gift.category + ' ' + gift.description + ' ' + gift.id)),
      catchError(this.handleError)
    );
  }

  addGift(gift: Gift): Observable<number> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(gift);
    return this.http.post<Gift>(this.eventUrl1 + '/' + gift.id, gift, {
        headers: httpHeaders,
        observe: 'response'
      }
    ).pipe(
      map(res => res.status),
      catchError(this.handleError)
    );
  }

  updateGift(gift: Gift): Observable<any> {
    return this.http.put(this.eventUrl1, gift);
  }

  deleteGift(gift: Gift): Observable<any> {
    return this.http.delete(this.eventUrl1 + '/' + gift.id);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }
}




