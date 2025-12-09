
/**
 * This function gets a random quote from forismatic api.
 * @returns Random quote from forismatic api.
 */
async function getRandomQuote () {
    
    try {
            const response = await fetch('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json');
            if(!response.ok) {
                console.error("Error getting quote status: ", response.status);
            }
            return response.json();
        }
        catch (error) {
            console.error("Error while getting quote: ", error);
            response.status(500);
        }
    
}

module.exports = {
    getRandomQuote
};