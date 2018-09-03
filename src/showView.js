function hideAllView() {
    $('#main').hide()
    $('#login').hide()
    $('#register').hide()
    $('#meme-feed').hide()
    $('#create-meme').hide()
    $('#edit-meme').hide()
    $('.meme-details').hide()
    $('.user-profile').hide()
}
 function showHome() {
    hideAllView();
    loggedInLinks()

}
function hideAllLinks() {
    $('a:contains("Create Meme")').hide();
    $('#profile').hide()


}
async function loggedInLinks() {
    if (sessionStorage.getItem("authToken")) {
        $('#main').hide();
        $('#meme-feed').show();
        $('a:contains("Create Meme")').show();
        $('a:contains("Welcome")').text(`Welcome ${sessionStorage.getItem('username')}`)
        $('#profile').show()
        let memes= await kinveyRequester.getAllMemes();

        renderMemes(memes)

    } else {
        hideAllLinks();
        $('#main').show();


    }
}
function showLoginForm(){
    hideAllView();
    $('#login').show()
}
function showRegisterForm(){
    hideAllView();
    $('#register').show()
}
function createMemeView() {
    hideAllView();
    $('#create-meme').show()
}
async function myProfileView() {
    let userId=sessionStorage.getItem('userId');
    let username=sessionStorage.getItem('username')
    hideAllView();
    $('.user-profile').show();
    let user=await kinveyRequester.getUser(userId);
    let memes=await kinveyRequester.getMyMemes(username);
    userProfileRender(user,memes);
}
async function profileView(userId,username) {
    hideAllView();
    $('.user-profile').show();
    let user=await kinveyRequester.getUser(userId);
    let memes=await kinveyRequester.getMyMemes(username);
    userProfileRender(user,memes);
}
function editView() {
    hideAllView();
    $('#edit-meme').show()
}
function checkOutView() {
    hideAllView()
    $('.meme-details').show()
}
