function fetchUser(id) {
    return fetch('https://dummyjson.com/users/' + id)
        .then(res => res.json());
}

export {fetchUser};