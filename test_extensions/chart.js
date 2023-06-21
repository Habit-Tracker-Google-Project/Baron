
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

function bubblesort (arr1, arr2){
  if (arr2.length <= 1){
    return;
  }
  let loop = true;
  while (loop){
    let prev2 = arr2[0];
    let prev1 = arr1[0];
    loop = false;
    for (let i = 1; i < arr2.length; i++){
      if (arr2[i] > prev2){

        arr2[i - 1] = arr2[i];
        arr2[i] = prev2;

        arr1[i - 1] = arr1[i];
        arr1[i] = prev1;

        loop = true;
      }else{
        prev2 = arr2[i];
        prev1 = arr1[i];
      }
    }
  }
}

// prerequisite: array is sorted using bubble sort
function organize (arr1, arr2){

  if (arr2.length <= 30){
    return;
  }

  let total = 0;
  for (let i = arr2.length - 1; i > 30; i--){
    total += arr2.pop();
    arr1.pop();
  }

  arr2[30] = total;
  arr1[30] = "other";
  
}


async function load(){
  // 1st chart -------------------------------------------------------------------------

  let urls = await url();
  let times = await time();

  bubblesort(urls, times);
  organize(urls, times);

  // attributes and data of the bar chart 
  let data = {
    labels: (urls), // array of website names (this is placeholder array)
    datasets: [{
      label: ' Seconds', // title of the chart
      data: (times), // array of times (this is a placeholder array)
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
    labels: (urls),
    datasets: [{
      label: ' Seconds',
      data: (times),
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

load();