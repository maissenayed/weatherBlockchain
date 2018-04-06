let getWordDataFromJson=function(json){
  let data=json.hmap.temp.map(e=>{
    return {
      'hc-key':e[0],
      'value':e[1]
    }
  });
  return data;
}

let getCountryDataFromJson=function(json){
  let data=[
    {name:'temp',
      data:json.map(e=>e.main.temp)
    },
    {name:'humidity',
      data:json.map(e=>e.main.humidity)
    },
    {name:'pressure',
      data:json.map(e=>e.main.pressure)
    }
  ]
  return data;
}




let getStateDataFromJson=function(json,query='temp'){
  let data={
    name:json[0].state[0].name,
    data:json.map(e=>{
      let tmp=new Date(e.timestamp);
      return [Date.UTC(tmp.getFullYear(),tmp.getMonth(),tmp.getDate(),tmp.getHours(),tmp.getMinutes(),tmp.getSeconds()),e.main[query]]
    }).sort((a,b)=>a[0]-b[0])
  }
  return data;
}

module.exports={
  getWordDataFromJson,
  getCountryDataFromJson,
  getStateDataFromJson
}
