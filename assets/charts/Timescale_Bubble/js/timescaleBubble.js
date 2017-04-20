function timescalebubbleChart(timeLineOptions) {
    if (timeLineOptions.container) {
        $(timeLineOptions.container).empty();
    }
//--------------------------Initialize Values-----------------------------
    if (timeLineOptions) {
        this.container = timeLineOptions.container ? timeLineOptions.container : "body"
        this.data = (timeLineOptions.data) ? timeLineOptions.data : []

        this.margin = timeLineOptions.margin ? {
            top: timeLineOptions.margin.top ? timeLineOptions.margin.top : 20,
            right: timeLineOptions.margin.right ? timeLineOptions.margin.right : 20,
            bottom: timeLineOptions.margin.bottom ? timeLineOptions.margin.bottom : 30,
            left: timeLineOptions.margin.left ? timeLineOptions.margin.left : 40
        } : {top: 20, right: 50, bottom: 50, left: 50};

        this.height = timeLineOptions.height ? timeLineOptions.height : 600;

        this.randomIdString = Math.floor(Math.random() * 10000000000);
    } else {
        console.error('Bar Chart Initialization Error : Bar Chart Params Not Defined');
        return false;
    }

    var actualOptions = jQuery.extend(true, {}, timeLineOptions);
    var randomSubstring = this.randomIdString;
    var data = this.data;
    this.uri1 = timeLineOptions.uri1;
    this.uri2 = timeLineOptions.uri2;
    this.timeLineHeader = timeLineOptions.header ? timeLineOptions.header : "TIME LINE CHART";
      var h1 = this.height;
      var h=parseInt(h1)+50;
     var chartContainerdiv = '<div class="chartContainer"  align="center" style="overflow:hidden;width: 100%; margin: auto; margin-top: 0px; font-size: 14px;font-style: inherit;"> <div class="graphBox" style="height:'+h+'px;max-height: '+h+'px;min-height: '+h+'px;margin: auto; background-color: #374c59; width: 100%;left: 0px;top: 0px;position: relative;"> <div class="headerDiv" style="font-weight:bold;background-color: #425661;text-align: left;color: #239185; border-bottom: 1px solid rgba(192, 192, 192, 0.47);width: 100%; line-height: 2.5;font-size: 16px ;padding-left: 5px;">' + this.timeLineHeader + '</div><div id="timeLine_chart_div' + randomSubstring + '" class="chartContentDiv" style="width: 100%;"></div> </div></div>'

    //var chartContainerdiv = '<div class="chartContainer"  align="center" style="width: 80%; margin: auto; margin-top: 30px; font-size: 14px;font-style: inherit;"> <div class="graphBox" style="margin: auto; background-color: #374c59; width: 100%;left: 0px;top: 0px;overflow: hidden;position: relative;"> <div class="headerDiv" style="font-weight:bold;background-color: #425661;text-align: left;color: #239185; border-bottom: 1px solid rgba(192, 192, 192, 0.47);width: 100%; line-height: 2.5;font-size: 16px ;padding-left: 5px;">' + this.timeLineHeader + '</div><div id="timeLine_chart_div' + randomSubstring + '" class="chartContentDiv" style="width: 100%;"></div> </div></div>'
    $(this.container).html(chartContainerdiv);
   
    var chart_container = "#timeLine_chart_div" + randomSubstring;
    this.width = timeLineOptions.width ? timeLineOptions.width : $(chart_container).width() - 50;
    var tool_tip = $('body').append('<div class="TimeScale_Bubble_Chart_tooltip" style="position: absolute; opacity: 1; pointer-events: none; visibility: hidden;background-color:#0cae96;padding: 10px;border-radius: 5px;border: 1px solid gray;font-size: 10px;color:black;"><span style=" font-size: 12px; position: absolute; white-space: nowrap;  margin-left: 0px; margin-top: 0px; left: 8px; top: 8px;"><span style="font-size:10px" class="tool_tip_x_val"></span><table><tbody><tr><td style="padding:0"> </td><td style="padding:0"><b>216.4 mm</b></td></tr><tr><td style="color:#434348;padding:0">New York: </td><td style="padding:0"><b>91.2 mm</b></td></tr><tr><td style="color:#90ed7d;padding:0">London: </td><td style="padding:0"><b>52.4 mm</b></td></tr><tr><td style="color:#f7a35c;padding:0">Berlin: </td><td style="padding:0"><b>47.6 mm</b></td></tr></tbody></table></span></div>');
    var current_uri1 = this.uri1;
    var current_uri2 = this.uri2;
    var timeline_header = this.timeLineHeader;
    var colorScale = d3.scaleOrdinal().range(["#46a2de", "#5888C8", "#31d99c", "#de5942", "#ffa618"]);
    var containerid = this.container;
    if ($(chart_container).siblings(".headerDiv").find(".bstheme_menu_button").length == 0)
        var header_options = '<div style="float: right; padding: 0 10px; cursor: pointer;" class="bstheme_menu_button bstheme_menu_button_' + randomSubstring + '" data-toggle="collapse" data-target="#opt_' + randomSubstring + '"><i class="fa fa-ellipsis-v" aria-hidden="true"></i><div class="bstheme_options" style="position:absolute;right:10px;z-index:2000"> <div style="display:none;" id="opt_' + randomSubstring + '" class="collapse"><span class="header_refresh_' + randomSubstring + '"><i class="fa fa-refresh" aria-hidden="true"></i></span> <span class="header_table_' + randomSubstring + '"> <i class="fa fa-table" aria-hidden="true"></i></span> <span class="header_chart_' + randomSubstring + '" style="display:none" ><i class="fa fa-bar-chart" aria-hidden="true"></i></span></div></div> </div>';
    $(chart_container).siblings(".headerDiv").append(header_options);
   
      $(".graphBox").mCustomScrollbar({
        axis: "y",
       //theme: "3d"
    });
    var data = this.data,
            margin = this.margin,
            width = this.width - margin.left - margin.right,
            height = this.height - margin.top - margin.bottom;

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var maxSize = d3.max(data, function (d) {
        return d.size;
    })
    var svg = d3.select(chart_container)
            .append("svg")
            .attr('height', this.height)
            .attr('width', this.width)
            .attr('id', 'mainSvg-' + randomSubstring);
    //define main grounp
    var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr('id', 'mainGroup-' + randomSubstring);


    x.domain(d3.extent(data, function (d) {
        return new Date(d.date);
    }));
    var ydomain = d3.extent(data, function (d) {
        return d.rate;
    })
    y.domain(ydomain).nice();
//    var ymin= y.invert(maxSize);
//    console.log(ymin,maxSize)
//    y.domain(ymin,ydomain[1])
    plottimescaleBubbleChart(data);
    function plottimescaleBubbleChart(data) {

        // Add the x Axis
        var x_g = g.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x)).attr("class", "axis")


        x_g.selectAll("path").style("stroke", "#6c7e88")
                .style("shape-rendering", "crispEdges")
                .style("fill", "none");
        x_g.selectAll("line").style("stroke", "#6c7e88")
                .style("shape-rendering", "crispEdges")
                .style("fill", "none");
        x_g.selectAll("text").style("fill", "#6c7e88")
                .style("font-size", "10px")
                .style("stroke", "none");

        // Add the y Axis
        var y_g = g.append("g")
                .call(d3.axisLeft(y)).attr("class", "axis")
                .style("stroke", "#6c7e88");
        y_g.selectAll("text").style("fill", "#6c7e88")
                .style("font-size", "10px")
                .style("stroke", "none");
        y_g.selectAll("path").style("stroke", "#6c7e88")
                .style("shape-rendering", "crispEdges")
                .style("fill", "none");
        y_g.selectAll("line").style("stroke", "#6c7e88")
                .style("shape-rendering", "crispEdges")
                .style("fill", "none");
        g.selectAll("circle")
                .data(data)
                .enter()
                .insert("circle")
                .attr("fill", "#49D2D9")
                .style("opacity", "0.4")
                .style("pointer-events", "all")
                .on("mouseover", function (d) {
                    $(this).css("opacity", 1);
                    var valueStr = '';
                    if (d.rate) {
                        valueStr = '<br><span><span style="color:#000;">Rate: </span>' + d.rate + '</span>'
                    }
                    $(".TimeScale_Bubble_Chart_tooltip").html('<span><span style="color:#000;"> Date: </span>' + d.date + '</span>' + valueStr);
                    return $(".TimeScale_Bubble_Chart_tooltip").css("visibility", "visible");
                })
                .on("mousemove", function () {
                    $(".TimeScale_Bubble_Chart_tooltip").css("top", (d3.event.pageY - 10) + "px")
                    return  $(".TimeScale_Bubble_Chart_tooltip").css("left", (d3.event.pageX + 10) + "px");

                })
                .on("mouseout", function () {
                    $(this).css("opacity", 0.4);
                    //hide tool-tip
                    return $(".TimeScale_Bubble_Chart_tooltip").css("visibility", "hidden");
                })

                .attr("cx", function (d) {
                    return x(new Date(d.date));
                })
                .attr("r", function (d) {
                    return (d.size)
                })
                .attr("cy", 0)
                .transition().duration(400).ease(d3.easeLinear)
                .attr("cy", function (d) {
                    return y(d.rate)
                })


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
            timescaleBubble(actualOptions);
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
        
        var tbl = "<div id ='timescale_table_" + randomSubstring + "'><table class='table table-striped' style='width:100%;background-color:#283C45;padding:5px;color:#5A676E;' ><thead><tr><th>Date</th><th>Value</th></tr></thead><tbody>";
        $.each(data, function (index, value) {
            tbl = tbl + "<tr><td>" + value.date + "</td><td>" + value.rate + "</td></tr>"

        });
        tbl = tbl + "</tbody></table></div>";
        $(chart_container).append(tbl);
        $("timescale_table_" + randomSubstring).DataTable({ "bLengthChange": false,"paging": false,"fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
    if (iDisplayIndex % 2 == 1) {
        //even color
        $('td', nRow).css('background-color', '#32464F');
    } else {
        $('td', nRow).css('background-color', '#283C45');
    }
} });
        
      

         $("#timescale_table_"+randomSubstring+" tr:even").css("background-color","#32464F");
    $("#timescale_table_"+randomSubstring+" tr:odd").css("background-color","#283C45");
      $("#timescale_table_"+randomSubstring+" tr:first").css("background-color","#0CB29A");
      
      var id1 = $("#timescale_table_"+randomSubstring).children('div').find('div').eq(0);
      var id2 = $("#timescale_table_"+randomSubstring).children('div').find('div').eq(1);
      var id3 = $("#timescale_table_"+randomSubstring).children('div').find('div').eq(2);
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
     
  


    });
//------------------------------------------------------------------------------
    /**
     * Fuction to handle show hide of header options
     */
    $("body").on("click", ".header_chart_" + randomSubstring, function () {
         $(chart_container).css("overflow","hidden");
        var chartId = $(this).parent().parent().parent().parent().siblings("div").attr("id");
        if ("#" + chartId == chart_container) {
            $(this).css("display", "none");
            $(".header_table_" + randomSubstring).css("display", "inline-block");
            $(containerid).empty();
            new timescalebubbleChart(actualOptions);
        }
    });


}




