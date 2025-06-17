export interface CidadesMenuProps {
	onCidadeSelect: (cidadeId: number, coordinates?: [number, number]) => void;
	selectedCidade: number | null;
	displayLabel?: string;
}
