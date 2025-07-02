import acspCss from './accessibilitySpectra.module.scss'
import DropownDesc from '../dropdownDesc/dropdownDesc'
import { Images } from "../../assets/assets"
import AvgDriveTime from '../avgDriveTime/avgDriveTime'
import TransConn from '../transConn/TransConn'

const TransConnData = [
  {
    icon: Images?.railway,
    type: "2 Train stations",
    locations: "Bandra 1Km, Kurla 1.8Km",
  },
  {
    icon: Images?.metro,
    type: "3 Metro lines",
    locations: "Bandra 1Km, Kurla 1.8Km",
  },
  {
    icon: Images?.bus,
    type: "8 Bus routes",
    locations: "Bandra 1Km, Kurla 1.8Km",
  },
]

const AccessibilitySpectra = () => {
  return (
    <div className={`${acspCss['lip-accspe__wrap']}`}>
      <DropownDesc
        desc = {"Daily footfall peaks at 1,350 around noon and rebounds post 6 PM, driven by office workers and leisure shoppers"}
      />
      <div className={`${acspCss['lip-accspe__box']}`}>
        <div className={`${acspCss['lip-accspe__container']}`}>
          <div className={`${acspCss['lip-accspe__index-time']}`}>
            <div className={`${acspCss['lip-accspe__pointer-index']}`}>
              <p className={`${acspCss['lip-accspe__pointer']}`}>
                <span className={`${acspCss['lip-accspe__value']}`}>8.2</span> <span>/ 10</span>
              </p>

              <p className={`${acspCss['lip-accspe__index']}`}>
                Excellent <br />Accessibility Index
              </p>
            </div>
            <div className={`${acspCss['lip-accspe__time']}`}>
              <p className={`${acspCss['lip-accspe__time-heading']}`}>Average Drive Time</p>
              <div className={`${acspCss['lip-accspe__hours']}`}>
                <AvgDriveTime value={28} label={"Non-Peak hours"}/>
                <AvgDriveTime value={16} label={"Peak hours"}/>
              </div>
            </div>
          </div>
          
          <div className={`${acspCss['lip-accspe__public-transport']}`}>
            <div className={`${acspCss['lip-accspe__pthead']}`}>
              <p className={`${acspCss['lip-accspe__pointer']}`}>
                <img src={Images?.tablerRoute} alt='tabletRoute'/> <span className={`${acspCss['lip-accspe__indicator']}`}>High</span>
              </p>
              <p className={`${acspCss['lip-accspe__index']}`}>
                Public Transport <br/>Connectivity
              </p>
            </div>
            
            {TransConnData.map((item, index) => (
              <TransConn key={index} icon={item.icon} type={item.type} location={item.locations}/>
            ))}
            
          </div>
        </div>
    </div>
  </div>
  )
}

export default AccessibilitySpectra