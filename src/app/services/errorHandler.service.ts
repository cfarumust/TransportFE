import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, of, Observable } from 'rxjs';

export interface ParsedError {
    message: string;
    status?: number;
    stack?: string;
}

@Injectable({
    providedIn: 'root'
})

export class ErrorHandler {
    // Handle API errors
    handleError(error: HttpErrorResponse): Observable<ParsedError> {
        let parsedError: ParsedError;

        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            parsedError = {
                message: error.message ? error.message : error.toString()
            };
        } else {
            // The backend returned an unsuccessful response.
            parsedError = {
                message: error.message ? error.message : error.toString(), status: error.status, stack: error.statusText
            };
        }

        return of(parsedError);
    }
}
