// THIS IS A BETA VERSION OF RETREVING GRAPHS FROM THE BACKEND.
// GRAPHS CAN BE DONE ON THE FRONTEND MORE EFFICIENTLY
// BUT I AM GOING TO BE USING MATPLOTLIB FOR TESTING PURPOSES.

function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b) => binary += String.fromCharCode(b));

  return window.btoa(binary);
};

class DataManager{
  constructor(data){
    this.data = data;
    if("Meta Data" in this.data){
      this.metadata = this.data["Meta Data"]
      delete this.data["Meta Data"];
    }
  }
  get_keys(){
    return Object.keys(this.data);
  }
  get(key){
    return this.data[key];
  }
  printAll(){
    console.log(this.data);
  }
  render_meta_data(e){
    let description = document.createElement("div");
    description.setAttribute("id","metadata");
    let title = document.createElement("h1");
    let text = document.createTextNode("Symbol: " + this.metadata["2. Symbol"]);
    let subtitle = document.createElement("h3");
    let subtext = document.createTextNode("Date: " + this.metadata["3. Last Refreshed"]);
    title.append(text);
    subtitle.append(subtext);
    description.appendChild(title);
    description.appendChild(subtitle);
    e.appendChild(description);
  }
  render(id){
    let e = document.getElementById(id);
    this.render_meta_data(e);
    this.render_graph(e);
  }
  render_graph(e){
    // let img_ele = document.createElement("img");
    // var BreakException = {};
    // this.get_keys().forEach((key)=>{
    //   let dataset = {
    //     'x':[],
    //     'y':[]
    //   };
    //   for (var k in this.data[key]){
    //     if (this.data[key].hasOwnProperty(k)){
    //       dataset['x'].push(k)
    //       dataset['y'].push(this.data[key][k])
    //     }
    //   }
    //   this.__graph(dataset, e);
    //   // throw BreakException;
    // });
    let dataset = {
        'x':[],
        'y':[]
      };
    for (var k in this.data['2. high']){
      if (this.data['4. close'].hasOwnProperty(k)){
        dataset['x'].push(k)
        dataset['y'].push(this.data['5. adjusted close'][k])
      }
    }
    this.__graph(dataset, e);
  }
  __graph(dataset, outputElement){
    let data = new FormData();
    // var json_str = JSON.stringify(dataset);
    // console.log(json_str);
    data.append("json", JSON.stringify(dataset))
    let url = 'graph';
    console.log("Hello World");
    fetch(url,
    {
      method: "POST",
      body: data
    })
      .then((response) => {
        if(response.status != 200){
          console.log('There is a problem. Status Code:', response.status);
        }
        response.arrayBuffer().then((buffer) => {
          let base64Flag = 'data:image/jpeg;base64,';
          let imageStr = arrayBufferToBase64(buffer);
          let img = document.createElement("img");
          img.src = base64Flag + imageStr;
          outputElement.appendChild(img);
        })
      })
      .catch(function(err){
          console.log('Fetch Error: -S',err);
      })
  }
}
