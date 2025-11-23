import React from 'react';
import { useAuth } from './auth/AuthContext';
import BudgetService from '../BudgetService';
import { useState, useEffect } from 'react';

function BudgetComponent() {
    const [ budgetItems, setBudgetItems ] = useState([]);
    const [ type, setType ] = useState('default');
    const [ name, setName ] = useState('');
    const [ cost, setCost ] = useState(0);
    const [ description, setDescription ] = useState('');
    const [ totalBudget, setTotalBudget ] = useState(0);
    const { user } = useAuth();
    const owner = user.googleid;

    useEffect(() => {
        BudgetService.getUserBudget(user.googleid).then((res) => {
            if(res.data.length === 0) {
                setBudgetItems([]);
            }
            else {
                setTotalBudget(calculateTotalBudget(res.data));
                setBudgetItems(res.data);
            }
        });
    }, []);

    function calculateTotalBudget(items) {
        let total = 0;
        for (let item of items) {
            total += parseFloat(item.cost);
        }
        return total;
    }

    useEffect(() => {
        console.log("Total budget updated: " + totalBudget);
    }, [totalBudget]);

    const handleNewItem = (e) => {
        e.preventDefault();
        if(type === "default"){
            window.alert("You must select a type.");
        }
        else {
            const newItem = {owner, type, name, cost, description};
            console.log(cost);
            BudgetService.addBudgetItem(newItem).then(() => {
                BudgetService.getUserBudget(user.googleid).then((res) => {
                    setBudgetItems(res.data);
                    setTotalBudget(calculateTotalBudget(res.data));
                });
                setType("default");
                setName("");
                setCost(0);
                setDescription("");
            });
            
        }
    }

    return (
        <div>
            <h1>Your Budget</h1>
            <form onSubmit={handleNewItem} id="add-item-form">
                <div className="form-entry">
                    <label>Item Type: </label>
                    <select name="type" value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="default" disabled>Type of expense</option>
                        <option value="Housing">Housing</option>
                        <option value="Utility">Utility</option>
                        <option value="Fuel/Travel">Fuel/Travel</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Personal Enjoyment">Personal Enjoyment</option>
                    </select>
                </div>
                <div className="form-entry">
                    <label>Item Name: </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required></input>
                </div>
                <div className="form-entry">
                    <label>Item Cost: </label>
                    <input type="number" value={cost} onChange={(e) => setCost(parseFloat(e.target.value))} min="0.01" step="0.01" required></input>
                </div>
                <div className="form-entry">
                    <label>Item Description: </label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="(Optional)"></input>
                </div>
                <button type="submit" className="button">Add Item</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {budgetItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.type}</td>
                            <td>{item.name}</td>
                            <td>{item.cost}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                    <tr key="total-budget">
                        <td colSpan="2">Total: </td>
                        <td>${totalBudget}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default BudgetComponent;