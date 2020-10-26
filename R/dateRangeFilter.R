# AUTO GENERATED FILE - DO NOT EDIT

dateRangeFilter <- function(id=NULL, label=NULL, value=NULL) {
    
    props <- list(id=id, label=label, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'date_range_filter',
        namespace = 'date_range_filter',
        propNames = c('id', 'label', 'value'),
        package = 'dateRangeFilter'
        )

    structure(component, class = c('dash_component', 'list'))
}
