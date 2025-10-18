import { HAVE_BASE_DIVISION } from "./const";

/**
 * 숫자 추출을 위한 온전한 숫자 문자열 반환 함수
 * @param {string} respond '1,2:3'
 * @param {string} division '1q2q3'
  */
export function trimRespondPrefix(respond, division) {
  if (division === HAVE_BASE_DIVISION) return respond;
  return respond.substring(2 + division.length + 2);
}