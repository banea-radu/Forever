function filter() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  //alert (tr.length);
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
    for (i = 0; i < tr.length; i++) {
    	td = tr[i].getElementsByTagName("td")[1];
		if (tr[i].style.display == "") {
    		if (i % 3 == 0) {
            	tr[i+1].style.display = "";
                tr[i+2].style.display = "";
                i = i + 2;
            }
            if (i % 3 == 1) {
				tr[i-1].style.display = "";
                tr[i+1].style.display = "";
                i = i + 2;
            }
            if (i % 3 == 2) {
				tr[i-2].style.display = "";
                tr[i-1].style.display = "";
                i = i + 2;
            }
		}
    }       
}
