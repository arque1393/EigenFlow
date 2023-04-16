// const url =  "http://127.0.0.1:8000/auth/";
// const fecthApiData = async (url) => {
//     try {
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(data);} 
//     catch (error) {console.log(error);}
// };

const url =  "http://127.0.0.1:8000/auth/";
    function fecthApiData(){
        fetch(url)
        .then((response) => {
        return response.json();
        })
        .then((json) => {
            console.log(json)
        });
    }
fecthApiData(url)
