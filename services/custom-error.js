
class CustomErrorHandler {
    status ;
    message;
  
    constructor(status , msg) {
      this.status = status;
      this.message = msg;
    }
  
    static alreadyExist(message) {
      return new CustomErrorHandler(409, message);
    }
  
    static wrongCredentials(message = "Wrong password!") {
      return new CustomErrorHandler(401, message);
    }
  
    static unAuthorized(message = "unAuthorized") {
      return new CustomErrorHandler(401, message);
    }
  
    static tokenExpired(message = "Token is expired") {
      return new CustomErrorHandler(401, message);
    }
  
    static notFound(message = "404 Not Found") {
      return new CustomErrorHandler(404, message);
    }
  
    static serverError(message = "Internal server error") {
      return new CustomErrorHandler(500, message);
    }
  
    static customError(status , message) {
      return new CustomErrorHandler(status, message);
    }
  }
  
  export default CustomErrorHandler;
  