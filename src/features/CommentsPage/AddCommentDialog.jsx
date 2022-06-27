import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ADD_COMMENT } from './query';
import Context from './Context';

const useStyles = makeStyles(() => ({
  modalButtonsPanel: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '12px'
  }
}));

const AddCommentDialog = ({ isOpen, onClose, subjectId }) => {
  const classes = useStyles();
  const { userId } = useParams();
  const [formState, setFormState] = useState({
    body: ''
  });
  const { refetch } = useContext(Context);

  const [addComment] = useMutation(ADD_COMMENT, {
    variables: {
      subjectId,
      clientMutationId: userId,
      ...formState
    }
  });

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Leave a comment</DialogTitle>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addComment().then(() => {
              refetch({
                subjectId,
                clientMutationId: userId,
                ...formState
              });
            });
            onClose();
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            multiline
            rows={5}
            placeholder="Leave a comment"
            onChange={(e) => {
              setFormState({
                ...formState,
                body: e.target.value
              });
            }}
          />
          <div className={classes.modalButtonsPanel}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Add comment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

AddCommentDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  subjectId: PropTypes.string.isRequired
};

export default AddCommentDialog;
