import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import { createEmployee } from '../store/actions/staff';
import { IEmployee } from '../store/contracts/state';
import { getSelectOptions } from '../utils/utils';
import { ISelectOptions } from '../utils/contracts/selectOptions';

interface AddFormProps {
  toggleFormVisible: () => void;
}

export const AddForm: React.FC<AddFormProps> = ({
  toggleFormVisible,
}): React.ReactElement => {
  const dispatch = useDispatch();
  const filterRef = useRef(null);
  registerLocale('ru', ru);
  const [newEmployee, setNewEmployee] = useState<IEmployee>({
    id: '',
    firstName: '',
    surName: '',
    middleName: '',
    position: '',
    DOB: new Date(),
    gender: 'M',
    fired: false,
  });

  useEffect(() => {
    window.M.FormSelect.init(filterRef.current!);
  }, []);

  const selectOptions: ISelectOptions[] = getSelectOptions();

  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const newEmployeeData: IEmployee = {
      id: Date.now().toString(),
      firstName: newEmployee.firstName,
      surName: newEmployee.surName,
      middleName: newEmployee.middleName,
      position: newEmployee.position,
      DOB: newEmployee.DOB,
      gender: newEmployee.gender,
      fired: newEmployee.fired,
    };

    dispatch(createEmployee(newEmployeeData));
    toggleFormVisible();
  };

  const handlerChangeEmployeeData = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setNewEmployee({
      ...newEmployee,
      [event.target.name]: event.target.value,
    });
  };

  const handlerSelectPosition = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setNewEmployee({
      ...newEmployee,
      position: event.target.value,
    });
  };

  const handlerChangeGender = (
    event: React.ChangeEvent<HTMLDivElement>,
  ): void => {
    setNewEmployee({ ...newEmployee, gender: event.target.id });
  };

  const handleDateChange = (date) => {
    setNewEmployee({
      ...newEmployee,
      DOB: date,
    });
  };

  const handleFiredChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee({
      ...newEmployee,
      fired: event.target.checked,
    });
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="card-title">Добавить нового сотрудника</div>
        <form onSubmit={submitHandler}>
          <div id="addEmooyee" className="col s6 offset-s3">
            <div className="input-field">
              <input
                id="surName"
                type="text"
                name="surName"
                className="validate"
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
                onChange={handlerChangeEmployeeData}
                required
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
                onChange={handlerChangeEmployeeData}
                required
              />
              <label htmlFor="middleName">Отчество</label>
              <span
                className="helper-text"
                data-error="Отчество обязательно для заполнения"></span>
            </div>
            <div className="input-field">
              <select ref={filterRef} onChange={handlerSelectPosition}>
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
                selected={
                  newEmployee && newEmployee.DOB
                    ? new Date(newEmployee.DOB)
                    : new Date()
                }
                onChange={handleDateChange}
              />
            </div>
            <div className="input-field">
              <div onChange={handlerChangeGender}>
                <label>
                  <input id="М" name="gender" type="radio" defaultChecked />
                  <span>М</span>
                </label>
                <label>
                  <input id="Ж" name="gender" type="radio" />
                  <span>Ж</span>
                </label>
              </div>
            </div>
            <div className="input-field">
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  onChange={handleFiredChnage}
                />
                <span>Уволен</span>
              </label>
            </div>
            <div className="form_action-block">
              <button className="btn" type="submit">
                Добавить
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
