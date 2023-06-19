
let urls = url();
let times = time();

load();

// Data pulling ----------------------------------------------------

function url (){
  chrome.storage.local.get(['urls']).then((result) => {
    if (result !== undefined) {
        console.log("Url WORKS");
        return (Array)(result);
    }else{
      return new Array (0);
    }
  });
}

function time (){
  chrome.storage.local.get(['times']).then((result) => {
    if (result !== undefined) {
        console.log("Time WORKS");
        return (Array)(result);
    }else{
      return new Array (0);
    }
  });
}

function load(){
// 1st chart -------------------------------------------------------------------------

// attributes and data of the bar chart 
let data = {
  labels: urls, // array of website names (this is placeholder array)
  datasets: [{
    label: 'Most Time Spent on These Tabs (sec)', // title of the chart
    data: times, // array of times (this is a placeholder array)
    backgroundColor: [
      'rgba(54, 162, 235, 0.2)',
    ],
    borderColor: [
      'rgba(54, 162, 235, 1)',
    ],
    borderWidth: 1
  }]
};

// config 
const config1 = {
  type: 'bar',
  data,
  options: {
    scales: { // puts measurements on the side aka the scale of the x and y axis
      y: {
        beginAtZero: true
      }
    }
  }
};

// render init block
const barChart = new Chart(
  document.getElementById('barChart'),
  config1
);

// 2nd chart -------------------------------------------------------------------------

// attributes and data of the pie chart
data = {
  labels: urls,
  datasets: [{
    label: 'seconds',
    data: times,
    backgroundColor: [
      'rgba(255, 26, 104, 0.2)',
    ],
    hoverOffset: 4
  }]
};

// config 
const config2 = {
  type: 'pie',
  data: data,
};

// render init block
const pieChart = new Chart(
  document.getElementById('pieChart'),
  config2
);

console.log(urls);
console.log(times);

}