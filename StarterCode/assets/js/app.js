// set the dimensions and margins of the graph
var svgWidth = 900;
var svgHeight = 500;

var margin = {top: 20, right: 40, bottom: 70, left: 100};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

var chartGroup = svg.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
const healthData = d3.csvParse('data.csv')
// d3.csv('data.csv').then(function(healthData) {
    console.log('data.csv')
    
    // Convert the data to number using + and parse
    healthData.forEach(function(data){
        data.obesity = +data.obesity;
        data.income = +data.income;
    });

    // create scale functions
    var xScale = d3.scaleLinear()
    .domain(d3.extent(healthData, d => d.obesity))
    .range([0, width]);

    var yScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.income)])
    .range([height,0]);

    // create axis functions
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);
    
    // append axes to chart
    chartGroup.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(bottomAxis);

   
    chartGroup.append("g")
    .call(leftAxis);

    // Add dots
    var circlesGroup = chartGroup.selectAll("Circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.income))
    .attr("cy", d => yScale(obesity))
    .attr("r", 20)
    .attr("fill", "olive")
    .attr("opacity", "0.5");

    var circleLabels = chartGroup.selectAll(null).data(healthData).enter().append("text");

    circleLabels
        .attr("x", function(d) {
            return xScale(d.income);
        })
        .attr("y", function(d) {
            return yScale(d.obesity);
        })
        .text(function(d) {
            return d.abbr;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("text-anchor", "middle")
        .attr("fill", "white");
        
    // create axis labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Income ($)");
        
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Obesity");