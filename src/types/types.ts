type IconKey = "3dmap" | "legend" | "charts" | "draw" | "maps" | "geo";

export type HeadingType = {
    head: string;
};
export type LoginInputType = {
    inputLabel: string;
    inputType: string;
    inputName: string;
    inputId: string;
    inputPlaceholder?: string;
    icon?: string;
    customCls?: string;
    inputValue?: string;
    freezeInput?: boolean;
    getInputValue?: (inputEvent: unknown) => void;
    getInputToggle?: (inputEvent: unknown) => void;
};
export type ButtonType = {
    buttonText?: string;
    getBtnState?: boolean;
    customCls?: string;
    getBtnAction?: () => void;
    type?: "button" | "submit" | "reset";
};
export type SeparatorType = {
    separatorText?: string;
    separator?: boolean;
};
export type ProfileType = {
    userName?: string;
    fullName?: string;
};
export type TabsType = {
    tabsData: TabsObj[];
    customCls?: string;
    changeTabs: (tab: TabsObj, index: number) => void;
};
export type TabsObj = {
    id: number | string;
    label: string;
    active: boolean;
};
export type ProfileBoxType = {
    head?: string;
    children?: React.ReactNode;
    editBtn?: boolean;
    getEditFn?: () => void;
    getEditState?: boolean;
};
export type LoginDataType = {
    userEmail: string;
    userPassword: string;
};
export type ErrorDataType = {
    userEmail: string;
    userPassword: string;
};
export type PersonalDataType = {
    firstName: string;
    lastName: string;
    userName: string;
    userEmail: string;
};
export type PersonalInfoType = {
    getEditState?: boolean;
    getSaveAction?: () => void;
};
export type CategoryType = {
    location: string;
    attributes: unknown[];
    date: string;
};
export type CategoryBoxType = {
    savedLocations: CategoryType[]
}

export type SearchComponentProps = {
    onPositionChange: (newPosition: [number, number]) => void;
    onZoomChange: (newZoom: number) => void;
};

export type MapComponentProps = {
  position: [number, number];
  zoom: number;
};


export type DemoStatsProps = {
  icon: string;
  value: number | string;
  label: string;
};

export type SalaryBracket = {
  range: string;  
  count: string; 
};

export type DropdownHeadProps = {
  icon: string;
  heading: string;
  isFull?: boolean;
};

export type SpendingSegmentProps = {
  spendLevel: "High" | "Moderate" | "Low";
  percentage: string;    
  approxCount: string;    
};

export type AgeDistributionProps = {
    ageRange: string;
    total: string;
    male: string;
    female: string;
};

export type SiteScoreType = {
    score?: string | number
    location?: string
}
export type PointerType = {
    icon?: string
    value: string
    label: string
}
export type SitePointerType = {
    pointersData?: PointerType[]
}
export type ScoreBtnType = {
    icon?: any
}
export type SiteScoreBtnsType = {
    btnsData: ScoreBtnType[]
}
export type SiteDrpDwnItemType = {
    id: number | string
    icon?: any,
    label: string
}
export type SiteDrpDwnType = {
    drpDwnData?: SiteDrpDwnItemType
    children?: React.ReactNode

}
export type IconWithTooltipProps = {
    icon: string;
    tooltipText?: string;
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
    onClick?: () => void;
};

export type UserCredentials = {
    username: string;
    password: string;
};

export type JwtPayload = {
    exp: number;
    [key: string]: unknown;
};

export type IconItem = {
    id: number;
    icon: string;
    tooltip: string;
    key: IconKey;
};

export type SubIconItem = {
    id: string;
    icon: string;
    tooltip: string;
};

export type SidePanelProps = {
  visible: boolean;
  onClose: () => void;
  title: React.ReactNode;
  content: React.ReactNode;
};

export type SpendingLevel = "High" | "Moderate" | "Low";
