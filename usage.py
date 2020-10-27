import date_range_filter
import dash
from dash.dependencies import Input, Output
import dash_html_components as html

app = dash.Dash(__name__)

app.layout = html.Div([
    date_range_filter.date_range_filter(
        id='input',
        startDate='01-09-2020 00:00',
        endDate='01-09-2020 10:06'
    ),
    html.Div(id='output')
])


@app.callback(Output('output', 'children'), [Input('input', 'endDate'),Input('input', 'startDate')])
def display_output(endDate,startDate):
    print("value",endDate + startDate)
    return 'You have entered {}'.format(endDate + "####################" + startDate)


if __name__ == '__main__':
    app.run_server(debug=True)
