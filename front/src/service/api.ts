import axios from "axios";

const API_URL = "http://localhost:3001"; // Adjust to your backend URL

export interface City {
	id: number;
	name: string;
	state: string;
	latitude: number;
	longitude: number;
}

export interface IrradiationData {
	city: City;
	polygon: [number, number][];
	irradiation: {
		annual: number;
		monthly: { [month: string]: number };
	};
}

export const fetchCities = async (): Promise<City[]> => {
	const response = await axios.get(`${API_URL}/cidade`);
	return response.data;
};

export const fetchCityIrradiation = async (
	cityId: number,
): Promise<IrradiationData> => {
	const response = await axios.get(`${API_URL}/cidade/${cityId}/irradiation`);
	return response.data;
};
