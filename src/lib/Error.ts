/*                                            *\
** ------------------------------------------ **
**              Sample Zip Extractor          **
** ------------------------------------------ **
**           Copyright (c) 2020               **
**             Kyle Derby MacInnis            **
**                                            **
** Any unauthorized distribution or transfer  **
**    of this work is strictly prohibited.    **
**                                            **
**           All Rights Reserved.             **
** ------------------------------------------ **
\*                                            */

// Error Response
interface ErrorResponse {
  msg: string;
  status: number;
  err: any;
}

// Error Class (Singleton)
class AppError {
  static instance: AppError;
  static errorStack: ErrorResponse[] = [];

  constructor() {
    if (AppError.instance) return AppError.instance;
    else AppError.instance = this;
  }

  // Add Error To Stack
  pushError(err: ErrorResponse): number {
    AppError.errorStack.push(err);
    return AppError.errorStack.length;
  }

  // Return Error Stack
  getErrorStack(): ErrorResponse[] {
    return AppError.errorStack;
  }

  // Format Error Object
  formatError(msg: string, status: number, data: any): ErrorResponse {
    return {
      msg,
      status,
      err: data,
    };
  }

  // Global Function
  setError(msg: string, status: number, data: any): number {
    return this.pushError(this.formatError(msg, status, data));
  }

  // Clear and Return Error Stack
  clrError(): ErrorResponse[] {
    let ret = this.getErrorStack();
    AppError.errorStack = [];
    return ret;
  }

  // Boolean has errors
  isErrored(): boolean {
    if (AppError.errorStack.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  // Send Error to Front
  sendError(cb: any) {
    let errArr = this.clrError();
    let msg = ["<h3>Error:</h3>"];
    let status = 500;
    msg.push("<ul>");
    for (let i of errArr) {
      status = i.status;
      msg.push("<li>" + JSON.stringify(i) + "</li>");
    }
    msg.push("</ul>");
    // Return Error
    cb(msg.join(""));
  }
}

export default new AppError();
