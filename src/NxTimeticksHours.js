import {Css} from './NxTimelineConsts.js'

//component drawing hours
export default class NxTimeticksHours extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    renderHour = (hour, left, ind) => {
        if (ind == 0)
            return (
                <div className="nx-timetick-hour" key={hour} style={{marginLeft : left, top : 0}}>{hour}</div>
            );
        else 
            return (
                <div className="nx-timetick-hour" key={hour} style={{position : 'absolute', left : left, top : 20 }}>{hour}</div>
            );
    }

    renderHours = () => {
        let hours_cnt = this.props.hour_end - this.props.hour_beg + 1; 
        if (hours_cnt < 2)
            return [];

        let length = this.props.parentWidth - this.props.ticks_margins.left - this.props.ticks_margins.right;
        if(length < 0)
            return [];

        let offset = length / (hours_cnt - 1);
        if(this.props.isActiveTimeTicksScroll && this.props.ticksDistance > offset) {
            offset = this.props.ticksDistance;
        }
        
        let hour_divs = [];

        let left = 0; 
        let ind = this.props.hour_beg;
        let j=0; 
        
        while(ind <= this.props.hour_end){
            if(this.props.visibleHours[ind]){
                hour_divs.push(this.renderHour(ind,left, j));
                j++;
            }            
            left += offset;
            ind++;
        }
        
        return hour_divs;
    }

    render() {         
        let hours = this.renderHours();

        if (!hours || hours.length == 0) return <div className={Css.TIMETICKS_ROW} style={{width : this.props.parentWidth}}/>;
        
        return (
            <div id="timeticks-hours"
                className={Css.TIMETICKS_ROW} 
                style={{width : this.props.parentWidth - this.props.ticks_margins.left}}>
                   {hours}
            </div>
        );
    }
}