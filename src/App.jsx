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
    { "text": "Я занят" },
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
      // Добавляем сообщение пользователя и временное сообщение "..."
      setMessages([...messages, { text: userAnswer, sender: 'user' }, { text: '...', sender: 'bot' }]);
      // Вызывает getRandomAnswer для получения случайного ответа бота и добавляет его 
      // в массив messages с указанием, что отправитель — bot.

      //обрачиваем функцию в сетТаймаут, чтобы бот отвечал с задержкой
      setTimeout(() => {
        let botResponse;
        if (userAnswer.trim().toLowerCase() === 'сосал?') {
          botResponse = 'Да'
        }
        else if (userAnswer.trim().toLowerCase() === 'какой долг у максима?') {
          botResponse = 'ꝏ рублей'
        }
        else {
          botResponse = getRandomAnswer();
        }

        setMessages(prevMessages => {
          // Удаляем последнее сообщение "..." и добавляем реальный ответ
          const updatedMessages = [...prevMessages];
          updatedMessages.pop(); // Удаляем "..."
          return [...updatedMessages, { text: botResponse, sender: 'bot' }];
        });
      }, 1500); // а тут пишется задержка 1500 миллисекунд (1.5 секунды)

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
      <div className='input-container'>
        <textarea
          name="message"
          id="message"
          placeholder="Задай любой вопрос..."
          value={userAnswer}
          onChange={(event) => setUserAnswer(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault(); // не добавляется новая строка
              handleSendMessage();
            }
          }}
        ></textarea>
        <button className='send-button' onClick={handleSendMessage}>&#9654;</button>
      </div>
    </div>
  );
}

export default App;