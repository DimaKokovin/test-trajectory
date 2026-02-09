
import { useState } from 'react';
import type { Vehicle, UpdateVehicleDto } from "../../shared/types/vehicle";
import {  Button, TextField, Stack, Typography, Paper } from '@mui/material';

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
            {vehicles.map(v => (
                <Paper key={v.id} elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    {editingId === v.id ? (
                        <>
                            <TextField value={editName} onChange={e => setEditName(e.target.value)} size="small" />
                            <TextField type="number" value={editPrice} onChange={e => setEditPrice(Number(e.target.value))} size="small" />
                            <Button variant="contained" color="primary" onClick={() => { onUpdate(v.id, { name: editName, price: editPrice }); setEditingId(null); }}>Save</Button>
                            <Button variant="outlined" color="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                        </>
                    ) : (
                        <>
                            <Typography sx={{ flex: 1 }}>{v.name} {v.model} — {v.year} — ${v.price}</Typography>
                            <Button variant="contained" size="small" onClick={() => handleEdit(v)}>Edit</Button>
                            <Button variant="outlined" color="error" size="small" onClick={() => onDelete(v.id)}>Delete</Button>
                        </>
                    )}
                </Paper>
            ))}
        </Stack>
    );
};
