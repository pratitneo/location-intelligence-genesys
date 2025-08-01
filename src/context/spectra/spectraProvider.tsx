import { useState } from "react";
import type { ContextChildType } from "../../types/types";
import { SpectraContext } from "./spectraContext";

// context provider
export const SpectraProvider = ({ children }: ContextChildType) => {
    const [activeSpectra, setActiveSpectra] = useState('')
    const handleSpectra = (value: string) => {
        setActiveSpectra(value)
    }

    return (
        <SpectraContext.Provider value={{ activeSpectra, handleSpectra }}>
            {children}
        </SpectraContext.Provider>
    )
}

