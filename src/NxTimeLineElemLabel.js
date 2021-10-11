import {Css} from './NxTimelineConsts.js'

export default class NxTimeLineElemLabel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    
    }

    componentWillUnmount() {}

    getStyle = () => {
        let style={
            marginLeft: this.props.labelMarginLeft,
            marginTop: this.props.labelMarginTop,
            marginRight: this.props.labelMarginRight,
            backgroundColor: this.props.labelColor,
            width: 5,
            opacity:1,
         };
         
         if(this.props.label_data.innerHtml == undefined || this.props.label_data.innerHtml === '' || !this.props.label_data.show) 
            style.visibility = 'hidden';
         
         if(this.props.labelWidth != undefined) 
            style.width = this.props.labelWidth;

         if(this.props.isSelected) {
             style.zIndex = 3001;
             style.opacity = 1;
         }
 
         return style;
    }

    generateInnerHtml = () => {
        let innerHtml = this.props.label_data.innerHtml;

        return {__html: innerHtml};
    }
    
    render() {  
        if(this.props.labelMarginLeft === 5 && (this.props.label_data.innerHtml == undefined || this.props.label_data.innerHtml === '' || !this.props.label_data.show))
            return null;

        return (
            <div className={Css.TIMELINE_ELEM_LABELS} style={this.getStyle()}  >
               <div className="nx-timeline-label-text" dangerouslySetInnerHTML={this.generateInnerHtml()} />
            </div>
        );
    }
}