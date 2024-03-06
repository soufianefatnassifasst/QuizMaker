import './App.css';
import HomeComponent from "./component/HomeComponent";
import {MemoryRouter as Router, Route, Routes} from "react-router-dom";
import ScoreComponent from "./component/ScoreComponent";
import QuizzComponent from "./component/QuizzComponent";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={<HomeComponent />}/>
                        <Route path="/quiz" element={<QuizzComponent />}/>
                        <Route path="/score" element={<ScoreComponent />}/>
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;
