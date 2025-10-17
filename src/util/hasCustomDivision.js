/**
 * 커스텀 문자 여부 판단 및 반환 함수
 * 
 * @param {string} respond '//q\n1q2q3' '1,2:3'
 * @returns 커스텀 문자 또는 'BASE'
 */
export function hasCustomDivision(respond) {
  const CUSTOM_START_DIVISION = '//';
  if (!respond.startsWith(CUSTOM_START_DIVISION)) return 'BASE';

  const CUSTOM_END_DIVISION = '\\n';
  const lastCustomIdx = respond.indexOf(CUSTOM_END_DIVISION);

  return respond.substring(2, lastCustomIdx);
}