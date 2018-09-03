function navBarEvent() {
    $('a:contains("Login")').on('click',function () {
        showLoginForm();
    })
    $('a:contains("Register")').on('click',function () {
        showRegisterForm();
    })
    $('.active').on('click',function () {
        showHome();
    });
    $('a:contains("Create Meme")').on('click',function () {
        createMemeView()
    });
    $('a:contains("My Profile")').on('click', async function () {
      await myProfileView()
    });
    $('a:contains("Sign up")').on('click',function () {
        showRegisterForm()
    })
    $('a:contains("Sign in")').on('click',function () {
        showLoginForm()
    })

    $('a:contains("logout")').on('click',function () {
        kinveyRequester.logoutUser()
    })




}