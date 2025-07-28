import DropdownDesc from "../../components/dropdownDesc/dropdownDesc";
import DemoStats from "../../components/demoStats/demoStats";
import { Images } from "../../assets/assets";
import DemoAffluence from "../../components/demoAffluence/demoAffluence";
import DrpdwnHead from "../../components/drpdwnHead/drpdwnHead";
import AgeDistribution from "../../components/ageDistribution/ageDistribution";
import ClothingSpendLevel from "../../components/clothingSpendLevel/clothingSpendLevel";
import type { AgeDistributionDataType, spendingSegmentType } from "../../types/types";
import demoSpectraCss from "./demoSpectra.module.scss";

// const demoStatsData = [
//   { icon: Images?.totalPopulation, value: 82400, label: "total population" },
//   { icon: Images?.households, value: 18500, label: "Number of households" },
//   { icon: Images?.male, value: 42000, label: "Number of males" },
//   { icon: Images?.female, value: 40000, label: "Number of females" },
// ];

// const spendingSegments: spendingSegmentType = [
//   {
//     spendLevel: "High",
//     percentage: "22%",
//     approxCount: "18,100"
//   },
//   {
//     spendLevel: "Moderate",
//     percentage: "44%",
//     approxCount: "36,250"
//   },
//   {
//     spendLevel: 'Low',
//     percentage: "34%",
//     approxCount: "28,050"
//   }
// ];

// const ageDistributionData: AgeDistributionDataType = [
//   {
//     ageRange: "0–15 Years",
//     total: "12,700",
//     male: "6,500",
//     female: "6,200",
//   },
//   {
//     ageRange: "16–30 Years",
//     total: "9,200",
//     male: "8,800",
//     female: "18,000",
//   },
//   {
//     ageRange: "31–50 Years",
//     total: "14,000",
//     male: "17,800",
//     female: "27,800",
//   },
//   {
//     ageRange: ">50 Years",
//     total: "7,800",
//     male: "8,400",
//     female: "16,200",
//   },
// ];


// Accept hexData as a prop
const DemoSpectra = ({ hexData }: { hexData?: any }) => {
  const getHexData = hexData?.properties

  const demoStatsData = [
    { icon: Images?.totalPopulation, value: getHexData?.total_population, label: "total population" },
    { icon: Images?.households, value: getHexData?.total_households, label: "Number of households" },
    { icon: Images?.male, value: getHexData?.male_population, label: "Number of males" },
    { icon: Images?.female, value: getHexData?.female_population, label: "Number of females" },
  ];
  const ageDistributionData: AgeDistributionDataType = [
    {
      ageRange: "0-15 Years",
      male: "6500",
      female: "6200",
    },
    {
      ageRange: "16-30 Years",
      male: "8800",
      female: "18000",
    },
    {
      ageRange: "31-50 Years",
      male: "6500",
      female: "6200",
    },
    {
      ageRange: ">50 Years",
      male: "8800",
      female: "18000",
    },
  ];

  const spendingSegments: spendingSegmentType = [
    {
      spendLevel: getHexData?.spending_purchasing_class,
      percentage: `${getHexData?.spending_purchasing_class_pct}%`,
      approxCount: getHexData?.total_population
    },
  ];

  return (
    <div className={`${demoSpectraCss["lip-demoSpectra__wrap"]}`}>
      <DropdownDesc
        desc={"Bandra East scores 7/10 for site suitability, driven by strong youth presence, high footfall, and affluent population pockets"}
      />
      {/* Show selected hex data for demo */}
      {/* {hexData && (
        <div style={{ background: '#f7f7f7', padding: 8, borderRadius: 4, margin: '8px 0', maxHeight: 200, overflow: 'auto' }}>
          <strong>Selected Hex Data:</strong>
          <pre style={{ fontSize: 12 }}>{JSON.stringify(hexData, null, 2)}</pre>
        </div>
      )} */}

      <div className={`${demoSpectraCss["lip-demoSpectra__statAffluence"]}`}>
        <div className={`${demoSpectraCss["lip-demoSpectra__demoStats"]}`}>
          {demoStatsData.map((item, index) => (
            <DemoStats
              key={index}
              icon={item.icon}
              value={item?.value ?? 0}
              label={item.label}
            />
          ))}
        </div>
        <DemoAffluence />
      </div>
      <div className={`${demoSpectraCss["lip-demoSpectra__customerSpending"]}`}>
        <DrpdwnHead icon={Images?.walletMoney} heading={"Customers Spending"} />
        <div className={`${demoSpectraCss["lip-demoSpectra__customerSpending__box"]}`}>
          {spendingSegments.map((segment, index) => (
            <ClothingSpendLevel
              key={index}
              spendLevel={segment.spendLevel}
              percentage={segment.percentage}
              approxCount={segment.approxCount}
            />
          ))}
        </div>
      </div>
      <div className={`${demoSpectraCss["lip-demoSpectra__ageDistribution"]}`}>
        <DrpdwnHead icon={Images?.ageGroup} heading={"Age Distribution"} />
        <div className={`${demoSpectraCss["lip-demoSpectra__ageDistribution__box"]}`}>
          {ageDistributionData.map((item, index) => (
            <AgeDistribution key={index} ageRange={item?.ageRange} total={item.total} male={item.male} female={item.female} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DemoSpectra