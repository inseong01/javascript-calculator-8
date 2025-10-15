import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {

  }

  // 계산기
  async calculator() {
    const respond = await this.readLine();

    await this.validateInput(respond);

    const nums = this.extractNums(respond);

    const result = this.sum(nums);

    await this.print(result);
  }

  // 문자열 검증
  async validateInput(input) {
    if (!input.length) return await this.print('0')
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
