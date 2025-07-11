import acspCss from './accessibilitySpectra.module.scss'
import DropownDesc from '../dropdownDesc/dropdownDesc'
import AccessIndex from '../accessIndex/accessIndex'
import AvgDrvTime from '../avgdrvtime/avgdrvtime'
import PubTransConn from '../pubtransconn/pubtransconn'
import RadarChartGraph from '../radarChart/radarChart'


const AccessibilitySpectra = ({ hexData }: { hexData?: any }) => {
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
      <RadarChartGraph chartHeight={400} chartRadialSize={'80%'} internalLineColor={'#9333EA'} labelKey='category' outsideLineColor='white' radarItemTextSize={10} markLineAngle={90} valueRangeArr={[0, 10]} markLineColor='#E0E7FF' mainLineTextColor='#E0E7FF' mainLineTextSize={10} labelName='Metric' dataNumKey='score' internalBorderColor={'#93C5FD'} internalFillColor='#93C5FD' fillColorOpacity={0.4} internalBorderValKey='score' internalValPos='top' internalValColor='#93C5FD' internalValSize={14} legendHorizontalAlign='bottom' />

    </div>
  )
}

export default AccessibilitySpectra