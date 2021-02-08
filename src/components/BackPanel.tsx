import React from 'react';
import { AddForm } from './AddForm';

interface BackPanelProps {
  toggleAddFormVisible: () => void;
}

export const BackPanel: React.FC<BackPanelProps> = ({
  toggleAddFormVisible,
}): React.ReactElement => {
  return (
    <div className="backpanel">
      <span
        style={{
          position: 'absolute',
          top: 80,
          right: 40,
          cursor: 'pointer',
          fontSize: 50,
          color: 'white',
        }}
        className="material-icons"
        onClick={toggleAddFormVisible}>
        close
      </span>
      <AddForm toggleFormVisible={toggleAddFormVisible} />
    </div>
  );
};
