export interface GeoFeature {
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
	features: GeoFeature[];
	loading: boolean;
	error: string | null;
}

export interface MapContextType {
	mapData: MapData;
	fetchMapData: () => Promise<void>;
	setMapData: (data: MapData) => void;
}
