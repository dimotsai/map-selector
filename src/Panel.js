import React from 'react';
import ReactDOM from 'react-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import update from "react-addons-update";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import numeral from 'numeral';


export default class Panel extends React.Component {

    static propTypes = {
        shapes: React.PropTypes.array,
        onShapeDelete: React.PropTypes.func
    }

    static defaultProps = {
        shapes: [],
        onShapeDelete: function(idx) {}
    }

    state = {
        snackbarOpen: false
    }

    constructor(props) {
        super(props);
    }

    formatRectangle(rectangle) {
        let bounds = rectangle.getBounds();
        let format = '0.000000';
        let ne = bounds.getNorthEast();
        let sw = bounds.getSouthWest();
        let neLat = numeral(ne.lat()).format(format);
        let neLng = numeral(ne.lng()).format(format);
        let swLat = numeral(sw.lat()).format(format);
        let swLng = numeral(sw.lng()).format(format);
        return {neLat, neLng, swLat, swLng};
    }

    formatCircle(circle) {
        let format = '0.000000';
        return {
            centerLat: numeral(circle.getCenter().lat()).format(format),
            centerLng: numeral(circle.getCenter().lng()).format(format),
            radius: numeral(circle.getRadius()).format(format)
        };
    }

    handleSnackbarOpen() {
        this.setState({ snackbarOpen: true });
    }

    handleSnackbarClose() {
        this.setState({ snackbarOpen: false });
    }

    renderList() {
        let items = [];
        this.props.shapes.forEach(function(s, idx, arr) {
            let text = '';
            let json = '';
            if (s instanceof google.maps.Rectangle) {
                let rect = this.formatRectangle(s);
                text = `${rect.neLat}, ${rect.neLat} → ${rect.swLat}, ${rect.swLng}`;
                json = JSON.stringify(rect, null, 2);
            } else if (s instanceof google.maps.Circle) {
                let circle = this.formatCircle(s);
                text = `${circle.centerLat}, ${circle.centerLng} → ${circle.radius}`;
                json = JSON.stringify(circle, null, 2);
            }
            items.push(
                <CopyToClipboard key={idx} text={json}>
                    <ListItem
                      rightIconButton={<IconButton onTouchTap={ () => this.props.onShapeDelete(idx)}><ActionDelete/></IconButton>}
                      primaryText={text}
                      onTouchTap={::this.handleSnackbarOpen}
                    />
                </CopyToClipboard>
            );
            if (idx != arr.length - 1) {
                let key = `${idx}-d`;
                items.push(<Divider key={key}/>);
            }
        }.bind(this));
        return <List> {items} </List>;
    }

    render() {
        const style = {margin: 8, float: 'right'};
        const json = JSON.stringify(this.props.shapes.map(s => {
            if (s instanceof google.maps.Rectangle) {
                return this.formatRectangle(s)
            } else if (s instanceof google.maps.Circle) {
                return this.formatCircle(s)
            }
        }), null, 2);
        return (
            <div id="panel">
              <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    {this.renderList()}
                    <CopyToClipboard text={json}>
                        <RaisedButton label="全部複製" primary={true} style={style} onTouchTap={::this.handleSnackbarOpen} />
                    </CopyToClipboard>
                    <RaisedButton label="清空" secondary={true} style={style} onTouchTap={ () => this.props.onShapeDelete('all') }/>
                    <Snackbar
                     open={this.state.snackbarOpen}
                     message="已複製到剪貼簿"
                     autoHideDuration={2000}
                     onRequestClose={::this.handleSnackbarClose}
                    />
                </div>
              </MuiThemeProvider>
            </div>
        )}
}
