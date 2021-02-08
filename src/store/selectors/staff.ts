import { createSelector } from 'reselect';
import { RootState } from '../store';
import { IStaffState } from '../contracts/state';

export const selectStaff = (state: RootState): IStaffState => state.staff;

export const selectStaffState = createSelector(
  selectStaff,
  (staff) => staff.staff,
);

export const selectEmployee = createSelector(
  selectStaff,
  (staff) => staff.employee,
);

export const selectOperationType = createSelector(
  selectStaff,
  (staff) => staff.operationType,
);
