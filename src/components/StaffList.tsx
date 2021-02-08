import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectStaffState,
  selectOperationType,
} from '../store/selectors/staff';
import { StaffOperationType } from '../store/actions/actionTypes';
import { fetchEmployeeById, fetchStaff } from '../store/actions/staff';

export const StaffList: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const staff = useSelector(selectStaffState);
  const operationType = useSelector(selectOperationType);

  const [activeItem, setActiveItem] = useState<number>(-1);

  useEffect(() => {
    dispatch(fetchStaff());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (operationType === StaffOperationType.ADDING) {
      setActiveItem(staff.length - 1);
    } else if (operationType === StaffOperationType.FETCH_STAFF) {
      setActiveItem(-1);
    }
  }, [operationType, staff]);

  const handleSelectItem = (idx: number, id: string) => {
    setActiveItem(idx);
    dispatch(fetchEmployeeById(id));
  };

  if (!staff.length) {
    return <h1>Список пользователей пуст</h1>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Отчество</th>
        </tr>
      </thead>

      <tbody>
        {staff.map((employee, idx) => (
          <tr
            key={employee.surName + idx}
            className={activeItem === idx ? 'active' : ''}
            onClick={() => handleSelectItem(idx, employee.id)}>
            <td>{employee.surName}</td>
            <td>{employee.firstName}</td>
            <td>{employee.middleName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
