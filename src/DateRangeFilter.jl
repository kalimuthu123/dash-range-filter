
module DateRangeFilter
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.1-a"

include("date_range_filter.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "date_range_filter",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "date_range_filter.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "date_range_filter.min.js.map",
    external_url = nothing,
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
