import {Css} from './NxTimelineConsts.js'

export default class NxTimelineBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    componentWillUnmount() {}
   
    getBarStyle = () => {
       let style={
            maxWidth: this.props.bar_data.width + 1,
            width: this.props.bar_data.width,
            backgroundColor: this.props.element_color,
        };

        return style;
    }

    generateInnerHtml = () => {
        let innerHtml = this.props.bar_data.innerHtml;
        return {__html: innerHtml};
    }
      
    render() {        
        
        return (
            <div className={Css.TIMELINE_BAR} style={this.getBarStyle()}  >
               <div dangerouslySetInnerHTML={this.generateInnerHtml()} />
            </div>
        );
    }
}