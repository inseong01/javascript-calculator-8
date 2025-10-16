import { Console } from "@woowacourse/mission-utils";
import { hasCustomDivision } from "./util/hasCustomDivision";

class App {
  async run() {

  }

  // 계산기
  async calculator() {
    const respond = await this.readLine();

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

  // 숫자 검증
  validateNums(nums) {
    nums = nums.map(num => Number(num));

    /**
     * 숫자 배열 검증
     * 
     * 1. 음수인지?
     * 2. NaN인지?
     * 3. 정수인지?
     */

    const hasNegative = nums.some((num) => Math.sign(num) === -1);
    if (hasNegative) return 'NOT_ALLOWED_NEGATIVE';

    const hasNaN = nums.some((num) => Number.isNaN(num));
    if (hasNaN) return 'NOT_ALLOWED_NaN';

    const isInteger = nums.every((num) => Number.isInteger(num));
    if (!isInteger) return 'ONLY_ENTER_INTEGER';

    return '';
  }

  // 사용자 입력 검증
  validateInput(input) {
    input = input.trim();

    /**
     * 사용자 입력
     * 
     * 1. 공백인지?
     * 2. 구분자로 끝나지 않았는지?
     */

    if (!input.length) return 'EMPTY_STRING';

    if (input.endsWith(',') || input.endsWith(':')) return 'NOT_END_WITH_NUMBER';

    return '';
  }

  // 문자 숫자 추출
  extractNums(respond) {
    let numbers;
    let division = /,|:/;

    // 커스텀 문자열 판단
    const CUSTOM_START_DIVISION = '//';
    const CUSTOM_END_DIVISION = '\n';

    const custom = hasCustomDivision(respond);
    if (custom) {
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
    const respond = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

    const errrorType = this.validateInput(respond);
    await this.throwMessage(errrorType);

    return respond;
  }
}

export default App;
