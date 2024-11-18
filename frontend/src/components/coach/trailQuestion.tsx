"use client"  
import { useRouter } from "next/navigation";
import { useState } from "react";

const Quiz = () => {
  const questions = [
    {
      question: "What is the recommended amount of weekly exercise for adults?",
      options: [
        "30 minutes per week",
        "150 minutes per week",
        "300 minutes per week",
        "450 minutes per week",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the primary benefit of strength training?",
      options: [
        "Improving cardiovascular health",
        "Increasing muscle mass",
        "Enhancing flexibility",
        "Boosting metabolism",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which nutrient is most important for muscle repair and growth?",
      options: ["Carbohydrates", "Proteins", "Fats", "Vitamins"],
      correctAnswer: 1,
    },
    {
      question: "What does HIIT stand for?",
      options: [
        "High-Intensity Interval Training",
        "High Impact Intense Training",
        "Healthy Internal Intensity Training",
        "High-Intensity Isometric Training",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which type of exercise is best for improving flexibility?",
      options: ["Weight lifting", "Yoga", "Cycling", "Running"],
      correctAnswer: 1,
    },
    {
      question: "How many major muscle groups are there in the human body?",
      options: ["4", "6", "8", "10"],
      correctAnswer: 1,
    },
    {
      question: "Which vitamin is essential for bone health?",
      options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
      correctAnswer: 3,
    },
    {
      question: "What is the ideal heart rate zone for fat-burning?",
      options: [
        "30-40% of max heart rate",
        "50-60% of max heart rate",
        "60-70% of max heart rate",
        "80-90% of max heart rate",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the primary function of carbohydrates in the body?",
      options: [
        "Building muscle",
        "Energy production",
        "Fat storage",
        "Improving flexibility",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which exercise is best for building lower body strength?",
      options: ["Push-ups", "Squats", "Pull-ups", "Planks"],
      correctAnswer: 1,
    },
    {
      question: "What does BMI stand for?",
      options: [
        "Body Mass Index",
        "Body Muscle Indicator",
        "Basal Metabolic Index",
        "Body Measurement Indicator",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which mineral is essential for oxygen transport in the blood?",
      options: ["Calcium", "Iron", "Potassium", "Magnesium"],
      correctAnswer: 1,
    },
    {
      question: "Which type of fat is considered healthy?",
      options: ["Saturated fat", "Trans fat", "Monounsaturated fat", "Hydrogenated fat"],
      correctAnswer: 1,
    },
    {
      question: "Which exercise targets the biceps the most?",
      options: ["Squats", "Push-ups", "Bicep curls", "Planks"],
      correctAnswer: 1,
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null)
  );
  const [score, setScore] = useState(null);
  const router = useRouter()

  const handleAnswerChange = (questionIndex:any, optionIndex:any) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    const calculatedScore = selectedAnswers.reduce((acc, answer, index) => {
      if (answer === questions[index].correctAnswer) {
        return acc + 1;
      }
      return acc
    }, 0);
    setScore(calculatedScore);
    router.push(`/coaches/greetings?score=${calculatedScore}`)
  };

  return (
    <div
      className="max-w-full  justify-items-center mx-auto p-5 min-h-screen bg-cover bg-center">
      <h2 className="text-8xl text-cyan-300 font-semibold mb-10">Mr.Fit Fitness test</h2>
      {!score && score !== 0 ? (
        <div>
          {questions.map((q, index) => (
            <div key={index} className="mb-6">
              <p className="text-lg mb-2">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="block">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={optionIndex}
                      onChange={() => handleAnswerChange(index, optionIndex)}
                      checked={selectedAnswers[index] === optionIndex}
                      className="mr-2 "
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-cyan-500 text-white p-3 rounded-lg hover:bg-green-700"
          >
            Submit Quiz
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Quiz Completed!</h2>
          <p className="text-lg">
            Your score: {score} out of {questions.length}
          </p>
          {score >= 10 ? (
            <p className="text-green-500 mt-4">Congratulations! You passed the quiz.</p>
          ) : (
            <p className="text-red-500 mt-4">Sorry, you need to score higher to qualify.</p>
          )}
          <p className="text-gray-600 mt-6">
            Thank you for completing the quiz! Our team will review your responses and contact you after a discussion.
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
