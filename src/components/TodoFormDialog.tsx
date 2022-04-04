import React, { useState, useEffect } from 'react';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid
} from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';

interface FormDialogProps {
    isModalOpen: boolean;
    closeModal: () => void;
    save: (_: unknown) => void;
}

const TodoFormDialog = ({ isModalOpen, closeModal, save }: FormDialogProps) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState<any>(new Date());

    const saveTask = (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (title == null || title?.trim() === '' || dueDate == null) {
            return;
        }

        save({
            title,
            dueDate: dueDate.getTime()
        });
        closeModal();
    }

    useEffect(() => {
        if (isModalOpen) {
            setTitle('');
            setDueDate(new Date());
        }
    }, [isModalOpen])

    return (
        <Dialog open={isModalOpen} onClose={closeModal}>
            <form onSubmit={saveTask}>
                <DialogTitle>Add new task</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 0.5 }}>
                        <Grid item xs={7}>
                            <TextField
                                autoFocus
                                label="Title"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={title}
                                onChange={(evt) => setTitle(evt.target.value)}
                            />
                        </Grid>

                        <Grid item xs={5}>
                            <DateTimePicker
                                label="Due Date"
                                value={dueDate}
                                onChange={(newDateValue) => setDueDate(newDateValue)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
};

export default TodoFormDialog;
