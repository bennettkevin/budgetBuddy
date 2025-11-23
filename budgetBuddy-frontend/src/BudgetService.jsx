import axios from 'axios';

const BUDGET_API_BASE_URL = "http://localhost:3000/budget";
/**
 * Budget Service class to handle budget API calls.
 */
class BudgetService {
    /**
     * This method gets the budget items for specified users.
     * @param {String} userID The ID of the user whose budget is to be fetched. 
     * @returns 
     */
    getUserBudget(userID) {
        return axios.get(`${BUDGET_API_BASE_URL}/${userID}`)
    }

    /**
     * This method adds a new budget item to the database.
     * @param {Object} item The budget item to add. 
     * @returns 
     */
    addBudgetItem(item) {
        return axios.post(BUDGET_API_BASE_URL + "/", item);
    }
}

export default new BudgetService();