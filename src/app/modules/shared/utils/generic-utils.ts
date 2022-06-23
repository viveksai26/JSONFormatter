import { Injectable } from '@angular/core';
import { AppConstants } from '../constants/app-constants';

@Injectable({
  providedIn: 'root'
})
export class genericUtils {
  localStorageRemover() {
    localStorage.removeItem(AppConstants.FB_ACCESS_TOKEN);
    localStorage.removeItem(AppConstants.FB_AUTH_TOKEN);
    localStorage.removeItem(AppConstants.FB_ID_TOKEN);
    localStorage.removeItem(AppConstants.G_ACCESS_TOKEN);
    localStorage.removeItem(AppConstants.G_AUTH_TOKEN);
    localStorage.removeItem(AppConstants.G_ID_TOKEN);
  }
}
