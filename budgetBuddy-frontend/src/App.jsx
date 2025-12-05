import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import BudgetComponent from './components/BudgetComponent.jsx';
import CheckAuthorization from './components/auth/CheckAuthorization.jsx';
import NavBar from './components/NavBar.jsx';
import HomePage from './components/HomeComponenet.jsx';
import BudgetItemComponent from './components/BudgetItemComponent.jsx';

function App() {

  return (

    <Router>
      <div className="container">
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route element={<CheckAuthorization />}>
            <Route path="/budget" element={<BudgetComponent />} />
            <Route path="/budget/item/:itemId" element={<BudgetItemComponent />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App
