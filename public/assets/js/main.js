
function showbtn(showbtnid) {
    const commenttextt = document.getElementById(`commenttext-${showbtnid}`).value
    if (commenttextt) {
        document.getElementById(`cmntbtn-${showbtnid}`).style.display = 'block'
    } else {
        document.getElementById(`cmntbtn-${showbtnid}`).style.display = 'none'
    }

}


function confirmreqandsendids(myfriendidforconfirmreqq) {
    const myidforconfirmreq = document.getElementById('myidofmine').value

    const dataforconfirmreq = {
        myfriendidforconfirmreqq,
        myidforconfirmreq
    }
    const xhr = new XMLHttpRequest();
    const urld = '/confirmfriendreq';



    xhr.open('POST', urld, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
        if (xhr.status === 200) {

        } else {
            console.log("Error disliking the post:", xhr.status);
        }
        }
    };

    const jsondatadddd = JSON.stringify(dataforconfirmreq)
    xhr.send(jsondatadddd)
}

function deletereqandsendids(myfriendidfordeletereqq) {
    const myidforconfirmreqqq = document.getElementById('myidofmine').value

    const datafordeletereq = {
        myfriendidfordeletereqq,
        myidforconfirmreqqq
    }
    const xhr = new XMLHttpRequest();
    const urldde = '/deletefriendreq';



    xhr.open('POST', urldde, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
        if (xhr.status === 200) {

        } else {
            console.log("Error disliking the post:", xhr.status);
        }
        }
    };

    const jsondataddele = JSON.stringify(datafordeletereq)
    xhr.send(jsondataddele)
}

function showhidecbox(hid) {
    const showclas = document.getElementById(`commentbox-${hid}`).style.display
    if (showclas == "") {
        document.getElementById(`commentbox-${hid}`).style.display = 'none';
    } else if (showclas == "none") {
        document.getElementById(`commentbox-${hid}`).style.display = '';
    }
    
}

function showallfriens() {
    document.getElementById('friendreqsts').style.display= 'none'
    document.getElementById('allfriend').style.display= 'block'
}
function showfriendreq() {
    document.getElementById('friendreqsts').style.display= 'block'
    document.getElementById('allfriend').style.display= 'none'
}



function fatchsenduserids (fatchsenduserids) {
    const userIdss = fatchsenduserids;
    
    axios.get('/getsendrequserofme', {
    params: {
        userIds: userIdss
    }
    })
    .then(response => {
        document.getElementById('friendreqsts').innerHTML= response.data
    })
    .catch(error => {
        console.error('Error occurred while fetching user data:', error);
    });
}
function fatchmyfriendids (fatchmyfriendsids) {
    const userIdsss = fatchmyfriendsids;
    
    axios.get('/getmyallfriends', {
    params: {
        friendsIds: userIdsss
    }
    })
    .then(response => {
        document.getElementById('allfriend').innerHTML= response.data
    })
    .catch(error => {
        console.error('Error occurred while fetching user data:', error);
    });
}

function myChatList(myIdForChat) {
    axios.get('/mychatlist', {
        params: {
            myIdForChat
        }
    })
    .then(response => {
        document.getElementById('mymessagelist').innerHTML= response.data
    })
    .catch(error => {
        console.error('Error occurred while fetching user data:', error);
    })
}



function likesend (postidddd) {
    const likeduserid= document.getElementById(`likeduserid-${postidddd}`).value
    const likedusername= document.getElementById(`likedusername-${postidddd}`).value
    const likeduserphoto= document.getElementById(`likeduserphoto-${postidddd}`).value
    const postid= postidddd
    const data = {
        likeduserid,
        likedusername,
        likeduserphoto,
        postid
    }
    const xhr = new XMLHttpRequest();
    const url = '/like';



    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            // Request completed successfully
            document.getElementById(`firstlike-${postidddd}`).style.display = 'none';
            document.getElementById(`dislikebtnone-${postidddd}`).style.display = 'block';
        } else {
            // Handle error cases if needed
        }
        }
    };

    const jsondata = JSON.stringify(data)
    xhr.send(jsondata)
}


function likesendone (postidddd) {
    const likeduserid= document.getElementById(`likeduserid-${postidddd}`).value
    const likedusername= document.getElementById(`likedusername-${postidddd}`).value
    const likeduserphoto= document.getElementById(`likeduserphoto-${postidddd}`).value
    const postid= postidddd
    const data = {
        likeduserid,
        likedusername,
        likeduserphoto,
        postid
    }
    const xhr = new XMLHttpRequest();
    const url = '/like';


    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            // Request completed successfully
            document.getElementById(`dislikebtn-${postidddd}`).style.display= "block"
            document.getElementById(`firstlikeotwo-${postidddd}`).style.display= "none"
        } else {
            // Handle error cases if needed
        }
        }
    };


    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    const jsondata = JSON.stringify(data)
    xhr.send(jsondata)

}


function likesendtwo (postidddd) {
    const likeduserid= document.getElementById(`likeduserid-${postidddd}`).value
    const likedusername= document.getElementById(`likedusername-${postidddd}`).value
    const likeduserphoto= document.getElementById(`likeduserphoto-${postidddd}`).value
    const postid= postidddd
    const data = {
        likeduserid,
        likedusername,
        likeduserphoto,
        postid
    }
    const xhr = new XMLHttpRequest();
    const url = '/like';



    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            // Request completed successfully
            document.getElementById(`likebtn-${postidddd}`).style.display= "none"
            document.getElementById(`dislikebtnthree-${postidddd}`).style.display= "block"
        } else {
            // Handle error cases if needed
        }
        }
    };
    const jsondata = JSON.stringify(data)
    xhr.send(jsondata)

}




function dislikesend(postiddd) {
    const likeduseridn= document.getElementById(`likeduserid-${postiddd}`).value
        const postidn= postiddd
        const data = {
            likeduseridn,
            postidn
        }
        const xhr = new XMLHttpRequest();
        const urld = '/dislike';



        xhr.open('POST', urld, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Request completed successfully
                document.getElementById(`firstlike-${postiddd}`).style.display= "block"
                document.getElementById(`dislikebtnone-${postiddd}`).style.display= "none"
            } else {
                // Handle error cases if needed
            }
            }
        };
        const jsondatad = JSON.stringify(data)
        xhr.send(jsondatad)

    }
    
function dislikesendone(postiddd) {
const likeduseridn= document.getElementById(`likeduserid-${postiddd}`).value
    const postidn= postiddd
    const data = {
        likeduseridn,
        postidn
    }
    const xhr = new XMLHttpRequest();
    const urld = '/dislike';



    xhr.open('POST', urld, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            // Request completed successfully
            document.getElementById(`dislikebtn-${postiddd}`).style.display= "none"
            document.getElementById(`firstlikeotwo-${postiddd}`).style.display= "block"
        } else {
            // Handle error cases if needed
        }
        }
    };
    const jsondatad = JSON.stringify(data)
    xhr.send(jsondatad)

}

function dislikesendtwo(postiddd) {
const likeduseridn= document.getElementById(`likeduserid-${postiddd}`).value
    const postidn= postiddd
    const data = {
        likeduseridn,
        postidn
    }
    const xhr = new XMLHttpRequest();
    const urld = '/dislike';



    xhr.open('POST', urld, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            // Request completed successfully
            document.getElementById(`likebtn-${postiddd}`).style.display= "block"
            document.getElementById(`dislikebtnthree-${postiddd}`).style.display= "none"
        } else {
            // Handle error cases if needed
        }
        }
    };
    const jsondatad = JSON.stringify(data)
    xhr.send(jsondatad)

}


function docomment(postidd) {
    const likeduseridc= document.getElementById(`likeduserid-${postidd}`).value
    const likedusernamec= document.getElementById(`likedusername-${postidd}`).value
    const likeduserphotoc= document.getElementById(`likeduserphoto-${postidd}`).value
    const commenttexttext= document.getElementById(`commenttext-${postidd}`).value
    const postidc= postidd
    const datac = {
        likeduseridc,
        likedusernamec,
        likeduserphotoc,
        postidc,
        commenttexttext
    }
    const xhr = new XMLHttpRequest();
    const urlc = '/comment';
    xhr.open('POST', urlc, true)
    xhr.setRequestHeader('Content-Type', 'application/json')

    const jsondatadc = JSON.stringify(datac)
    xhr.send(jsondatadc)
    document.getElementById(`commenttext-${postidd}`).value = ""
}
