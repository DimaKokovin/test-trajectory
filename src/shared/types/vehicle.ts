export type Vehicle = {
    id: number;
    name: string;
    model: string;
    year: number;
    color: string;
    price: number;
    latitude: number;
    longitude: number;
};

export type CreateVehicleDto = Omit<Vehicle, 'id'>;
export type UpdateVehicleDto = Pick<Vehicle, 'name' | 'price'>;