let zip = document.getElementById('zip')
// Personal API Key for OpenWeatherMap API
let url = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey = '152ba0f551d48d0bac91dd5ec69ed265&units=imperial';

// Event listener to add function to existing HTML DOM element
const generate = document.getElementById('generate');
let feelings =  document.getElementById('feelings')
async function clickHandler (){
    let data = await getData(url,apiKey,zip.value)
    data.date = newDate
    data.feelings = feelings.value
    let s =  await postData("http://localhost:8000/add",{data})
    updateUI()
}

/* Function called by event listener */
generate.addEventListener('click',clickHandler)
/* Function to GET Web API Data*/
const getData = async(url, apiKey, zip)=>{
    const response = await fetch(`${url}${zip},us&appid=${apiKey}&units=imperial`)
    try {
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
   }
/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, 
        {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    );
    try {
        const newData = await postRequest;
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}
/* Function to GET Project Data */
async function updateUI (){
    let get = await fetch('http://localhost:8000/data')
    let data = await get.json()
    let container = document.getElementById('entryHolder').children
    container[0].textContent = data.date
    container[1].textContent = data.temperature
    container[2].textContent = data.feelings
    zip.value = "";
    feelings.value = "";
}
/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

