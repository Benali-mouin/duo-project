$('document').ready(function(){

    var users = JSON.parse(localStorage.getItem('users')) || []
    console.log(users)

    $('#login').on("click", function() {
        
        var username = $('.username').val()
        var password = $('.password').val()
        console.log({username, password})

        // Function to check if the user exists in localStorage
        function checkUserExists(username, password) {
            for (var i=0;i<users.length;i++) {
                console.log(users[i]);
                
                if (users[i].username === username && users[i].password === password) {
                    return true // User exists
                }
            }
            return false // User does not exist
        }

        if (checkUserExists(username,password)===true) {
            alert('Login successful! Redirecting to the next page...')
            window.location.href ='/htmls/home.html'
        } else {
            alert('Username or password does not exist. Please try again.')
            // Stay on the current page
        }
    })

    $('.sign up').click(function (e) {
        e.preventDefault()
        alert('Redirecting to the sign-up page...')
        window.location.href ='/htmls/index2.html'
    })
})