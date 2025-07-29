export type IconKey = "3dmap" | "legend" | "charts" | "draw" | "maps" | "geo" | 'dataset' | 'siteSelection' | 'siteRecos';

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
    sidebarOpen?: boolean;
    onSearch?: (search: string) => void | Promise<void>;
    placeHolder?: string;
    customClsform?: string;
    customClsfocus?: string;
    customClsinput?: string;
    customClsbutton?: string;
    icon?: string;
};

export type MapComponentType = {
    position: [number, number];
    zoom: number;
    hasSearched: boolean;
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
    customCls?: string;
};


export type AgeDistributionType = {
    ageRange: string;
    total: string;
    male: string;
    female: string;
};

export type AgeDistributionDataType = {
    ageRange: string;
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
    label: string
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
    customCls?: string;
    getActionFn?: () => void;
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
    customCls: string;
    visible: boolean;
    visibleCls: string;
    content: React.ReactNode;
    contentProps?: any;
};

export type SpendingLevel = "High" | "Moderate" | "Low";

export type spendingSegmentType = {
    spendLevel: SpendingLevel;
    percentage: string;
    approxCount: string
}[];
export type SpendingSegmentType = {
    spendLevel: SpendingLevel;
    percentage: string;
    approxCount: string
}[];

export type SideBtnType = {
    sideBtnText?: string
    sideBtnIcon?: any
    sideBarText?: boolean
    getActionFn?: (siteBtn: any) => void
}
export type AffluenceType = {
    range: string;
    count: string;
};

export type DriveTimeType = {
    value: number | string;
    label: string
};

export type AccessibilityHeadType = {
    value1: number,
    value2: number,
    label: string
}

export type TransConnType = {
    icon?: string,
    type: string,
    location: string
}
export type SidebarType = {
    onIconClick: (key: IconKey) => void
    sidebarOpen: boolean
    getToggleFn: () => void
    sideText?: boolean

}
export type LineChartType = {
    data: any[]
    maxValue: string | number
    chartHeight: number
    spacedStroke: number | string
    fallbackStrokeColor: string
    xDataKey: string
    xDataColor: string
    yDataColor: string
    yAxisRange: any[]
    tickValue: number
    lineStyle: string
    dataKeyName: string
    lineColor: string
    lineWidth: number
    legendName: string
    legendVerticalPlace: string
    legendHorizontalPlace: string
    legendIconType: string
    highValueColor: string
    normalValueColor: string
    btnData?: any[]
    setNewBtnData?: any
}
export type TotalAddMarkType = {
    tamNum: string | number
}

export interface ButtonIconInterface {
    isPanelOpen?: boolean;
}

export type AccessIndexType = {
    value: number,
    accessLabel: string
}
export type LineBtnsType = {
    getBtnNames?: any[]
    getActivateBtnFn: (id: number) => void
}
export type LineBtnType = {
    id: number,
    label: string
    active: boolean
}
export type DonutItemType = {
    name: string,
    value: number | string
    colorName: string
}
export type DonutType = {
    boxHeight: number
    donutData: DonutItemType[]
    inRadiusVal: number
    outRadiusVal: number
    numberDataKey: string | number
    colors: any[]
    pieCenterTextColor: string
    chartTextOne?: string
    chartTextTwo?: string
}
export type CustomBarType = {
    getBarColor: string
    getNumColor: string
    barBgColor: string
}
export type RadarType = {
    chartHeight: number
    chartRadialSize: string
    internalLineColor: string
    labelKey: string
    outsideLineColor: string
    radarItemTextSize: number
    markLineAngle: number
    valueRangeArr: any[]
    markLineColor: string
    mainLineTextColor: string
    mainLineTextSize: number
    labelName: string
    dataNumKey: string
    internalBorderColor: string
    internalFillColor: string
    fillColorOpacity: number
    internalBorderValKey: string
    internalValPos: string
    internalValColor: string
    internalValSize: number
    legendHorizontalAlign: string
}

export type DataLayerHeadType = {
    icon?: string;
    heading: string;
}
export type RightBarType = {
    isPanelOpen: boolean;
    onIconClick: (key: IconKey) => void;
    activeKey: IconKey | null
    handleIconClick: (id: string) => void
}

export type SelectSubdataType = {
    head: string;
    dragIcon: string;
    arrowIcon?: string;
    eyeIcon: string;
    isDropdownOpen?: boolean;
    onArrowClick?: () => void;
}

export type SelectSubdataItemType = {
    id: number;
    head: string;
    dragIcon: string;
    arrowIcon?: string;
    eyeIcon: string;
}

export type CsvRow = Record<string, string>;
export type ContextType = {
    children: React.ReactNode
}
export type SidebarValueType = {
    panelName: string
    updatePanelName: (value: string) => void

    leftPanel: boolean
    updateLeftPanel: (value: boolean) => void

    rightPanel: boolean
    updateRightPanel: (value: boolean) => void

    rightIconKey: IconKey | null
    setRightIconKey: React.Dispatch<React.SetStateAction<IconKey | null>>
}
export type CompetitiveType = {
    getCompetetiveData?: CompetetiveItem[]
    // getActionFn: (brand: string) => void
}
export type CompetetiveItem = {
    head?: string
    brands?: any[]
}

export type ChartHeadType = {
    head?: string
}

export type POIdistInfoTypes = {
    number: string;
    category: string;
    distance?: string;
    customClswrap?: string
    direction?: string
}

// Hexagon types for map and API
export type HexBoundary = { hexId: string; boundary: [number, number][]; ahpOutput?: number };
export type HexDetailsResponse = {
    average_footfall_10: number | null;
    average_footfall_12: number | null;
    average_footfall_14: number | null;
    average_footfall_17: number | null;
    average_footfall_19: number | null;
    average_footfall_21: number | null;
    spending_purchasing_class: string;
    spending_purchasing_class_pct: number;
    crowed_puller_name: string;
    commercial_percentage: number;
    residential_percentage: number;
    hybrid_percentage: number;
    industrial_percentage: number;
    total_population: number;
    male_population: number;
    female_population: number;
    total_households: number;
    footfall_daily_visitors: number;
    affluence: string;
    affluence_percent: number;
    target_population_presence: string;
    household_income: number;
    ahp_output_scaled?: number; // Add this if present in your API
};