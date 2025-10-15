import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    // 문자 입력
    const respond = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n')
  }
}

export default App;
