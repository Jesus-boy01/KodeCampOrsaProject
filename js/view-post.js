function viewSelectedPost() {
    let viewPostObject = localStorage.getItem('viewSinglePost');
    let viewMyPost = JSON.parse(viewPostObject);

    document.querySelector("#view-post-id").innerHTML = `id: ${viewMyPost.id}`;
    document.querySelector("#view-post-title").innerHTML = viewMyPost.title;
    document.querySelector("#view-post-body").innerHTML = viewMyPost.body;
}

viewSelectedPost();

function previousPage () {
    window.location.href = 'index.html';
}