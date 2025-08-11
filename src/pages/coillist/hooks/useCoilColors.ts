// src/hooks/useCoilColors.ts
import { useCustom } from "@refinedev/core";
import { COILCOLORS } from "@/graphql/queries";
import { CoilColorType } from "@/graphql/schema.types";
import { useMemo } from "react";

// Enhanced useCoilColors hook
export const useCoilColors = () => {
  const { data, isLoading, error } = useCustom<CoilColorQueryResult>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: COILCOLORS,
    },
  });

  const { colorMap, nameToHexMap } = useMemo(() => {
    const byCode = new Map<string, { name: string; hexcode?: string }>();
    const byName = new Map<string, string>(); // New map for name->hexcode
    
    data?.data?.coilColors?.forEach((col) => {
      const normalizedCode = col.code.trim().toLowerCase();
      const normalizedName = col.name?.trim().toLowerCase() || '';
      const hex = col.hexcode;
      
      byCode.set(normalizedCode, {
        name: col.name?.trim() || `Χρώμα ${col.code}`,
        hexcode: hex,
      });
      
      // Populate name-to-hex map if name exists
      if (normalizedName && hex) {
        byName.set(normalizedName, hex);
      }
    });

    return { colorMap: byCode, nameToHexMap: byName };
  }, [data?.data?.coilColors]);

  // Helper to get hexcode by name
  const getHexcodeByName = (name: string): string | undefined => {
    if (!name || isLoading) return undefined;
    const normalizedName = name.trim().toLowerCase();
    return nameToHexMap.get(normalizedName);
  };

  return {
    colorMap,
    nameToHexMap, // Export the name-based map directly if needed
    getHexcodeByName, // Helper function
    isLoading,
    error,
    colors: data?.data?.coilColors || [],
  };
};
// Type definitions
type CoilColorQueryResult = {
  coilColors: {
    code: string;
    name: string | null;
    hexcode?: string;
  }[];
};