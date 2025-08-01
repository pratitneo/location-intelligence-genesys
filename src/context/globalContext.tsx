import type { ContextType } from "../types/types";
import { SelectedHexProvider } from "./SelectedHexContext";
import { BufferAnalysisProvider } from "./BufferAnalysisContext";
import { SidebarProvider } from "./sidebar/sidebarProvider";
import { SpectraProvider } from "./spectra/spectraProvider";

export const GlobalContext = ({ children }: ContextType) => {
  return (
    <SpectraProvider>
      <SelectedHexProvider>
        <SidebarProvider>
          <BufferAnalysisProvider>
            {children}
          </BufferAnalysisProvider>
        </SidebarProvider>
      </SelectedHexProvider>
    </SpectraProvider>
  );
};
