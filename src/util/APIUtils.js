import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

const blobRequest = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/pdf',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.arrayBuffer().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/users/me",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function addUsersToGroup(groupId, users){
    if(!(users instanceof Array)){
        users = [users];
     }
    return request({
        url: API_BASE_URL + "/group/addMembers?id="+groupId,
        method: 'POST',
        body: JSON.stringify(users)

    } )
}

export function deleteUsersFromGroup(groupId, users){
    if(!(users instanceof Array)){
        users = [users];
     }
    return request({
        url: API_BASE_URL + "/group/deleteMembers?id="+groupId,
        method: 'POST',
        body: JSON.stringify(users)

    } )
}

export function getGroupList(){
    return request({
        url:API_BASE_URL+"/group/getList",
        method:'GET'
    })
}

export function getGroup(id){
    return request({
        url:API_BASE_URL+"/group/?id="+id,
        method:'GET'
    })
}

export function getCourseInfo(courseId){
    return request({
        url:API_BASE_URL+"/course?id="+courseId,
        method:'GET'
        
    })
}

export function getLessonById(lessonId){
    return request({
        url:API_BASE_URL+"/course/lesson?id="+lessonId,
        method:'GET'
    })}

export function getAllUsers(){
        return request({
            url:API_BASE_URL+"/users/all",
            method:'GET'
        })
}

export function getAllCourses(){
    return request({
        url:API_BASE_URL+"/course/all",
        method:'GET'
    })
}

export function getAuthorCourses(){
    return request({
        url:API_BASE_URL+"/course/author",
        method:'GET'
    })
}

export function getPdf(id){
    return blobRequest({
        url:API_BASE_URL+"/course/lesson/pdf?id="+id,
        method:'GET'
    })
}

export function getVideo(id){
    return blobRequest({
        url:API_BASE_URL+"/course/lesson/video?id="+id,
        method:'GET'
    })
}

export function addPdf(id,title, desc, file){

    return request({
        url: API_BASE_URL + "/course/lesson/pdf/?id="+id+"&title="+title+"&description="+desc,
        method: 'POST',
        body: file
    } )
}

export function addLesson(id,title, desc){
    let lesson=[
        {id:id}
    ];
    let req='{'+
        "\"course\":{\"id\":\""+id+"\"},"+
        "\"title\":\""+title+"\","+
        "\"description\":\""+desc+"\"}"
        
    return request({
        url: API_BASE_URL + "/course/lesson/create",
        method: 'POST',
        body: req
    } )
}

export function addCourse(title, desc){

    let req='{'+
        "\"title\":\""+title+"\","+
        "\"description\":\""+desc+"\"}"
        
    return request({
        url: API_BASE_URL + "/course/create",
        method: 'POST',
        body: req
    } )
}

export function addVideoLocal(id,title, desc, file){

    return request({
        url: API_BASE_URL + "/course/lesson/video/local/?id="+id+"&title="+title+"&description="+desc,
        method: 'POST',
        body: file
    } )
}

export function addVideoYoutube(id,title, desc, link){

    return request({
        url: API_BASE_URL + "/course/lesson/video/youtube/?id="+id+"&title="+title+"&description="+desc,
        method: 'POST',
    } )
}

export function addAssignedCourse(id, courseId){

        
    return request({
        url: API_BASE_URL + "/group/addCourse/assigned?id="+id+"&courseId="+courseId,
        method: 'POST'
    } )
}

export function addCompletedCourse(id, courseId){

        
    return request({
        url: API_BASE_URL + "/group/addCourse/completed?id="+id+"&courseId="+courseId,
        method: 'POST'
    } )
}

export function addGroup(title){        
    return request({
        url: API_BASE_URL + "/group/?title="+title,
        method: 'POST'
    } )
}

export function deleteGroup(id){        
    return request({
        url: API_BASE_URL + "/group/?id="+id,
        method: 'DELETE'
    } )
}
