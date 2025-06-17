export interface GeoFeature3D {
	id: string;
	type: string;
	geometry: {
		type: string;
		coordinates: number[][];
	};
	properties: {
		name: string;
		description?: string;
		[key: string]: any;
	};
}

export interface MapData {
	features: any[];
	loading: boolean;
	error: string | null;
	centroid?: {
		latitude: number;
		longitude: number;
	};
}

export interface MapContextType {
	mapData: MapData;
	fetchMapData: () => Promise<void>;
	setMapData: (data: MapData) => void;
	selectedCity: string;
	fetchCensusData: (cityName: string) => Promise<void>;
	updateSelectedCity: (cityName: string) => void;
}
