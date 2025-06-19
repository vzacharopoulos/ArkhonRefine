import { useResourceParams } from "@refinedev/core";


export const useNumericResourceParams = () => {
  const { id, ...rest } = useResourceParams();
 return {
    id: id !== undefined ? +id : undefined, // convert to number or keep as undefined
    ...rest,
  };
};