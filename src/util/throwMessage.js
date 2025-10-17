/**
 * 유형 메시지 출력 및 오류 던지는 함수
 * 
 * @param type string 
 * @param Console woowacourse/mission-utils 
 * @returns Error('[Error]')
 */
export async function throwMessage(type, Console) {
  switch (type) {
    case 'NOT_END_WITH_NUMBER': {
      await Console.print('[ERROR]');
      throw Error('[ERROR]');
    }
    case 'NOT_ALLOWED_NEGATIVE': {
      await Console.print('[ERROR]');
      throw Error('[ERROR]');
    }
    case 'NOT_ALLOWED_NAN': {
      await Console.print('[ERROR]');
      throw Error('[ERROR]');
    }
    case 'ONLY_ENTER_INTEGER': {
      await Console.print('[ERROR]');
      throw Error('[ERROR]');
    }
    case 'CUSTOM_DIVISION_EMPTY': {
      await Console.print('[ERROR]');
      throw Error('[ERROR]');
    }
    case 'CUSTOM_DIVISION_NUMBER': {
      await Console.print('[ERROR]');
      throw Error('[ERROR]');
    }
    default: return '';
  }
}