import { CUSTOM_SEPARATOR_EMPTY, CUSTOM_SEPARATOR_NOT_ALLOWED_NUMBER, ERROR_MESSAGE, NOT_ALLOWED_NAN, NOT_ALLOWED_NEGATIVE, NOT_END_WITH_SEPARATOR, ONLY_ALLOWED_DECIMAL, ONLY_ENTER_INTEGER } from "./const/messageType.js";


/**
 * 유형 메시지 출력 및 오류 던지는 함수
 * 
 * @param {string} type  
 * @param Console woowacourse/mission-utils 
  */
export async function throwMessage(type, Console) {
  switch (type) {
    case NOT_END_WITH_SEPARATOR: {
      await Console.print(ERROR_MESSAGE.NOT_END_WITH_SEPARATOR);
      throw Error(ERROR_MESSAGE.NOT_END_WITH_SEPARATOR);
    }
    case NOT_ALLOWED_NEGATIVE: {
      await Console.print(ERROR_MESSAGE.NOT_ALLOWED_NEGATIVE);
      throw Error(ERROR_MESSAGE.NOT_ALLOWED_NEGATIVE);
    }
    case NOT_ALLOWED_NAN: {
      await Console.print(ERROR_MESSAGE.NOT_ALLOWED_NAN);
      throw Error(ERROR_MESSAGE.NOT_ALLOWED_NAN);
    }
    case ONLY_ENTER_INTEGER: {
      await Console.print(ERROR_MESSAGE.ONLY_ENTER_INTEGER);
      throw Error(ERROR_MESSAGE.ONLY_ENTER_INTEGER);
    }
    case CUSTOM_SEPARATOR_EMPTY: {
      await Console.print(ERROR_MESSAGE.CUSTOM_SEPARATOR_EMPTY);
      throw Error(ERROR_MESSAGE.CUSTOM_SEPARATOR_EMPTY);
    }
    case CUSTOM_SEPARATOR_NOT_ALLOWED_NUMBER: {
      await Console.print(ERROR_MESSAGE.CUSTOM_SEPARATOR_NOT_ALLOWED_NUMBER);
      throw Error(ERROR_MESSAGE.CUSTOM_SEPARATOR_NOT_ALLOWED_NUMBER);
    }
    case ONLY_ALLOWED_DECIMAL: {
      await Console.print(ERROR_MESSAGE.ONLY_ALLOWED_DECIMAL);
      throw Error(ERROR_MESSAGE.ONLY_ALLOWED_DECIMAL);
    }
    default: return;
  }
}