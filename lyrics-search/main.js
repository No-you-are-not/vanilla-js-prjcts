const API_URL = 'api.genius.com';
const APP_VERSION = 'v1';
const ACCESS_TOKEN = 'KgsqjbK6IkRcG2Y1dojCgetSs8vLw62QBWW-dDB9FY41M1OPlvNgqphGBPUxR5XG';
fetch(API_URL+"/artists/16775", {
    headers: new Headers({
        'Authorization': 'Bearer ' +ACCESS_TOKEN
    })
})
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    });
