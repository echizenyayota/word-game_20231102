import axios from "axios";
require("dotenv").config();

const App = async () => {

  const options = {
    method: 'GET',
    url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
    params: {
      level: '3',
      area: 'sat'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_HOST,
      'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_KEY
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="App">

    </div>
  );
}

export default App;
