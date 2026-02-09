
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { Vehicle } from "../../shared/types/vehicle";
import { Box, TextField, Button, Stack } from '@mui/material';

type Props = {
    onCreate: (data: Omit<Vehicle, 'id'>) => void;
};

export const VehicleForm = ({ onCreate }: Props) => {
    const { register, handleSubmit, reset } = useForm<Omit<Vehicle, 'id'>>();

    const onSubmit: SubmitHandler<Omit<Vehicle, 'id'>> = (data) => {
        onCreate(data);
        reset();
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} mb={4}>
            <Stack direction="row" spacing={2} flexWrap="wrap">
                <TextField label="Name" {...register('name')} required />
                <TextField label="Model" {...register('model')} required />
                <TextField label="Year" type="number" {...register('year')} required />
                <TextField label="Color" {...register('color')} required />
                <TextField label="Price" type="number" {...register('price')} required />
                <TextField label="Latitude" type="number" {...register('latitude')} required />
                <TextField label="Longitude" type="number" {...register('longitude')} required />
                <Button type="submit" variant="contained" color="primary">Add Vehicle</Button>
            </Stack>
        </Box>
    );
};
