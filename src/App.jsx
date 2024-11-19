import React, { useState } from 'react'

function App() {
  const [userAnswer, setUserAnswer] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Здаров, задай любой вопрос, я постараюсь на него ответить...', sender: 'bot' }
  ]);



  const answer = [
    { "text": "Ээээ" },
    { "text": "Посмотрим" },
    { "text": "Не знаю" },
    { "text": "..." },
    { "text": "Хз" },
    { "text": "Увидим" },
  ];

  // Эта функция выбирает случайный ответ из массива answer. Она генерирует 
  // случайный индекс с помощью Math.random() и Math.floor(), а затем возвращает 
  // текст по этому индексу
  const getRandomAnswer = () => {
    // Math.Floor округляет число, а Math.Random генерирует случайное число с плавающей точкой, 
    // после умножает на длинну массива
    const randomIndex = Math.floor(Math.random() * answer.length);
    return answer[randomIndex].text;
  }
  // Функия проверяет, не пустое ли сообщение, после чего добавляет в массив message с указанием, что ввел пользователь
  const handleSendMessage = () => {
    if (userAnswer.trim()) {
      setMessages([...messages, { text: userAnswer, sender: 'user' }]);
      // Вызывает getRandomAnswer для получения случайного ответа бота и добавляет его 
      // в массив messages с указанием, что отправитель — bot.
      const botResponse = getRandomAnswer();
      setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }])
      // Очищает поле ввода, сбрасывая userAnswer в пустую строку.
      setUserAnswer('');
    }
  };

  return (
    <div className='App'>
      <h1>Чат бот Илья</h1>
      <div className='chat-container'>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}-message`}>
            <div className='message-content'>{message.text}</div>
          </div>
        ))}
      </div>
      <textarea
        name="message"
        id="message"
        placeholder="Задай любой вопрос..."
        value={userAnswer}
        // 'e' это объект события
        onChange={(e) => setUserAnswer(e.target.value)}
      ></textarea>
      <button onClick={handleSendMessage}>Отправить</button>
    </div>
  );
}

export default App;