function WorldChart(worldOptions) {
    if (worldOptions.container) {
        $(worldOptions.container).empty();
    }
    //--------------------------Initialize Values-----------------------------
    if (worldOptions) {
        this.container = worldOptions.container ? worldOptions.container : "body"
        this.data = (worldOptions.data) ? worldOptions.data : []
        this.margin = worldOptions.margin ? {
            top: worldOptions.margin.top ? worldOptions.margin.top : 20,
            right: worldOptions.margin.right ? worldOptions.margin.right : 20,
            bottom: worldOptions.margin.bottom ? worldOptions.margin.bottom : 30,
            left: worldOptions.margin.left ? worldOptions.margin.left : 40
        } : {top: 20, right: 20, bottom: 50, left: 50};
        this.height = worldOptions.height ? worldOptions.height : 600;
        this.width = worldOptions.width ? worldOptions.width : $(this.container).width() - 10;
        this.randomIdString = Math.floor(Math.random() * 10000000000);

        this.uri1 = worldOptions.uri1;
        this.uri2 = worldOptions.uri2;
        this.worldHeader = worldOptions.header ? worldOptions.header : "WORLD CHART";

    } else {
        console.error('Map Chart Initialization Error : Bar Chart Params Not Defined');
        return false;
    }
    var actualOptions = jQuery.extend(true, {}, worldOptions);
    var randomSubstring = this.randomIdString;
    var containerid = this.container;
      var h1 = this.height;
      var h=parseInt(h1)+50;
     var chartContainerdiv = '<div class="chartContainer"  align="center" style="width: 100%; margin: auto; margin-top: 0px; font-size: 14px;font-style: inherit;"> <div class="graphBox" style="height:'+h+'px;max-height: '+h+'px;min-height: '+h+'px;margin: auto; background-color: #374c59; width: 100%;left: 0px;top: 0px;position: relative;"> <div class="headerDiv" style="font-weight:bold;background-color: #425661;text-align: left;color: #239185; border-bottom: 1px solid rgba(192, 192, 192, 0.47);width: 100%; line-height: 2.5;font-size: 16px ;padding-left: 5px;">' +this.worldHeader + '</div><div id="world_chart_div' + randomSubstring + '" class="chartContentDiv" style="width: 100%;"></div> </div></div>'

    //var chartContainerdiv = '<div class="chartContainer"  align="center" style="width: 80%; margin: auto; margin-top: 30px; font-size: 14px;font-family: roboto-regular;"> <div class="graphBox" style="margin: auto; background-color: #374c59; width: 100%;left: 0px;top: 0px;overflow: hidden;position: relative;"> <div class="headerDiv" style="font-weight:bold;background-color: #425661;text-align: left;color: #239185; border-bottom: 1px solid rgba(192, 192, 192, 0.47);width: 100%; line-height: 2.5;font-size: 16px ;padding-left: 5px;">' + this.worldHeader + '</div><div id="world_chart_div' + randomSubstring + '" class="chartContentDiv" style="width: 100%;"></div> </div></div>'
    $(containerid).html(chartContainerdiv);
    var chart_container = "#world_chart_div" + randomSubstring;
    var curretn_uri1 = this.uri1;
    var curretn_uri2 = this.uri2;
    var world_header = this.worldHeader;
    this.width = worldOptions.width ? worldOptions.width : $(chart_container).width() - 10;
    if ($(chart_container).siblings(".headerDiv").find(".bstheme_menu_button").length == 0)
        var header_options = '<div style="float: right; padding: 0 10px; cursor: pointer;" class="bstheme_menu_button bstheme_menu_button_' + randomSubstring + '" data-toggle="collapse" data-target="#opt_' + randomSubstring + '"><i class="fa fa-ellipsis-v" aria-hidden="true"></i><div class="bstheme_options" style="position:absolute;right:10px;z-index:2000"> <div style="display:none;" id="opt_' + randomSubstring + '" class="collapse"><span class="header_refresh_' + randomSubstring + '"><i class="fa fa-refresh" aria-hidden="true"></i></span> <span class="header_table_' + randomSubstring + '"> <i class="fa fa-table" aria-hidden="true"></i></span> <span class="header_chart_' + randomSubstring + '" style="display:none" ><i class="fa fa-bar-chart" aria-hidden="true"></i></span></div></div> </div>';
    $(chart_container).siblings(".headerDiv").append(header_options);
       $(".graphBox").mCustomScrollbar({
        axis: "y",
       //theme: "3d"
    });
    var margin = this.margin,
            width = this.width - margin.left - margin.right,
            height = this.height - margin.top - margin.bottom,
            barColor = this.barColor;
    if (height > width) {
        height = width;
        this.height = this.width;
    }
    //define tool tip
    $(".world_map_tooltip").remove();
    var tool_tip = $('body').append('<div class="world_map_tooltip" style="position: absolute; opacity: 1; pointer-events: none; visibility: hidden;background-color:#0cae96; padding: 10px;border-radius: 5px;border: 1px solid gray;font-size: 10px;color:#000;"><span style=" font-size: 12px; position: absolute; white-space: nowrap;  margin-left: 0px; margin-top: 0px; left: 8px; top: 8px;"><span style="font-size:10px" class="tool_tip_x_val"></span><table><tbody><tr><td style="padding:0"> </td><td style="padding:0"><b>216.4 mm</b></td></tr><tr><td style="color:#434348;padding:0">New York: </td><td style="padding:0"><b>91.2 mm</b></td></tr><tr><td style="color:#90ed7d;padding:0">London: </td><td style="padding:0"><b>52.4 mm</b></td></tr><tr><td style="color:#f7a35c;padding:0">Berlin: </td><td style="padding:0"><b>47.6 mm</b></td></tr></tbody></table></span></div>');
//    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    var colorScale = d3.scaleThreshold()
            .domain([10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1500000000])
            .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)", "rgb(3,19,43)"]);


    var centered;

    var worlddata = this.data[0];
    var populationData = this.data[1];
    var path = d3.geoPath();
    //define svg
    var svg = d3.select(chart_container)
            .append("svg")
            .attr('height', this.height)
            .attr('width', this.width)
            .attr('id', 'mainSvg-' + randomSubstring)
            .append('g')
            .attr('class', 'map');
//            .on("click", clicked);
    var mapScale = Math.floor(width / 10);

    var projection = d3.geoMercator()
            .scale(mapScale)
            .translate([width / 2, height / 1.5]);

    var path = d3.geoPath().projection(projection);



    var WorldData = this.data;
    if (WorldData) {
        if (WorldData.length)
            drawWorld(worlddata, populationData);
    } else {
        console.error("Data Handling Error : No data To plot the graph");
    }


    function drawWorld(data, population) {

        var populationById = {};

        population.forEach(function (d) {
            populationById[d.name] = +d.population;
        });



        svg.append("g")
                .attr("class", "countries")
                .selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", function (d) {
//                    console.log(d)
                    if (populationById[d.properties.name]) {
                        return "#435DBE";
                    } else {
                        return "#3778BF";
                    }

                    return colorScale(populationById[d.name]);
                })
                .style('stroke', 'white')
                .style('stroke-width', 0.5)
                .style("opacity", 0.8)
                .on("mouseover", function (d) {

                    $(this).find(".countries").css("fill", "#0DB199");
                    var populationTxt = '';
                    if (populationById[d.properties.name]) {
                        populationTxt = '<br><span>Population: ' + populationById[d.properties.name] + '</span>'
                    }
                    $(".world_map_tooltip").html('<span> Country: ' + d.properties.name + '</span>' + populationTxt);
                    return $(".world_map_tooltip").css("visibility", "visible");
                })
                .on("mousemove", function () {
                    $(".world_map_tooltip").css("top", (d3.event.pageY - 10) + "px")
                    return  $(".world_map_tooltip").css("left", (d3.event.pageX + 10) + "px");

                })
                .on("mouseout", function () {

                    return $(".world_map_tooltip").css("visibility", "hidden");
                })

        svg.append("path")
                .datum(topojson.mesh(data.features, function (a, b) {
                    return a.id !== b.id;
                }))
//                 .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
                .attr("class", "names")
                .attr("d", path);

        var zoom = d3.zoom()
//  .scaleExtent([1, 40])
                .on("zoom", function () {
                    svg.attr("transform", d3.event.transform)
                    svg.selectAll("path")
                            .attr("d", path.projection(projection));
                })
        svg.call(zoom)
    }
    //------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */
    $("body").on("click", ".bstheme_menu_button_" + randomSubstring, function () {
        console.log("here", $(this).attr("data-target"));
        var id = ($(this).attr("data-target"));
        if ($(id).css("display") == "none") {
            $(id).css("display", "inline-block");
        } else {
            $(id).css("display", "none");
        }
    });
//------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */
    $("body").on("click", ".header_refresh_" + randomSubstring, function () {
        var chartId = $(this).parent().parent().parent().parent().siblings("div").attr("id");
        if ("#" + chartId == chart_container) {
            $(containerid).empty();
            World(actualOptions);//calling World function
        }
    });
//------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */
    $("body").on("click", ".header_table_" + randomSubstring, function () {
      var a=parseInt(h/55);
      console.log(a)
        $(chart_container).empty();
        $(chart_container).css("overflow", "auto");
        $(this).css("display", "none");
        $(".header_chart_" + randomSubstring).css("display", "inline-block");
        var tbl = "<div id ='worldChart_table_" + randomSubstring + "' style='padding:5px;background-color: #425661;overflow:auto'><table class='table table-striped' style='width:100%;background-color:#425661;padding:5px;color:#5A676E;' ><thead><tr><th>Country</th><th>Value</th></tr></thead><tbody>";
        $.each(populationData, function (index, value) {
            tbl = tbl + "<tr><td>" + (value.name.toUpperCase()) + "</td><td>" + value.population + "</td></tr>"

        });
        tbl = tbl + "</tbody></table></div>";
        $(chart_container).append(tbl);
        $(".worldChart_table_" + randomSubstring).DataTable({ "bLengthChange": false,"paging": false,"fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
    if (iDisplayIndex % 2 == 1) {
        //even color
        $('td', nRow).css('background-color', '#32464F');
    } else {
        $('td', nRow).css('background-color', '#283C45');
    }
} });
        

   $("#worldChart_table_"+randomSubstring+" tr:first").css("background-color","#0CB29A");
      
        var id1 = $("#worldChart_table_" + randomSubstring).children('div').find('div').eq(0);
        var id2 = $("#worldChart_table_" + randomSubstring).children('div').find('div').eq(1);
        var id3 = $("#worldChart_table_" + randomSubstring).children('div').find('div').eq(2);
        var id1attr = id1.attr("id");
        var id2attr = id2.attr("id");
        var id3attr = id3.attr("id");



        $("#" + id1attr + " " + "label").css("color", "#666666")
        $("#" + id2attr + " " + "label").css("color", "#666666")
        $("#" + id3attr).css("color", "#666666")

        $(" .dataTables_filter input").css({"margin-left": "0.5em", "position": "relative", "border": "0", "min-width": "240px",
            "background": "transparent",
            "border-bottom": "1px solid #666666",
            " border-radius": " 0",
            "padding": " 5px 25px",
            "color": "#ccc",
            "height": " 30px",
            "-webkit-box-shadow": " none",
            "box-shadow": " none"
        })
$(".dataTables_wrapper").css("background-color","#374C59");




    });
//------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */
    $("body").on("click", ".header_chart_" + randomSubstring, function () {
        $(chart_container).css("overflow", "hidden");
        var chartId = $(this).parent().parent().parent().parent().siblings("div").attr("id");
        if ("#" + chartId == chart_container) {
            $(this).css("display", "none");
            $(".header_table_" + randomSubstring).css("display", "inline-block");
            $(containerid).empty();
            new WorldChart(actualOptions);
        }
    });
}
