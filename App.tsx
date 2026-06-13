// src/App.tsx
import CircleArea from './components/CircleArea';
import Pythagorean from './components/Pythagorean';
import QuadraticFormula from './components/QuadraticFormula';
import SphereVolume from './components/SphereVolume';
import EulerFormula from './components/EulerFormula';
import CurrencyInput from './components/CurrencyInput';

function App() {
  return (
    <div>
      <h1>Математические формулы</h1>
      <ol>
        <CircleArea />
        <Pythagorean />
        <QuadraticFormula />
        <SphereVolume />
        <EulerFormula />
        <CurrencyInput />
      </ol>
    </div>
  );
}

export default App;
