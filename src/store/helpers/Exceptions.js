/**
 * global exception for error
 * @param code - http error code - mandatory
 * @param message - string - optional
 */

export function httpException(code, message='', abort = false)
{
  switch (code) {
  case 201 :
    return {
      meta : {
        message: message ? message : 'konten berhasil dibuat',
        code: 201
      }
    }
  case 204 :
    return {
      meta : {
        message: message ? message : 'tidak ada data',
        code: 204
      }
    }
  case 403 :
    return {
      meta : {
        message: message ? message : 'forbidden access',
        code: 403
      }
    }
  case 500 :
  default :
    return {
      meta : {
        message: message ? message : 'internal server error',
        code
      }
    }
  }
}
