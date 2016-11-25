var jQuery = require('jquery');

jQuery(document).ready(function($) {
  updateChart('USD');
})

jQuery('#dolar').on('click', function(e) {
  updateChart('USD');
})

jQuery('#euro').on('click', function(e) {
  updateChart('EUR');
})

jQuery('#peso').on('click', function(e) {
  updateChart('ARS');
})

function updateChart (from) {
  jQuery(function () {
    jQuery.getJSON('http://apis.davidveloso.com/innventapi/exchangerate?to=BRL&from='+from, function (response) {
      
      var categories = [];
      var seriesValues = [];
      var data = response.data;
    
      for (var i = 0; i < data.length; i++) {
        categories.push(data[i].date);
        seriesValues.push(data[i].value);
      };
     
      var minValue = Math.min.apply(Math,seriesValues);

      Highcharts.chart('container', {
          chart: {type: 'areaspline'},
          title: {text: "Cotação da semana " + response.to + '/' + response.from },
          legend: {
              layout: 'vertical',
              align: 'left',
              verticalAlign: 'top',
              x: 150,
              y: 100,
              floating: true,
              borderWidth: 1,
              backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
          },
          xAxis: {
            categories: categories
          },
          yAxis: {
            min: minValue,
            title: {
              text: 'R$'
            }
          },
          tooltip: {
            shared: true,
            valuePrefix: 'R$'
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            areaspline: {
              fillOpacity: 0.5
            }
          },
          series: [{
            name: 'BRL',
            data: seriesValues
          }]
      });
    });
  })
}