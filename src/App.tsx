import React, { useState } from 'react';
import { ToolBar } from './components/ToolBar';
import { StaffList } from './components/StaffList';
import { StaffForm } from './components/StaffForm';
import { BackPanel } from './components/BackPanel';
import './App.scss';

export const App: React.FC = (): React.ReactElement => {
  const [addFormVisible, setAddFormVisible] = useState<boolean>(false);

  const toggleAddFormVisible = (): void => {
    setAddFormVisible(!addFormVisible);
  };

  return (
    <>
      {addFormVisible && (
        <BackPanel toggleAddFormVisible={toggleAddFormVisible} />
      )}
      <ToolBar toggleFormVisible={toggleAddFormVisible} />
      <div className="row">
        <div className="col s7" style={{ height: '100vh' }}>
          <StaffList />
        </div>
        <div
          className="col s5"
          style={{
            height: '100vh',
            position: 'fixed',
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: '4px solid grey',
          }}>
          <StaffForm />
        </div>
      </div>
    </>
  );
};
