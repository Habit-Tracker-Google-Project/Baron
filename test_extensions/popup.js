//console.log("This is a popup!")

chrome.storage.session.get(null, function(items) {
   const div = document.getElementById("splits");
   const table = document.createElement("table");
   var initial = document.createElement("tr");
   var cell1 = document.createElement("td");
   cell1.append("Websites");
   var cell2 = document.createElement("td");
   cell2.append("Time(s)");
   initial.append(cell1);
   initial.append(cell2);
   table.append(initial);
   
   // Iterate over the entries of the items object
   Object.entries(items).forEach(([key, item]) => {
      var row = document.createElement("tr");

      var urlCell = document.createElement("td");
      urlCell.append(key);

      var countCell = document.createElement("td");
      countCell.append(item);

      row.append(urlCell);
      row.append(countCell);
      table.append(row);
   });

   div.append(table);
});