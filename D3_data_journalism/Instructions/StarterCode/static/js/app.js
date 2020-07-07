function init() {

    d3.json("samples.json").then((data) => {
    // Pulling in top data
    var toplabels = data.samples[0].otu_labels.slice(0, 10)
    var topids = data.samples[0].otu_ids.slice(0, 10).map(d => "OTU " + d);
    var topvaluessamples = data.samples[0].sample_values.slice(0, 10)
    var labels = data.samples[0].otu_labels
    var ids = data.samples[0].otu_ids
    var valuessamples = data.samples[0].sample_values
    var demographics = data.metadata[0]

    // Bar chart
    var trace1 = {
      x: topvaluessamples,
      y: topids,
      text: toplabels,
      type: "bar",
      orientation: "h"
    };
  
    var barData = [trace1];
  
    var layout = {
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
  
    Plotly.newPlot("bar", barData, layout);

    // Bubble chart
    var trace2 = {
        x: data.samples[0].otu_ids,
        y: data.samples[0].sample_values,
        mode: 'markers',
        marker: {
            size: data.samples[0].sample_values,
            color: data.samples[0].otu_ids
        }
    };

    var bubbleData = [trace2];

    var bubbleLayout = {
        showlegend: false,
        height: 600,
        width: 1200
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // Sample Metadata
    var metadatasamples = d3.select("#sample-metadata")
    Object.entries(demographics).forEach(function([key,value]){
        var row = metadatasamples.append("p");
        row.text(`${key}: ${value}`)
        })
    });

    // Belly Button Washing Chart
    // Enter a speed between 0 and 180
    var wfreq = 2;
    var level = (wfreq/9)*100;

    // Trig to calc meter point
    var degrees = 180 - level,
    radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
    
    // Path: may have to change to create a better triangle
    var mainPath = path1,
    pathX = String(x),
    space = ' ',
    pathY = String(y),
    pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var washingdata = [{ type: 'scatter',
        x: [0], y:[0],
        marker: {size: 14, color:'850000'},
        showlegend: false,
        name: 'speed',
        text: 2,
        hoverinfo: 'text+name'},
        { values: [1,1,1,1,1,1,1,1,8],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2'],
        textinfo: 'text',
        textposition:'inside',
        marker: {colors:['rgb(142, 179, 140)', 'rgb(147, 186, 145)',
                         'rgb(150, 191, 139)', 'rgb(216, 229, 162)',
                         'rgb(230, 232, 182)', 'rgb(233, 231, 204)', 'rgb(244, 241, 231)', 
                         'rgb(248, 243, 236)', 'rgba(0, 0, 0, 0)']},
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
        }];

    var washinglayout = {
        title: { text: "Bellon Button Washing Frequency" },
        shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
            color: '850000'
            }
        }],
        height: 400,
        width: 400,
        xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
        };

    Plotly.newPlot('gauge', washingdata, washinglayout);
};

init();