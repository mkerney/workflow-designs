function lineChart(options)
{

    if(options)
{
   options.container=options.container?options.container:"body"
    options.width=options.width?options.width:$(options.container).width()-10
    options.height=options.height?options.height:300
    options.marginTop=options.marginTop?options.marginTop:30
    options.marginBottom=options.marginBottom?options.marginBottom:30
    options.marginRight=options.marginRight?options.marginRight:20
    options.marginLeft=options.marginLeft?options.marginLeft:50
    options.xParam=options.xParam?options.xParam:$('#errormsg').html('Please check ... May be Data,x-Parameter or y-Parameter is missing.. ');
    options.yParam=options.yParam?options.yParam:$('#errormsg').html('Please check ... May be Data,x-Parameter or y-Parameter is missing.. ');
    options.gridx=options.gridx?options.gridx:false
    options.gridy=options.gridy?options.gridy:false

 }   





var svg = d3.select(options.container).append("svg").attr("width",options.width).attr("height",options.height),
    margin = {top: options.marginTop, right:options.marginRight , bottom:options.marginBottom , left:options.marginLeft },
    width =  options.width - margin.left - margin.right,
    height = options.height - margin.top - margin.bottom;

var parseTime = d3.timeParse("%Y");
    bisectDate = d3.bisector(function(d) { return d.year; }).left;

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);



function make_x_axis() {
    return d3.axisBottom(x)

     .ticks(5)
     .style("stroke","red");
    }


    function make_y_axis() {
    return d3.axisLeft(y)
     .ticks(5);
}

var line = d3.line()


    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.value); });

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


 var linedata = options.data;

    if (linedata) {
        if (linedata.length)
            drawline(linedata);
    } else {
        console.error("Data Handling Error : No data To plot the graph");
    }

function drawline(data)
{


    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([d3.min(data, function(d) { return d.value; }) / 1.005, d3.max(data, function(d) { return d.value; }) * 1.005]);

   
     //   .text("Population)");

if(options.gridx==true)
{

     g.append("g")
        .attr("class", "bs_linegrid")
        .attr("transform", "translate(0," + height + ")")
      //  .attr("class","gridx").style("fill","red")
        .call(make_x_axis()
            .tickSize(-height, 0, 0)
            //.tickFormat("%Y")
        )

}
if(options.gridy==true)
{

    g.append("g")            
        .attr("class", "bs_linegrid")
        .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat("")
        )

    }


 g.append("g")
        .attr("class", "bs_axisX")
       .attr("transform", "translate(0," + height + ")")
    //   .attr("transform", "rotate(0)")
        .call(d3.axisBottom(x).ticks(5));

    g.append("g")
        .attr("class", "bs_axisY")
        .call(d3.axisLeft(y).ticks(5).tickFormat(function(d) { return parseInt(d / 1000) + "k"; }))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "#5D6971")
        .style("font-size","20px")


     path = g.append("path")
        .data([data])
        .attr("class", "bs_line")
        .attr("d", line).transition().duration(400).ease(d3.easeLinear);
/*
  var totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(2000);
     */

    var focus = g.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    focus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", width)
        .attr("x2", width);

    focus.append("circle")
        .attr("class","bs_circle")
        .attr("r", 3.5);

    focus.append("text")
        .attr("class","bs_tooltip")
        .attr("y", -25)
      	.attr("dy", ".21em");

    svg.append("rect")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "bs_overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
      var x0 = x.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.year > d1.year - x0 ? d1 : d0;
      focus.attr("transform", "translate(" + x(d.year) + "," + y(d.value) + ")");
      focus.select("text").text(function() { return d.value; });
      focus.select(".x-hover-line").attr("y2", height - y(d.value));
      focus.select(".y-hover-line").attr("x2", width + width);
    }
}


}