function get_json_data_from_url(url){
  result = "hi"
  fetch(url)
    .then(
      function(response){
        if(response.status != 200){
          console.log('There is a problem. Status Code:', response.status)
        }
        response.json().then(function(data){
          // console.log(data)
          result = data
        })
      }
    )
    .catch(function(err){
        console.log('Fetch Error: -S', err)
    });
    return result
}
function render_function_list(data, list_id){
  function_list = document.getElementById(list_id)
  // while(function_list.hasChildNodes()){
  //   function_list.removeChild(function_list.firstChild)
  // }
  children = function_list.children
  i = 0
  while(children.length < data['data'].length){
    option = document.createElement("OPTION")
    option.value = data['data'][i]
    function_list.appendChild(option)
    i++
  }
  for(; i < data['data'].length; i++){
    children[i].value = data['data'][i]
  }
  while(data['data'].length < children.length){
    function_list.removeChild(function_list.lastChild)
  }
  console.log(data)
}

function lookup_function(funct, list_id){
  url = '/lookup?var=function&function='+funct
  fetch(url)
    .then(function(response){
      if(response.status != 200){
        console.log('There is a problem. Status Code:', response.status)
      }
      response.json().then(function(data){
        render_function_list(data, list_id)
      })
    })
    .catch(function(err){
      console.log('Fetch Error: -S', err)
    })
  // console.log(get_json_data_from_url(url))
  // // console.log(data)
  // return "None"
}

function get_parameters_from(funct){
  data = get_json_data_from_url('/lookup?var=parameter&function='+funct)
  return data
}

function verify_parameters(parameters){
  url = '/verify?'
  url += Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');
  data = get_json_data_from_url(url)
  return data
}
