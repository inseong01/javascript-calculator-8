import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {

  }

  /** 문자열 검증, 메시지 출력 구현 */

  // 계산기
  async calculator() {
    const respond = await this.readLine();

    const errrorType = this.validateInput(respond);
    await this.throwMessage(errrorType);

    const nums = this.extractNums(respond);

    const result = this.sum(nums);

    await this.print(result);
  }

  // 메시지 출력
  async throwMessage(type) {
    switch (type) {
      case 'EMPTY_STRING': {
        return await this.print('0');
      }
      case 'NOT_END_WITH_NUMBER': {
        await Console.print('[ERROR]');
        throw Error();
      }
      default: return;
    }
  }

  // 문자열 검증
  validateInput(input) {
    input = input.trim();

    /**
     * 숫자 추출 전 검증
     * 
     * 1. 공백인지?
     * 2. 구분자로 끝나지 않았는지?
     */

    if (!input.length) return 'EMPTY_STRING';
    if (input.endsWith(',') || input.endsWith(':')) return 'NOT_END_WITH_NUMBER';
  }

  // 문자 숫자 추출
  extractNums(respond) {
    let numbers;
    let division = /,|:/;

    // 커스텀 문자열 판단
    const CUSTOM_START_DIVISION = '//';
    const CUSTOM_END_DIVISION = '\n';

    const isCustom = respond.includes(CUSTOM_START_DIVISION)
    if (isCustom) {
      const custom = respond.substring(2, respond.indexOf(CUSTOM_END_DIVISION));

      division = new RegExp(custom);
      respond = respond.slice(respond.indexOf(CUSTOM_END_DIVISION)).trim()
    }

    numbers = respond.split(division)

    return numbers
  }

  // 숫자 더하기
  sum(nums) {
    return nums.reduce((acc, cur) => acc + Number(cur), 0);
  }

  // 결과 출력
  async print(result) {
    await Console.print(`결과: ${result}`);
  }

  // 문자 입력
  async readLine() {
    return await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n')
  }
}

export default App;
