import { Console } from "@woowacourse/mission-utils";

import { hasCustomDivision } from "./util/hasCustomDivision.js";
import { throwMessage } from "./util/throwMessage.js";
import { validateNums } from "./util/validate/validateNums.js";
import { validateInput } from "./util/validate/validateInput.js";
import { validateCustomDivision } from "./util/validate/validateCustomDivision.js";
import { extractDivisionRegx } from "./util/extractDivisionRegx.js";
import { trimRespondPrefix } from "./util/trimRespondPrefix.js";

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
   * @param {string} respond 
   * @returns {Promise<string[]>} ['1', '1', '1']
   */
  async extractNums(respond) {
    const hasCustom = hasCustomDivision(respond);

    const hasMessage = validateCustomDivision(hasCustom);
    await throwMessage(hasMessage, Console);

    const divisionRegx = extractDivisionRegx(hasCustom);
    const trimedRespond = trimRespondPrefix(respond, hasCustom);

    const csvFormatted = trimedRespond.replaceAll(divisionRegx, ',');
    const numbers = csvFormatted.split(',');

    return numbers;
  }

  /**
   * 숫자 더하기
   * @param {string[]} nums ['1', '2', '3'] 
   * @returns {Promise<number>}
   */
  async sum(nums) {
    const hasMessage = validateNums(nums);
    await throwMessage(hasMessage, Console);

    return nums.reduce((acc, cur) => acc + Number(cur), 0);
  }

  /**
   * 결과 출력
   * @param {string} result "결과 : ${result}"
   */
  async print(result) {
    await Console.print(`결과 : ${result}`);
  }

  /**
   * 문자 입력
   * @returns {Promise<string>} "1,2:3" "//q\n1q2"
   */
  async readLine() {
    const respond = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n') ?? '';

    const hasMessage = validateInput(respond);
    await throwMessage(hasMessage, Console);

    return respond;
  }
}

export default App;
