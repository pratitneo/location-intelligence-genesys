import type { DemoStatsType } from '../../types/types';
import demoStatsCss from './demostats.module.scss';


const DemoStats = ({ icon, value, label }: DemoStatsType) => {
  // Split the label into words
  const words = label.split(' ');
  const firstWord = words[0];
  const remainingWords = words.slice(1).join(' ');

  return (
        <div className={`${demoStatsCss['lip-demoStats__box']}`}>
            <div className={`${demoStatsCss['lip-demoStats__icon-value']}`}>
                <img src={icon} alt="Contact" className={`${demoStatsCss['lip-demoStats__icon']}`}/>
                <p className={`${demoStatsCss['lip-demoStats__value']}`}>{value}</p>
            </div>
            <div className={`${demoStatsCss['lip-demoStats__label']}`}>
                <span className={`${demoStatsCss['lip-demoStats__label-first']}`}>{firstWord}</span>
                {remainingWords && (
                    <span className={`${demoStatsCss['lip-demoStats__label-rest']}`}>{remainingWords}</span>
                )}
            </div>
        </div>
  )
}

export default DemoStats;