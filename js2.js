const searchField = document.getElementById("myInput");
searchField.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   FilterFromDB();
  }
});

function FilterFromDB() {
	const dbRef = ref(getDatabase());
	get(child(dbRef, 'Frvr/Clienti')).then((snapshot) => {
  		snapshot.forEach(function(ChildSnapshot) {
		var input, filter, table, tr, td, i, txtValue;
		input = document.getElementById("myInput");
		filter = input.value.toUpperCase();
		table = document.getElementById("table");
		tr = table.getElementsByTagName("tr");
	      			txtValue = ChildSnapshot.val().Nume + ChildSnapshot.val().Detalii + ChildSnapshot.val().FollowUp + ChildSnapshot.val().Invite;
				txtValue = txtValue + ChildSnapshot.val().Cunosc + ChildSnapshot.val().Locatie + ChildSnapshot.val().Abordare;
				txtValue = txtValue + ChildSnapshot.val().NextStep + ChildSnapshot.val().Kids;
	      			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				
				var id = ChildSnapshot.key;
				var tr1 = document.createElement('tr');
				var tr2 = document.createElement('tr');
				var tr3 = document.createElement('tr');
				var tr4 = document.createElement('tr');
				var tr5 = document.createElement('tr');
				var tr6 = document.createElement('tr');
				var tr7 = document.createElement('tr');
				var tr8 = document.createElement('tr');
				var tr9 = document.createElement('tr');
					tr1.classList.add("row_" + id);
					tr2.classList.add("row_" + id);
					tr3.classList.add("row_" + id);
					tr4.classList.add("row_" + id);
					tr5.classList.add("row_" + id);
					tr6.classList.add("row_" + id);
					tr7.classList.add("row_" + id);
					tr8.classList.add("row_" + id);
					tr9.classList.add("row_" + id);
				var tr1td1 = document.createElement('td');
					tr1td1.id = "col1_id";
				var tr1td2 = document.createElement('td');
					tr1td2.id = "col2_name";
					tr1td2.classList.add("class_Nume");
                		var tr2td1 = document.createElement('td');
					tr2td1.id = "col1_label";
				var tr2td2 = document.createElement('td');
					tr2td2.classList.add("class_Detalii");
				var tr3td1 = document.createElement('td');
					tr3td1.id = "col1_label";
                		var tr3td2 = document.createElement('td');
					tr3td2.classList.add("class_FollowUp");
				var tr4td1 = document.createElement('td');
					tr4td1.id = "col1_label";
                		var tr4td2 = document.createElement('td');
					tr4td2.classList.add("class_Invite");
				var tr5td1 = document.createElement('td');
					tr5td1.id = "col1_label";
                		var tr5td2 = document.createElement('td');
					tr5td2.classList.add("class_Cunosc");
				var tr6td1 = document.createElement('td');
					tr6td1.id = "col1_label";
                		var tr6td2 = document.createElement('td');
					tr6td2.classList.add("class_Locatie");
				var tr7td1 = document.createElement('td');
					tr7td1.id = "col1_label";
                		var tr7td2 = document.createElement('td');
					tr7td2.classList.add("class_Abordare");
				var tr8td1 = document.createElement('td');
					tr8td1.id = "col1_label";
                		var tr8td2 = document.createElement('td');
					tr8td2.classList.add("class_NextStep");
				var tr9td1 = document.createElement('td');
					tr9td1.id = "col1_label";
                		var tr9td2 = document.createElement('td');
					tr9td2.classList.add("class_Kids");
				
				
				var textId = document.createTextNode(id + '.');
					tr1td1.appendChild(textId);
                		var textNume = document.createTextNode(ChildSnapshot.val().Nume);
                			tr1td2.appendChild(textNume);
				tr1.appendChild(tr1td1);
                		tr1.appendChild(tr1td2);
				table.appendChild(tr1);
                
                		var textDetaliiLabel = document.createTextNode('Detalii:');
                			tr2td1.appendChild(textDetaliiLabel);
                		var textDetalii = document.createTextNode(ChildSnapshot.val().Detalii);
                			tr2td2.appendChild(textDetalii);
                		tr2.appendChild(tr2td1);
                		tr2.appendChild(tr2td2);
				table.appendChild(tr2);
                
                		var textDetaliiLabel = document.createTextNode('Follow Up:');
                			tr3td1.appendChild(textDetaliiLabel);
                		var textDetalii = document.createTextNode(ChildSnapshot.val().FollowUp);
                			tr3td2.appendChild(textDetalii);
                		tr3.appendChild(tr3td1);
                		tr3.appendChild(tr3td2);
				table.appendChild(tr3);

                		var textDetaliiLabel = document.createTextNode('Invite:');
                			tr4td1.appendChild(textDetaliiLabel);
                		var textDetalii = document.createTextNode(ChildSnapshot.val().Invite);
                			tr4td2.appendChild(textDetalii);
                		tr4.appendChild(tr4td1);
                		tr4.appendChild(tr4td2);
				table.appendChild(tr4);

                		var textDetaliiLabel = document.createTextNode('Cunosc:');
                			tr5td1.appendChild(textDetaliiLabel);
                		var textDetalii = document.createTextNode(ChildSnapshot.val().Cunosc);
                			tr5td2.appendChild(textDetalii);
                		tr5.appendChild(tr5td1);
                		tr5.appendChild(tr5td2);
				table.appendChild(tr5);

                		var textDetaliiLabel = document.createTextNode('Locatie:');
                			tr6td1.appendChild(textDetaliiLabel);
                		var textDetalii = document.createTextNode(ChildSnapshot.val().Locatie);
                			tr6td2.appendChild(textDetalii);
                		tr6.appendChild(tr6td1);
                		tr6.appendChild(tr6td2);
				table.appendChild(tr6);
				
                		var textDetaliiLabel = document.createTextNode('Abordare:');
                			tr7td1.appendChild(textDetaliiLabel);
                		var textDetalii = document.createTextNode(ChildSnapshot.val().Abordare);
                			tr7td2.appendChild(textDetalii);
                		tr7.appendChild(tr7td1);
                		tr7.appendChild(tr7td2);
				table.appendChild(tr7);

                		var textDetaliiLabel = document.createTextNode('Next Step:');
                			tr8td1.appendChild(textDetaliiLabel);
                		var textDetalii = document.createTextNode(ChildSnapshot.val().NextStep);
                			tr8td2.appendChild(textDetalii);
                		tr8.appendChild(tr8td1);
                		tr8.appendChild(tr8td2);
				table.appendChild(tr8);

                		var textDetaliiLabel = document.createTextNode('Kids:');
                			tr9td1.appendChild(textDetaliiLabel);
                		var textDetalii = document.createTextNode(ChildSnapshot.val().Kids);
                			tr9td2.appendChild(textDetalii);
                		tr9.appendChild(tr9td1);
                		tr9.appendChild(tr9td2);
				table.appendChild(tr9);

 			})
		});
		document.body.appendChild(table);
	}
	document.getElementById("modal-loader").style.display = "none";
}

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
