import { Console } from "@woowacourse/mission-utils";
import { hasCustomDivision } from "./util/hasCustomDivision.js";

class App {
  async run() {
    try {
      await this.calculator();
      // await this.run();
    } catch (err) {
      throw Error(err);
    }
  }

  /**
   * 계산기
   */
  async calculator() {
    const respond = await this.readLine();

    const nums = await this.extractNums(respond);

    const result = await this.sum(nums);

    await this.print(result);
  }

  /**
  * 메시지 출력
  * @param type string 
  * @returns string
  */
  async throwMessage(type) {
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

  /**
   * 커스텀 구분자 검증
   * @param division string 
   * @return string
   */
  validateCustomDivision(division) {
    /**
     * 커스텀 구분자
     * 
     * 1. 구분자가 존재하는지?
     * 2. 공백 구분인지?
     * 3. 숫자가 아닌지?
     */

    if (!division) return 'CUSTOM_DIVISION_EMPTY';

    if (!division.trim()) return '';

    const isNaN = Number.isNaN(Number(division));
    if (!isNaN) return 'CUSTOM_DIVISION_NUMBER';

    return '';
  }

  /**
   * 문자 유형 숫자 배열 검증
   * @param nums string[] 
   * @returns string
   */
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
    if (hasNaN) return 'NOT_ALLOWED_NAN';

    const isInteger = nums.every((num) => Number.isInteger(num));
    if (!isInteger) return 'ONLY_ENTER_INTEGER';

    return '';
  }

  /**
   * 사용자 입력 검증 
   * @param input string 
   * @returns string
   */
  validateInput(input) {
    input = input?.trim() ?? '';

    /**
     * 사용자 입력
     * 
     * 1. 공백인지?
     * 2. 구분자로 끝나지 않았는지?
     */

    if (!input) return '';

    if (input.endsWith(',') || input.endsWith(':')) return 'NOT_END_WITH_NUMBER';

    return '';
  }

  /**
   * 문자 숫자 추출
   * @param respond string 
   * @returns string[]
   */
  async extractNums(respond) {
    let division = /,|:/g;

    const custom = hasCustomDivision(respond);
    if (custom) {
      const hasMessage = this.validateCustomDivision(custom);
      await this.throwMessage(hasMessage);

      division = new RegExp(custom, 'g');
      respond = respond.substring(2 + custom.length + 2);
    }

    const csvFormatted = respond.replaceAll(division, ',');
    const numbers = csvFormatted.split(',');

    return numbers
  }

  /**
   * 숫자 더하기
   * @param nums string[] 
   * @returns number
   */
  async sum(nums) {
    const errorType = this.validateNums(nums);
    await this.throwMessage(errorType);

    return nums.reduce((acc, cur) => acc + Number(cur), 0);
  }

  /**
   * 결과 출력
   * @param result string 
   */
  async print(result) {
    await Console.print(`결과 : ${result}`);
  }

  /**
   * 문자 입력
   * @returns string
   */
  async readLine() {
    const respond = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n') ?? '';

    const errorType = this.validateInput(respond);
    await this.throwMessage(errorType);

    return respond;
  }
}

export default App;
