// THIS IS A BETA VERSION OF RETREVING GRAPHS FROM THE BACKEND.
// GRAPHS CAN BE DONE ON THE FRONTEND MORE EFFICIENTLY
// BUT I AM GOING TO BE USING MATPLOTLIB FOR TESTING PURPOSES.


class DataManager{
  constructor(data){
    this.data = data;
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
  render_graph(key){
    graph_img = this.__graph(this.data[key]);
  }
  render_meta_data(e){
    let description = document.createElement("div");
  }
  render(id){
    // console.log(document.getElementById(id))
    let e = document.getElementById(id);
    this.render_meta_data(e)
  }
  __graph(dataset){
    data = new FormData();
    data.append("json", JSON.stringify(dataset))
    url = 'graph/';
    fetch(url,
    {
      method: "POST",
      body: data
    })
      .then(function(response){
        if(response.status != 200){
          console.log('There is a problem. Status Code:', response.status);
        }
      });
  }
}
