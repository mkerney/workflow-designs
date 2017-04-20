$(document).ready(function () {

    var options={

    header : "TOP LOCATIONS",//Heading of Chart
    container :"#example4",
    uri1 : "data/worldCountries.json",//Url of data
    uri2 :"/proxy/api/cases/6eb696d9ccbd41b98c8f7eb12e2b9242",//Url of data "proxy/api/cases/all"
    height:500
  
  }  
    World(options);//calling World function
});


//---------------------------------------------------------------------------
/**
*Function to call a function to plot WorldMap chart and to call function on window resize
*/

function World(options)
{
   
     //options.data=[WorldData, populationData] = options.data;
    //var populationData = [];
    var worldmapHeader = options.header;//Heading of Chart
    var worldmapId = options.container;
    var worldmapuri1 = options.uri1;//Url of data
    var worldmapuri2 = options.uri2;//Url of data
    loadWorldChart(options);
//responsivenss
    $(window).on("resize", function () {
        if ($(options.container).find("svg").length != 0) {
            $(options.container).empty();
            new WorldChart(options);
        }
    })





//---------------------------------------------------------------------------
/**
*Function to load data to plot WorldMap chart 
*/

    function loadWorldChart(options) {
        var WorldData = [];
    var populationData = [];
        $(options.container).siblings(".headerDiv").html(worldmapHeader);
    var flag_for_req = 0;

        d3.json(options.uri1, function (error, data) {

        flag_for_req++;
         WorldData = data;
            console.log("JJJ",WorldData);
            options.data=[WorldData,populationData];
            console.log(options.data);
        if (flag_for_req == 2) {           
                var exampleChart = new WorldChart(options);
        }
    });
        d3.json(options.uri2, function (error, data) {
                console.log("JJJ",WorldData);

        flag_for_req++;
        populationData = handleMapData(data.locations);
            options.data=[WorldData,populationData];
            console.log(options.data);
        if (flag_for_req == 2) {
                var exampleChart = new WorldChart(options);
        }
    });
}


//---------------------------------------------------------------------------
/**
*Function to handle data according to format of WorldMap Chart library
*/

    function handleMapData(data) {
        var finalData = [];
        $.each(data, function (i, d) {
        finalData.push({
                name: i,
                population: d
        });
    });
    return finalData;
}
}