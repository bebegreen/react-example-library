import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default(props) => {

  const {open, onClose, onConfirm} = props;
  const actions = [ 
    <FlatButton 
      secondary 
      label="Cancel" 
      onClick = {onClose} 
    />, 
    <FlatButton 
      primary 
      label="Delete" 
      onClick = {onConfirm} 
    />
  ];

  return (

    <div>
      <Dialog
        title="Delete Book?"
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={this.handleClose}
        contentStyle={{width: '35%'}}
      />
    </div>
  )
};
