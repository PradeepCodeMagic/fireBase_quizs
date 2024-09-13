"use client"
import React from 'react'
import {app} from '../FireConfig'
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ref, set } from "firebase/database";

export default function page() {

  let saveQuiz = (e) => {
    e.preventDefault()
    let quizObj = {
      question: e.target.question.value,
      option_A: e.target.optionA.value,
      option_B: e.target.optionB.value,
      option_C: e.target.optionC.value,
      option_D: e.target.optionD.value,
      correct_answer: e.target.correct_answer.value,
    }
    

    let Id=uuidv4();
    console.log(Id)

    const db = getDatabase(app);

    set(ref(db, 'quiz/' + Id), quizObj);

    e.target.reset()

    
  }

  return (
    <div>
      <div className='text-center text-[30px] font-bold py-2 '>Add Your Question here</div>
      <form class="max-w-lg mx-auto mt-[10px]  " onSubmit={saveQuiz} >
        <div class="mb-5">

          <input type="text" name='question' id="username-success" class="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full px-2.5 py-[30px] dark:bg-gray-700 dark:border-green-500" placeholder="Add Question" />

        </div>
        <div className='py-[5px]' >
          <input type="text" name='optionA' id="username-error" class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="option A" />
        </div>

        <div className='py-[5px]'>
          <input type="text" name='optionB' id="username-error" class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="option B" />
        </div>

        <div className='py-[5px]'>
          <input type="text" name='optionC' id="username-error" class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="option C" />
        </div>

        <div className='py-[5px]'>
          <input type="text" name='optionD' id="username-error" class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="option D" />
        </div>

        <div class="mt-5">

          <input type="text" pattern='[A-Z]' name='correct_answer' id="username-success" class="bg-green-50 border border-yellow-500 text-yellow-900 dark:text-yellow-400 placeholder-yellow-700 dark:placeholder-yellow-500 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-yellow-500" placeholder="Correct Answer" />

        </div>

        <button class=" mt-[20px] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-10 ml-[200px] py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Submit</button>

      </form>

    </div>
  )
}
