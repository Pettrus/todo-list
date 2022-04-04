import React, { useEffect, useState } from 'react';
import {
    Container, Button, IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/lab';
import TodoFormDialog from 'src/components/TodoFormDialog';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { useFirebase } from 'src/hooks/useFirebase';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns'

const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState<any>([]);
    const [selectedItens, setSelectedItens] = useState<any>([]);

    const { save, remove, collectionData } = useFirebase('todos');

    useEffect(() => {
        if (collectionData != null) {
            const keys = Object.keys(collectionData);

            const formatDate = (time: number) => {
                const date = new Date(time);

                return format(date, "dd/MM/yyyy HH:mm");
            }

            const formattedRows = keys.map((key: string) => ({
                id: key,
                title: collectionData[key].title,
                dueDate: formatDate(collectionData[key].dueDate)
            }));

            setRows(formattedRows);
        }
    }, [collectionData]);

    const columns = [
        { field: 'title', headerName: 'Title', width: 220 },
        { field: 'dueDate', headerName: 'Due Date', width: 170 },
        {
            field: "delete",
            width: 75,
            sortable: false,
            disableColumnMenu: true,
            renderHeader: () => {
              return (
                <>
                    {selectedItens.length > 0 && (
                        <IconButton
                            onClick={() => {
                                remove(selectedItens);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </>
              );
            }
          }
    ];

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Container>
                <Button sx={{ my: 2 }} variant="contained" onClick={() => setModalOpen(true)}>Add</Button>

                <TodoFormDialog isModalOpen={isModalOpen} closeModal={() => setModalOpen(false)} save={save} />

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        onSelectionModelChange={(ids) => {
                            console.log('IDS', ids);
                            setSelectedItens(ids);
                        }}
                    />
                </div>
            </Container>
        </LocalizationProvider>
    );
};

export default Home;
