import { createContext, useContext } from "react";
import type { SidebarValueType } from "../../types/types";

export const SidebarContext = createContext<SidebarValueType | undefined>(undefined)

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};