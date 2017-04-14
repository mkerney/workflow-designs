function WorldChart(barOptions) {
    if (barOptions.container) {
        $(barOptions.container).empty();
    }
    //--------------------------Initialize Values-----------------------------
    if (barOptions) {
        this.container = barOptions.container ? barOptions.container : "body"
        this.barColor = barOptions.barColor ? barOptions.barColor : "blue"
        this.readFromFile = (barOptions.readFromFile !== undefined) ? barOptions.readFromFile : false
        this.dataFileLocation = (barOptions.readFromFile !== undefined || barOptions.readFromFile) ? barOptions.dataFileLocation : undefined;
        this.data = (barOptions.data) ? barOptions.data : []
        this.showTicks = barOptions.showTicks ? barOptions.showTicks : true;
        this.ticks = barOptions.ticks ? barOptions.ticks : 'all';
        this.showLegends = (barOptions.showLegends !== undefined) ? barOptions.showLegends : false;
        this.xLabelRotation = barOptions.xLabelRotation ? barOptions.xLabelRotation : 0;
        this.yLabelRotation = barOptions.yLabelRotation ? barOptions.yLabelRotation : 0;
        this.margin = barOptions.margin ? {
            top: barOptions.margin.top ? barOptions.margin.top : 20,
            right: barOptions.margin.right ? barOptions.margin.right : 20,
            bottom: barOptions.margin.bottom ? barOptions.margin.bottom : 30,
            left: barOptions.margin.left ? barOptions.margin.left : 40
        } : {top: 20, right: 20, bottom: 50, left: 50};
        this.height = barOptions.height ? barOptions.height : 600;
        this.width = barOptions.width ? barOptions.width : $(this.container).width() - 10;
        this.showAxisX = (barOptions.showAxisX !== undefined) ? barOptions.showAxisX : true;
        this.showAxisY = (barOptions.showAxisY !== undefined) ? barOptions.showAxisY : true;
        this.showXaxisTicks = barOptions.showXaxisTicks !== undefined ? barOptions.showXaxisTicks : true;
        this.showYaxisTicks = barOptions.showYaxisTicks !== undefined ? barOptions.showYaxisTicks : true;
        this.groupedStacked = barOptions.groupedStacked ? barOptions.groupedStacked : "grouped";
        this.randomIdString = Math.floor(Math.random() * 10000000000);



    } else {
        console.error('Map Chart Initialization Error : Bar Chart Params Not Defined');
        return false;
    }
    var randomSubstring = this.randomIdString;

    var margin = this.margin,
            width = this.width - margin.left - margin.right,
            height = this.height - margin.top - margin.bottom,
            barColor = this.barColor;
    if(height>width){
        height = width;
        this.height = this.width;
    }
    //define tool tip
    $(".world_map_tooltip").remove();
    var tool_tip = $('body').append('<div class="world_map_tooltip" style="position: absolute; opacity: 1; pointer-events: none; visibility: hidden;"><span style=" font-size: 12px; position: absolute; white-space: nowrap;  margin-left: 0px; margin-top: 0px; left: 8px; top: 8px;"><span style="font-size:10px" class="tool_tip_x_val"></span><table><tbody><tr><td style="padding:0"> </td><td style="padding:0"><b>216.4 mm</b></td></tr><tr><td style="color:#434348;padding:0">New York: </td><td style="padding:0"><b>91.2 mm</b></td></tr><tr><td style="color:#90ed7d;padding:0">London: </td><td style="padding:0"><b>52.4 mm</b></td></tr><tr><td style="color:#f7a35c;padding:0">Berlin: </td><td style="padding:0"><b>47.6 mm</b></td></tr></tbody></table></span></div>');
//    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    var colorScale = d3.scaleThreshold()
            .domain([10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1500000000])
            .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)", "rgb(3,19,43)"]);


            var centered;

    var worlddata = this.data[0];
    var populationData = this.data[1];
    var path = d3.geoPath();
    //define svg
    var svg = d3.select(this.container)
            .append("svg")
            .attr('height', this.height)
            .attr('width', this.width)
            .attr('id', 'mainSvg-' + randomSubstring)
            .append('g')
            .attr('class', 'map');
//            .on("click", clicked);
var mapScale=Math.floor(width/6);

    var projection = d3.geoMercator()
            .scale(mapScale)
            .translate([width / 2, height / 2]);

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
            populationById[d.id] = +d.population;
        });


//        data.features.forEach(function (d) {
//            d.population = populationById[d.id]
//        });

        svg.append("g")
                .attr("class", "countries")
                .selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", function (d) {
                    if(populationById[d.id]){
                        return "#435DBE";
                    }else{
                        return "#3778BF";
                    }
                   
                    return colorScale(populationById[d.id]);
                })
                .style('stroke', 'white')
                .style('stroke-width', 0.5)
                .style("opacity", 0.8)
                .on("mouseover", function (d) {

                    $(this).find(".countries").css("fill", "#0DB199");
                    var populationTxt = '';
                    if (populationById[d.id]) {
                        populationTxt = '<br><span>Population: ' + populationById[d.id] + '</span>'
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
//                .on("click", clicked);
//                
//                 var groupedG = g.append("g")
//                .selectAll("g")
//                .data(data)
//                .enter().append("g").attr("class", "groupg")
//                .on("mouseover", function (d) {
//                    //show tooltip
//                    $(this).find(".background_rect").css("fill", "#0DB199");
//                    $(".world_map_tooltip").empty();
//                    var keys = d3.keys(d).slice(1);
//
//                    var text = '<span>' + d.x + '</span><table>';
//                    for (var i in keys) {
//                        text += '<tr><td style="color:' + colorScale(keys[i]) + '">' + keys[i] + '</td><td>' + d[keys[i]] + '</td></tr>';
//                    }
//                    text += '</table>';
//                    // var text = '<table><tr><td></td><td></td></tr></table>'
//                    $(".world_map_tooltip").html(text);
//                    return $(".world_map_tooltip").css("visibility", "visible");
//
//                })
//                .on("mousemove", function () {
//                    $(".world_map_tooltip").css("top", (d3.event.pageY - 10) + "px")
//                    return  $(".world_map_tooltip").css("left", (d3.event.pageX + 10) + "px");
//
//                })
//                .on("mouseout", function () {
//                    //hide tool-tip
//                    $(this).find(".background_rect").css("fill", "transparent");
//                    return $(".world_map_tooltip").css("visibility", "hidden");
//                })
//                .attr("transform", function (d) {
//                    return "translate(" + x0(d.x) + ",0)";
//                });
//        //append background rect for tooltip
//        groupedG.append("rect").attr("class", "background_rect")
//                .attr("x", 0).attr("y", 0).attr("width", x0.bandwidth()).attr("height", height).attr("fill", "transparent").attr("opacity", 0.5);

        svg.append("path")
                .datum(topojson.mesh(data.features, function (a, b) {
                    return a.id !== b.id;
                }))
//                 .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
                .attr("class", "names")
                .attr("d", path);
//          svg.selectAll("path")
//      .classed("active", centered && function(d) { return d === centered; });
        
//        function clicked(d) {
//  var x, y, k;
//  if (d && centered !== d) {
//    var centroid = path.centroid(d);
//    x = centroid[0];
//    y = centroid[1];
//    k = 4;
//    centered = d;
//  } else {
//    x = width / 2;
//    y = height / 2;
//    k = 1;
//    centered = null;
//  }
//    svg.selectAll("path")
//      .classed("active", centered && function(d) { return d === centered; });
//
//  svg.transition()
//      .duration(750)
//      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
//      .style("stroke-width", 1.5 / k + "px");
//    }
var zoom = d3.zoom()
//  .scaleExtent([1, 40])
  .on("zoom",function() {
        svg.attr("transform",d3.event.transform)
        svg.selectAll("path")  
            .attr("d", path.projection(projection)); 
})
  svg.call(zoom)
    }
}