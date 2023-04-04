document.addEventListener('DOMContentLoaded', function() {
    const carouselEl = document.querySelector('.carousel');
    const carouselInstance = M.Carousel.init(carouselEl);
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    prevBtn.addEventListener('click', function() {
      carouselInstance.prev();
    });
    
    nextBtn.addEventListener('click', function() {
      carouselInstance.next();
    });
  });
  
  
class ChatGPT {
    constructor(apiKey) {
      this.inputQuestionGPT = document.querySelector('#question');
      this.resultQuestionGPT = document.querySelector('#result');
      this.buttonSendQuestion = document.querySelector('#send-question');
      this.OPEN_API_KEY = apiKey;
      this.init();
    }
  
    init() {
      this.inputQuestionGPT.addEventListener('keypress', (event) => {
        if (this.inputQuestionGPT.value && event.key === 'Enter') {
          this.sendQuestion();
        }
      });
  
      this.buttonSendQuestion.addEventListener('click', (event) => {
        this.sendQuestion();
      });
    }
  
    sendQuestion() {
      const question = this.inputQuestionGPT.value;
  
      promise = fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.OPEN_API_KEY}`
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: question,
          max_tokens: 2048, // Tamanho da Resposta
          temperature: 0.5 // Criatividade da API
        })
      })
        .then((response) => response.json())
        .then((json) => {
          if (this.resultQuestionGPT.value) {
            this.resultQuestionGPT.value += '\n';
          }
          if (json.error?.message) {
            this.resultQuestionGPT.value += `Error: ${json.error.mesage}`;
          } else if (json.choices?.[0].text) {
            const text = json.choices[0].text || 'Sem resposta';
            this.resultQuestionGPT.value += `Chat GPT: ${text}`;
          }
          this.resultQuestionGPT.scrollTop = this.resultQuestionGPT.scrollHeight;
        })
        .catch((error) => console.error(`Error: ${error}`))
        .finally(() => {
          this.inputQuestionGPT.value = '';
          this.inputQuestionGPT.readOnly = true;
        });
      if (this.resultQuestionGPT) {
        this.resultQuestionGPT.value += '\n\n\n';
      }
      this.resultQuestionGPT.value += `Eu: ${question}`;
      this.inputQuestionGPT.value = 'Carregando...';
  
      this.resultQuestionGPT.scrollTop = this.resultQuestionGPT.scrollHeight;
    }
  }
  
  const chatGPT = new ChatGPT('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');
  