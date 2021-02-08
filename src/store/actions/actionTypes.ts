import { Action } from 'redux';
import { IStaffState, IEmployee } from '../contracts/state';

export enum StaffActionType {
  FETCH_STAFF_SUCCESS = 'staff/FETCH_STAFF_SUCCESS',
  UPDATE_STAFF = 'staff/UPDATE_STAFF',
  SAVE_STAFF = 'staff/SAVE_STAFF',
}

export enum EmployeeActionType {
  ADD_EMPLOYEE = 'employee/ADD_EMPLOYEE',
  DELETE_EMPLOYEE = 'employee/DELETE_EMPLOYEE',
  FETCH_EMPLOYEE_SUCCESS = 'employee/FETCH_EMPLOYEE_SUCCESS',
  UPDATE_EMPLOYEE = 'employee/UPDATE_EMPLOYEE',
}

export enum StaffOperationType {
  ADDING = 'adding',
  DELETING = 'deleting',
  FETCH_STAFF = 'fetch_staff',
  UPDATING = 'updating',
  SAVING = 'saving',
}

export interface IAddEmployeeAction extends Action<EmployeeActionType> {
  type: EmployeeActionType.ADD_EMPLOYEE;
  payload: IEmployee;
}

export interface IUpdateStaffAction extends Action<StaffActionType> {
  type: StaffActionType.UPDATE_STAFF;
  payload: IStaffState['staff'];
}

export interface IDeleteStaffAction extends Action<EmployeeActionType> {
  type: EmployeeActionType.DELETE_EMPLOYEE;
  payload: IStaffState['staff'];
}

export interface IFetchStaffSuccessAction extends Action<StaffActionType> {
  type: StaffActionType.FETCH_STAFF_SUCCESS;
  payload: IStaffState['staff'];
}

export interface IFetchEmployeeSuccessAction
  extends Action<EmployeeActionType> {
  type: EmployeeActionType.FETCH_EMPLOYEE_SUCCESS;
  payload: IEmployee;
}

export interface IUpdateEmployeeAction extends Action<EmployeeActionType> {
  type: EmployeeActionType.UPDATE_EMPLOYEE;
  payload: IEmployee;
}

export interface ISaveStaffAction extends Action<StaffActionType> {
  type: StaffActionType.SAVE_STAFF;
}

export const addEmployee = (payload: IEmployee): IAddEmployeeAction => ({
  type: EmployeeActionType.ADD_EMPLOYEE,
  payload,
});

export const updateStaff = (
  payload: IStaffState['staff'],
): IUpdateStaffAction => ({
  type: StaffActionType.UPDATE_STAFF,
  payload,
});

export const deleteStaff = (
  payload: IStaffState['staff'],
): IDeleteStaffAction => ({
  type: EmployeeActionType.DELETE_EMPLOYEE,
  payload,
});

export const fetchStaffSuccess = (
  payload: IStaffState['staff'],
): IFetchStaffSuccessAction => ({
  type: StaffActionType.FETCH_STAFF_SUCCESS,
  payload,
});

export const saveStaffState = (): ISaveStaffAction => ({
  type: StaffActionType.SAVE_STAFF,
});

export const fetchEmployeeSuccess = (
  payload: IEmployee,
): IFetchEmployeeSuccessAction => ({
  type: EmployeeActionType.FETCH_EMPLOYEE_SUCCESS,
  payload,
});

export const updateEmployee = (payload: IEmployee): IUpdateEmployeeAction => ({
  type: EmployeeActionType.UPDATE_EMPLOYEE,
  payload,
});

export type StaffAction =
  | IAddEmployeeAction
  | IUpdateStaffAction
  | IDeleteStaffAction
  | IFetchStaffSuccessAction
  | ISaveStaffAction
  | IFetchEmployeeSuccessAction
  | IUpdateEmployeeAction;
