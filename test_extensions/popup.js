console.log("This is a popup!")

chrome.storage.session.get(null, function(items) {
   const keys = Object.keys(items);
   console.log(keys);
   const div = document.getElementById("splits");
   const table = document.createElement("table");
   for (const key in keys) {
      console.log(key);
      console.log(items[key]);
      var row = document.createElement("tr");

      var urlCell = document.createElement("td");
      urlCell.append(key);

      var countCell = document.createElement("td");
      var item = items[key];
      countCell.append(item);

      row.append(urlCell);
      row.append(countCell);
      table.append(row);
      div.append(table);

   }
   // populate the table with data retrieved from session storage
});
 
