
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { Vehicle } from "../../shared/types/vehicle";
import { Box, TextField, Button } from '@mui/material';

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
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            mb={4}
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
            gap={2}
        >
            <TextField label="Name" {...register('name')} required fullWidth />
            <TextField label="Model" {...register('model')} required fullWidth />
            <TextField type="number" label="Year" {...register('year')} required fullWidth />
            <TextField label="Color" {...register('color')} required fullWidth />
            <TextField type="number" label="Price" {...register('price')} required fullWidth />
            <TextField type="number" label="Latitude" {...register('latitude')} required fullWidth />
            <TextField type="number" label="Longitude" {...register('longitude')} required fullWidth />
            <Button type="submit" variant="contained" color="primary" sx={{ gridColumn: 'span 1' }}>
                Add Vehicle
            </Button>
        </Box>
    );
};
