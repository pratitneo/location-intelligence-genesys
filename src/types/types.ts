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

export type SearchComponentType = {
    onPositionChange: (newPosition: [number, number]) => void;
    onZoomChange: (newZoom: number) => void;
};

export type MapComponentType = {
    position: [number, number];
    zoom: number;
};


export type DemoStatsType = {
    icon: string;
    value: number | string;
    label: string;
};

export type SalaryBracket = {
    range: string;
    count: string;
};

export type DropdownHeadType = {
    icon?: string;
    heading: string;
};

export type SpendingSegmentType = {
    spendLevel: "High" | "Moderate" | "Low";
    percentage: string;
    approxCount: string;
};

export type AgeDistributionType = {
    ageRange: string;
    total: string;
    male: string;
    female: string;
};

export type AgeDistributionDataType = {
    ageRange: string;
    total: string;
    male: string;
    female: string;
}[];

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
export type IconWithTooltipType = {
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
export type PieType = {
    pieRadiusSize: string | number
    colorsArr: string[]
    pieData: any[]
    containerWidth: number
    containerHeight: number
}
export type FootfallVisitorType = {
    peakHourData?: PeakNonPeakType[]
    nonPeakHourData?: PeakNonPeakType[]
}
export type PeakNonPeakType = {
    time?: string
    avgVisitor?: string | number
    status?: string
    bgClass?: string
}
export type SidePanelType = {
    visible: boolean;
    onClose: () => void;
    title: React.ReactNode;
    content: React.ReactNode;
};

export type SpendingLevel = "High" | "Moderate" | "Low";

export type spendingSegmentType = { spendLevel: SpendingLevel; percentage: string; approxCount: string }[];

export type SideBtnType = {
    sideBtnText?: string
    sideBtnIcon?: any
    sideBarText?: boolean
    getActionFn: (siteBtn: any) => void
}
export type AffluenceType = { range: string; count: string; };

export type AvrageDriveTimeType = {value:number; label: string};

export type AccessibilityHeadType = {value1: number, value2:number, label:string}

export type TransportConnectivityType = {icon?:string, type:string, location:string}