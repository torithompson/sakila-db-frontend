let tableData = document.querySelector("#table-data");
let profileBtn = document.querySelector('#getProfiles');
let albumBtn = document.querySelector('#getAlbums');
let postBtn = document.querySelector('#getPosts');
let commentBtn = document.querySelector('#getComments');    
let todosBtn = document.querySelector('#getTodos');
let photoBtn = document.querySelector('#getPhotos');
let userId = document.querySelector('#userId');
let getUser = document.querySelector('#getUser');
let userBtnDiv = document.querySelector('#user-buttons');
let albumBtnDiv = document.querySelector('#album-buttons');
let postBtnDiv = document.querySelector('#post-buttons');

function fillTable(data) {
    let table = document.createElement('table');
    tableData.appendChild(table);
    let header = document.createElement('tr');
    table.appendChild(header);
    for (let key in data[0]) {
        let th = document.createElement('th');
        if (key === 'body')
            th.innerHTML = 'Content'
        else
            th.innerHTML = key;
        header.appendChild(th);
    }
    data.forEach(item => {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        for (let key in item) {
            let td = document.createElement('td');
            if (key === 'id') {
                td.innerHTML = `<a class="user-link">${item[key]}</a>`;
            }else if (key === 'address') {
                td.innerHTML = `${item[key].street}, ${item[key].suite}, ${item[key].city}, ${item[key].zipcode}`;
            } else if (key === 'company') {
                td.innerHTML = `${item[key].name}, ${item[key].catchPhrase}, ${item[key].bs}`;
            } else if (key === 'url') {
                td.innerHTML = `<a href="${item[key]}">${item[key]}</a>`;
            } else if (key === 'thumbnailUrl') {
                td.innerHTML = `<img src="${item[key]}" alt="thumbnail">`;
            } else {
                td.innerHTML = item[key];
            }
            tr.appendChild(td);
        }
       
    });
}

getUser.addEventListener('click', () => {
    if(userId.value === '') {
        alert('Please enter a user id');
        return;
    } else if (isNaN(userId.value)) {
        alert('Please enter a valid user id');
        return;
    } else if (userId.value < 1 || userId.value > 10) {
        alert('Please enter a user id between 1 and 10');
        return;
    }
    tableData.innerHTML = "";
    userBtnDiv.style.display = 'block';
    albumBtnDiv.style.display = 'none';
    postBtnDiv.style.display = 'none';
    fetch(`http://jsonplaceholder.typicode.com/users/${userId.value}`)
        .then(response => response.json())
        .then(data => {
            fillTable([data]);
        });
});

profileBtn.addEventListener('click', () => {
    tableData.innerHTML = "";
    userBtnDiv.style.display = 'none';
    albumBtnDiv.style.display = 'none';
    postBtnDiv.style.display = 'none';
    fetch("http://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            fillTable(data);
        });
});

albumBtn.addEventListener('click', () => {
    tableData.innerHTML = "";
    albumBtnDiv.style.display = 'block';
    userBtnDiv.style.display = 'none';
    postBtnDiv.style.display = 'none';
    let userAlbumId = document.querySelector('#userId').value;
        fetch(`http://jsonplaceholder.typicode.com/albums?userId=${userAlbumId}`)
            .then(response => response.json())
            .then(data => {
                fillTable(data);
            });
});

postBtn.addEventListener('click', () => {
    tableData.innerHTML = "";
    postBtnDiv.style.display = 'block';
    let userPostId = document.querySelector('#userId').value;
    fetch(`http://jsonplaceholder.typicode.com/users/${userPostId}/posts`)
        .then(response => response.json())
        .then(data => {
            fillTable(data);
        });
});

commentBtn.addEventListener('click', () => {
    tableData.innerHTML = "";
    let userPostId = document.querySelector('#postId').value;
    fetch(`http://jsonplaceholder.typicode.com/posts/${userPostId}/comments`)
        .then(response => response.json())
        .then(data => {
            fillTable(data);
        });
});

todosBtn.addEventListener('click', () => {
    tableData.innerHTML = "";
    postBtnDiv.style.display = 'none';
    let userTodosId = document.querySelector('#userId').value;
    fetch(`http://jsonplaceholder.typicode.com/users/${userTodosId}/todos`)
        .then(response => response.json())
        .then(data => {
            fillTable(data);
        });
});

photoBtn.addEventListener('click', () => {
    tableData.innerHTML = "";
    let userPhotoId = document.querySelector('#albumId').value;
    fetch(`http://jsonplaceholder.typicode.com/albums/${userPhotoId}/photos`)
        .then(response => response.json())
        .then(data => {
            fillTable(data);
        });
});