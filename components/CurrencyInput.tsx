import React from 'react';
const CurrencyInput: React.FC = () => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseFloat(e.target.value) || 0;
    console.log(value + Math.random());
  };
  return <li>Введите сумму: <input type="number" onChange={onChange} /></li>;
};
export default CurrencyInput;
