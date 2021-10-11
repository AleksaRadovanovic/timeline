import {Css} from './NxTimelineConsts.js'
import NxTimeticks from './NxTimeticks.js'
import NxTimelineBar from './NxTimelineBar.js'
import NxTimelineRow from './NxTimelineRow.js'

export default class NxTimelineContent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {   
    }

    handleElementSelected = (sel_element) => {
        this.props.onElementSelected(sel_element);
    }

    renderRow = (index) => {
        
        return (
            <NxTimelineRow 
                elements={this.props.data[index]}
                level={this.props.levels[index]}
                parentWidth={this.props.parentWidth}
                row_width={this.props.row_width}
                ticks_margins={this.props.ticks_margins}
                ticksDistance={this.props.ticksDistance}
                isActiveTimeTicksScroll={this.props.isActiveTimeTicksScroll}
                onElementSelected={this.handleElementSelected}
                hour_beg={this.props.hour_beg}
                hour_end={this.props.hour_end}
                ticks_height={this.props.ticks_height} 
                side_labels_width={this.props.side_labels_width}
                bottom_labels_width={this.props.bottom_labels_width}
                width_first_column={this.props.width_first_column}
                element_color={this.props.element_color}
                element_labels_color={this.props.element_labels_color}
                rowID={index}
                key={index}
                /> 
        );
    }

    renderRows = () => {
        let rows_array = [];

        let i=0;
        while(i<this.props.data.length){
           
            rows_array.push(this.renderRow(i));
            i++;
        }
        return rows_array;
    }

    render() {     
        let rows = this.renderRows(); 
        
        return (
                <div  id="timeticks-content" className={Css.TIMELINE_TIMETICKS_CONTENT} style={{minWidth: this.props.row_width}} >
                        {rows}
                </div>
        );
    }
}