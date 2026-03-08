

document.getElementById("btn-login").addEventListener('click', function (event) {

    // event.preventDefault();
    const inputUsername = document.getElementById('username');
    const username = inputUsername.value;

    // console.log(username)

    // now Get The password fild

    const inputPss = document.getElementById('password');
    const password = inputPss.value;
    // console.log(password)
    if (username==="admin" && password==="admin123"){

        document.getElementById("my_modal_6").showModal();

        // alert("Log in Success");

         setTimeout(() => {
            window.location.assign("home.html");
        }, 500);

        //  window.location.assign("home.html");
        // window.location.assign("/home.html")
    }
    else{
        // alert ("Your Info invalid")
        document.getElementById("my_modal_5").showModal();
    }

    
});



