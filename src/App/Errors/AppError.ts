class AppError {
  public readonly dataObj: object
  public readonly message: string
  public readonly statusCode: number

  constructor(dataObj: object, message: string, statusCode = 400) {
    this.dataObj = dataObj
    this.message = message
    this.statusCode = statusCode
  }
}

export default AppError
