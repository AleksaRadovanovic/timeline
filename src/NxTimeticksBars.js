import {Css} from './NxTimelineConsts.js'

//component drawing hours
export default class NxTimeticksBars extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    renderBar = (left, ind) => {
        
            return (
                <div key={ind} style={{position : 'absolute', left : left, width : this.props.thicknessHourLine, 
                    height : this.props.bars_height, backgroundColor : this.props.colorThickLine}}/>
                );
    }

    renderBars = () => {
        let hours_cnt = this.props.hour_end - this.props.hour_beg + 1; 
        let i = this.props.hour_beg;
        
        if (hours_cnt < 2)
            return [];

        let length = this.props.parentWidth - this.props.ticks_margins.left - this.props.ticks_margins.right;
        if(length < 0)
            return [];

        let offset = length / (hours_cnt - 1);
        if(this.props.isActiveTimeTicksScroll && this.props.ticksDistance > offset) {
            offset = this.props.ticksDistance;
        }
        
        let left = 0; 

        let bar_divs = [];
        let ind = this.props.hour_beg;

        while(ind <= this.props.hour_end){
            
            bar_divs.push(this.renderBar(left, ind));
            left += offset;
            ind++;
        }
        
        return bar_divs;
    }
    //top : this.props.bars_height / 2
    renderHorBar = () => {
        let hours_cnt = this.props.hour_end - this.props.hour_beg ; 
        let length = this.props.parentWidth - this.props.ticks_margins.left - this.props.ticks_margins.right;

        if(hours_cnt*this.props.ticksDistance > length) {
            length = hours_cnt*this.props.ticksDistance ;
        }
        if(length < 0)
            return <div/>;

        return (
            <div key={'hor_bar'} style={{position : 'absolute', left : 0, 
                width : length, height : this.props.thicknessMainLine, 
                bottom : 0, marginBottom : 10, backgroundColor : this.props.colorMainLine}}/>
            );
            
    }

    render() {         
        let bars = this.renderBars();
        
        
        if (!bars || bars.length == 0) return <div className={Css.TIMETICKS_ROW} style={{width : this.props.parentWidth}}/>;
        
        return (
            <div className={Css.TIMETICKS_ROW} 
                style={{width : this.props.parentWidth -this.props.ticks_margins.left, height : this.props.bars_height }}>
                    {bars}
                    {this.renderHorBar()}
               <div/>
            </div>
        );
    }
}