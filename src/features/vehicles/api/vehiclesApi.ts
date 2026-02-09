
import axios from 'axios';
import type {CreateVehicleDto, UpdateVehicleDto, Vehicle} from '../../../shared/types/vehicle.ts';

const api = axios.create({
    baseURL: 'https://task.tspb.su/test-task',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});



export const vehiclesApi = {

    getVehicles: async (): Promise<Vehicle[]> => {
        const response = await api.get<Vehicle[]>('/vehicles');
        return response.data;
    },


    createVehicle: async (dto: CreateVehicleDto): Promise<Vehicle> => {
        const response = await api.post<Vehicle>('/vehicles', dto);
        return response.data;
    },


    updateVehicle: async (id: number, dto: UpdateVehicleDto): Promise<Vehicle> => {
        const response = await api.put<Vehicle>(`/vehicles/${id}`, dto);
        return response.data;
    },


    deleteVehicle: async (id: number): Promise<void> => {
        await api.delete(`/vehicles/${id}`);
    },
};
