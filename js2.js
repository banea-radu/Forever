const searchField = document.getElementById("myInput");
searchField.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   filter();
  }
});

function filter() { // created 2nd js file because the onkeydown event was not working in the 1st js file
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("table");
	tr = table.getElementsByTagName("tr");
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[1];
		if (td) {
      			txtValue = td.textContent || td.innerText;
      			if (txtValue.toUpperCase().indexOf(filter) > -1) {
        			if (i % 9 == 0) {
	        			tr[i].style.display = "";
	            			tr[i+1].style.display = "";
	            			tr[i+2].style.display = "";
					tr[i+3].style.display = "";
	            			tr[i+4].style.display = "";
					tr[i+5].style.display = "";
	            			tr[i+6].style.display = "";
					tr[i+7].style.display = "";
	            			tr[i+8].style.display = "";
	            			i = i+8;
	        		}
				if (i % 9 == 1) {
	        			tr[i-1].style.display = "";
	            			tr[i].style.display = "";
					tr[i+1].style.display = "";
					tr[i+2].style.display = "";
					tr[i+3].style.display = "";
					tr[i+4].style.display = "";
					tr[i+5].style.display = "";
					tr[i+6].style.display = "";
					tr[i+7].style.display = "";
	            			i = i+7;
	        		}
	        		if (i % 9 == 2) {
	        			tr[i-2].style.display = "";
	            			tr[i-1].style.display = "";
	            			tr[i].style.display = "";
					tr[i+1].style.display = "";
					tr[i+2].style.display = "";
					tr[i+3].style.display = "";
					tr[i+4].style.display = "";
					tr[i+5].style.display = "";
					tr[i+6].style.display = "";
	            			i = i+6;
	        		}
	        		if (i % 9 == 3) {
	        			tr[i-3].style.display = "";
					tr[i-2].style.display = "";
	            			tr[i-1].style.display = "";
	            			tr[i].style.display = "";
					tr[i+1].style.display = "";
					tr[i+2].style.display = "";
					tr[i+3].style.display = "";
					tr[i+4].style.display = "";
					tr[i+5].style.display = "";
	            			i = i+5;
	        		}
	        		if (i % 9 == 4) {
	        			tr[i-4].style.display = "";
					tr[i-3].style.display = "";
					tr[i-2].style.display = "";
	            			tr[i-1].style.display = "";
	            			tr[i].style.display = "";
					tr[i+1].style.display = "";
					tr[i+2].style.display = "";
					tr[i+3].style.display = "";
					tr[i+4].style.display = "";
	            			i = i+4;
	        		}
	        		if (i % 9 == 5) {
	        			tr[i-5].style.display = "";
					tr[i-4].style.display = "";
					tr[i-3].style.display = "";
					tr[i-2].style.display = "";
	            			tr[i-1].style.display = "";
	            			tr[i].style.display = "";
					tr[i+1].style.display = "";
					tr[i+2].style.display = "";
					tr[i+3].style.display = "";
	            			i = i+3;
	        		}
	        		if (i % 9 == 6) {
	        			tr[i-6].style.display = "";
					tr[i-5].style.display = "";
					tr[i-4].style.display = "";
					tr[i-3].style.display = "";
					tr[i-2].style.display = "";
	            			tr[i-1].style.display = "";
	            			tr[i].style.display = "";
					tr[i+1].style.display = "";
					tr[i+2].style.display = "";
	            			i = i+2;
	        		}
	        		if (i % 9 == 7) {
	        			tr[i-7].style.display = "";
					tr[i-6].style.display = "";
					tr[i-5].style.display = "";
					tr[i-4].style.display = "";
					tr[i-3].style.display = "";
					tr[i-2].style.display = "";
	            			tr[i-1].style.display = "";
	            			tr[i].style.display = "";
					tr[i+1].style.display = "";
	            			i = i+1;
	        		}
	        		if (i % 9 == 8) {
	        			tr[i-8].style.display = "";
					tr[i-7].style.display = "";
					tr[i-6].style.display = "";
					tr[i-5].style.display = "";
					tr[i-4].style.display = "";
					tr[i-3].style.display = "";
					tr[i-2].style.display = "";
	            			tr[i-1].style.display = "";
	            			tr[i].style.display = "";
	            			i = i;
	        		}
	      		} else {
	      			tr[i].style.display = "none";
	      		}
	    	}       
  	}
}

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}
