class DataHistory(){
  constructor(data){
    this.data = {};
    data.forEach(date => {
      date.forEach(funct =>{
        this.data[funct][date] = data[date][funct]
      })
    });
  }
  get_keys(){
    return Object.keys(this.data);
  }
  get(key){
    return this.data[key];
  }
  printAll(){
    console.log(this.data)
  }
}

function pull(){
  url = '/pull?'+window.location.search.substr(1)
  fetch(url)
    .then(function(response){
      if(response.status != 200){
        console.log('There is a problem. Status Code:', response.status);
      }
      response.json().then(function(data){
        // console.log(data);
        return DataHistory(data);
      })
    })
    .catch(function(err){
      console.log('Fetch Error: -S',err);
    })
}
