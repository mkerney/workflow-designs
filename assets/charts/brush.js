$(document).ready(function () {
    var options = {
        "container": ".timeline-wrapper",
        "height": 50,
//        svg_backgroundcolor: "#425661",
        margin: {top: 0, bottom: 20, left: 0, right: 0},
        data: ["2017-03-19", "2017-03-21", "2017-03-24", "2017-03-27", "2017-03-29", "2017-03-31", "2017-04-02", "2017-04-04", "2017-04-06", "2017-04-08", "2017-04-10", "2017-04-12", "2017-04-14", "2017-04-16", "2017-04-18", "2017-04-20"]
    };
    createBrush(options);
});


//------------------------------------------------------------------
/**
 * 
 * Funciton to render brush
 */
function createBrush(brushoptions) {
    console.log(brushoptions)
    var container = brushoptions.container ? brushoptions.container : 'body';
    console.log(container)
    var svg_backgroundcolor = brushoptions.svg_backgroundcolor ? brushoptions.svg_backgroundcolor : "transparent";

    var height = brushoptions.height ? brushoptions.height : 50;
    var Svgwidth = brushoptions.width ? brushoptions.width : $(container).width();

    var margin = brushoptions.margin ? brushoptions.margin : {top: 20, bottom: 20, left: 20, right: 20};
    var data = brushoptions.data ? brushoptions.data : d3.range(width).map(Math.random);
    var xdomain = d3.extent(data, function (d) {
        return new Date(d);
    });
    $(container).empty();
    var width = Svgwidth - margin.left - margin.right;

    var x = d3.scaleTime()
            .domain(xdomain)
            .rangeRound([0, width]),
//                        d3.scaleLinear().range([0, width]),
            y = d3.randomNormal(height / 2, height / 8);
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    var colorScale = d3.scaleOrdinal().range(["#46a2de", "#5888C8", "#31d99c", "#de5942"]);
    var svg = d3.select(container).append("svg").attr("width", Svgwidth)
            .attr("height", height + margin.top + margin.bottom)
            .style("background-color", svg_backgroundcolor);
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    g.append("defs").append("svg:clipPath")
            .attr("id", "brushClip")
            .append("svg:rect")
            .attr("id", "clip_rect_brush")
            .attr("x", "0")
            .attr("y", "10")
            .attr("width", width)
            .attr("height", height);

    var brush = d3.brushX()
            .extent([[0, 0], [width, height]])
            .on("start brush end", function () {
                var s = d3.event.selection;
                if (s != null) {
                                var sx = s.map(x.invert);
                                var x0 = parseInt(sx[0].getTime());
                                var x1 = parseInt(sx[1].getTime());
                               chartsFilter(x0,x1)
                }
                
            });

    g.append("g")
            .attr("class", "axis axis--x-brush")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)).style("stroke", "#838F99");


    var gBrush = g.append("g")
            .attr("class", "brush").style("fill", "#334552")
            .call(brush).call(brush.move, x.range());
//                gBrush.call(brush.move, [0, 1].map(x));
    gBrush.select(".selection")
            .style("fill", "#0cb29a")
            .style("stroke", "#0cb29a")
            .style("fill-opacity", 0.3);
    gBrush.select(".overlay").style("fill", "transparent")
    var circle = g.append("g").attr("clip-path", "url(#brushClip)")
            .attr("class", "circle")
            .selectAll("circle")
            .data(data)
            .enter().append("circle")
            .style("fill", function (d) {
                return colorScale(d);
            })
            .attr("transform", function (d, i) {
                console.log(d)
                return "translate(" + x(new Date(d)) + "," + y() + ")";
            })
            .attr("r", 5);
}