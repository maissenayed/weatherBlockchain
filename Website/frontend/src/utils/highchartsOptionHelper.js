let wordHelper=function(data,map,callback){

  return {


    chart: {
      borderWidth:1,
      map:map,
      height:'50%'
    },


    title: {
      text: 'Word Map'
    },

    subtitle: {
      text: 'Test'
    },

    colorAxis: {
      min: 0
    },


    series: [{
      data: data,
      name: 'Random data',
      states: {
        hover: {
          color: '#BADA55'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      },
      point: {
        events: {
          // On click, look for a detailed map
          click: function ($event) {
            callback($event.point.properties['hc-key']);

          }
        }
      }
    }]




  }


}



let coutryHelper=function(cityPayload,data,mychart,add,remove){


  return{
    chart: {
      map:cityPayload,
      height:'30%'
    },
    title: {
      text: 'states'
    },
    mapNavigation: {
      enabled: true,
      enableMouseWheelZoom: false,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    colorAxis: {
      min: 0
    },
    series: [{
      allowPointSelect: true,
      data: data,
      name: 'Random data',
      states: {
        hover: {
          color: '#BADA55'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      },
      point: {
        events: {
          select: function ($event) {
            add(this['hc-key'])
          },
          unselect: function($event){
            remove(this['hc-key'])
          }
        }
      }
    }]
  }

}



let stateHelper=function(data){
  let today=new Date();
  return {
    title: {
      text: 'Detailed informations'
    },

    subtitle: {
      text: 'Source: thesolarfoundation.com'
    },

    yAxis: {
      title: {
        text: 'Temperature in °'
      }
    },
    xAxis: {
      title: {
        enabled: true,
        text: 'Hours of the Day'
      },
      type: 'datetime',

      dateTimeLabelFormats : {
        second: '%H:%M:%S',
        hour: '%I %p',
        minute: '%I:%M %p'
      }/*,
	min: Date.UTC(today.getFullYear(),today.getMonth(),(today.getDate())-1,20,42,55),
	max: Date.UTC(today.getFullYear(),today.getMonth(),(today.getDate()-1),20,44,0)*/

    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
    series:data,
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }

  }
}



module.exports={
  wordHelper,
  coutryHelper,
  stateHelper
}
