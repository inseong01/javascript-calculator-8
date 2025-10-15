import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLineAsyncSpy = () => {
  const lineSpy = jest.spyOn(MissionUtils.Console, "readLineAsync");
  lineSpy.mockClear();
  return lineSpy;
};

describe("문자열 계산기 기능", () => {
  test('문자 입력, 기본 상태 메시지 출력', async () => {
    // keeping Jest from exiting error: 입력 유지 해제 목적
    const inputs = [" "];
    mockQuestions(inputs);

    const lineSpy = getLineAsyncSpy();
    const props = "덧셈할 문자열을 입력해 주세요.\n";

    const app = new App();
    await app.run()

    expect(lineSpy).toHaveBeenCalledWith(props)
  })

});
