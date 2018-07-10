function render_function_list(data, list_id){
  function_list = document.getElementById(list_id);
  children = function_list.children;
  i = 0;
  while(children.length < data['data'].length){
    option = document.createElement('option');
    option.value = data['data'][i];
    function_list.appendChild(option);
    i++;
  }
  for(; i < data['data'].length; i++){
    children[i].value = data['data'][i];
  }
  while(data['data'].length < children.length){
    function_list.removeChild(function_list.lastChild);
  }
}

function lookup_function(funct, list_id){
  url = '/lookup?var=function&function=' + funct;
  fetch(url)
    .then(function(response){
      if(response.status != 200){
        console.log('There is a problem. Status Code:', response.status);
      }
      response.json().then(function(data){
        render_function_list(data, list_id);
      })
    })
    .catch(function(err){
      console.log('Fetch Error: -S', err);
    })
}

function render_parameter_container(data, parameter_id){
  parameters = document.getElementById(parameter_id);
  children = parameters.children;
  console.log(children);
  // console.log(parameters)
  // data = data['data']
  temp = document.createElement('div');
  name = document.createTextNode('blah');
  console.log(name, parameter_id);
  temp.appendChild(name);
  parameters.appendChild(temp);
  // console.log(children.length, data.length,data[0]['parameter'])
  // i = 0
  // while(children.length < data.length){
  //   parameter = document.createElement('div')
  //   text = data[i]['parameter']+": "
  //   name = document.createTextNode(text)
  //   console.log(name)
  //   // input = document.createElement("INPUT")
  //   // input.id = data[i]['parameter']+"_input"
  //   parameter.appendChild(name)
  //   // parameter.appendChild(input)
  //   parameters.appendChild(parameter)
  //   i++
  // }
  // console.log(parameters)
  // for(; i < data.length; i++){
  //   parameter = parameters[i]
  //   parameter[0].value = data[i]['parameter']+": "
  //   parameter[1].id = data[i]['parameter']+"_input"
  // }
  // while(data.length < children.length){
  //   parameters.removeChild(parameters.lastChild)
  // }
}

function lookup_parameters(funct, parameter_id){
  url = '/lookup?var=parameter&function=' + funct;
  fetch(url)
    .then(function(response){
      if(response.status != 200){
        console.log('There is a problem. Status Code:', response.status);
      }
      response.json().then(function(data){
        console.log(data);
        render_parameter_container(data, parameter_id);
      })
    })
    .catch(function(err){
      console.log('Fetch Error: -S',err);
    })
}

function hide_parameter_container(parameter_id){
  console.log('Hiding parameter container...');
}

function update_parameters(funct, list_id, parameter_id){
  children = document.getElementById(list_id).children;
  if(children.length > 0 && children[0].value == funct){
    console.log('passed the condition for updating parameters');
    lookup_parameters(funct, parameter_id);
  }
  else{
    hide_parameter_container(parameter_id);
  }
}

function verify_parameters(parameters){
  url = '/verify?'
  url += Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');
  data = get_json_data_from_url(url)
  return data
}
