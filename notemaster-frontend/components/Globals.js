export const config = {
    backend_host: "http://127.0.0.1:8000",
    maxLabelsLengthInCard: 3,
    authTokenKey: "authToken",
    months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
}

export const url = function(route_url){
    return config.backend_host + route_url;
}

export const truncate = function(str, length){
    if (str!==undefined && str.length > length){
        return str.slice(0, length) + "...";
    }
    else{
        return str;
    }
}

export function getDate(note){
        
    const date = new Date(note.timestamp.$date);
    
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    
}

export function getToday(){
    
    const today = new Date();

    return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
}