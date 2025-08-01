import { useState } from 'react'
import type { ContextType, IconKey } from '../../types/types'
import { SidebarContext } from './sidebarContex'

export const SidebarProvider = ({ children }: ContextType) => {

    const [panelName, setPanel] = useState('')
    const [leftPanel, setLeftPanel] = useState(false)
    const [rightPanel, setRightPanel] = useState(false)
    const [rightIconKey, setRightIconKey] = useState<IconKey | null>(null);

    const updatePanelName = (value: string) => {
        setPanel(value)
    }
    const updateLeftPanel = (value: boolean) => {
        setLeftPanel(value)
    }
    const updateRightPanel = (value: boolean) => {
        setRightPanel(value)
    }

    return (
        <SidebarContext.Provider value={{ panelName, updatePanelName, leftPanel, updateLeftPanel, rightPanel, updateRightPanel, rightIconKey, setRightIconKey }}>
            {children}
        </SidebarContext.Provider>
    )
}

