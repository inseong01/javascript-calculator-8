import { DEFAULT_SEPARATOR } from "./const";

/**
 * 숫자 추출을 위한 온전한 숫자 문자열 반환 함수
 * @param {string} respond '1,2:3'
 * @param {string} separator '1q2q3'
  */
export function trimRespondPrefix(respond, separator) {
  if (separator === DEFAULT_SEPARATOR) return respond;
  return respond.substring(2 + separator.length + 2);
}