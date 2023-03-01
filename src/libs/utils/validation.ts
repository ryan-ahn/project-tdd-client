/**
 * Author : Ryan
 * Date : 2023-02-26
 * Desc : validation
 */

// 날짜 가공 (YYYY.MM.DD TT:MM:SS)
export const validateDate = (date: string) => {
  const validateDateArray = date.split('T')[0].split('-');
  const validateTimeItem = date.split('T')[1].split('.')[0];
  return validateDateArray.join('.') + ' ' + validateTimeItem;
};
