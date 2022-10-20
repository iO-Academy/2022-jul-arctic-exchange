
import './App.css'
import NewExchangeForm from "./new-exchange/NewExchangeForm"
import JoinExchangePage from "./join-exchange-page/JoinExchangePage"
import AdminPage from "./admin-page/AdminPage"
import imageSrc from "./envelopeBackground.jpg"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CurrentParticipantPage from "./current-participant-page/CurrentParticipantPage";


const App = () => {
  return (
        <div className="App">
            <header>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                        <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"
                              rel="stylesheet"/>
            </header>
            <div className="snowflakes" aria-hidden="true">
                <div className="intro"> Find 250+ Ready to use demo at <a
                    href="https://codeconvey.com">Codeconvey.com</a></div>
                <div className="snowflake">❅</div>
                <div className="snowflake">❅</div>
                <div className="snowflake">❆</div>
                <div className="snowflake">❄</div>
                <div className="snowflake">❅</div>
                <div className="snowflake">❆</div>
                <div className="snowflake">❄</div>
                <div className="snowflake">❅</div>
                <div className="snowflake">❆</div>
                <div className="snowflake">❄</div>
                <div className="snowflake">❄</div>
                <div className="snowflake">❄</div>
                <div className="snowflake">❄</div>
                <div className="snowflake">❅</div>
                <div className="snowflake">❅</div>
                <div className="snowflake">❆</div>
                <div className="snowflake">❄</div>
                <div className="snowflake">❅</div>
                <div className="snowflake">❆</div>
                <div className="snowflake">❄</div>
                <div className="snowflake">❅</div>
                <div className="snowflake">❆</div>
                <div className="snowflake">❄</div>
                <div className="snowflake">❄</div>
                <div className="snowflake">❄</div>
                <div className="snowflake">❄</div>
            </div>
            <h1 className={""}>Arctic Exchange</h1>
            <img src={imageSrc} alt={"envelope background"} className={"App-Background"}></img>
            <BrowserRouter>
                <Routes>
                    <Route path="/" index element={<NewExchangeForm />} />
                    <Route path="join/:participantUrl" element={<JoinExchangePage />} />
                    <Route path="participants/:participantUrl" element={<CurrentParticipantPage />} />
                    <Route path="admin/:adminUrl" element={<AdminPage />} />
                </Routes>
            </BrowserRouter>
        </div>
  );
}

export default App;
