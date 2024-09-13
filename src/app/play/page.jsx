"use client"
import React, { useEffect, useState } from 'react';
import { app } from '../FireConfig';
import { getDatabase, ref, onValue } from "firebase/database";

export default function Page() {
  const [allQuizz, setAllQuizz] = useState([]);
  const [indexNo, setIndexNo] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  let displayData = () => {
    const db = getDatabase(app);
    const starCountRef = ref(db, 'quiz/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let myArr = [];
      for (let newData in data) {
        let myObj = {
          db_id: newData,
          question: data[newData].question, 
          option_A: data[newData].option_A,
          option_B: data[newData].option_B,
          option_C: data[newData].option_C,
          option_D: data[newData].option_D,
          correct_answer: data[newData].correct_answer // Correct answer field
        };
        myArr.push(myObj);
      }
      setAllQuizz(myArr);
    });
  };

  useEffect(() => {
    displayData();
  }, []);

  const sinlgeQuestion = allQuizz[indexNo];

  // Check the selected answer and provide feedback
  const checkAnswer = (answer) => {
    if (isAnswerChecked) return; // Disable further clicks

    setSelectedAnswer(answer);
    setIsAnswerChecked(true); // Prevent further selections for this question

    if (answer === sinlgeQuestion.correct_answer) {
      setTotalCorrect(totalCorrect + 1);
    } else {
      setTotalWrong(totalWrong + 1);
      // Trigger vibration
      if (navigator.vibrate) {
        navigator.vibrate([100, 100, 100]);
      }
    }
  };

  const next = () => {
    if (indexNo < allQuizz.length - 1) {
      setIndexNo(indexNo + 1);
      setSelectedAnswer(null); // Reset selected answer for the next question
      setIsAnswerChecked(false); // Allow checking new answer
    } else {
      setIsQuizFinished(true); // Mark quiz as finished when last question is reached
    }
  };

  const previous = () => {
    if (indexNo > 0) {
      setIndexNo(indexNo - 1);
      setSelectedAnswer(null); // Reset selected answer for previous question
      setIsAnswerChecked(false); // Allow checking new answer
    }
  };

  return (
    <div className='w-full p-[20px]'>
      {!isQuizFinished ? (
        <div className='max-w-[600px] mx-auto'>
          {sinlgeQuestion ? (
            <>
              <h2 className='py-[10px] text-[25px] font-bold text-left'>
                {indexNo + 1}. {sinlgeQuestion.question}
              </h2>
              <div id="options" className="my-[20px]">
                {['option_A', 'option_B', 'option_C', 'option_D'].map((opt, i) => (
                  <p
                    key={i}
                    onClick={() => !isAnswerChecked && checkAnswer(opt)}
                    className={`shadow-sm my-[10px] bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5 cursor-pointer
                      ${selectedAnswer === opt && isAnswerChecked
                        ? opt === sinlgeQuestion.correct_answer
                          ? 'border-green-500' // Green border for correct answer
                          : 'border-red-500 animate-shake' // Red border and shake effect for wrong answer
                        : 'border-gray-300'
                      }`}
                    style={{ pointerEvents: isAnswerChecked ? 'none' : 'auto' }} // Disable click after selection
                  >
                    {sinlgeQuestion[opt]}
                  </p>
                ))}
              </div>
            </>
          ) : (
            <p>Loading question...</p>
          )}

          <div className='max-w-[600px] mx-auto flex justify-between mt-[10px]'>
            <button
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onClick={previous}
              disabled={indexNo === 0}
            >
              Previous...
            </button>
            <button
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onClick={next}
            >
              {indexNo >= allQuizz.length - 1 ? 'Finish' : 'Next...'}
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-[25px] font-bold">Quiz Finished!</h2>
          <p className="text-[18px] mt-[20px]">Correct Answers: {totalCorrect}</p>
          <p className="text-[18px] mt-[10px]">Wrong Answers: {totalWrong}</p>
        </div>
      )}
    </div>
  );
}
