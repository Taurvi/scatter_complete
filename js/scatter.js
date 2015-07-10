var data;
var Scatter = function(settings) {
	var self = this
	self.defaults = {
		margin: {
		    left:50, 
		    bottom:100, 
		    top:50, 
		    right:50,
		 }, 
		 xVar:'1960', 
		 yVar:'2012'
	}
	self.settings = $.extend(false, self.defaults, settings)
	self.settings.height = 400 - self.settings.margin.bottom - self.settings.margin.top 
	self.settings.width  = 400 - self.settings.margin.left - self.settings.margin.right

	self.circleFunc = function(circle) {
      circle.attr('r', 10)
            .attr('fill', 'blue')
            .attr('cx', function(d) { return self.xScale(d[self.settings.xVar])})
            .attr('cy', function(d) { return self.yScale(d[self.settings.yVar])})
            .attr('title', function(d) {return d['Country Name']})
            .style('opacity', .3)
  	}

	self.build()
} 

Scatter.prototype.setScales = function() {
	var self = this
	var xMax =d3.max(data, function(d){return d[self.settings.xVar]})*1.05
    var xMin =d3.min(data, function(d){return d[self.settings.xVar]})*.95
    var yMin =d3.min(data, function(d){return d[self.settings.yVar]})*.9
    var yMax =d3.max(data, function(d){return d[self.settings.yVar]})*1.05
    self.xScale  = d3.scale.linear().range([0, self.settings.width]).domain([xMin, xMax])
    self.yScale = d3.scale.linear().range([self.settings.height, 0]).domain([yMin, yMax])

    // Define xAxis
    self.xAxis = d3.svg.axis().scale(self.xScale).orient('bottom')

  	// Define y axis
   	self.yAxis = d3.svg.axis().scale(self.yScale).orient('left')
}

Scatter.prototype.build = function() {
	var self = this
	self.svg = d3.select('#vis')
	    .append('svg')
	    .attr('height', 400)
	    .attr('width', 400)

	// G for the chart markers to be in (i.e., circles)
	self.g = self.svg.append('g')
		.attr('transform', 'translate(' + self.settings.margin.left + ',' + self.settings.margin.top + ')')
		.attr('height', self.settings.height)
		.attr('width', self.settings.width)

	// Add G element for x axis
	self.xAxigG = self.svg.append('g')
    	.attr('transform', 'translate(' + self.settings.margin.left + ',' + (self.settings.height + self.settings.margin.top) + ')')
    	.attr('class', 'axis')
  
  	// Add G element for y axis
  	self.yAxisG = self.svg.append('g')
    	.attr('class', 'axis')
      	.attr('transform', 'translate(' + self.settings.margin.left + ',' + (self.settings.margin.top) + ')')


	self.draw()
	self.addHover()
}

Scatter.prototype.draw = function() {
	var self = this

	self.setScales()
	// Bind self.settings.data
	var circles = self.g.selectAll('circle').data(self.settings.data)

	// Enter new elements
	circles.enter().append('circle').call(self.circleFunc)

	// Exit elements that may have left
	circles.exit().remove()

	// Transition all circles to new dself.settings.data
	self.g.selectAll('circle').transition().duration(1500).call(self.circleFunc)  

	self.xAxigG.call(self.xAxis)
	self.yAxisG.call(self.yAxis)
}

Scatter.prototype.addHover = function() {
	  $("circle").tooltip({
	      'container': 'body',
	      'placement': 'bottom'
	  }); 
}

Scatter.prototype.update = function(settings) {
	var self = this
	console.log('update ', settings)
	self.settings = $.extend(false, self.settings, settings )
	console.log(self.settings.xVar)
	self.draw()
}

