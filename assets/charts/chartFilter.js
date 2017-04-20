function chartsFilter(x0, x1) {
    var temp = Math.floor(Math.random() * 2);
    //update force collapse
    var url = "assets/charts/ForceCollapse/data/miserables.json";
    if (temp == 1) {
        url = "assets/charts/ForceCollapse/data/miserables1.json";
    }
    var options = {
        "container": "#forceCollapse", //Container id where chart will be appended
        "header": "TRANSACTION LINKAGE", //Heading of Chart
        "uri": url, //Url of data
        "height": 300
    };
    chartcollapse(options);//calling chartcollapse function

    //update world map with random data
    var url = "assets/charts/WorldMap/data/mainData.json";
    if (temp == 1) {
        url = "assets/charts/WorldMap/data/CaseData.json";
    }
    var options = {
        header: "GEOGRAPHIC DISTRUBUTION", //Heading of Chart
        container: "#worldmapChart",
        uri1: "assets/charts/WorldMap/data/worldCountries.json", //Url of data
//    uri2 :"/proxy/api/cases/all",//Url of data "proxy/api/cases/all"
        uri2: url,
        height: 300

    }
    World(options);//calling World function
    //time scale bubble chart
    var url = "assets/charts/Timescale_Bubble/data/newData.json";
    if (temp == 1) {
        url = "assets/charts/Timescale_Bubble/data/newData.json";
    }
    var options = {
        header: "VOLUME MONITOR",
        uri1: url,
        uri2: "assets/charts/Timescale_Bubble/data/newData1.json",
        container: "#timescalebubble",
        height: 300
    }
    timescaleBubble(options);
    //my case dairy chart(grouped column)
    var url = "assets/charts/groupedColumChart/data/data.json";
    if (temp == 1) {
        url = "assets/charts/groupedColumChart/data/data1.json";
    }
    var options = {
        container: "#mycasedairy",
        header: "GROUPED PEER ANALYSIS",
        uri: url,
        height: 250
    }

    groupedColumn(options);
    //sankey diagram
     var url = "assets/charts/sank/js/data.json";
    if (temp == 1) {
        url = "assets/charts/sank/js/newData.json";
    }
    var options = {
        header: "TRANSACTIONS JOURNEY", //Heading of Chart
        Uri: url, //"proxy/api/cases/6eb696d9ccbd41b98c8f7eb12e2b9242/risk";//Url of data
        container: "#transactions_journey",
        height: 300,
    }
    sankey_diagram(options);//calling ClusterBubble function

}


