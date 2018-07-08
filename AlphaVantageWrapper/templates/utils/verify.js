function get_json_data_from_url(url){
  fetch(url)
    .then(
      function(response){
        if(response.status != 200){
          console.log('There is a problem. Status Code:', response.status)
        }
        response.json().then(function(data){
          return data
        })
      }
    )
    .catch(function(err){
        console.log('Fetch Error: -S', err)
    });
}

function get_function_options(funct){
  data = get_json_data_from_url('/function?function='+funct)
  return data
}

function get_parameters_from(funct){
  data = get_json_data_from_url('/parameter?function='+funct)
  return data
}

function verify_parameters(parameters){
  url = '/verify?'
  url += Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');
  data = get_json_data_from_url(url)
  return data
}
