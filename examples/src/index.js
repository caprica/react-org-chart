import React from 'react';
import { render } from 'react-dom';

import OrgChart from '../../src';

const App = () => (
    <OrgChart>
        <OrgChart.Node label="Initech">
            <OrgChart.Node label="Bill Lumbergh">
                <OrgChart.Node label="Software">
                    <OrgChart.Node label="Peter Gibbons"/>
                    <OrgChart.Node label="Michael Bolton"/>
                    <OrgChart.Node label="Samir Nagheenanajar"/>
                </OrgChart.Node>
                <OrgChart.Node label="Collation">
                    <OrgChart.Node label="Milton Waddams"/>
                </OrgChart.Node>
            </OrgChart.Node>
            <OrgChart.Node label="The Bobs">
                <OrgChart.Node label="Bob Slydell"/>
                <OrgChart.Node label="Bob Porter"/>
            </OrgChart.Node>
        </OrgChart.Node>
    </OrgChart>
);

render(<App />, document.getElementById("root"));
