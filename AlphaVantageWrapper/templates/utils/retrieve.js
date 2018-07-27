function update(input_id, list_id, parameter_id, form_id){
  let f_name = document.getElementById(input_id).value;
  lookup_function(f_name, list_id);
  update_parameters(f_name, list_id, parameter_id, form_id);
}

function render_function_list(data, list_id){
  let function_list = document.getElementById(list_id);
  let children = function_list.children;
  i = 0;
  while(children.length < data['data'].length){
    let option = document.createElement('option');
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
  let url = '/lookup?var=function&function=' + funct;
  return fetch(url)
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

function render_parameter_container(data, parameter_id, form_id){
  let parameters = document.getElementById(parameter_id);
  let children = parameters.children;
  data = data['data'];
  i = 0;
  while(children.length < data.length){
    let parameter = document.createElement('div');
    let span = document.createElement('span');
    let text = document.createTextNode(data[i]['parameter']+": \t");
    let input = document.createElement('input');
    input.setAttribute('name', data[i]['parameter']);
    span.append(text);
    parameter.appendChild(span);
    parameter.appendChild(input);
    parameters.append(parameter);
    i++;
  }
  for(; i < data.length; i++){
    let parameter = parameters.children[i];
    parameter.children[0].innerHTML = data[i]['parameter']+": \t";
    parameter.children[1].setAttribute('name', data[i]['parameter']);
  }
  while(data.length < children.length){
    parameters.removeChild(parameters.lastChild);
  }
}

function lookup_parameters(funct, parameter_id, form_id){
  // console.log(form_id)
  let url = '/lookup?var=parameter&function=' + funct;
  fetch(url)
    .then(function(response){
      if(response.status != 200){
        console.log('There is a problem. Status Code:', response.status);
      }
      response.json().then(function(data){
        render_parameter_container(data, parameter_id, form_id);
      })
    })
    .catch(function(err){
      console.log('Fetch Error: -S',err);
    })
}

function hide_parameter_container(parameter_id){
  console.log('Hiding parameter container...');
}

function update_parameters(funct, list_id, parameter_id, form_id){
  let children = document.getElementById(list_id).children;
  if(children.length > 0 && children[0].value == funct){
    console.log('passed the condition for updating parameters');
    lookup_parameters(funct, parameter_id, form_id);
  }
  else{
    hide_parameter_container(parameter_id);
  }
}

function verify_parameters(parameters){
  let url = '/verify?';
  url += Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');
  let data = get_json_data_from_url(url);
  return data;
}
