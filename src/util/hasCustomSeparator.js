import { CUSTOM_END_SEPARATOR, CUSTOM_START_SEPARATOR, DEFAULT_SEPARATOR } from "./const/index.js";

/**
 * 커스텀 문자 여부 판단 및 반환 함수
 * 
 * @param {string} respond '//q\n1q2q3' '1,2:3'
 * @returns 커스텀 문자 또는 기본 구분자 판별 문자
 */
export function hasCustomSeparator(respond) {
  if (!respond.startsWith(CUSTOM_START_SEPARATOR)) return DEFAULT_SEPARATOR;

  const lastCustomIdx = respond.indexOf(CUSTOM_END_SEPARATOR);

  return respond.substring(2, lastCustomIdx);
}