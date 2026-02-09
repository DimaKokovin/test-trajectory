
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Vehicle } from "../../shared/types/vehicle";


const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

type Props = {
    vehicles: Vehicle[];
};

export const VehicleMap = ({ vehicles }: Props) => (
    <MapContainer center={[55.753332, 37.621676]} zoom={5} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {vehicles.map(v => (
            <Marker key={v.id} position={[v.latitude, v.longitude]} icon={DefaultIcon}>
                <Popup>
                    {v.name} {v.model}<br />
                    Year: {v.year}<br />
                    Price: ${v.price}
                </Popup>
            </Marker>
        ))}
    </MapContainer>
);
