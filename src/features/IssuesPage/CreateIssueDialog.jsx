import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { CREATE_ISSUE } from './query';
import Context from './Context';

const useStyles = makeStyles(() => ({
  modalButtonsPanel: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '12px'
  }
}));

const CreateIssueDialog = ({ isOpen, onClose, repositoryId }) => {
  const classes = useStyles();
  const { refetch } = useContext(Context);
  const [formState, setFormState] = useState({
    title: '',
    body: ''
  });

  const [createIssue] = useMutation(CREATE_ISSUE, {
    variables: {
      repositoryId,
      ...formState
    }
  });

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Create new issue</DialogTitle>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createIssue().then(() => {
              refetch({
                repositoryId,
                ...formState
              });
            });
            onClose();
          }}
        >
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            placeholder="Title"
            style={{ marginBottom: '8px' }}
            onChange={(e) => {
              setFormState({
                ...formState,
                title: e.target.value
              });
            }}
          />
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
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

CreateIssueDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  repositoryId: PropTypes.string.isRequired
};

export default CreateIssueDialog;
