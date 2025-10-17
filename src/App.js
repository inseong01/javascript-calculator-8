import { Console } from "@woowacourse/mission-utils";

import { hasCustomDivision } from "./util/hasCustomDivision.js";
import { throwMessage } from "./util/throwMessage.js";
import { validateNums } from "./util/validate/validateNums.js";
import { validateInput } from "./util/validate/validateInput.js";
import { validateCustomDivision } from "./util/validate/validateCustomDivision.js";

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
   * 문자 숫자 추출
   * @param respond string 
   * @returns string[]
   */
  async extractNums(respond) {
    let division = /,|:/g;

    const custom = hasCustomDivision(respond);
    if (custom) {
      const hasMessage = validateCustomDivision(custom);
      await throwMessage(hasMessage, Console);

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
    const hasMessage = validateNums(nums);
    await throwMessage(hasMessage, Console);

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

    const hasMessage = validateInput(respond);
    await throwMessage(hasMessage, Console);

    return respond;
  }
}

export default App;
