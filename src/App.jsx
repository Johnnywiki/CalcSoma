import React, { useState, useEffect } from "react";

function App() {
  const [numbers, setNumbers] = useState(() => {
    const savedNumbers = localStorage.getItem("numbers");
    return savedNumbers ? JSON.parse(savedNumbers) : [];
  });
  const [newNumber, setNewNumber] = useState(0);

  // Função para somar os números...que usa...reduce...ótimo...
  const sumNumbers = () => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum;
  };

  // Atualizar o estado local sempre que a lista de números mudar
  useEffect(() => {
    localStorage.setItem("numbers", JSON.stringify(numbers));
  }, [numbers]);

  // Adicionar um novo número à lista
  const addNumber = () => {
    if (!newNumber || isNaN(newNumber)) {
      alert("Por favor, insira um número válido.");
      return;
    }

    setNumbers([...numbers, parseFloat(newNumber)]);
    setNewNumber(0);
  };

  // Limpar todos os números e o estado local
  const clearNumbers = () => {
    setNumbers([]);
    localStorage.removeItem("numbers");
  };

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-screen-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Calculadora de Soma</h1>
        <div className="mb-6">
          <label htmlFor="newNumber" className="block text-gray-700 font-semibold">
            Novo Número:
          </label>
          <input
            type="number"
            id="newNumber"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            className="border rounded-lg p-3 w-full"
          />
        </div>
        <button
          onClick={addNumber}
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 w-full"
        >
          Adicionar Número
        </button>
        <div className="mt-4">
          <p className="font-semibold">Números Adicionados:</p>
          <ul>
            {numbers.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
        </div>
        <p className="mt-4 font-semibold text-center">
          Soma Total: <span className="text-blue-500">{sumNumbers()}</span>
        </p>
        <button
          onClick={clearNumbers}
          className="mt-4 bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 w-full"
        >
          Limpar Números
        </button>
      </div>
    </div>
  );
}

export default App;
