import React from 'react';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import { Form } from './editBookModal.styled';

export default(props) => {

  const {
    open,
    onClose,
    onSave,
    data: {
      title,
      auther,
      date,
      id
    },
    onChange,
    errorMessage
  } = props;

  const actions = [ 
    <FlatButton 
      secondary 
      label="Cancel" 
      onClick={onClose} 
    />, 
    <FlatButton 
      primary 
      label="Save"
      onClick = {() => onSave(id)}/>
  ];

  return (

    <div>
      <Dialog
        title="Book Details"
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={this.handleClose}>

        <Form>
          <TextField
            name={"title"}
            value={title}
            onChange={onChange}
            floatingLabelText="title"
            errorText={errorMessage.title}
          />
          <TextField
            name={"auther"}
            value={auther}
            onChange={onChange}
            floatingLabelText="auther"
            errorText={errorMessage.auther}
          />

          <DatePicker
            name={"date"}
            onChange={onChange}
            hintText="Date Picker"
            defaultDate={date
            ? moment(date, "DD-MM-YYYY").toDate()
            : new Date()}
          />
        </Form>
      </Dialog>
    </div>
  )
};
