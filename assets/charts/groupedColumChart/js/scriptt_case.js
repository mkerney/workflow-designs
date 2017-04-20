 var columnData = [];
 $(document).ready(function () {
//    load data
  loadgroupedColumnChart();       

    });
//responsivenss
    $(window).on("resize", function () {
        var groupedStacked = "grouped";
        if($("#example").find(".switchChartDiv").find('input[type=radio][name=mode]:checked')){
          groupedStacked = $("#example").find(".switchChartDiv").find('input[type=radio][name=mode]:checked').val() 
        }
        console.log();
        $("#example").empty();
        new groupedColumChart({
            container: "#example",
            data: columnData,
            groupedStacked:groupedStacked,
            height: '400'
        });
    })

function loadgroupedColumnChart(){
  var uri = "assets/groupedColumChart/data/data.json";

   
    d3.json(uri, function (error, data) {
        columnData = handleData(data, "model", "", "bar");
        var exampleChart = new groupedColumChart({
            container: "#example",
             data: columnData,
            height: '400'
        }); 
        }); 
}
//--------------------------------------------------------------------------------------------------------------
/**
 *Function to handle data
 */
function handleData(data, x, y, type) {
    var str = JSON.stringify(data);
    str = str.replace(/model/g, 'x');
    object = JSON.parse(str);
   
    return object;
}
