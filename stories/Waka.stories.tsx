import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {AggregateFunction, Waka} from '../components/waka';

export default {
    title: 'Example/Waka',
    component: Waka,
} as ComponentMeta<typeof Waka>;

const Template: ComponentStory<typeof Waka> = (args)=> <Waka {...args}/>;

export const Average = Template.bind({});
Average.args = {
    aggregateFunction: AggregateFunction.average,
    limit: 20
}

export const Median = Template.bind({});
Median.args = {
    aggregateFunction: AggregateFunction.median,
    limit: 20
}

export const Sum = Template.bind({});
Sum.args = {
    aggregateFunction: AggregateFunction.sum,
    limit: 20
}