function filter() { // created 2nd js file because the onkeydown event was not working in the 1st js file
	let classes = [];
	var input, filter, table, tr, td, i, txtValue;
  	input = document.getElementById("myInput");
  	filter = input.value.toUpperCase();
  	table = document.getElementById("table");
  	tr = table.getElementsByTagName("tr");
  	trcol = Array.from(tr);
  	tdr = table.getElementsByTagName("td");
  	tdCol = Array.from(tdr);
  	tdCol.forEach(function(td){
  		if (td) {
      			txtValue = td.textContent || td.innerText;
      			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				classes.push(td.parentElement.className);       
      			} 
	  		showHideRows(classes);
    		}      
  	})
}

function showHideRows(cls){
	trcol.forEach(function(tr){
		if((cls.indexOf(tr.className) > -1)){
			tr.style.display = "";
		} else{
			tr.style.display = "none";
		}
	})
}
