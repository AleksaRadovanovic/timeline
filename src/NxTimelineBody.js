import {Css} from './NxTimelineConsts.js'
import NxTimeticks from './NxTimeticks.js'
import NxTimelineContent from './NxTimelineContent.js'

//component for rendering callendar body 
//matrix_data contains matrix monthCnt x 32
//month_name array contains info about months' names
export default class NxTimelineBody extends React.Component {
    constructor(props) {
        super(props);
        this.rootRef = React.createRef();
        this.state = {
            body_width : 0
        };
    }

    componentDidMount() {
        this.setState({body_width : this.rootRef.current.clientWidth});
    }

    componentDidUpdate(){
        if(this.state.body_width != this.rootRef.current.clientWidth){
            this.setState({body_width : this.rootRef.current.clientWidth});
        }
    }

    componentWillUnmount() {   
    }

    handleElementSelected = (sel_element) => { 
        this.props.onElementSelected(sel_element); 
    }
    
    render() {       
        
        return (
            <div ref={this.rootRef} className={Css.MAIN_BODY + ""}>
                <NxTimelineContent
                    parentWidth={this.state.body_width}
                    row_width={this.props.row_width}
                    ticksDistance={this.props.ticksDistance}
                    isActiveTimeTicksScroll={this.props.isActiveTimeTicksScroll}
                    onElementSelected={this.handleElementSelected}
                    data={this.props.data}
                    ticks_margins={this.props.ticks_margins}
                    ticks_height={this.props.ticks_height} 
                    hour_beg={this.props.hour_beg}
                    side_labels_width={this.props.side_labels_width}
                    bottom_labels_width={this.props.bottom_labels_width}
                    levels={this.props.levels}
                    hour_end={this.props.hour_end}
                    width_first_column={this.props.width_first_column}
                    element_color={this.props.element_color}
                    element_labels_color={this.props.element_labels_color} />
            </div>
        );
    }
}