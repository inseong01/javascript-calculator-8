/**
 * 숫자 추출을 위한 온전한 숫자 문자열 반환 함수
 * @param {string} respond '1,2:3'
 * @param {string} custom '1q2q3'
  */
export function trimRespondPrefix(respond, custom) {
  if (custom === 'BASE') return respond;
  return respond.substring(2 + custom.length + 2);
}