import CustomError from "./custom-error";

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
