function groupedColumChart(barOptions) {
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

        this.showAxisX = (barOptions.showAxisX !== undefined) ? barOptions.showAxisX : true;
        this.showAxisY = (barOptions.showAxisY !== undefined) ? barOptions.showAxisY : true;
        this.showXaxisTicks = barOptions.showXaxisTicks !== undefined ? barOptions.showXaxisTicks : true;
        this.showYaxisTicks = barOptions.showYaxisTicks !== undefined ? barOptions.showYaxisTicks : true;
        this.groupedStacked = barOptions.groupedStacked ? barOptions.groupedStacked : "grouped";
        this.randomIdString = Math.floor(Math.random() * 10000000000);
        this.groupedColumnHeader = barOptions.header ? barOptions.header : "GROUPED STACKED CHART";
          this.height = barOptions.height ? barOptions.height : 600;



    } else {
        console.error('Bar Chart Initialization Error : Bar Chart Params Not Defined');
        return false;
    }
    var randomSubstring = this.randomIdString;
    var actualOptions = jQuery.extend(true, {}, barOptions);
      var h1 = this.height;
      var h=parseInt(h1)+100;
    var header=this.groupedColumnHeader;
    console.log(h);

    var chartContainerdiv = '<div class="chartContainer"  align="center" style="width: 100%; margin: auto; margin-top: 0px; font-size: 14px;font-style: inherit;"> <div class="graphBox" style="height:'+h+'px;max-height: '+h+'px;min-height: '+h+'px;margin: auto; background-color: #374c59; width: 100%;left: 0px;top: 0px;position: relative;"> <div class="headerDiv" style="font-weight:bold;background-color: #425661;text-align: left;color: #239185; border-bottom: 1px solid rgba(192, 192, 192, 0.47);width: 100%; line-height: 2.5;font-size: 16px ;padding-left: 5px;">' + header + '</div><div id="groupedColumn_chart_div' + randomSubstring + '" class="chartContentDiv" style="width: 100%;"></div> </div></div>'
   //var chartContainerdiv = '<div class="chartContainer"  align="center" style="width: 80%; margin: auto; margin-top: 30px; font-size: 14px;font-family: roboto-regular;"> <div class="graphBox" style="margin: auto; background-color: #374c59; width: 100%;left: 0px;top: 0px;overflow: hidden;position: relative;"> <div class="headerDiv" style="font-weight:bold;background-color: #425661;text-align: left;color: #239185; border-bottom: 1px solid rgba(192, 192, 192, 0.47);width: 100%; line-height: 2.5;font-size: 16px ;padding-left: 5px;">' + barOptions.header + '</div><div id="groupedColumn_chart_div' + randomSubstring + '" class="chartContentDiv" style="width: 100%;"></div> </div></div>'
    $(this.container).html(chartContainerdiv);
    var chart_container = "#groupedColumn_chart_div" + randomSubstring;
  
    this.width = barOptions.width ? barOptions.width : $(chart_container).width() - 10;
    var groupedStacked = this.groupedStacked;
    var margin = this.margin,
            width = this.width - margin.left - margin.right,
            height = this.height - margin.top - margin.bottom,
            barColor = this.barColor;
     $(".graphBox").mCustomScrollbar({
        axis: "y",
       //theme: "3d"
    });
    if ($(chart_container).siblings(".headerDiv").find(".bstheme_menu_button").length == 0)
        var header_options = '<div style="float: right; padding: 0 10px; cursor: pointer;" class="bstheme_menu_button bstheme_menu_button_' + randomSubstring + '" data-toggle="collapse" data-target="#opt_' + randomSubstring + '"><i class="fa fa-ellipsis-v" aria-hidden="true"></i><div class="bstheme_options" style="position:absolute;right:10px;z-index:2000"> <div style="display:none;" id="opt_' + randomSubstring + '" class="collapse"><span class="header_refresh_' + randomSubstring + '"><i class="fa fa-refresh" aria-hidden="true"></i></span> <span class="header_table_' + randomSubstring + '"> <i class="fa fa-table" aria-hidden="true"></i></span> <span class="header_chart_' + randomSubstring + '" style="display:none" ><i class="fa fa-bar-chart" aria-hidden="true"></i></span></div></div> </div>';
    $(chart_container).siblings(".headerDiv").append(header_options);

//append div for switching between stack and group
    if (groupedStacked == "grouped") {
        $(chart_container).append('<div class="switchChartDiv" style = "color:#6C7E88;"><form style="float:left">  <label style = "padding:5px;cursor: pointer"><input type="radio" name="mode" value="grouped" checked> Grouped</label>  <label><input type="radio" name="mode" value="stacked" > Stacked</label></form></div>');

    } else {
        $(chart_container).append('<div class="switchChartDiv" style = "color:#6C7E88;"><form style="float:left">  <label style = "padding:5px;cursor: pointer"><input type="radio" name="mode" value="grouped" > Grouped</label>  <label><input type="radio" name="mode" value="stacked" checked> Stacked</label></form></div>');

    }// //APPEND legend header
    $(".groupedbarlegendContainerDiv").remove();
    $(chart_container).parent().find(".headerDiv").append("<div style='float:right;font-size:14px;' class='groupedbarlegendContainerDiv legend-container' id='legendContainer-" + (randomSubstring) + "'></div>")
    //define svg
    var svg = d3.select(chart_container)
            .append("svg")
            .attr('height', this.height)
            .attr('width', this.width)
            .attr('id', 'mainSvg-' + randomSubstring);

    //define tool tip
    $(".grouped_bar_tooltip").remove();
    var tool_tip = $('body').append('<div class="grouped_bar_tooltip" style="position: absolute; opacity: 1; pointer-events: none; visibility: hidden;"><span style=" font-size: 12px; position: absolute; white-space: nowrap;  margin-left: 0px; margin-top: 0px; left: 8px; top: 8px;"><span style="font-size:10px" class="tool_tip_x_val"></span><table><tbody><tr><td style="padding:0"> </td><td style="padding:0"><b>216.4 mm</b></td></tr><tr><td style="color:#434348;padding:0">New York: </td><td style="padding:0"><b>91.2 mm</b></td></tr><tr><td style="color:#90ed7d;padding:0">London: </td><td style="padding:0"><b>52.4 mm</b></td></tr><tr><td style="color:#f7a35c;padding:0">Berlin: </td><td style="padding:0"><b>47.6 mm</b></td></tr></tbody></table></span></div>');

    //define  scales
    var x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.2),
            y = d3.scaleLinear().rangeRound([height, 0]),
            x1 = d3.scaleBand().padding(0.2);
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    //define main grounp
    var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr('id', 'mainGroup-' + randomSubstring);

// get bar data and check for existance
    var columnData = this.data;
    if (columnData) {
        if (columnData.length)
            drawColumns(columnData, this.barColor);
    } else {
        console.error("Data Handling Error : No data To plot the graph");
    }

    //--------------------------------------------------------------------------
    /**
     * 
     * @param {array} data
     * @returns {undefined}Function to plot bars
     */
    function drawColumns(data) {
//        define clip
        var clip = g.append("defs").append("svg:clipPath")
                .attr("id", "clip")
                .append("svg:rect")
                .attr("id", "clip-rect")
                .attr("x", "0")
                .attr("y", "0")
                .attr("width", width)
                .attr("height", height);
        //get keys from object
        var keys = d3.keys(data[0]).slice(1);
        //define stack for stacked bar
        var stack = d3.stack()
                .keys(keys)
                /*.order(d3.stackOrder)*/
                .offset(d3.stackOffsetNone);

        var layers = stack(data);
//defines domains
        x0.domain(data.map(function (d) {
            return d.x;
        }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);



//x-aixs
        var x_g = g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .attr('id', 'xAxis-' + randomSubstring)
                .call(d3.axisBottom(x0));
        x_g.append("text")
                .attr("transform", "translate(" + (width / 2) + "," + 30 + ")")
                .attr("x", 8).attr("y", 10)
                .attr("dx", ".71em")
                .style("text-anchor", "middle")
                .style("fill", "#6c7e88")
                .text("Vehical Model").style("font-size", "14px");
        x_g.selectAll("path").style("stroke", "#6c7e88")
                .style("shape-rendering", "crispEdges")
                .style("fill", "none");
        x_g.selectAll("line").style("stroke", "#6c7e88")
                .style("shape-rendering", "crispEdges")
                .style("fill", "none");
        x_g.selectAll("text").style("fill", "#6c7e88")
                .style("font-size", "10px")
                .style("stroke", "none");


        y.domain([0, d3.max(data, function (d) {
                return d3.max(keys, function (key) {
                    return d[key];
                });
            })]);
//            d3.selectAll("g .axis axis--y").remove();
        var y_g = g.append("g")
                .attr("class", "axis axis--y")
                .attr('id', 'yAxis-' + randomSubstring)
                .call(d3.axisLeft(y).ticks(8, "s"));
//                .style("fill", "#6c7e88")
        y_g.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left)
                .attr("dy", "1.1em")
                .attr("dx", -height / 3)
                .style("text-anchor", "end")
                .style("fill", "#6c7e88")
                .text("Usability Rate").style("font-size", "14px");

        y_g.selectAll("path").style("stroke", "#6c7e88")
                .style("shape-rendering", "crispEdges")
                .style("fill", "none");
        y_g.selectAll("line").style("stroke", "#6c7e88")
                .style("shape-rendering", "crispEdges")
                .style("fill", "none");
        y_g.selectAll("text").style("fill", "#6c7e88")
                .style("font-size", "10px")
                .style("stroke", "none");
//add groups based on data
        var groupedG = g.append("g")
                .selectAll("g")
                .data(data)
                .enter().append("g").attr("class", "groupg")
                .on("mouseover", function (d) {
                    //show tooltip
                    $(this).find(".background_rect").css("fill", "#777");
                    $(".grouped_bar_tooltip").empty();
                    var keys = d3.keys(d).slice(1);

                    var text = '<span>' + d.x + '</span><table style = "border-collapse: collapse;font-size: 12px;min-width: 50px">';
                    for (var i in keys) {
                        text += '<tr><td style="font-size: 12px; min-width: 50px;color:#000">' + keys[i] + '</td><td>' + d[keys[i]] + '</td></tr>';
                    }
                    text += '</table>';
                    // var text = '<table><tr><td></td><td></td></tr></table>'
                    $(".grouped_bar_tooltip").html(text);
                    return $(".grouped_bar_tooltip").css("visibility", "visible").css("background-color", "#0cae96").css("padding", "10px").css("border-radius", "5px").css("border", "1px solid grey").css("font-size", "12px");

                })
                .on("mousemove", function () {
                    $(".grouped_bar_tooltip").css("top", (d3.event.pageY - 10) + "px")
                    return  $(".grouped_bar_tooltip").css("left", (d3.event.pageX + 10) + "px");

                })
                .on("mouseout", function () {
                    //hide tool-tip
                    $(this).find(".background_rect").css("fill", "transparent");
                    return $(".grouped_bar_tooltip").css("visibility", "hidden");
                })
                .attr("transform", function (d) {
                    return "translate(" + x0(d.x) + ",0)";
                });
        //append background rect for tooltip
        groupedG.append("rect").attr("class", "background_rect")
                .attr("x", 0).attr("y", 0).attr("width", x0.bandwidth()).attr("height", height).attr("fill", "transparent").attr("opacity", 1);
//append bars
        var prevVal = 0;
        var rect = groupedG.selectAll(".rect_" + randomSubstring)
                .data(function (d) {
                    prevVal = 0;
                    return keys.map(function (key, i) {
                        var curentObj = {key: key, value: d[key], value0: prevVal};
                        prevVal = prevVal + d[key];
                        return curentObj;
                    });
                })

                .enter().append("rect").attr("class", function (d) {
            return "rect_" + randomSubstring + " rect_" + randomSubstring + "_" + d.key
        }).attr("clip-path", "url(#clip)")
                .attr("x", function (d) {
                    return x1(d.key);
                })
                .attr("y", height)

                .attr("rx", (x1.bandwidth() / 4))
                .attr("ry", (x1.bandwidth() / 4))
                .attr("width", x1.bandwidth())

                .attr("height", function (d) {
                    return height - y(d.value);
                })
                .attr("fill", function (d) {
                    return colorScale(d.key);
                })
                .transition().duration(400).ease(d3.easeLinear)
                .attr("y", function (d) {
                    return y(d.value);
                });
        $('input[type=radio][name=mode]').change(function () {
            if ($(this).val() == "grouped") {
                plotGroupedBars();
            } else {
                plotStackedChart();
            }
        });

        if (groupedStacked != "grouped") {
            plotStackedChart();
        }
        function plotGroupedBars() {

            y.domain([0, d3.max(data, function (d) {
                    return d3.max(keys, function (key) {
                        return d[key];
                    });
                })]);
            d3.selectAll('#yAxis-' + randomSubstring).call(d3.axisLeft(y).ticks(8, "s"));
            var y_g = d3.selectAll('#yAxis-' + randomSubstring);
            y_g.selectAll("path").style("stroke", "#6c7e88")
                    .style("shape-rendering", "crispEdges")
                    .style("fill", "none");
            y_g.selectAll("line").style("stroke", "#6c7e88")
                    .style("shape-rendering", "crispEdges")
                    .style("fill", "none");
            y_g.selectAll("text").style("fill", "#6c7e88")
                    .style("font-size", "10px")
                    .style("stroke", "none");
            d3.selectAll(".rect_" + randomSubstring).transition()
                    .duration(300)
                    .delay(function (d, i) {
                        return i * 10;
                    })
                    .attr("x", function (d) {
                        return x1(d.key);
                    })
                    .attr("width", x1.bandwidth())
                    .transition()
                    .attr("y", function (d) {
                        return y(d.value);
                    })
                    .attr("height", function (d) {
                        return height - y(d.value);
                    }).attr("rx", (x1.bandwidth() / 4))
                    .attr("ry", (x1.bandwidth() / 4))

        }
        function plotStackedChart() {

            y.domain([0, d3.max(layers[layers.length - 1], function (d) {

                    return d[0] > d[1] ? d[0] : d[1];
                })]).nice();
            d3.selectAll('#yAxis-' + randomSubstring).call(d3.axisLeft(y).ticks(8, "s"));
            var y_g = d3.selectAll('#yAxis-' + randomSubstring);
            y_g.selectAll("path").style("stroke", "#6c7e88")
                    .style("shape-rendering", "crispEdges")
                    .style("fill", "none");
            y_g.selectAll("line").style("stroke", "#6c7e88")
                    .style("shape-rendering", "crispEdges")
                    .style("fill", "none");
            y_g.selectAll("text")
                    .style("fill", "#6c7e88")
                    .style("font-size", "10px")
                    .style("stroke", "none");
            d3.selectAll(".rect_" + randomSubstring).transition()
                    .duration(300)
                    .delay(function (d, i) {
                        return i * 10;
                    })
                    .attr("y", function (d) {
                        return y(d.value + d.value0);
                    })
                    .attr("height", function (d) {
                        return y(d.value0) - y(d.value + d.value0);
                    })
                    .transition()
                    .attr("x", function (d, i) {
                        if (x0.bandwidth() > 20) {
                            return (x0.bandwidth()) / 4;
                        } else {
                            return 0;
                        }
                    })
                    .attr("width", function () {
                        if (x0.bandwidth() > 20) {
                            return  x0.bandwidth() / 2;
                        } else {
                            return  x0.bandwidth();
                        }
                    })
                    .attr("rx", 0)
                    .attr("ry", 0);

        }

        //call function to ender legends
        renderLegend(keys, randomSubstring);
    }

    //------------------------------------------------------------------------
    function renderLegend(labelObject) {
        var numberOfLegends = labelObject.length;
//create legends div
        var legenddiv = d3.select('#legendContainer-' + randomSubstring)
//                .attr('class', 'legend-container')
//                .style('margin-top', '-53px')
//                .style('position','absolute')
//                .style('right', 0);

//holder for each legend
        var legendHolder = legenddiv.selectAll('.legend-holder')
                .data(labelObject)
                .enter()
                .append('div')
                .attr('class', function (d) {
                    return 'legend-holder legend_holder_div_' + randomSubstring + '_' + d;
                })
                .style('display', 'inline-block')
                .style('width', '60px')
                .style('opacity', '1')
                .style('cursor', 'pointer')
                .on("click", function () {
                    var current_div_class = $(this).attr("class");
                    console.log(current_div_class)
                    var rectClass = "rect_" + current_div_class.split(" ")[1].split("legend_holder_div_")[1];
                    console.log(rectClass)
                    // Get  current div opacity
                    var current_opacity = ($(this).css("opacity"));

                    newOpacity = current_opacity == 1 ? 0.5 : 1;
                    $(this).css("opacity", newOpacity);
                    $("." + rectClass).css("opacity", newOpacity == 0.5 ? 0.2 : newOpacity);

                });
//append legend circles
        legendHolder
                .append('div')
                .style('background-color', function (d, i) {
                    return colorScale(d)

                }).attr("class", "bar_legend_circles")
                .style("height", "10px")
                .style("width", "10px")
                .style("border-radius", "6px")
                .style("display", "inline-block");

//append legend text
        legendHolder.append("p").text(function (d, i) {
            return d;
        }).style('color', function (d, i) {
            return colorScale(d)

        }).style('display', 'inline-block').style('margin-left', '5px');

    }
    //------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */
    $("body").on("click", ".bstheme_menu_button_" + randomSubstring, function () {
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
            $(chart_container).empty();
            groupedColumChart(actualOptions);
        }
    });
//------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */
    $("body").on("click", ".header_table_" + randomSubstring, function () {
       var a=parseInt(h/55);


        $(chart_container).empty();
        $(this).css("display", "none");
        $(".header_chart_" + randomSubstring).css("display", "inline-block");
        var tbl = "<div id ='groupedChart_table_"+ randomSubstring + "'  style='background-color:#374C59;padding:5px;width:100%' ><table class='table-striped'  style='width:100%;padding:5px;color:#5A676E;'><thead><tr>";
        var keys = d3.keys(columnData[0]);
        $.each(keys, function (i, v) {
            if(v == "x"){
                 tbl = tbl + "<th>" + "TYPE" + "</th>";
            }else{
                 tbl = tbl + "<th>" + (v.toUpperCase()) + "</th>";
            }
           
        })
        tbl = tbl + "</tr></thead><tbody>"
        $.each(columnData, function (index, value) {

            tbl = tbl + "<tr>";
            $.each(keys, function (i1, v1) {
                if(typeof( value[v1])=="string")
                {
                tbl = tbl + "<td>" + (value[v1].toUpperCase()) + "</td>";
            }
            else
            {
                  tbl = tbl + "<td>" + value[v1] + "</td>";
            }
            });

            tbl = tbl + "</tr>"
        });
        tbl = tbl + "</tbody></table></div>";
        $(chart_container).append(tbl);
        $(".table-striped").DataTable({ "bLengthChange": false,"paging":false,"fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
    if (iDisplayIndex % 2 == 1) {
        //even color
        $('td', nRow).css('background-color', '#32464F');
    } else {
        $('td', nRow).css('background-color', '#283C45');
    }
} });
    //     $("#groupedChart_table_"+ randomSubstring).mCustomScrollbar({
    //     axis: "y",
    //    theme: "minimal"
    // });
   
        
$("#groupedChart_table_"+randomSubstring+" tr:even").css("background-color","#32464F");
    $("#groupedChart_table_"+randomSubstring+" tr:odd").css("background-color","#283C45");
      $("#groupedChart_table_"+randomSubstring+" tr:first").css("background-color","#0CB29A");
      
      
      var id1 = $("#groupedChart_table_"+randomSubstring).children('div').find('div').eq(0);
      var id2 = $("#groupedChart_table_"+randomSubstring).children('div').find('div').eq(1);
      var id3 = $("#groupedChart_table_"+randomSubstring).children('div').find('div').eq(2);
      var id1attr=id1.attr("id");
      var id2attr=id2.attr("id");
      var id3attr=id3.attr("id");


    
      $("#"+id1attr+" "+ "label").css("color","#666666")
       $("#"+id2attr+" "+ "label").css("color","#666666")
       $("#"+id3attr).css("color","#666666")
       
       $(" .dataTables_filter input").css({"margin-left": "0.5em",  "position": "relative","border": "0", "min-width": "240px",
    "background": "transparent",
   "border-bottom": "1px solid #666666",
   " border-radius":" 0",
    "padding":" 5px 25px",
   "color": "#ccc",
   "height":" 30px",
    "-webkit-box-shadow":" none",
    "box-shadow":" none"
})
    $(".dataTables_wrapper").css("background-color","#374C59");  


    });
//------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */
    $("body").on("click", ".header_chart_" + randomSubstring, function () {
        var chartId = $(this).parent().parent().parent().parent().siblings("div").attr("id");
        if ("#" + chartId == chart_container) {
            $(this).css("display", "none");
            $(".header_table_" + randomSubstring).css("display", "inline-block");
            $(chart_container).empty();
            new groupedColumChart(actualOptions);
        }
    });

}
