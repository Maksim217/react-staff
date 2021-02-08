import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, fetchStaff, saveStaff } from '../store/actions/staff';
import {
  selectEmployee,
  selectStaffState,
  selectOperationType,
} from '../store/selectors/staff';
import { StaffOperationType } from '../store/actions/actionTypes';
import { usePrevious } from '../hooks/prev.hook';

interface ToolBarProps {
  toggleFormVisible: () => void;
}

export const ToolBar: React.FC<ToolBarProps> = ({
  toggleFormVisible,
}): React.ReactElement => {
  const clsDeleteBtn: string[] = ['waves-effect waves-light btn  red darken-4'];
  const clsSaveBtn: string[] = ['waves-effect waves-light btn'];

  const dispatch = useDispatch();
  const employee = useSelector(selectEmployee);
  const staff = useSelector(selectStaffState);
  const operationType = useSelector(selectOperationType);
  const prevStaff = usePrevious(staff);

  const prevStaffJson = JSON.stringify(prevStaff);
  const staffJson = JSON.stringify(staff);

  if (!employee) {
    clsDeleteBtn.push('disabled');
  }

  if (
    (prevStaffJson === '[]' && staffJson === '[]') ||
    prevStaffJson === undefined ||
    operationType === StaffOperationType.SAVING ||
    operationType === StaffOperationType.FETCH_STAFF ||
    (prevStaffJson === staffJson && operationType === '')
  ) {
    clsSaveBtn.push('disabled');
  }

  const handlerAddEmployee = () => {
    toggleFormVisible();
  };

  const handlerDeleteEmployee = () => {
    dispatch(deleteEmployee(employee?.id));
  };

  const handlerSaveEmployee = () => {
    dispatch(saveStaff());
  };

  const handlerUpdateStaff = () => {
    if (!clsSaveBtn.includes('disabled')) {
      if (window.confirm('Все внесенные изменения будут потеряны!')) {
        dispatch(fetchStaff());
      }
    } else {
      dispatch(fetchStaff());
    }
  };

  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper blue darken-1">
          <ul className="left hide-on-med-and-down">
            <li>
              <a className={clsSaveBtn.join(' ')} onClick={handlerSaveEmployee}>
                <span className="left material-icons">save</span>
                Сохранить изменения
              </a>
            </li>
            <li>
              <a
                className="waves-effect waves-light btn"
                onClick={handlerUpdateStaff}>
                <span className="left material-icons">update</span>Обновить
                данные
              </a>
            </li>
            <li>
              <a
                className={clsDeleteBtn.join(' ')}
                onClick={handlerDeleteEmployee}>
                <span className="left material-icons">delete</span>Удалить
                выбранного сотрудника
              </a>
            </li>
            <li>
              <a
                className="waves-effect waves-light btn"
                onClick={handlerAddEmployee}>
                <span className="left material-icons">note_add</span>Добавить
                нового сотрудника
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
