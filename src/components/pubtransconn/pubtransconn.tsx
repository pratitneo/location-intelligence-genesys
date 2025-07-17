import pubtransconCss from './pubtransconn.module.scss'
import { Images } from '../../assets/assets';
import TransConn from '../transConn/transConn';

const PubTransConn = () => {
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

  return (
    <div className={`${pubtransconCss['lip-transcon__public-transport']}`}>
      <div className={`${pubtransconCss['lip-transcon__pthead']}`}>
        <p className={`${pubtransconCss['lip-transcon__pointer']}`}>
          <img src={Images?.tablerRoute} alt='tabletRoute' />
          <span className={`${pubtransconCss['lip-transcon__indicator']}`}>High</span>
        </p>
        <p className={`${pubtransconCss['lip-transcon__index']}`}>
          Public Transport Connectivity
        </p>
      </div>

      {TransConnData.map((item, index) => (
        <TransConn key={index} icon={item.icon} type={item.type} location={item.locations} />
      ))}
    </div>
  )
}

export default PubTransConn;