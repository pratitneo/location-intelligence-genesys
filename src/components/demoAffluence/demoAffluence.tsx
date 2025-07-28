import DrpdwnHead from '../drpdwnHead/drpdwnHead';
import demoAffluenceCSS from './demoAffluence.module.scss';
import { Images } from '../../assets/assets';
import type { SalaryBracket } from '../../types/types';
import Affluence from '../affluence/affluence';
import { useSelectedHex } from '../../context/SelectedHexContext';


// const salaryData: SalaryBracket[] = [
//   { range: "< ₹5 LPA", count: "14,000" },
//   { range: "₹6 – ₹10 LPA", count: "22,000" },
//   { range: "₹11 – ₹15 LPA", count: "13,000" },
//   { range: "₹15>", count: "7,400" },
// ];


const DemoAffluence = () => {
  const { selectedHex } = useSelectedHex()
  const getHexData = selectedHex?.properties
  const salaryData: SalaryBracket[] = [
    { range: getHexData?.affluence, count: getHexData?.affluence_percent },
    // { range: "₹- – ₹- LPA", count: "<count>" },
    // { range: "₹- – ₹- LPA", count: "<count>" },
    // { range: "₹- >", count: "<count>" },
  ];
  return (
    <div className={`${demoAffluenceCSS["lip-demoAffluence__wrap"]}`}>
      <DrpdwnHead icon={Images?.affluenceIcon} heading={"Affluence"} />
      <div className={`${demoAffluenceCSS["lip-demoAffluence__content"]}`}>
        {
          salaryData.map((item, index) => (
            <Affluence key={index} range={item?.range} count={`${item?.count}%`} />
          ))
        }
      </div>
    </div>
  )
}

export default DemoAffluence;