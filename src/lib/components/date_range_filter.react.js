import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormControl, Grid, Row, Col } from "react-bootstrap";
import moment from "moment-timezone";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
/**
 * ExampleComponent is an example component.
 It takes `start` and `end` as main properties and renders two inputs
which open datepickers when they are clicked.
Keyword arguments:
- id (string; optional): The ID used to identify this component in Dash callbacks.
- end (string; default new Date()): The endDate of the range picker. It will fire a dash callback if it is updated.
- start (string; default new Date(new Date() - 1000 * 60 * 60 * 24)): The startDate of the range picker. It will fire a dash callback if it is updated."""
 */
export default class date_range_filter extends Component {
      constructor(props) {
            super(props);
            let start = moment(new Date(2016, 8, 20, 0, 0, 0, 0));
            let end = moment(start).add(5, "days").subtract(1, "second");
            //let start = date_range_filter.defaultProps.startDate;
            //let end = date_range_filter.defaultProps.endDate;
            console.log("start",start)
            console.log("end",end)
            this.state = {
              start: start,
              end: end,
              timezone: "America/Los_Angeles",
              secondDisplay: false
            };

            this.onClick = this.onClick.bind(this);
            this.applyCallback = this.applyCallback.bind(this);
      }

       applyCallback(startDate, endDate) {
            console.log("Apply Callback");
            console.log(startDate.format("DD-MM-YYYY HH:mm"));
            console.log(endDate.format("DD-MM-YYYY HH:mm"));
            this.setState({
              start: startDate,
              end: endDate
            });
            console.log(this.props)
            this.props.setProps({ endDate: endDate ,startDate: startDate })
      }

      rangeCallback(index, value) {
        console.log(index, value);
      }

      onClick() {
        let newStart = moment(this.state.start).subtract(3, "days");
        // console.log("On Click Callback");
        // console.log(newStart.format("DD-MM-YYYY HH:mm"));
        this.setState({ start: newStart });
      }

      renderTimezonePicker(ranges, local, maxDate) {
        let value = `${this.state.start.format(
          "DD-MM-YYYY HH:mm"
        )} - ${this.state.end.format("DD-MM-YYYY HH:mm")}`;
        let disabled = true;
        return (
          <div>
            <div style={{ display: "flex" }}>
              <button
                id={"Timezone-Click-Button"}
                onClick={() => {
                  let timezone = "Asia/Tokyo";
                  this.setState((state, props) => ({
                    timezone: timezone,
                    start: moment(state.start).tz(timezone),
                    end: moment(state.end).tz(timezone)
                  }));
                }}
              >
                Click Me to change Timezone
              </button>
              <div>
                {" "}
                Allows you to change timezone, this example is Japan Tokyo{" "}
              </div>
            </div>
            <br />
            <div id="DateTimeRangeContainerTimezone">
              <DateTimeRangeContainer
                ranges={ranges}
                start={this.state.start}
                end={this.state.end}
                local={local}
                maxDate={maxDate}
                applyCallback={this.applyCallback}
                rangeCallback={this.rangeCallback}
                smartMode
              >
                <FormControl
                  id="formControlsTextB"
                  type="text"
                  label="Text"
                  placeholder="Enter text"
                  style={{ cursor: "pointer" }}
                  disabled={disabled}
                  value={value}
                />
              </DateTimeRangeContainer>
            </div>
            <br />
          </div>
        );
      }

      renderGridPicker(ranges, local, maxDate) {
        let disabled = true;
        let value = `${this.state.start.format(
          "DD-MM-YYYY HH:mm"
        )} - ${this.state.end.format("DD-MM-YYYY HH:mm")}`;
        return (
          <Grid>
            <Row className="show-grid" style={{ textAlign: "center" }}>
              <Col xs={12} md={12} id="DateTimeRangeContainerMobileMode">
                <DateTimeRangeContainer
                  ranges={ranges}
                  start={this.state.start}
                  end={this.state.end}
                  local={local}
                  applyCallback={this.applyCallback}
                  smartMode
                >
                  <FormControl
                    id="date_range_filter"
                    type="text"
                    label="Text"
                    placeholder="Enter text"
                    style={{ cursor: "pointer" }}
                    disabled={disabled}
                    value={value}
                  />
                </DateTimeRangeContainer>
              </Col>
            </Row>
            <br />
          </Grid>
        );
      }

    render() {
        const {id,startDate, endDate} = this.props;
        let now = new Date();
        let start = moment(
            new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
        );
        let end = moment(start).add(1, "days").subtract(1, "seconds");
        let ranges = {
            "Today Only": [moment(start), moment(end)],
            "Yesterday Only": [
                  moment(start).subtract(1, "days"),
                  moment(end).subtract(1, "days")
            ],
            "3 Days": [moment(start).subtract(3, "days"), moment(end)],
            "5 Days": [moment(start).subtract(5, "days"), moment(end)],
            "1 Week": [moment(start).subtract(7, "days"), moment(end)],
            "2 Weeks": [moment(start).subtract(14, "days"), moment(end)],
            "1 Month": [moment(start).subtract(1, "months"), moment(end)],
            "This Month": [moment().startOf('month'), moment().endOf('month')],
            "Last Month": [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            "This Financial Year": [moment().month(new Date(start).getMonth()).startOf('month'), moment().month(new Date(start).getMonth()).startOf('month').subtract(1, 'days').add(1, 'year')],
            "1 Year": [moment(start).subtract(1, "years"), moment(end)],
            "Last Financial Year": [moment().month(3).startOf('month').subtract(1, 'year'), moment().month(3).startOf('month').subtract(1, 'days')]
            };
            let local = {
              format: "DD-MM-YYYY HH:mm",
              sundayFirst: false
            };
            let maxDate = moment(end).add(24, "hour");
            let pickersRender = (
              <div>
                {this.renderGridPicker(ranges, local, maxDate)}
              </div>
            );
            let pickers;
            if (this.state.timezoneDisplay) {
              pickers = this.renderTimezonePicker(ranges, local, maxDate);
            } else {
              pickers = pickersRender;
            }
        return (
            <div id={id}>
                 {pickers}
            </div>
        );
    }
}
date_range_filter.defaultProps = {
  startDate : new Date(new Date() - 1000 * 60 * 60 * 24),
  endDate : new Date(),
};

date_range_filter.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
    * The endDate of the range picker. It will fire a dash callback if it is updated.
    */
    endDate : PropTypes.oneOfType([
       PropTypes.instanceOf(moment),
       PropTypes.instanceOf(Date),
       PropTypes.string,
    ]),
    
    /**
    * The startDate of the range picker. It will fire a dash callback if it is updated.
    */
    startDate: PropTypes.oneOfType([
       PropTypes.instanceOf(moment),
       PropTypes.instanceOf(Date),
       PropTypes.string,
    ]),
    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};

export const defaultProps = date_range_filter.defaultProps;