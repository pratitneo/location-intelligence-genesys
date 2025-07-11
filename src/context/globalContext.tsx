import type { ContextType } from "../types/types"
import { SidebarProvider } from "./sidebarContex"

export const GlobalContext = ({ children }: ContextType) => {
    return (
        <SidebarProvider>
            {children}
        </SidebarProvider>
    )
}