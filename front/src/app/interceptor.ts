//essai qui permetteait d'intercepter toutes les requêtes http faite depuis le serveur front et désactiver 
//l'utilisation du cache par le naviguateur :

/* import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor () {}
intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    const authReq = req.clone({
      // Prevent caching in IE, in particular IE11.
      // See: https://support.microsoft.com/en-us/help/234067/how-to-prevent-caching-in-internet-explorer
      setHeaders: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
      }
      
    });
    return next.handle(authReq);
  }
}
 */