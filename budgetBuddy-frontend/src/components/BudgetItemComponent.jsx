import { useState, useEffect } from 'react';
import BudgetService from '../BudgetService';
import '../index.css';
import { Link, useParams, useNavigate } from 'react-router-dom';

const BudgetItemComponent = () => {
    const { itemId } = useParams();
    const [budgetItem, setBudgetItem] = useState({});
    const [type, setType] = useState('default');
    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Edit Budget Item";
        BudgetService.getBudgetItemById(itemId).then((res) => {
            setBudgetItem(res.data);
            setType(res.data.type);
            setName(res.data.name);
            setCost(res.data.cost);
            setDescription(res.data.description);
        });
    }, [itemId]);

    const handleUpdateItem = (e) => {
        e.preventDefault();
        if (type === "default") {
            window.alert("You must select a type.");
        }
        else {
            const updatedItem = { type, name, cost, description };
            BudgetService.updateBudgetItem(itemId, updatedItem).then(() => {
                navigate('/budget');
            })
        }
    }

    return (
        <div>
            <h2>Budget Item</h2>
            <div id="item-details">
                <form onSubmit={handleUpdateItem} id="add-item-form">
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
                    <button type="submit" className="button">Update Item</button>
                </form>
            </div>
        </div>
    )
}

export default BudgetItemComponent;