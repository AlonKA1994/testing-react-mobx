import * as React from 'react';
import {LogFilter, LOG_FILTER_TITLES, LOG_FILTER_TYPES} from '../constants/logs';

interface INavBarProps {
    filter: LogFilter;
    onChangeFilter: (filter: LogFilter) => any;
}

interface INavBarState {
}

export class NavBar extends React.Component<INavBarProps,INavBarState> {

    constructor(props: INavBarProps){
        super(props);
        this.renderFilterLink = this.renderFilterLink.bind(this);

    }

    renderFilterLink(filter: LogFilter) {
        const title = LOG_FILTER_TITLES[filter];

        return (
            <button  onClick={this.props.onChangeFilter(filter)}>
                {title}
            </button>
        );
    }

    render() {

        const test = {};

        return (
            <div >
                <h1>WOrk</h1>
                <ul>
                    <li>
                        {/*<Link to="/view">Home</Link>*/}
                    </li>
                    {/*<li>*/}
                        {/*<button onClick={this.props.onChangeFilter(LOG_FILTER_TYPES[1])}>*/}
                            {/*{LOG_FILTER_TITLES[1]}*/}
                        {/*</button>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                        {/*<button onClick={this.props.onChangeFilter(LOG_FILTER_TYPES[2])}>*/}
                            {/*{LOG_FILTER_TITLES[2]}*/}
                        {/*</button>*/}
                    {/*</li>*/}
                </ul>
                <br/>
            </div>
        );
    }
}

