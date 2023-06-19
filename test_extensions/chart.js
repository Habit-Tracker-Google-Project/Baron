
// Data pulling ----------------------------------------------------

async function url() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['urls'], (result) => {
      if (result.urls !== undefined) {
        resolve(Object.values(result.urls));
      } else {
        resolve([]);
      }
    });
  });
}

async function time() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['times'], (result) => {
      if (result.times !== undefined) {
        resolve(Object.values(result.times));
      } else {
        resolve([]);
      }
    });
  });
}


async function load(){
  // 1st chart -------------------------------------------------------------------------

  // attributes and data of the bar chart 
  let data = {
    labels: (await url()), // array of website names (this is placeholder array)
    datasets: [{
      label: 'Most Time Spent on These Tabs (sec)', // title of the chart
      data: (await time()), // array of times (this is a placeholder array)
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
    labels: (await url()),
    datasets: [{
      label: 'seconds',
      data: (await time()),
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

}

async function main (){
  console.log (await url());
  console.log (await time());
  load();
}

main();