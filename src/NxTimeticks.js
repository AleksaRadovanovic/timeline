import {Css} from './NxTimelineConsts.js'
import NxTimeticksHours from './NxTimeticksHours'
import NxTimeticksBars from './NxTimeticksBars'
import NxTimeticksNowLine from './NxTimeticksNowLine'

//component for time ticks
export default class NxTimeticks extends React.PureComponent {
    constructor(props) {
        
        super(props);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    
    renderRelativeBody = () => {
        return (
            <div style={{left : 0}}>BODY</div>
        );
    }

    render() {         
        
        return (
            <div id="timeticks-bars" className={Css.TIMETICKS_CONTAINER } 
                style={{left : 150, paddingTop : this.props.ticks_margins.top,  width : this.props.parentWidth -this.props.width_first_column}}>
                <NxTimeticksHours
                    ticks_margins={this.props.ticks_margins}
                    ticks_height={this.props.ticks_height} 
                    hour_beg={this.props.hour_beg}
                    hour_end={this.props.hour_end} 
                    parentWidth={this.props.parentWidth}
                    visibleHours = {this.props.visibleHours}
                    ticksDistance={this.props.ticksDistance}
                    isActiveTimeTicksScroll={this.props.isActiveTimeTicksScroll}/>

                <NxTimeticksBars
                    ticks_margins={this.props.ticks_margins}
                    ticks_height={this.props.ticks_height} 
                    hour_beg={this.props.hour_beg}
                    hour_end={this.props.hour_end} 
                    parentWidth={this.props.parentWidth}
                    bars_height={this.props.bars_height}
                    visibleHours = {this.props.visibleHours}
                    colorMainLine = {this.props.colorMainLine}
                    colorThickLine = {this.props.colorThickLine}
                    thicknessMainLine = {this.props.thicknessMainLine}
                    thicknessHourLine = {this.props.thicknessHourLine}
                    ticksDistance={this.props.ticksDistance}
                    isActiveTimeTicksScroll={this.props.isActiveTimeTicksScroll}/>

            </div>
        );
    }
}