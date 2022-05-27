document.getElementById("modal-loader").style.display = "block";

/*DATABASE -------------------------------------------------------------------->*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import { getDatabase, ref, set , get, child, onValue, remove} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";

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

//var table = document.createElement('table');
var table = document.getElementById("table");
function getFromDB(User) {
	console.log("step1");
	if (User != 'No user signed in!') {
		console.log("step2");
		var i = 0;
		get(ref(database, 'Frvr/Clienti'), function(snapshot) {
			console.log("step3");
			snapshot.forEach(function(ChildSnapshot) {
				console.log("step4");
				console.log(Childsnapshot.val().Nume);
			})
		});
	}
	document.getElementById("modal-loader").style.display = "none";
}

    testIfUserLogged(); // needs to be placed after the functions used are defined

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
		//td.innerHTML = td.firstChild.value;
		var DataToSave = td.firstChild.value
		var FieldToSave = editTB.class;
		saveToDB(targetId, FieldToSave, DataToSave);
	} else {
		td.innerHTML = editTB.data;
  	}
  	td.classList.remove('edit-td');
  	editTB = null;
}

var DbName;
var DbDetalii;
var DbFollowUp;
function saveToDB(targetId, FieldToSave, DataToSave) {
	//onValue(ref(database, 'Frvr/Clienti/' + targetId), function(ChildSnapshot) {
	get(ref(database, 'Frvr/Clienti/' + targetId), function(ChildSnapshot) {
		DbName = ChildSnapshot.val().Nume;
		DbDetalii = ChildSnapshot.val().Detalii;
		DbFollowUp = ChildSnapshot.val().FollowUp;
	});
	if (FieldToSave == "class_Nume") {
		set(ref(database, 'Frvr/Clienti/' + targetId), {
			Nume: DataToSave,
			Detalii: DbDetalii,
			FollowUp: DbFollowUp
		});
	}
	if (FieldToSave == "class_Detalii") {
		set(ref(database, 'Frvr/Clienti/' + targetId), {
			Nume: DbName,
			Detalii: DataToSave,
			FollowUp: DbFollowUp
		});
	}
	if (FieldToSave == "class_FollowUp") {
		set(ref(database, 'Frvr/Clienti/' + targetId), {
			Nume: DbName,
			Detalii: DbDetalii,
			FollowUp: DataToSave
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
