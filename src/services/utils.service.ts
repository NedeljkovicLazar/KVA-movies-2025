import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public formatDateTime(iso: string) {
    return new Date(iso).toLocaleString('sr-RS')
  }

  public formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('sr-RS');
}

}
