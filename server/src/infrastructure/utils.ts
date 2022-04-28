export class Utils {

  static validateBase64String(fileData: string): boolean {
    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/

    if (!base64regex.test(fileData)) {
      return false
    }

    return true
  }


}