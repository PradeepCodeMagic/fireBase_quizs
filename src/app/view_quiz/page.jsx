"use client";
import React, { useEffect, useState } from 'react';
import { app } from '../FireConfig';
import { getDatabase, ref, onValue, remove } from "firebase/database";


export default function Page() {
    let [show, setShow] = useState([]);

    const db = getDatabase(app);

    const displayData = () => {
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
                    correct_answer: data[newData].correct_answer,
                };
                myArr.push(myObj); 
            }

            setShow(myArr); 
        });
    };

    useEffect(() => {
        displayData(); 
    }, []);

    ////////////////////////////////////
    const deleteUser = (userId) => {
       
        const userRef = ref(db, 'quiz/' + userId);
      
        remove(userRef)
          .then(() => {
            console.log("User deleted successfully!");
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      };

    return (
        <div className='p-[30px]'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className=" text-center w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sr.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Question
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Option A
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Option B
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Option C
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Option D
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Correct Answer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {show.length > 0 ? show.map((v, i) => (
                            <tr key={v.db_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">
                                    {i + 1} .
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {v.question}
                                </td>
                                <td className="px-6 py-4">
                                    {v.option_A}
                                </td>
                                <td className="px-6 py-4">
                                    {v.option_B}
                                </td>
                                <td className="px-6 py-4">
                                    {v.option_C}
                                </td>
                                <td className="px-6 py-4">
                                    {v.option_D}
                                </td>
                                <td className="px-6 py-4">
                                    {v.correct_answer}
                                </td>
                                <td className="px-6 py-4 text-right">
                                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={()=>deleteUser(v.db_id)} >Delete</button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="7" className="text-center py-4">No data available</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
