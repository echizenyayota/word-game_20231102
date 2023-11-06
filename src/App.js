import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {

  const [chosenLevel, setChosenLevel] = useState("2");
  const [words, setWords] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);

  const getRandomWords = async() => {
    const options = {
      method: 'GET',
      url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
      params: {
        level: chosenLevel,
        area: 'sat'
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST 
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setWords(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(words && words.quizlist);

  useEffect(() => {
    if(chosenLevel) getRandomWords();
  }, [chosenLevel]);

  const checkAnswer = (option, optionIndex, correctAnswer) => {
    console.log(optionIndex, correctAnswer);
    if (optionIndex === correctAnswer) {
      setCorrectAnswers([...correctAnswers, option]);
      setScore((score) => score + 1);
    } else {
      setScore((score) => score - 1);

    }
    setClicked([...clicked, option]);
  };

  console.log("correctAnswers",correctAnswers);

  console.log("clicked", clicked);
  
  return (
    <div className="App">

      {!chosenLevel && <div className="level-selector">
        <h1>Word Association App</h1>
        <p>Select your level to start</p>
        <select
          name="levels"
          id="levels"
          value={chosenLevel}
          onChange={(e) => setChosenLevel(e.target.value)}
        >
          <option value={null}>Select a level</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
        </select>
      </div>}

      {chosenLevel && words && <div className="question-area">
        <h1>Welcome to level: {chosenLevel}</h1>
        <h3>Your score is {score}</h3>

        <div className="questions">
          {words.quizlist.map((question, _questionIndex) => (
            <div key={_questionIndex} className="question-box">
              {question.quiz.map((tip, _index) => (
                <p key={_index}>{tip}</p>
              ))}
              <div className="question-buttons">
                {question.option.map((option, optionIndex) => (
                  <div key={optionIndex} className="question-button">
                    <button
                      disabled={clicked.includes(option)}
                      onClick={() => checkAnswer(option, optionIndex + 1, question.correct)}
                    >
                      {option}
                    </button>
                    {correctAnswers.includes(option) && <p>Correct!</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>}

    </div>
  );
};

export default App;
