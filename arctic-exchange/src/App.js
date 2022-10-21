
import './App.css'
import NewExchangeForm from "./new-exchange/NewExchangeForm"
import JoinExchangePage from "./join-exchange-page/JoinExchangePage"
import AdminSuccessPage from "./admin-success-page/AdminSuccessPage"
import ParticipantSuccessPage from "./participant-success-page/ParticipantSuccessPage"
import AdminCreateSuccessPage from "./admin-create-success-page/AdminCreateSuccessPage"
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
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
                <div className="snowflake">.</div>
            </div>
            <h1 className={""}>Arctic Exchange</h1>
            <img src={imageSrc} alt={"envelope background"} className={"App-Background"}></img>
            <BrowserRouter>
                <Routes>
                    <Route path="/" index element={<NewExchangeForm />} />
                    <Route path="join/:participantUrl" element={<JoinExchangePage />} />
                    <Route path="participants/:participantUrl" element={<CurrentParticipantPage />} />
                    <Route path="organise/:adminUrl" element={<AdminPage />} />
                    <Route path="organise/success" element={<AdminSuccessPage />} />
                    <Route path="join/success" element={<ParticipantSuccessPage />} />
                    <Route path="organise/createSuccess" element={<AdminCreateSuccessPage />} />
                </Routes>
            </BrowserRouter>
        </div>
  );
}

export default App;
