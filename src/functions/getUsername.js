// called in data files to assign username to game data
// if username exists in locat storage, return just the name portion
export function getUsername(){
    if (window.localStorage.getItem("username")){
        const username = window.localStorage.getItem("username").split("@")
        return username[0]
    }
}
