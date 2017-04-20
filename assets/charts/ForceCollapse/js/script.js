// var collapseData = [];
$(document).ready(function () {
//    load data
var height = sessionStorage.getItem('f9');
console.log(height);

var options = {
        "container": "#forceCollapse", //Container id where chart will be appended
        "header": "TRANSACTION LINKAGE", //Heading of Chart
        "uri": "assets/charts/ForceCollapse/data/miserables.json", //Url of data
        "height": 300
    };
    chartcollapse(options);//calling chartcollapse function


});
 //---------------------------------------------------------------------------
/**
 *Function to call a function to plot CaseTimeLine chart and to call function on window resize
 */

function chartcollapse(options)
{
    var collapseData = [];//array of data
    var current_options = options;
    loadcollapseChart(current_options);
//responsivenss
    $(window).on("resize", function () {
        if ($(current_options.continer).find("svg").length != 0) {
            $(current_options.container).empty();
            var data = jQuery.extend(true, [], collapseData);
            new collapseChart(options);
        }
    });   
//responsivenss
// $(window).on("resize", function () {
//     $("#example12").empty();
//     new collapseChart({
//         container: "#example12",
//         data: collapseData,
//         height: '600'
//     });
// })

//---------------------------------------------------------------------------
    /**
     *Function to load data to plot CaseTimeLine chart 
     */
    function loadcollapseChart(current_options) {
        var uri = current_options.uri;
        d3.json(uri, function (error, data) {
            options.data = jQuery.extend(true, [], data);
            var chart_options = jQuery.extend(true, {}, options);
            var exampleChart = new collapseChart(chart_options);

        });
    }

}




