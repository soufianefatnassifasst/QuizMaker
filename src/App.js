import './App.css';
import HomeComponent from "./component/HomeComponent";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ScoreComponent from "./component/ScoreComponent";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={<HomeComponent/>}/>
                        <Route path="/score" element={<ScoreComponent/>}/>
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;
