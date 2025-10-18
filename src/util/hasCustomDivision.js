import { CUSTOM_END_DIVISION, CUSTOM_START_DIVISION, HAVE_BASE_DIVISION } from "./const";

/**
 * 커스텀 문자 여부 판단 및 반환 함수
 * 
 * @param {string} respond '//q\n1q2q3' '1,2:3'
 * @returns 커스텀 문자 또는 기본 구분자 판별 문자
 */
export function hasCustomDivision(respond) {
  if (!respond.startsWith(CUSTOM_START_DIVISION)) return HAVE_BASE_DIVISION;

  const lastCustomIdx = respond.indexOf(CUSTOM_END_DIVISION);

  return respond.substring(2, lastCustomIdx);
}