import date_range_filter
import dash
from dash.dependencies import Input, Output
import dash_html_components as html

app = dash.Dash(__name__)

app.layout = html.Div([
    date_range_filter.date_range_filter(
        id='input',
        value='my-value',
        label='my-label'
    ),
    html.Div(id='output')
])


@app.callback(Output('output', 'children'), [Input('formControlsTextB', 'value')])
def display_output(value):
    print( )
    return 'You have entered {}'.format(value)


if __name__ == '__main__':
    app.run_server(debug=True)
