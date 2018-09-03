const kinveyRequester = (function () {
    const BASE_URL = 'https://baas.kinvey.com/'
    const APP_KEY = 'kid_HyAje3PDX'
    const APP_SECRET = '4e96516b8f714e14a6a9edb82165b62e'
    const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)}
    function registerUser(username, password,email,avatarUrl) {
        $.ajax({
            method: "POST",
            url: BASE_URL + 'user/' + APP_KEY + '/',
            headers: AUTH_HEADERS,
            data: {username, password,email,avatarUrl}
        }).then(function (res) {
            signInUser(res, 'User registration successful.')
        }).catch(function (err) {
            handleError(err)
        })
    }
    function loginUser(username, password) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'user/' + APP_KEY + '/login',
            headers: AUTH_HEADERS,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'Login successful.')

        }).catch(handleError)
    }
    function signInUser(res, message) {
        saveUserSession(res);
        showInfo(message);
        showHome();

    }
    function logoutUser() {
        $.ajax({
            method: 'POST',
            url: BASE_URL +  'user/' + APP_KEY + '/_logout',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
        }).then(function () {
            sessionStorage.clear();
            showInfo('Logout successful.');
           showHome();
        }).catch(function (err) {
            handleError(err)
        })

    }
    function logoutUser2() {
        $.ajax({
            method: 'POST',
            url: BASE_URL +  'user/' + APP_KEY + '/_logout',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
        }).then(function () {
            sessionStorage.clear();
            showHome();
        }).catch(function (err) {
            console.log(err)
        })

    }
    function remove(id) {
        $.ajax({
            method: 'DELETE',
            url: BASE_URL + 'appdata/' + APP_KEY + '/memes/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function () {
            showInfo('Meme deleted.')
            showHome();
        }).catch(handleError)
    }
    function saveUserSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken)
        sessionStorage.setItem('username', userInfo.username);
        sessionStorage.setItem('userId', userInfo._id)
    }

    async function getAllMemes() {
        return await $.ajax({
            method: 'GET',
            url: BASE_URL + 'appdata/' + APP_KEY + '/memes?query={}&sort={"_kmd.ect": -1}',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (res) {
            return res
        }).catch(function (err) {
            handleError(err)
        })
    }
    function createMeme(creator,title, description,imageUrl) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'appdata/' + APP_KEY + '/memes',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {creator,title, description,imageUrl}
        }).then(function (res) {
            showInfo('Meme created');
            showHome();

        }).catch(function (err) {
            handleError(err)
        })}
    async function getUser(userId) {
        return await $.ajax({
            method: 'GET',
            url: BASE_URL + 'user/' +
            APP_KEY + `/${userId}/`,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (res) {
            return res
        }).catch(handleError)
    }
    async function getMyMemes(user) {
        return await $.ajax({
            method: 'GET',
            url: BASE_URL + 'appdata/' + APP_KEY + '/memes?query={"creator":"'+ user + '"}&sort={"_kmd.ect": -1}',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (res) {
            return res
        }).catch(function (err) {
            handleError(err)
        })
    }
    function deleteUser(user_id) {
        $.ajax({
            method: 'DELETE',
            url: BASE_URL + 'user/' + APP_KEY + '/'+ user_id +'/',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function () {
            showInfo('User deleted.');
        }).catch(function (err) {
            handleError(err)
        })
    }



    function editMeme(creator,title, description,imageUrl,id) {
        $.ajax({
            method: 'PUT',
            url: BASE_URL + 'appdata/' + APP_KEY + '/memes/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {creator,title, description,imageUrl}
        }).then(function (res) {
            showInfo(`Meme ${title} updated.`);
            showHome()
            //renderDetailsView(res)
        }).catch(function (err) {
            handleError(err)
        })
    }
    function  handleError(err) {
        console.log(err.message);
        showError(err.message)
    }
    return {registerUser,logoutUser,loginUser,getAllMemes,createMeme,editMeme,remove,getUser,getMyMemes,deleteUser,logoutUser2}// returns the functions in the IFFI

}());