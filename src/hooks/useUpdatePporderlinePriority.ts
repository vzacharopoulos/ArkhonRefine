// import { useUpdate } from "@refinedev/core";
// import { UPDATE_PPORDERLINE_PRIORITY } from "@/graphql/queries";
// import { PPOrderLine } from "@/pages/ProductionPlanning/productioncalendartypes";

// export const useUpdatePporderlinePriority = () => {
//   const { mutate } = useUpdate<PPOrderLine>();

//   const updatePporderlinePriority = async (id: number, priority: number) => {
//     await mutate({
//       resource: "pporderlines2",
//       id,
//       values: { priority },
//       meta: {
//         gqlMutation: UPDATE_PPORDERLINE_PRIORITY,
//       },
//     });
//   };

//   return { updatePporderlinePriority };
// };

