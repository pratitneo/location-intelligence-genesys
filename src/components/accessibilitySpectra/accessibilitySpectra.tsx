import acspCss from './accessibilitySpectra.module.scss'
import DropownDesc from '../dropdownDesc/dropdownDesc'
import AccessIndex from '../accessIndex/accessIndex'
import AvgDrvTime from '../avgdrvtime/avgdrvtime'
import PubTransConn from '../pubtransconn/pubtransconn'
import RadarChartGraph from '../radarChart/radarChart'


const AccessibilitySpectra = () => {
  const value = 8.2;
  const accessLabel = 'Excellent';
  return (
    <div className={`${acspCss['lip-accspe__wrap']}`}>
      <DropownDesc
        desc={"Daily footfall peaks at 1,350 around noon and rebounds post 6 PM, driven by office workers and leisure shoppers"}
      />
      <div className={`${acspCss['lip-accspe__container']}`}>
        <div className={`${acspCss['lip-accspe__index-time']}`}>
          <AccessIndex value={value} accessLabel={accessLabel} />
          <AvgDrvTime />
        </div>
        <PubTransConn />
      </div>
      <RadarChartGraph />

    </div>
  )
}

export default AccessibilitySpectra