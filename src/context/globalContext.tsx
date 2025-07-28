import type { ContextType } from "../types/types";
import { SelectedHexProvider } from "./SelectedHexContext";
import { SidebarProvider } from "./sidebarContex";
import { BufferAnalysisProvider } from "./BufferAnalysisContext";

export const GlobalContext = ({ children }: ContextType) => {
  return (
    <SelectedHexProvider>
      <SidebarProvider>
        <BufferAnalysisProvider>{children}</BufferAnalysisProvider>
      </SidebarProvider>
    </SelectedHexProvider>
  );
};
