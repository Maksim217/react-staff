import { useEffect, useRef } from 'react';
import { IEmployee } from '../store/contracts/state';

export const usePrevious = (value: IEmployee[]): IEmployee[] | undefined => {
  const ref = useRef<IEmployee[]>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
