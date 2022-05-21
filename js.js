document.getElementById("modal-loader").style.display = "block";

/*DATABASE -------------------------------------------------------------------->*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import { getDatabase, ref, set , onValue, remove} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";

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
console.log('Firebase init completed!');

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

function getFromDB(User) {
    //onValue(ref(database, 'Bookings/' + yyyy + '/' + mm + '/' + dd), function(snapshot) {
    //    snapshot.forEach(function(ChildSnapshot) {
    //        var buttonNr = "button" + ChildSnapshot.key.substring(4);
    //        if (ChildSnapshot.val().Booker == User) {
    //            document.getElementById(buttonNr).style.backgroundColor = 'rgb(240, 120, 196)';
    //            }
    //        else {
    //            document.getElementById(buttonNr).style.backgroundColor = 'red';
    //        }
    //    })
    //});
	if (User != 'No user signed in!') {
		onValue(ref(database, 'Frvr/Clienti'), function(snapshot) {
			snapshot.forEach(function(ChildSnapshot) {
				var id = ChildSnapshot.key;
				if (id == 1) {
					console.log(id);
				}
				if (id == 1368) {
					console.log(id);
				}
			})
		});
					
//	    var table = document.createElement('table');
//		for (var i = 1; i <= 20; i++) {
//			var tr = document.createElement('tr');
//			var td = document.createElement('td');
//			var br1 = document.createElement('BR');
//			var br2 = document.createElement('BR');
//	
//	    		var text1 = document.createTextNode('Nume: ' + 'nume ' + i);
//	    		var text2 = document.createTextNode('Detalii: ' + 'detalii ' + i);
//			var text3 = document.createTextNode('Follow up: ' + '21/05/2022');
//	
//	    		td.appendChild(text1);
//	    		td.appendChild(br1);
//	    		td.appendChild(text2);
//			td.appendChild(br2);
//			td.appendChild(text3);
//			
//			tr.appendChild(td);
//	    		table.appendChild(tr);
//		}
//		document.body.appendChild(table);
	}
	document.getElementById("modal-loader").style.display = "none";
}

    testIfUserLogged(); // needs to be placed after the functions used are defined

function saveToDB() {
    var selected_date = new Date(document.getElementById("datepicker").value);
    var yyyy = selected_date.getFullYear();
    var mm = selected_date.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var dd = selected_date.getDate();
    //console.log('Bookings/' + yyyy + '/' + mm + '/' + dd);
    var booker = document.getElementById("SideBarUserName").innerHTML;
    var deskNr = document.getElementById("booking-menu-label-desk-number").innerHTML.split(" Number ")[1];
    //console.log(yyyy, mm, dd, booker, deskNr);
    set(ref(database, 'Bookings/' + yyyy + '/' + mm + '/' + dd + '/Desk' + deskNr ), {
        Booker: booker
    });
}

function deleteFromDB() {
    //var keyDate = document.getElementById("datepicker").value;
    var selected_date = new Date(document.getElementById("datepicker").value);
    var yyyy = selected_date.getFullYear();
    var mm = selected_date.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var dd = selected_date.getDate();
    var deskNr = document.getElementById("booking-menu-label-desk-number").innerHTML.split(" Number ")[1];
    //console.log(keyDate + '-Desk' + deskNr);
    //remove(ref(database, 'Date/' + keyDate + "-Desk" + deskNr ));
    remove(ref(database, 'Bookings/' + yyyy + '/' + mm + '/' + dd + '/Desk' + deskNr ));
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

function openLoginWindow() {
    document.getElementById("modal-loader").style.display = "none";
    document.getElementById("modal-login").style.transform = "translateY(0%)";
    document.getElementById("login-menu").style.transform = "translateY(0%)";
}

function closeLoginWindow() {
    document.getElementById("modal-login").style.transform = "translateY(-100%)";
    document.getElementById("login-menu").style.transform = "translateY(-100%)";
}
