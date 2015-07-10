var View = function(settings) {
	var self = this
	self.charts = []
	self.settings = settings
	self.build()
}

View.prototype.build = function() {
	var self = this
	d3.csv('data/data.csv', function(error, dat) {
	  // Data from http://data.worldbank.org/indicator/SP.DYN.LE00.IN
	  data = dat.filter(function(d){return d['1960'] != ''})
	  self.charts.push(new Scatter({data:data}))
	})	
	self.buildControls()
}

View.prototype.buildControls = function() {
	var self = this
	var s = $('<select />');
	d3.range(1960, 2013).map(function(d) {
	    $('<option />', {value: d, text: d}).appendTo(s);
	})

	s.appendTo('body'); // or wherever it should be
	s.on('change', function(d) {
		var value = this.value
		self.charts.map(function(chart) {
			chart.update({xVar:value})
		})
	})
}