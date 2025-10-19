import { CUSTOM_SEPARATOR_EMPTY, CUSTOM_SEPARATOR_NUMBER, ERROR_MESSAGE, NOT_ALLOWED_NAN, NOT_ALLOWED_NEGATIVE, NOT_END_WITH_NUMBER, ONLY_ALLOWED_DECIMAL, ONLY_ENTER_INTEGER } from "./const/messageType";


/**
 * 유형 메시지 출력 및 오류 던지는 함수
 * 
 * @param {string} type  
 * @param Console woowacourse/mission-utils 
  */
export async function throwMessage(type, Console) {
  switch (type) {
    case NOT_END_WITH_NUMBER: {
      await Console.print(ERROR_MESSAGE);
      throw Error(ERROR_MESSAGE);
    }
    case NOT_ALLOWED_NEGATIVE: {
      await Console.print(ERROR_MESSAGE);
      throw Error(ERROR_MESSAGE);
    }
    case NOT_ALLOWED_NAN: {
      await Console.print(ERROR_MESSAGE);
      throw Error(ERROR_MESSAGE);
    }
    case ONLY_ENTER_INTEGER: {
      await Console.print(ERROR_MESSAGE);
      throw Error(ERROR_MESSAGE);
    }
    case CUSTOM_SEPARATOR_EMPTY: {
      await Console.print(ERROR_MESSAGE);
      throw Error(ERROR_MESSAGE);
    }
    case CUSTOM_SEPARATOR_NUMBER: {
      await Console.print(ERROR_MESSAGE);
      throw Error(ERROR_MESSAGE);
    }
    case ONLY_ALLOWED_DECIMAL: {
      await Console.print(ERROR_MESSAGE);
      throw Error(ERROR_MESSAGE);
    }
    default: return;
  }
}