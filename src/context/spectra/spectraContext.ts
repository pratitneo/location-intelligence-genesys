import { createContext, useContext } from "react";
import type { SpectraContextType } from "../../types/types";

// create context
export const SpectraContext = createContext<SpectraContextType | undefined>(undefined)

export const useSpectraContext = () => {
    const context = useContext(SpectraContext);
    if (!context) {
        throw new Error("useSpectraContext must be used within a SpectraProvider");
    }
    return context;
};