import { IEmployee } from '../store/contracts/state';
import { ISelectOptions } from './contracts/selectOptions';

export const debounce = <F extends (...args: any) => any>(
  func: F,
  waitFor: number,
) => {
  let timeout: number = 0;

  const debounced = (...args: any) => {
    clearTimeout(timeout);
    setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export function isDisabled(employee: IEmployee | undefined): boolean {
  return !employee ? true : false;
}

export function setDefaultValue(
  operationType: string | undefined,
  employee: IEmployee,
  key: string,
) {
  if (key === 'DOB') {
    return operationType !== 'deleting'
      ? new Date(`${employee[key]}`)
      : new Date();
  }
  return operationType !== 'deleting' ? employee[key] : '';
}

export function getSelectOptions(): ISelectOptions[] {
  return [
    { label: 'Системный администратор', value: 'system_administrator' },
    { label: 'Программист', value: 'programmer' },
    { label: 'Директор по ИТ', value: 'it_director' },
    { label: 'Тестировщик', value: 'tester' },
  ];
}

export function getLabelPosition(
  positionList: ISelectOptions[],
  key: string,
): string {
  const position = positionList.find((p) => p.value === key);
  return position ? position.label : '';
}
