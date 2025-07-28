import ChartHead from "../chartHead/chartHead";
import POIdistInfo from "../poiDistInfo/poidistInfo";
import layerChartCss from './layerChart.module.scss'
const LayerChart = () => {
  return (
    <div className={`${layerChartCss['lip-layerChart__wrap']}`}>
      <ChartHead head={'POI Distribution'} />
      <POIdistInfo direction="row" number={'18920'} category={'Households'} distance={'0.7km'} />
      <POIdistInfo direction="column" number={'18920'} category={'Households'} distance={'0.7km'} />
    </div>
  )
}

export default LayerChart;