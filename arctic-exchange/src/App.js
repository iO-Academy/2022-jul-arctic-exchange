
import './App.css';
import NewExchangeForm from "./new-exchange/NewExchangeForm";
import imageSrc from "./envelopeBackground.jpg"


function App() {
  return (
        <div className="App">
            <header>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                        <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"
                              rel="stylesheet"/>
            </header>
            <h1 className={""}>Arctic Exchange</h1>
            <img src={imageSrc} alt={"envelope background"} className={"App-Background"}></img>
            <NewExchangeForm />
        </div>
  );
}

export default App;
