function registerForm() {
    $('#register').on('submit',function (ev) {
        ev.preventDefault();
        let username = $("#register input[name=username]").val();
        let password = $("#register input[name=password]").val();
        let checkPass = $("#register input[name=repeatPass]").val();
        let email = $("#register input[name=email]").val();
        let avatarUrl=$("#register input[name=avatarUrl]").val();
        let userRegex=/^[A-Za-z]+$/;
        let passRegex=/^[A-Za-z0-9]+$/
        if (username.length >= 3 && userRegex.test(username) &&  passRegex.test(password)&&password === checkPass && password.length>=6) {
            kinveyRequester.registerUser(username, password,email,avatarUrl);
            $("#register input[name=username]").val('');
            $("#register input[name=password]").val('');
            $("#register input[name=repeatPass]").val('');
            $("#register input[name=email]").val('');
            $("#register input[name=avatarUrl]").val('');

        } else if (username.length < 3) {
            showError("Username must be at least 3 characters long!")
        } else if (password !== checkPass) {
            showError("Password does not match!")
        }else if(password.length<6){
            showError("Password must be at least 6 characters long !")
        }else if(!passRegex.test(password)){
            showError("Password should contain only english alphabet letters and digits !")//
        } else if(!userRegex.test(username)){
            showError("Username should contain only english alphabet letters !")
        }
        else {
            showError("Username and password can not be empty!")
        }
    })

}
function loginForm() {
    $('#login').on('submit',function (ev) {
        ev.preventDefault();
        let username = $("#login input[name=username]").val();
        let password = $("#login input[name=password]").val();
        let userRegex=/^[A-Za-z]+$/;
        let passRegex=/^[A-Za-z0-9]+$/
        if(username.length >= 3 && userRegex.test(username)&&passRegex.test(password)&& password.length>=6){
            kinveyRequester.loginUser(username, password);
            $("#login input[name=username]").val('');
            $("#login input[name=password]").val('');
        } else if (username.length < 3) {
            showError("Username must be at least 3 characters long!")
        } else if (password === '') {
            showError("Password can not be empty!")
        } else if (password.length<6) {
            showError("Password can not be less than 6 symbols!")
        } else {
            showError("Username and password can not be empty!")
        }
    })
}
function createMeme() {
    $('#create-meme').on('submit',function (ev) {
        ev.preventDefault();
        let creator=sessionStorage.getItem('username');
        let title=$('#create-meme  input[name="title"]').val()
        let description=$('#create-meme  input[name="description"]').val()
        let imageUrl=$('#create-meme  input[name="imageUrl"]').val()
        let imgRegex=/^http?\S+$/;
        if(title.length>33){
            showError('Title must not exceed 33 characters!')
        }else if(description.length>450) {
            showError('Description length must not exceed 450 characters!')
        }else if(description.length<30){
            showError('Description length must be at least 30 characters!')
        }else if(!imgRegex.test(imageUrl)){
            showError('Image Link must start with http')
        }else if(title.length<=33&&description.length>=30&&description.length<=450&&imgRegex.test(imageUrl)){
            kinveyRequester.createMeme(creator,title, description,imageUrl)
            $('#create-meme  input[name="title"]').val('')
            $('#create-meme  input[name="description"]').val('')
            $('#create-meme  input[name="imageUrl"]').val('')
        }else{
            showError('Please fill all the fields!')
        }

    })
}
function editMeme(m) {
    editView();
    let creator=m.creator;
    let title=$('#edit-meme  input[name="title"]')
    let description=$('#edit-meme  input[name="description"]')
    let imageUrl=$('#edit-meme  input[name="imageUrl"]')
    title.val(m.title);description.val(m.description);imageUrl.val(m.imageUrl);
    $('#edit-meme').on('submit',function (ev) {
        ev.preventDefault();
        let title=$('#edit-meme  input[name="title"]').val()
        let description=$('#edit-meme  input[name="description"]').val()
        let imageUrl=$('#edit-meme  input[name="imageUrl"]').val()
        let imgRegex=/^http?\S+$/;
        let id=m._id;
        if(title.length>33){
            showError('Title must not exceed 33 characters!')
        }else if(description.length>450) {
            showError('Description length must not exceed 450 characters!')
        }else if(description.length<30){
            showError('Description length must be at least 30 characters!')
        }else if(!imgRegex.test(imageUrl)){
            showError('Image Link must start with http')
        }else if(title.length<=33&&description.length>=30&&description.length<=450&&imgRegex.test(imageUrl)){
            kinveyRequester.editMeme(creator,title, description,imageUrl,id);
            $('#edit-meme  input[name="title"]').val('')
            $('#edit-meme  input[name="description"]').val('')
            $('#edit-meme  input[name="imageUrl"]').val('')
        }else{
            showError('Please fill all the fields!')
        }

    })
}
