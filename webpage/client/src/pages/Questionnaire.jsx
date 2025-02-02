import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import questions from "../assets/questions";
import { UserContext } from "../../context/userContext";

export default function Questionnaire() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});

  if (!user) {
    navigate("/login");
    return;
  }

  const onSubmit = async () => {
    try {
      const { data } = await axios.post("/preferences", {responses});
      if (data.error) {
        toast.error(data.error);
      } else {
        setResponses({});
        toast.success("Responses submitted!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses((prev) => ({ ...prev, [name]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onSubmit(responses);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div>
      <h2>Questionnaire</h2>
      <p>{questions[currentQuestion].text}</p>
      {questions[currentQuestion].type === "radio" ? (
        questions[currentQuestion].options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name={questions[currentQuestion].id}
              value={option}
              checked={responses[questions[currentQuestion].id] === option}
              onChange={handleChange}
            />
            {option}
          </label>
        ))
      ) : (
        <input
          type={questions[currentQuestion].type}
          name={questions[currentQuestion].id}
          value={responses[questions[currentQuestion].id] || ""}
          onChange={handleChange}
        ></input>
      )}
      <button onClick={prevQuestion} disabled={currentQuestion === 0}>
        Back
      </button>
      <button onClick={nextQuestion}>
        {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
      </button>
    </div>
  );
}
