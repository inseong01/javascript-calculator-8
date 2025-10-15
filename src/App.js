import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    // 문자 입력
    const respond = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n')

    // 결과 출력
    await Console.print(`결과: ${respond}`);
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
}

export default App;
