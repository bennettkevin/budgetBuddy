import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';


function HomePage() {
    const [quote, setQuote] = useState("");
    const [quoteAuthor, setAuthor] = useState("");
    const BACKEND_URL = "http://localhost:3000";
    
    useEffect(() => {
        const getQuote = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/quote`);
                if(!response.ok) {
                    console.error("Error getting quote status: ", response.status);
                }
                const result = await response.json();
                setQuote(result.quoteText);
                if(result.quoteAuthor === "" || result.quoteAuthor === null){
                    setAuthor("");
                }
                else {
                setAuthor(result.quoteAuthor);
                }
            }
            catch (error) {
                console.error("Error while getting quote: ", error);
            }
        }

        getQuote();
    }, []);

    return (
        <div>
            <h1>Budget Buddy</h1>
            <section id="quote">
                <p>{quote} - {quoteAuthor}</p>
            </section>
            <section id="about">
                <h2>What is Budget Buddy?</h2>
                <p>BudgetBuddy is a financial planning app. You will be able to input information about expected spending and plan a monthly budget accordingly.</p>
            </section>
        </div>
    )
}

export default HomePage;