import sideBarCss from './sidebar.module.scss'
import { Images } from "../../assets/assets"
import { Link } from "react-router-dom"
import type { IconItem, SidebarType } from '../../types/types'
import SidebarBtn from '../sidebarBtn/sidebarBtn'
import { useCsvData } from '../csvDataContext/CsvDataContext'
import Papa from 'papaparse'
import { useState } from 'react'

const Sidebar = ({ onIconClick, sidebarOpen, getToggleFn, sideText }: SidebarType & { sidebarOpen?: boolean, toggleSidebar?: () => void }) => {
    const iconList: IconItem[] = [
        { id: 1, icon: Images?.dataset, tooltip: "add dataset", key: "dataset" },
        { id: 2, icon: Images?.siteSelect, tooltip: "site selection", key: "siteSelection" },
    ];
    const [csvFileName, setCsvFileName] = useState<string>("");
    const { setCsvData } = useCsvData();
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setCsvFileName(file.name);
            if (file.name.endsWith('.csv')) {
                Papa.parse(file, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => setCsvData(results.data),
                    error: () => setCsvData([]),
                });
            } else if (file.name.endsWith('.geojson') || file.name.endsWith('.json')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const geojson = JSON.parse(event.target?.result as string);
                        setCsvData(geojson);
                    } catch {
                        setCsvData([]);
                    }
                };
                reader.readAsText(file);
            }
        }
    };
    return (
        <>
            <div className={`${sideBarCss['lip-sidebar__wrap']} ${sidebarOpen ? sideBarCss['lip-sidebar--active'] : ''}`}>
                {/* product logo */}
                <div className={`${sideBarCss['lip-sidebar__logo']}`}>
                    <img src={Images?.sidebarLogo} alt="Spectra logo" />
                    <p className={`${sideBarCss['lip-sidebar__logo-text']}  ${sideText ? sideBarCss['lip-sidebar__text--active'] : ''}`}>spectra</p>
                    <img src={Images?.sidebarToggle} alt="Toggle button" className={`${sideBarCss['lip-sidebar__toggle']}`} onClick={getToggleFn} />
                </div>
                {/* sidebar links */}
                <div className={`${sideBarCss['lip-sidebar__items']}`}>
                    {iconList?.map((item) => {
                        return (
                            <div key={item?.id} onClick={() => onIconClick(item?.key)}>
                                {/* <IconWithTooltip icon={item?.icon} tooltipText={item?.tooltip} position="right" customCls='sidebarBtn' /> */}
                                <SidebarBtn sideBarText={sideText} sideBtnText={item?.tooltip} sideBtnIcon={item?.icon} />
                            </div>
                        )
                    })}
                    {/* Upload CSV/GeoJSON Button */}
                    <label className={sideBarCss['lip-sidebar__upload-btn']}>
                        <input
                            type="file"
                            accept=".csv,.geojson,application/geo+json,application/json"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                        />
                        <span>Upload CSV/GeoJSON</span>
                        {csvFileName && (
                            <span className={sideBarCss['lip-sidebar__upload-filename']}>{csvFileName}</span>
                        )}
                    </label>
                </div>
                {/* saved work */}
                <Link to={'/saved-work'} className={`${sideBarCss['lip-sidebar__item']} ${sideBarCss['lip-sidebar__saved']}`}>
                    <img src={Images?.savedWork} alt="Saved Work" />
                    <p className={`${sideBarCss['lip-sidebar__text']} ${sideText ? sideBarCss['lip-sidebar__text--active'] : ''}`}>saved work</p>
                </Link>
            </div>
        </>
    )
}

export default Sidebar