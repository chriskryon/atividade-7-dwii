import { useSetorCensitarioContext } from '../contexts/SetorCensitarioContext';

export const useSetor = () => {
  const context = useSetorCensitarioContext();

  const fetchSetorByClick = async (lng: number, lat: number) => {
    await context.fetchSetorByPoint(lng, lat);
  };

  const clearSelection = () => {
    context.selectSetor(null);
  };

  return {
    ...context,
    fetchSetorByClick,
    clearSelection
  };
};
