import { LocalStorage } from '../../storage/storage';
import { IEmployee } from '../contracts/state';
import {
  fetchStaffSuccess,
  fetchEmployeeSuccess,
  addEmployee,
  updateStaff,
  deleteStaff,
  updateEmployee,
  saveStaffState,
} from './actionTypes';

const localStorage: LocalStorage = new LocalStorage(window);

export function fetchStaff() {
  return (dispatch) => {
    const staff = JSON.parse(localStorage.get('staff')) || [];
    dispatch(fetchStaffSuccess(staff));
  };
}

export function fetchEmployeeById(employeeId: string) {
  return (dispatch, getState) => {
    const { staff } = getState().staff;
    const employee = staff.find((employee) => employee.id === employeeId);
    dispatch(fetchEmployeeSuccess(employee));
  };
}

export function createEmployee(employee: IEmployee) {
  return (dispatch) => {
    dispatch(addEmployee(employee));
  };
}

export function saveStaff() {
  return (dispatch, getState) => {
    const { staff } = getState().staff;
    dispatch(saveStaffState());
    localStorage.set('staff', JSON.stringify(staff));
  };
}

export function updateStaffData(
  id: string,
  name: string,
  value: string | Date | boolean,
) {
  return (dispatch, getState) => {
    const { staff } = getState().staff;
    const copyStaff = [...staff];
    const idx = copyStaff.findIndex((e) => e.id === id);
    const employeeById = copyStaff[idx];
    copyStaff[idx] = {
      ...employeeById,
      [name]: value,
    };
    dispatch(updateEmployee(copyStaff[idx]));
    dispatch(updateStaff(copyStaff));
  };
}

export function deleteEmployee(employeeId) {
  return (dispatch, getState) => {
    const { staff } = getState().staff;
    const newStaffList = staff.filter((employee) => employee.id !== employeeId);
    dispatch(deleteStaff(newStaffList));
  };
}
