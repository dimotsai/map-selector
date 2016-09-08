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
import numeral from 'numeral';


export default class Panel extends React.Component {

    static propTypes = {
        rectangles: React.PropTypes.array,
        onRectangleDelete: React.PropTypes.func
    }

    static defaultProps = {
        rectanges: [],
        onRectangleDelete: function(idx) {}
    }

    state = {
        snackbarOpen: false
    }

    constructor(props) {
        super(props);
    }

    formatBounds(bounds) {
        let format = '0.000000';
        let ne = bounds.getNorthEast();
        let sw = bounds.getSouthWest();
        let neLat = numeral(ne.lat()).format(format);
        let neLng = numeral(ne.lng()).format(format);
        let swLat = numeral(sw.lat()).format(format);
        let swLng = numeral(sw.lng()).format(format);
        return {neLat, neLng, swLat, swLng};
    }

    handleSnackbarOpen() {
        this.setState({ snackbarOpen: true });
    }

    handleSnackbarClose() {
        this.setState({ snackbarOpen: false });
    }

    renderList() {
        let items = [];
        this.props.rectangles.forEach(function(r, idx, arr) {
            let bounds = this.formatBounds(r.getBounds());
            let text = `${bounds.neLat}, ${bounds.neLat} → ${bounds.swLat}, ${bounds.swLng}`;
            items.push(
                <CopyToClipboard text={JSON.stringify(bounds, null, 2)}>
                    <ListItem key={idx}
                      rightIconButton={<IconButton onTouchTap={ () => this.props.onRectangleDelete(idx)}><ActionDelete/></IconButton>}
                      primaryText={text}
                      onTouchTap={::this.handleSnackbarOpen}
                    />
                </CopyToClipboard>
            );
            if (idx != arr.length - 1) {
                items.push(<Divider/>);
            }
        }.bind(this));
        return <List> {items} </List>;
    }

    render() {
        return (
            <div id="panel">
              <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    {this.renderList()}
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
