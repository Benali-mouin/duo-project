
$('document').ready(function(){

    var users = JSON.parse(localStorage.getItem('users'))||[]
console.log(users)

     $('#login').on("click",function() {
        
        var username = $('.username').val()
        var password = $('.password').val()
    console.log({username,password})
    
        var user = {
            username,password
        }
        users.push(user)
        localStorage.setItem("users",JSON.stringify(users))
        alert('Login successful! Redirecting to the next page...')
    
        window.location.href = '/htmls/home.html'
    })

    $('.sign up').click(function (e) {
        e.preventDefault()
        alert('Redirecting to the sign-up page...')
        window.location.href = '/htmls/index2.html'
    })
})




