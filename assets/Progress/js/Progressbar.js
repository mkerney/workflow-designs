function progressbarChart(barOptions) {
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
        } : {top: 10, right: 30, bottom: 50, left: 80};
        this.height = barOptions.height ? barOptions.height : 600;
        this.width = barOptions.width ? barOptions.width : $(this.container).width() - 10;
        this.showAxisX = (barOptions.showAxisX !== undefined) ? barOptions.showAxisX : true;
        this.showAxisY = (barOptions.showAxisY !== undefined) ? barOptions.showAxisY : true;
        this.showXaxisTicks = barOptions.showXaxisTicks !== undefined ? barOptions.showXaxisTicks : true;
        this.showYaxisTicks = barOptions.showYaxisTicks !== undefined ? barOptions.showYaxisTicks : true;
        this.groupedStacked = barOptions.groupedStacked ? barOptions.groupedStacked : "grouped";
        this.randomIdString = Math.floor(Math.random() * 10000000000);



    } else {
        console.error('Bar Chart Initialization Error : Bar Chart Params Not Defined');
        return false;
    }
    var randomSubstring = this.randomIdString;
    //var barHeight = 15;
   
    //define svg
    var svg = d3.select(this.container)
            .append("svg")
            .attr('height', this.height)
            .attr('width', this.width)
            .attr('id', 'mainSvg-' + randomSubstring)
            .append("g").attr("transform","translate("+this.margin.left+","+this.margin.top+")");
    margin = this.margin,
            width = this.width - margin.left - margin.right,
            height = this.height - margin.top - margin.bottom,
            barColor = this.barColor;
var xScale = d3.scaleLinear()
  .range([0,width]);

//Creates the yScale
var yScale = d3.scaleBand()
  .range([height, 0])
  .padding(0.5)
  .domain(["FINANCE", "MARKETING", "BANKING", "EQUITIES", "FOREX", "FOOD"]);

//Defines the y axis styles
var yAxis = d3.axisLeft(yScale);
  //.scale(yScale)
  //.orient("left");

//Defines the y axis styles
var xAxis = d3.axisBottom(xScale)
  //.scale(xScale)
  //.orient("bottom")
  .tickFormat(function(d) {return d + "%"; })
  .tickSize(height); 

  //Sets the max for the xScale
  var maxX = d3.max(this.data, function(d) { return d.num2; });

  //Gets the min for bar labeling
  var minX = d3.min(this.data,function(d) { return d.num; });

  //Defines the xScale max
  xScale.domain([0, maxX ]);

  //Appends the y axis
  var yAxisGroup = svg.append("g")
    .attr("class", "bstheme_yaxis")
    .call(yAxis);

  //Appends the x axis    
  var xAxisGroup = svg.append("g")
    .attr("class", "bstheme_xaxis")
    .call(xAxis); 

    var progressbarData = this.data;
drawprogressbar(progressbarData);
     function drawprogressbar(data) {
     

     var categoryGroup = svg.selectAll(".g-category-group")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "g-category-group")
    .attr("transform", function(d) {
      console.log(d);
      return "translate(0," + yScale(d.category) + ")";
    });

  //Appends background bar   
  var bars2 = categoryGroup.append("rect")
    .attr("width",0)
    .attr("height", yScale.bandwidth())
    .attr("class", "bstheme_g-num2")
    .attr("transform", "translate(0,4)")
    .transition().duration(500).ease(d3.easeLinear)
    .attr("width", function(d) { return xScale(d.num2); });  

  //Appends main bar   
  var bars = categoryGroup.append("rect")
    .attr("width", 0)
    .attr("height", yScale.bandwidth())
    .attr("class", "bstheme_g-num")
    .attr("transform", "translate(0,4)")
    .transition().duration(500).ease(d3.easeLinear)
    .attr("width", function(d) { return xScale(d.num); });
  //Binds data to labels
  var labelGroup = svg.selectAll("bstheme_g-num")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "g-label-group")
    .attr("transform", function(d) {
      return "translate(0," + (yScale(d.category) +((yScale.bandwidth())))  + ")";
    });

  //Appends main bar labels   
  var barLabels = labelGroup.append("text") 
    .text(function(d) {return  d.num + "%";})
    .attr("x", width+2)
    .style("fill", "#4294D9") 
     .attr("y",0)
    .attr("class", "g-labels");


     }
 }
