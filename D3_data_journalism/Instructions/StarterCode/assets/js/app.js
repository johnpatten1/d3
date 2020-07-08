var svgWidth = 800;
var svgHeight = 500;

var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var data = d3.csv("../StarterCode/assets/data/data.csv").then(function(data){
    data.forEach(data => {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });
  
var xLinearScale = d3.scaleLinear()
  .domain([d3.min(data, data => data.poverty)-1, d3.max(data, data => data.poverty)+1])
  .range([0, width]);

var yLinearScale = d3.scaleLinear()
  .domain([d3.min(data, data => data.healthcare)-1, d3.max(data, data => data.healthcare)+1])
  .range([height, 0]);

var bottomAxis = d3.axisBottom(xLinearScale);
chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

var leftAxis = d3.axisLeft(yLinearScale);
chartGroup.append("g").call(leftAxis);

var bubbles = chartGroup.selectAll(".circle")
  .data(data)
  .enter()
  .append("circle")
  .classed("stateCircle", true)
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", "10");

bubbles.append("text")
  .exit()
  .data(data)
  .enter()
  .append("text")
  .text(d => d.abbr)
  .attr("x", d => xLinearScale(d.poverty))
  .attr("y", d => yLinearScale(d.healthcare)+5)
  .classed("stateText", true)

var yAxisLabel =  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .classed("active", true)
  .text("Lacks Healthcare (%)");

var labelsGroup = chartGroup.append("g")
  .attr("transform", `translate(${width / 2}, ${height + 20})`);

var xAxisLabel = labelsGroup.append("text")
  .attr("x", 0)
  .attr("y", 20)
  .classed("active", true)
  .text("In Poverty (%)");
});