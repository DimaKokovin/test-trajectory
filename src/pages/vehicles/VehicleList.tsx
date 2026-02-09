
import { useState } from 'react';
import type { Vehicle, UpdateVehicleDto } from "../../shared/types/vehicle";
import {  Paper, TextField, Button, Typography, Stack } from '@mui/material';

type Props = {
    vehicles: Vehicle[];
    onUpdate: (id: number, dto: UpdateVehicleDto) => void;
    onDelete: (id: number) => void;
};

export const VehicleList = ({ vehicles, onUpdate, onDelete }: Props) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState(0);

    const handleEdit = (vehicle: Vehicle) => {
        setEditingId(vehicle.id);
        setEditName(vehicle.name);
        setEditPrice(vehicle.price);
    };

    return (
        <Stack spacing={2} mb={4}>
            {vehicles.map((v) => (
                <Paper key={v.id} elevation={2} sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                    {editingId === v.id ? (
                        <>
                            <TextField
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                size="small"
                                sx={{ flex: '1 1 150px' }}
                            />
                            <TextField
                                value={editPrice}
                                onChange={(e) => setEditPrice(Number(e.target.value))}
                                size="small"
                                type="number"
                                sx={{ flex: '1 1 100px' }}
                            />
                            <Button variant="contained" size="small" color="primary" onClick={() => { onUpdate(v.id, { name: editName, price: editPrice }); setEditingId(null); }}>
                                Save
                            </Button>
                            <Button variant="outlined" size="small" color="secondary" onClick={() => setEditingId(null)}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography sx={{ flex: '1 1 200px' }}>
                                {v.name} {v.model} — {v.year} — ${v.price}
                            </Typography>
                            <Button variant="contained" size="small" onClick={() => handleEdit(v)}>
                                Edit
                            </Button>
                            <Button variant="outlined" size="small" color="error" onClick={() => onDelete(v.id)}>
                                Delete
                            </Button>
                        </>
                    )}
                </Paper>
            ))}
        </Stack>
    );
};
