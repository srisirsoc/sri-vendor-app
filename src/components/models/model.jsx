'use client';

import React, { useContext } from 'react';
import { IconsReact } from '../../library/icons';
import './model.css';
import { Context } from '../../store/store-provider';
import Actions from '../../store/actions';

const Model = ({ children, width = 600, model_type }) => {
  const { state: { model }, dispatch } = useContext(Context);
  const closeModal = () => dispatch({ type: Actions.model, payload: [false, null] });
  if (!model[0] || model[1] !== model_type) return null;
  const is_close_button_active = model[3];
  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: width }} onClick={(e) => e.stopPropagation()} >
        {!is_close_button_active && <button className="modal-close" onClick={closeModal}>{IconsReact.Close}</button>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default React.memo(Model);
