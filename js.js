document.getElementById("modal-loader").style.display = "block";

/*DATABASE -------------------------------------------------------------------->*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import { getDatabase, ref, set, update, get, child, onValue, remove} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCOAJpowxCi6nakEm7stz_kHok6Y6nXCAU",
    authDomain: "webapp-58e32.firebaseapp.com",
    databaseURL: "https://webapp-58e32-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "webapp-58e32",
    storageBucket: "webapp-58e32.appspot.com",
    messagingSenderId: "466894576414",
    appId: "1:466894576414:web:f5d9a24a0c1c9e43aa070f",
    measurementId: "G-LQ4WMX77N0"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth();
//console.log('Firebase init completed!');

//Get Elements for login
const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");

//Add Login Event
btnLogin.addEventListener('click', e => {
    document.getElementById("modal-loader").style.display = "block";
    const email = txtEmail.value;
    const password = txtPassword.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in
            closeLoginWindow.call();
            testIfUserLogged();
        })
        .catch((error) => {`enter code here`
            const errorCode = error.code;
            const errorMessage = error.message;
            alert( 'User/Password Incorrect!' );
            console.log(errorCode + ' - ' + errorMessage);
        });
});

//Add event for pressing 'Enter' key in login form
txtEmail.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("btnLogin").click();
  }
});
txtPassword.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("btnLogin").click();
  }
});

//Add Sign-out Event
document.getElementById("sign-out").addEventListener('click', e => {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('User ' + document.getElementById("SideBarUserName").innerHTML + ' Signed-Out!');
        CloseSideBar();
        openLoginWindow();
    }).catch((error) => {
        console.log(error);
    });
});

function testIfUserLogged() {
    let UserLogged = new Promise(function(myResolve, myReject) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User 
                onValue(ref(database, 'User'), function(snapshot) {
                    snapshot.forEach(function(ChildSnapshot) {
                        var userUID = ChildSnapshot.key;
                        if (userUID == user.uid) {
                            document.getElementById("SideBarUserName").innerHTML = ChildSnapshot.val().Name;
                            //console.log('User logged: '+ window.userName);
                            //document.getElementById("modal-loader").style.display = "none";
                            //document.getElementById("SideBarUserName").innerHTML = window.userName;
                            myResolve(ChildSnapshot.val().Name);
                        }
                    })
                });
            }
            else {
                // User is signed out
                console.log('No user signed in!');
                openLoginWindow.call();
                myReject('No user signed in!');
            }
        });
    });
    UserLogged.then(
	function(value) {getFromDB(value);},
  	function(error) {getFromDB(error);}
    );
}

var table = document.getElementById("table");
function getFromDB(User) {
	if (User != 'No user signed in!') {
		const dbRef = ref(getDatabase());
		get(child(dbRef, 'Frvr/Clienti')).then((snapshot) => {
  			snapshot.forEach(function(ChildSnapshot) {
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
			//document.body.appendChild(table);
			document.getElementById("resultsNumber").innerHTML = "( " + table.rows.length / 9 + " rezultate )" ;
			document.getElementById("modal-loader").style.display = "none";
		});
	}
}

	testIfUserLogged(); // needs to be placed after the functions used are defined
		

const searchField = document.getElementById("myInput");
searchField.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		if (searchField.value.length <2) {
			if (searchField.value.length == 0) {
				document.getElementById("modal-loader").style.display = "block";
				var TableRowsCount = table.rows.length;
				for (var x=TableRowsCount-1; x>=0; x--) {
   					table.deleteRow(x);
				}
				getFromDB(document.getElementById("SideBarUserName").innerHTML);
				return;
			} 
//			else {
//				alert("Introdu mai mult de 1 caracter pentru o cautare mai exacta!");
//				return;
//			}
		}
		FilterFromDB();
  	}
});

function FilterFromDB() {
	document.getElementById("modal-loader").style.display = "block";
	const dbRef = ref(getDatabase());
	var TableRowsCount = table.rows.length;
	for (var x=TableRowsCount-1; x>=0; x--) {
   		table.deleteRow(x);
	}
	get(child(dbRef, 'Frvr/Clienti')).then((snapshot) => {
  		snapshot.forEach(function(ChildSnapshot) {
			var input, filter, txtValue;
			input = document.getElementById("myInput");
			filter = input.value.toUpperCase();
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
			}
 		})
		document.getElementById("resultsNumber").innerHTML = "( " + table.rows.length / 9 + " rezultate )";
		document.getElementById("modal-loader").style.display = "none";
	});
}

var editTB;
//function CreateTable(){
//        var table = document.getElementById("table");
//        var row = table.insertRow(0);
//        var cell1 = row.insertCell(0);
//        var cell2 = row.insertCell(1);
//        var cell3 = row.insertCell(2);
//        var cell4 = row.insertCell(3);
//        cell1.innerHTML = "Enter your data";
//        cell2.innerHTML = "Enter your data";
//        cell3.innerHTML = "Enter your data";
//        cell4.innerHTML = "Enter your data";
//    }

table.onclick = function(event) {
  	let target = event.target.closest('.cancel,.ok,td');
	let targetId = event.target.closest('tr').className.substring(4);
	if (!table.contains(target)) return;
	if (target.className == 'cancel') {
		editdone(targetId, editTB.elem, false);
	} else if (target.className == 'ok') {
    		editdone(targetId, editTB.elem, true);
  	} else if (target.nodeName == 'TD') {
		if (editTB) return; //if editmode already opened then exit function
		if ((target.id == "col1_id") || (target.id == "col1_label")) return; //if first column clicked then exit function
		editmode(target);
  	}
};

function editmode(td) {
	editTB = {
		elem: td,
		data: td.innerHTML,
		class: td.className
	};
	td.classList.add('edit-td');
	let textArea = document.createElement('textarea');
	textArea.style.width = td.clientWidth + 'px';
	textArea.style.height = td.clientHeight + 'px';
	textArea.className = 'edit-area';
	textArea.value = td.innerHTML;
	td.innerHTML = '';
	td.appendChild(textArea);
	textArea.focus();
	td.insertAdjacentHTML("beforeEnd",
		'<div class="edit-controls"><button class="ok">OK</button><button class="cancel">CANCEL</button></div>'
	);
}

function editdone(targetId, td, isOk) {
	if (isOk) {
		td.innerHTML = td.firstChild.value;
		var DataToSave = td.innerHTML;
		var FieldToSave = editTB.class;
		saveToDB(targetId, FieldToSave, DataToSave);
	} else {
		td.innerHTML = editTB.data;
  	}
  	td.classList.remove('edit-td');
  	editTB = null;
}

function saveToDB(targetId, FieldToSave, DataToSave) {
	if (FieldToSave == "class_Nume") {
		update(ref(database, 'Frvr/Clienti/' + targetId), {
			Nume: DataToSave
		});
	}
	if (FieldToSave == "class_Detalii") {
		update(ref(database, 'Frvr/Clienti/' + targetId), {
			Detalii: DataToSave
		});
	}
	if (FieldToSave == "class_FollowUp") {
		update(ref(database, 'Frvr/Clienti/' + targetId), {
			FollowUp: DataToSave
		});
	}
	if (FieldToSave == "class_Invite") {
		update(ref(database, 'Frvr/Clienti/' + targetId), {
			Invite: DataToSave
		});
	}
	if (FieldToSave == "class_Cunosc") {
		update(ref(database, 'Frvr/Clienti/' + targetId), {
			Cunosc: DataToSave
		});
	}
	if (FieldToSave == "class_Locatie") {
		update(ref(database, 'Frvr/Clienti/' + targetId), {
			Locatie: DataToSave
		});
	}
	if (FieldToSave == "class_Abordare") {
		update(ref(database, 'Frvr/Clienti/' + targetId), {
			Abordare: DataToSave
		});
	}
	if (FieldToSave == "class_NextStep") {
		update(ref(database, 'Frvr/Clienti/' + targetId), {
			NextStep: DataToSave
		});
	}
	if (FieldToSave == "class_Kids") {
		update(ref(database, 'Frvr/Clienti/' + targetId), {
			Kids: DataToSave
		});
	}
}
	
//function deleteFromDB() {
//    //var keyDate = document.getElementById("datepicker").value;
//    var selected_date = new Date(document.getElementById("datepicker").value);
//    var yyyy = selected_date.getFullYear();
//    var mm = selected_date.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
//    var dd = selected_date.getDate();
//    var deskNr = document.getElementById("booking-menu-label-desk-number").innerHTML.split(" Number ")[1];
//    //console.log(keyDate + '-Desk' + deskNr);
//    //remove(ref(database, 'Date/' + keyDate + "-Desk" + deskNr ));
//    remove(ref(database, 'Bookings/' + yyyy + '/' + mm + '/' + dd + '/Desk' + deskNr ));
//}

function openLoginWindow() {
    document.getElementById("modal-loader").style.display = "none";
    document.getElementById("modal-login").style.transform = "translateY(0%)";
    document.getElementById("login-menu").style.transform = "translateY(0%)";
}

function closeLoginWindow() {
    document.getElementById("modal-login").style.transform = "translateY(-100%)";
    document.getElementById("login-menu").style.transform = "translateY(-100%)";
}
/*DATABASE<---------------------------------------------------------------------*/

document.getElementById("button-burger-menu").addEventListener('click', function(event) {
    OpenSideBar.call();
});

function OpenSideBar() {
    document.getElementById("modal-sidebar").style.transform = "translateX(0)";
    document.getElementById("sidebar").style.transform = "translateX(0)";
}

function CloseSideBar() {
    document.getElementById("modal-sidebar").style.transform = "translateX(-100%)";
    document.getElementById("sidebar").style.transform = "translateX(-100%)";
}

// When the user clicks anywhere outside of the modals, close it
document.getElementById("modal-sidebar").addEventListener('click', function(event) {
    if(event.target == event.currentTarget) { //parent clicked, not child
        CloseSideBar();
    }
});

var TopButton = document.getElementById("TopBtn");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		TopButton.style.display = "block";
	} else {
		TopButton.style.display = "none";
	}
}
