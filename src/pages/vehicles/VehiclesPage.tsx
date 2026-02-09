
import { useEffect, useMemo, useState } from 'react';
import type { Vehicle, UpdateVehicleDto } from "../../shared/types/vehicle";
import { vehiclesApi } from "../../features/vehicles/api/vehiclesApi.ts";
import { VehicleForm } from './VehicleForm';
import { VehicleList } from './VehicleList';
import { VehicleMap } from './VehicleMap';
import { Box, Typography, Button, Stack } from '@mui/material';
import type {VehiclesSort} from "../../features/vehicles/model/sort.ts";

export const VehiclesPage = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState<VehiclesSort>(null);

    useEffect(() => {
        setLoading(true);
        vehiclesApi.getVehicles()
            .then(setVehicles)
            .finally(() => setLoading(false));
    }, []);

    const sortedVehicles = useMemo(() => {
        if (!sortBy) return vehicles;
        return [...vehicles].sort((a, b) => sortBy === 'year' ? a.year - b.year : a.price - b.price);
    }, [vehicles, sortBy]);

    const handleDelete = async (id: number) => {
        if (!confirm('Удалить машину?')) return;
        try {
            await vehiclesApi.deleteVehicle(id);
            setVehicles(prev => prev.filter(v => v.id !== id));
        } catch {
            alert('Ошибка при удалении машины');
        }
    };

    const handleUpdate = async (id: number, dto: UpdateVehicleDto) => {
        try {
            const updated = await vehiclesApi.updateVehicle(id, dto);
            setVehicles(prev => prev.map(v => (v.id === id ? updated : v)));
        } catch {
            alert('Ошибка при обновлении');
        }
    };

    const handleCreate = async (data: Omit<Vehicle, 'id'>) => {
        try {
            const newVehicle = await vehiclesApi.createVehicle(data);
            setVehicles(prev => [...prev, newVehicle]);
        } catch {
            alert('Ошибка при создании машины');
        }
    };

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box p={4}>
            <Typography variant="h4" mb={2}>Vehicles</Typography>

            <Stack direction="row" spacing={2} mb={3}>
                <Button variant="contained" onClick={() => setSortBy('year')}>Sort by year</Button>
                <Button variant="contained" onClick={() => setSortBy('price')}>Sort by price</Button>
                <Button variant="outlined" onClick={() => setSortBy(null)}>Reset sort</Button>
            </Stack>

            <VehicleList vehicles={sortedVehicles} onUpdate={handleUpdate} onDelete={handleDelete} />

            <Typography variant="h5" mb={2}>Add Vehicle</Typography>
            <VehicleForm onCreate={handleCreate} />

            <Typography variant="h5" mb={2}>Map</Typography>
            <VehicleMap vehicles={vehicles} />
        </Box>
    );
};
