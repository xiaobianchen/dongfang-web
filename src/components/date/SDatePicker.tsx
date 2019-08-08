import {DatePicker} from "antd";
import {DatePickerProps} from "antd/lib/date-picker/interface";
import moment from 'moment';
import React from "react";
import {DATE_FORMAT} from "./Const";

export interface SDatePickerProps extends DatePickerProps {
    onChange?: (value: any) => void;
}

class SDatePicker extends React.Component<SDatePickerProps, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            value: props.value,
            dateProps: props
        };
    }

    public componentWillReceiveProps(nextProps: any) {
        this.setState({value: nextProps.value, dateProps: nextProps});
    }

    public onChange = (date: any) => {
        if (date) {
            const value = parseInt(date.format('x'));
            this.setState({value}, () => this.props.onChange && this.props.onChange(value));
        } else {
            this.props.onChange && this.props.onChange(undefined);
        }
    };

    public render() {
        const {value, dateProps} = this.state;
        return (
            <DatePicker
                style={{width: '100%'}}
                format={DATE_FORMAT.DATE}
                {...dateProps}
                onChange={this.onChange}
                value={value && moment(value)}
            />
        );
    }
}

export default SDatePicker;