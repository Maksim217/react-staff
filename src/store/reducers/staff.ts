import {
  StaffAction,
  StaffActionType,
  EmployeeActionType,
  StaffOperationType,
} from '../actions/actionTypes';
import { IStaffState } from '../contracts/state';

const initialStaffState: IStaffState = {
  staff: [],
  employee: undefined,
  operationType: '',
};

export function staffReducer(state = initialStaffState, action: StaffAction) {
  switch (action.type) {
    case EmployeeActionType.ADD_EMPLOYEE:
      return {
        ...state,
        staff: [...state.staff, action.payload],
        employee: action.payload,
        operationType: StaffOperationType.ADDING,
      };
    case EmployeeActionType.DELETE_EMPLOYEE:
      return {
        ...state,
        staff: action.payload,
        employee: undefined,
        operationType: StaffOperationType.DELETING,
      };
    case EmployeeActionType.FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employee: action.payload,
      };
    case StaffActionType.FETCH_STAFF_SUCCESS:
      return {
        ...state,
        staff: action.payload,
        employee: undefined,
        operationType: StaffOperationType.FETCH_STAFF,
      };
    case StaffActionType.UPDATE_STAFF:
      return {
        ...state,
        staff: action.payload,
        operationType: StaffOperationType.UPDATING,
      };
    case StaffActionType.SAVE_STAFF:
      return {
        ...state,
        operationType: StaffOperationType.SAVING,
      };
    case EmployeeActionType.UPDATE_EMPLOYEE:
      return {
        ...state,
        employee: action.payload,
      };
    default:
      return state;
  }
}
