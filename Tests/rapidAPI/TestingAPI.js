import axios from "axios";

const options = {
  method: "GET",
  url: "https://jsearch.p.rapidapi.com/search",
  params: {
    query: "python developer jobs",  // <-- Required query parameter
    page: "1"                        // Optional: page number
  },
  headers: {
    "X-RapidAPI-Key": "0e70842446msh67a51685d670094p1c5dcajsn4399e48285d0",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
