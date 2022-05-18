document.getElementById("modal-loader").style.display = "block";
var deskTotal = 56; //total number of desks
/*Setting the datepicker with todays date-------------------------------------->*/
var today = new Date();
var today_dd = today.getDate();
var today_mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
var today_yyyy = today.getFullYear();
if (today_dd < 10) {
    today_dd = '0' + today_dd
} 
if (today_mm < 10) {
    today_mm = '0' + today_mm
}
today = today_yyyy + '-' + today_mm + '-' + today_dd;
document.getElementById("datepicker").setAttribute("value", today);
/*<-----------------------------------------------------------------------------*/

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
    //console.log(User);
    var selected_date = new Date(document.getElementById("datepicker").value);
    var yyyy = selected_date.getFullYear();
    var mm = selected_date.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var dd = selected_date.getDate();
    onValue(ref(database, 'Bookings/' + yyyy + '/' + mm + '/' + dd), function(snapshot) {
        snapshot.forEach(function(ChildSnapshot) {
            var buttonNr = "button" + ChildSnapshot.key.substring(4);
            if (ChildSnapshot.val().Booker == User) {
                document.getElementById(buttonNr).style.backgroundColor = 'rgb(240, 120, 196)';
                }
            else {
                document.getElementById(buttonNr).style.backgroundColor = 'red';
            }
        })
    });
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

//document.getElementById('refresh').addEventListener('click', function(event) {
//    changeDate();
//});

function OpenSideBar() {
    document.getElementById("modal-sidebar").style.transform = "translateX(0)";
    document.getElementById("sidebar").style.transform = "translateX(0)";
}

function CloseSideBar() {
    document.getElementById("modal-sidebar").style.transform = "translateX(-100%)";
    document.getElementById("sidebar").style.transform = "translateX(-100%)";
}

// When the user clicks on any desk buttons
document.querySelectorAll('.button-desk').forEach(item => {
    item.addEventListener('click', event => {
        var DeskNumber = event.target.id.substring(6);
        document.getElementById("booking-menu-label-desk-number").innerHTML = "Desk Number " + DeskNumber;
        var DeskStatus = getComputedStyle(event.target).backgroundColor; // get Desk color; green = 'rgb(0, 128, 0)'
	var YesterDay = new Date();
	    YesterDay.setDate(YesterDay.getDate()-1);
	var selected_date = new Date(document.getElementById("datepicker").value);
	var yyyy = selected_date.getFullYear();
	var mm = selected_date.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
	var dd = selected_date.getDate();
	var disable_book_button = false;
	if (selected_date >= YesterDay) {
		disable_book_button = false;
	}
	else {
		disable_book_button = true;
	}
	if (DeskStatus != "rgb(0, 128, 0)") {
		document.getElementById("button-booking-book").innerText = "Unbook";
		onValue(ref(database, 'Bookings/' + yyyy + '/' + mm + '/' + dd), function(snapshot) {
			snapshot.forEach(function(ChildSnapshot) {
				if (ChildSnapshot.key == "Desk"+DeskNumber) {
					//get booker name and initials 
					var bookerInitials = ChildSnapshot.val().Booker.split(" ");
					document.getElementById("booking-menu-circle").innerHTML = bookerInitials[0].substring(0,1) + bookerInitials[1].substring(0,1);
					document.getElementById("booking-menu-label-booker").innerHTML = ChildSnapshot.val().Booker;
					if (ChildSnapshot.val().Booker != document.getElementById("SideBarUserName").innerHTML) {
						document.getElementById("booking-menu-circle").style.backgroundColor = "red";
						document.getElementById("button-booking-book").disabled = true;
						document.getElementById("button-booking-book").style.background = '#cccccc';
						document.getElementById("button-booking-book").style.color = '#666666';
					}
                        		else {
                            			document.getElementById("booking-menu-circle").style.backgroundColor = 'rgb(240, 120, 196)'; //pink
			    			if (disable_book_button) {
							document.getElementById("button-booking-book").disabled = true;
							document.getElementById("button-booking-book").style.background = '#cccccc';
							document.getElementById("button-booking-book").style.color = '#666666';
						}
						else {
							document.getElementById("button-booking-book").disabled = false;
							document.getElementById("button-booking-book").style.background = 'LightBlue';
							document.getElementById("button-booking-book").style.color = 'black';
						}
                        		}
                    		}
                	})
            	});
        }
       	else {
		document.getElementById("booking-menu-circle").innerHTML = "Free";
		document.getElementById("booking-menu-circle").style.backgroundColor = "green";
		document.getElementById("button-booking-book").innerText = "Book";
		document.getElementById("booking-menu-label-booker").innerHTML = "";
		let userBookings = 0;
            	for (let i = 1; i <= deskTotal; i++) {
			var DesksStatus = getComputedStyle(document.getElementById('button' + i)).backgroundColor;
			if ( DesksStatus == "rgb(240, 120, 196)") {
			    userBookings = userBookings + 1;
			}
		}
		if (userBookings > 0) {
                	document.getElementById("button-booking-book").disabled = true;
                	document.getElementById("button-booking-book").style.background = '#cccccc';
			document.getElementById("button-booking-book").style.color = '#666666';
            	}
            	else {
			if (disable_book_button) {
				document.getElementById("button-booking-book").disabled = true;
				document.getElementById("button-booking-book").style.background = '#cccccc';
				document.getElementById("button-booking-book").style.color = '#666666';
			}
			else {
				document.getElementById("button-booking-book").disabled = false;
				document.getElementById("button-booking-book").style.background = 'LightBlue';
				document.getElementById("button-booking-book").style.color = 'black';
			}
            	}
	}
        document.getElementById("modal-booking").style.transform = "translateY(0)";
        document.getElementById("booking-menu").style.transform = "translateY(0)";
    })
})

// When the user clicks anywhere outside of the modals, close it
document.getElementById("modal-sidebar").addEventListener('click', function(event) {
    if(event.target == event.currentTarget) { //parent clicked, not child
        CloseSideBar();
    }
});

document.getElementById("modal-booking").addEventListener('click', function(event) {
    if(event.target == event.currentTarget) { //parent clicked, not child
        document.getElementById("modal-booking").style.transform = "translateY(200%)";
        document.getElementById("booking-menu").style.transform = "translateY(200%)";
    }
});

document.getElementById("button-booking-book").addEventListener('click', function(event) {
    document.getElementById("modal-loader").style.display = "block";
    if (document.getElementById("button-booking-book").innerText == "Book") {
        saveToDB.call();
        document.getElementById("modal-booking").style.transform = "translateY(200%)";
        document.getElementById("booking-menu").style.transform = "translateY(200%)";
        setTimeout(changeDate,500);
    }
    else {
        deleteFromDB.call();
        document.getElementById("modal-booking").style.transform = "translateY(200%)";
        document.getElementById("booking-menu").style.transform = "translateY(200%)";
        setTimeout(changeDate,500);
    }
});

document.getElementById("button-booking-close").addEventListener('click', function(event) {
    //document.getElementById("modal-loader").style.display = "block";
    document.getElementById("modal-booking").style.transform = "translateY(200%)";
    document.getElementById("booking-menu").style.transform = "translateY(200%)";
    //setTimeout(changeDate,500);
});

function openLoginWindow() {
    document.getElementById("modal-loader").style.display = "none";
    document.getElementById("modal-login").style.transform = "translateY(0%)";
    document.getElementById("login-menu").style.transform = "translateY(0%)";
}

function closeLoginWindow() {
    document.getElementById("modal-login").style.transform = "translateY(-100%)";
    document.getElementById("login-menu").style.transform = "translateY(-100%)";
    //setTimeout(changeDate,500);
    changeDate();
}

document.getElementById('datepicker').addEventListener('change', function(event) {
    changeDate.call();
});

function changeDate() {
    //document.getElementById("modal-loader").style.display = "block";
    for (let i = 1; i <= deskTotal; i++) {
        document.getElementById('button' + i).innerText = i;
        document.getElementById('button' + i).style.backgroundColor = 'green';
    }
    getFromDB(document.getElementById("SideBarUserName").innerHTML);
    //let wait_testIfUserLogged = new Promise(function(myResolve, myReject) {
    //	testIfUserLogged();
    //});
    //wait_testIfUserLogged.then(
    //	function(value) {document.getElementById("modal-loader").style.display = "none";},
    //	function(error) {document.getElementById("modal-loader").style.display = "none";}
    //);	
}
