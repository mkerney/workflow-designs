$(document).ready(function () {

    var height = sessionStorage.getItem('f');
console.log(height);

    var options = {
        container: "#mycasedairy",
        header: "GROUPED PEER ANALYSIS",
        uri: "assets/charts/groupedColumChart/data/data.json",
        height: 250
    }

    groupedColumn(options);

});
function groupedColumn(options)
{
    var columnData = [];
    loadgroupedColumnChart(options);
//responsivenss
    $(window).on("resize", function () {
        if ($(options.container).find("svg").length != 0) {
            $(options.container).empty();

            if ($(options.container).find(".switchChartDiv").find('input[type=radio][name=mode]:checked')) {
                options.groupedStacked = $(options.container).find(".switchChartDiv").find('input[type=radio][name=mode]:checked').val()
            }
            $(options.container).empty();
            new groupedColumChart(options);
        }
    })

    function loadgroupedColumnChart(options) {
        d3.json(options.uri, function (error, data) {
            columnData = handleData(data, "model", "", "bar");
            options.data = columnData;
            var exampleChart = new groupedColumChart(options);

        });
    }
//--------------------------------------------------------------------------------------------------------------
    /**
     *Function to handle data
     */
    function handleData(data, x, y, type) {
        var str = JSON.stringify(data);
        str = str.replace(/model/g, 'x');
        var object = JSON.parse(str);

        return object;
    }
}

