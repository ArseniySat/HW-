// src/components/CurrencyInput.tsx
import React from 'react';
import currency from 'currency.js';

const CurrencyInput: React.FC = () => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = currency(e.target.value).value;
    const random = Math.random();
    console.log(`Сумма: ${currency(value).add(random).value}`);
  };

  return (
    <li>
      Введите сумму: <input type="number" step="0.01" onChange={onChange} />
    </li>
  );
};

export default CurrencyInput;
