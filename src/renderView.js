function renderMemes(meme) {
    let container = $('#memes').empty()
    if(meme.length!==0){
        for (let m of meme) {
let memeDiv=$('<div class="meme">');
let title=$('<a href="#" class="meme-title">').text(m.title).on('click',function (ev) {
    ev.preventDefault();
    renderCheckOut(m)
});
            let br=$('<br>');
let imgA=$('<a href="#">').append(`<img class="meme-image" src=${m.imageUrl}>`).on('click',function (ev) {
    ev.preventDefault();
    renderCheckOut(m)

});
memeDiv.append(title);memeDiv.append(br);memeDiv.append(imgA);
let divInfo=$('<div class="info">')
            let buttons=$('<div id="data-buttons">')
            let checkOut=$('<a href="#" class="custom-button">').text('Check Out').on('click',function (ev) {
ev.preventDefault();
                renderCheckOut(m)
            });
            buttons.append(checkOut);
            if (sessionStorage.getItem('userId') === m._acl.creator) {
                let edit=$('<a href="#" class="custom-button">').text('Edit').on('click',function (ev) {
                    ev.preventDefault()
                    editMeme(m)
                });
                let deleteBtn=$('<a href="#" class="custom-button">').text('Delete').on('click',function (ev) {
                    ev.preventDefault()
                    kinveyRequester.remove(m._id)
                });
                buttons.append(edit);
                buttons.append(deleteBtn);
            }
            let creator=$('<a href="#" class="creator">').text(`Creator: ${m.creator}`).on('click', function (ev) {
                ev.preventDefault();
                profileView(m._acl.creator,m.creator)

            });
            buttons.append(creator);
            divInfo.append(buttons);
             memeDiv.append(divInfo);
             container.append(memeDiv)

        }
    }else{
        container.append('<p class="no-memes">').text('No memes in database')
    }
}
function renderCheckOut(m) {
    checkOutView();
  let container= $('.my-meme-details').empty();
    let div=$('.my-meme-details');
    let title=$('<a href="#" class="meme-title">').text(m.title)
    div.append(title)
    let imgA=$(`<img src=${m.imageUrl}>`);
    div.append(imgA);
    let descriptionDiv=$('<div class="meme-props">').append('<h2>Description</h2>')
    let p=$('<p class="meme-description">').text(m.description);
    descriptionDiv.append(p);
    div.append(descriptionDiv);
    let divButtons=$('<div class="meme-details-buttons" >');
    let createdBy=$('<a href="#" class="meme-details-button">').text(`Created by ${m.creator}`).on('click',function (ev) {
        ev.preventDefault();
        profileView(m._acl.creator,m.creator)
    });
    divButtons.append(createdBy);
    if (sessionStorage.getItem('userId') === m._acl.creator) {
        let edit = $('<a href="#" class="custom-button">').text('Edit').on('click', function (ev) {
            ev.preventDefault()
            editMeme(m)
        });
        let deleteBtn = $('<a href="#" class="custom-button">').text('Delete').on('click', function (ev) {
            ev.preventDefault()
            kinveyRequester.remove(m._id)
        });
        divButtons.append(edit);divButtons.append(deleteBtn)
    }
    div.append(divButtons)
    container.append(div)




}
function userProfileRender(user,meme) {

    let container=$('.user-profile').empty();
    let img=$(`<img id="user-avatar-url" src=${user.avatarUrl}>`)
    let users=$('<h1>').text(`${user.username}`);
    let email=$('<h2>').text(`${user.email}`);
    container.append(img);container.append(users);container.append(email)
    if(sessionStorage.getItem('userId') === user._id){
    let deleteUser=$('<a id="deleteUserButton" href="#">').text('DELETE USER!').on('click',async function (ev) {
        ev.preventDefault();
        kinveyRequester.logoutUser2();
       await kinveyRequester.deleteUser(user._id);




    });
        container.append(deleteUser)
    }
    let userMemes=$('<p id="user-listings-title">').text('User Memes')
   container.append(userMemes)
    let divMemes=$('<div class="user-meme-listings">');
    if(meme.length!==0) {
        for (let m of meme) {
            let memeCont = $('<div class="user-meme">');
            let title = $('<a href="#" class="user-meme-title">').text(m.title).on('click',function (ev) {
                ev.preventDefault()

            });
            let img = $('<a href="#">').append(`<img class="userProfileImage" src=${m.imageUrl}>`).on('click',function (ev) {
                ev.preventDefault()
            })
            memeCont.append(title);
            memeCont.append(img);
            let memeBtnDiv = $('<div class="user-memes-buttons">');
            if(sessionStorage.getItem('userId') === m._acl.creator) {
                let edit = $('<a href="#" class="user-meme-btn">').text('Edit').on('click', function (ev) {
                    ev.preventDefault()
                    editMeme(m)
                });
                let deleteBtn = $('<a href="#" class="custom-button">').text('Delete').on('click', function (ev) {
                    ev.preventDefault()
                    kinveyRequester.remove(m._id)
                });
                memeBtnDiv.append(edit);
                memeBtnDiv.append(deleteBtn);
            }
            memeCont.append(memeBtnDiv)
            divMemes.append(memeCont)
            container.append(divMemes)
        }
    }else {
        divMemes.append('<p class="no-memes">').text('No memes in database');
        container.append(divMemes)
    }


}