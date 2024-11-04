import "./styles.css";
import ConnectPairsCaptcha from "./ConnectPairsCaptcha";
import BirdGame from "./BirdGame";

export default function App() {
  return (
    <div className="App">
      <h1>Captchas</h1>
      <h2>One</h2>
      <ConnectPairsCaptcha />
      <hr />
      <h2>Two</h2>
      <BirdGame />
    </div>
  );
}
