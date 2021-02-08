import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import { selectEmployee, selectOperationType } from '../store/selectors/staff';
import { IEmployee } from '../store/contracts/state';
import { updateStaffData } from '../store/actions/staff';
import {
  debounce,
  isDisabled,
  setDefaultValue,
  getSelectOptions,
  getLabelPosition,
} from '../utils/utils';
import { ISelectOptions } from '../utils/contracts/selectOptions';

export const StaffForm: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const filterRef = useRef(null);
  const employee = useSelector(selectEmployee);
  const operationType = useSelector(selectOperationType);
  registerLocale('ru', ru);

  const [updateEmployeeData, setUpdateEmployeeData] = useState<IEmployee>({
    id: '',
    firstName: '',
    surName: '',
    middleName: '',
    position: '',
    DOB: new Date(),
    gender: 'M',
    fired: false,
  });

  const selectOptions: ISelectOptions[] = getSelectOptions();

  const handlerChangeEmployeeData = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setUpdateEmployeeData({
      ...updateEmployeeData,
      [event.target.name]: event.target.value,
    });
    debounce(
      dispatch(
        updateStaffData(
          updateEmployeeData.id,
          event.target.name,
          event.target.value,
        ),
      ),
      500,
    );
  };

  const handlerSelectPosition = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setUpdateEmployeeData({
      ...updateEmployeeData,
      position: event.target.value,
    });
    dispatch(
      updateStaffData(updateEmployeeData.id, 'position', event.target.value),
    );
  };

  const handleDateChange = (date) => {
    setUpdateEmployeeData({
      ...updateEmployeeData,
      DOB: date,
    });
    dispatch(updateStaffData(updateEmployeeData.id, 'DOB', date));
  };

  const handleFiredChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateEmployeeData({
      ...updateEmployeeData,
      fired: event.target.checked,
    });
    dispatch(
      updateStaffData(updateEmployeeData.id, 'fired', event.target.checked),
    );
  };

  useEffect(() => {
    if (employee) {
      setUpdateEmployeeData({ ...employee });
    }
    window.M.updateTextFields();
    window.M.FormSelect.init(filterRef.current!, {});
  }, [employee]);

  return (
    <div id="selectedEmployee" className="col s6 offset-s3">
      <div className="input-field">
        <input
          id="surName"
          type="text"
          name="surName"
          className="validate"
          value={
            employee
              ? setDefaultValue(operationType, employee, 'surName')
              : setDefaultValue(operationType, updateEmployeeData, 'surName')
          }
          disabled={isDisabled(employee)}
          onChange={handlerChangeEmployeeData}
          required
        />
        <label htmlFor="surName">Фамилия</label>
        <span
          className="helper-text"
          data-error="Фамилия обязательна для заполнения"></span>
      </div>
      <div className="input-field">
        <input
          id="firstName"
          type="text"
          name="firstName"
          className="validate"
          disabled={isDisabled(employee)}
          onChange={handlerChangeEmployeeData}
          required
          value={
            employee
              ? setDefaultValue(operationType, employee, 'firstName')
              : setDefaultValue(operationType, updateEmployeeData, 'firstName')
          }
        />
        <label htmlFor="firstName">Имя</label>
        <span
          className="helper-text"
          data-error="Имя обязательно для заполнения"></span>
      </div>
      <div className="input-field">
        <input
          id="middleName"
          type="text"
          name="middleName"
          className="validate"
          disabled={isDisabled(employee)}
          value={
            employee
              ? setDefaultValue(operationType, employee, 'middleName')
              : setDefaultValue(operationType, updateEmployeeData, 'middleName')
          }
          onChange={handlerChangeEmployeeData}
          required
        />
        <label htmlFor="middleName">Отчество</label>
        <span
          className="helper-text"
          data-error="Отчество обязательно для заполнения"></span>
      </div>
      <div className="input-field">
        <select
          ref={filterRef}
          onChange={handlerSelectPosition}
          disabled={isDisabled(employee)}
          value={
            employee
              ? getLabelPosition(selectOptions, employee.position)
              : getLabelPosition(selectOptions, updateEmployeeData.position)
          }>
          <option>
            {employee
              ? getLabelPosition(selectOptions, employee.position)
              : getLabelPosition(selectOptions, updateEmployeeData.position)}
          </option>
          {selectOptions.map((p, idx) => (
            <option key={idx + p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <label>Должность</label>
      </div>
      <div className="input-field">
        <DatePicker
          locale="ru"
          dateFormat="dd.MM.yyyy"
          selected={setDefaultValue(operationType, updateEmployeeData, 'DOB')}
          disabled={isDisabled(employee)}
          onChange={handleDateChange}
        />
      </div>
      <div className="input-field">
        <div>
          <label>
            <input
              id="М"
              name="gender"
              type="radio"
              checked={updateEmployeeData.gender === 'M'}
              disabled
            />
            <span>М</span>
          </label>
          <label>
            <input
              id="Ж"
              name="gender"
              type="radio"
              checked={updateEmployeeData.gender === 'Ж'}
              disabled
            />
            <span>Ж</span>
          </label>
        </div>
      </div>
      <div className="input-field">
        <label>
          <input
            type="checkbox"
            className="filled-in"
            disabled={isDisabled(employee)}
            checked={updateEmployeeData.fired}
            onChange={handleFiredChnage}
          />
          <span>Уволен</span>
        </label>
      </div>
    </div>
  );
};
