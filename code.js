// connect to api
function pingApi(term, limit){
    fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${term}&limit=${limit}&api_key=PzJJ0lFdfBvklCX86nNRboLPqcNrN54kqAAij8nH`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert("An error occured! Please try again later"));
}

// display results in the DOM
function displayResults(response){
    $('.searched').show();
    console.log(response);
    console.log(response.data[1].fullName);
    response.data.forEach(function(found){
        console.log(found.fullName);
        console.log(found.description);
        console.log(found.url);
        $('.searched').append(`
            <div class="result">
            <h2>${found.fullName}</h2>
            <p>${found.description}</p>
            <a href="${found.url}" target="_blank">Checkout the park!</a>
            </div>
        `);

    });
    
}


// get user input from form
function getUsrInput(){
    $(document).on('submit', 'form', function (e) {
        e.preventDefault();
        // remove previous search
        $('.result').remove();
        // if there was an error befor hide error message
        $('.error').addClass('hidden');
       let term = $('#state').val();
       let limit = $('#number-to-display').val();
        // set term to lowercase
        term.toLowerCase();
        // check if term and number of results to display will work
        if(term.length < 3 && limit <= 10){
            pingApi(term, limit);
        }else{
           $('.error').removeClass('hidden');
        }
        
    });
}

(function(){
    getUsrInput();
}());
