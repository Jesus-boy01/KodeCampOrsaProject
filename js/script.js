let postTitle = document.querySelector("#post-title");
let postBody = document.querySelector("#post-body");
let allBlogCreateBox = [];
let updatePost = document.querySelector("#update-post");
let allBlogPost = document.querySelector("#all-blog-posts");
let allBlogCreate = document.querySelector("#all-blogs-create-post");
let allBlogPostId = document.querySelector("#all-blogs-post-id");
let allBlogPostTitle = document.querySelector("#all-blogs-post-title");
let allBlogPostBody = document.querySelector("#all-blogs-post-body");
let allBlogsClearPost = document.querySelector(".all-blogs-clear-post");


function getAllBlogPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            allBlogCreateBox = data;
            allBlogCreateBox = allBlogCreateBox.slice(0, 21);

            allBlogPostUI(allBlogCreateBox);
        })
        .catch((err) => {
            console.log(err);
        })
}

getAllBlogPosts();

allBlogCreate.addEventListener('submit', allBlogCreatePost);

function allBlogCreatePost(e) {
    e.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: allBlogPostTitle.value,
            body: allBlogPostBody.value,
            id: allBlogPostId
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (data.title !== "" && data.body !== "") {
            allBlogCreateBox.unshift(data);
        } else {
            alert('Post title and body must be filled');
        }

        allBlogPostUI(allBlogCreateBox);
    })
    .catch((err) => {
        console.log(err);
    })
}

function allBlogUpdatePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: allBlogPostTitle.value,
            body: allBlogPostBody.value,
            id: allBlogPostId.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then((response) => response.json())
    .then((data) => {

        let allPostTitles = document.querySelectorAll(".post-title");
        let allPostBodies = document.querySelectorAll(".post-message");

        allPostTitles.forEach((postTitle, index) => {
            if (index + 1 === id) {
                if (data.title !== "") {
                    postTitle.innerHTML = data.title;
                }
            }
        })

        allPostBodies.forEach((postBody, index) => {
            if (index + 1 === id) {
                if (data.body !== "") {
                    postBody.innerHTML = data.body;
                }
            }
        })
    })
}

function viewMyPost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem('viewSinglePost', JSON.stringify(data));
            window.location.href = 'view-post.html';
        })
    
}

function allBlogDeletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then((response) => response.json())
    .then(() => {
        let confirmation = confirm('Delete Post Permanently?');

        if (confirmation) {
            allBlogCreateBox = allBlogCreateBox.filter(post => post.id !== id);
        }

        allBlogPostUI(allBlogCreateBox);
    })
    .catch((err) => {
        console.log(err);
    })
}

function allBlogPostUI(arr) {
    let getPostHolder = '';

    arr.forEach(post => {
        getPostHolder +=   `<div class="col-lg-4 col-md-6 mb-5" data-aos="zoom-in-up">
                                <div class="post-items" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
                                    <div class="all-blogs-image" style="margin-bottom: 2em;"></div>
                                    <div class="all-blogs-info px-3">
                                        <p class="text-secondary fs-6">LIFESTYLE &nbsp;&nbsp;|&nbsp;&nbsp; JUNE 12, 2022</p>
                                    </div>
                                    <p class="text-secondary" class="post-id"></p>
                                    <div class="all-blogs-title pb-2 px-3">
                                        <p class="fs-3 post-title text-truncate" id="all-blogs-post-title">${post.title}</p>
                                    </div>
                                    <div class="all-blogs-body px-3">
                                        <p class="text-secondary mb-5 post-message text-truncate" id="all-blogs-post-body" style="font-size: 18px;">${post.body}</p>
                                    </div>
                                    <div class="all-blogs-post-buttons d-flex justify-content-end px-2 pb-3">
                                        <div class="update-all-blogs-button me-2" id="update-post">
                                            <button type="submit" onclick="allBlogUpdatePost(${post.id})" class="btn btn-success"><i class="bi bi-arrow-clockwise pe-1"></i>Update</button>
                                        </div>
                                        <div class="view-more-button me-2">
                                            <button type="submit" onclick="viewMyPost(${post.id})" class="btn btn-secondary"><i class="bi bi-eye pe-1"></i>View</button>
                                        </div>
                                        <div class="delete-all-blogs-button" id="delete-post">
                                            <button type="submit" onclick="allBlogDeletePost(${post.id})" class="btn btn-danger"><i class="bi bi-trash3 pe-1"></i>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`
    });

    allBlogPost.innerHTML = getPostHolder;
}

allBlogsClearPost.addEventListener('submit', allBlogClearMyPost);

function allBlogClearMyPost(e) {
    e.preventDefault();

    allBlogsClearPost.reset();
}
