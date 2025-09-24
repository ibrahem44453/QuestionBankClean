let currentIndex = 0;
let score = 0;

// نسخة من الأسئلة (ممكن تستخدم ALL_ITEMS إذا فيها أسئلة)
const quizQuestions = ALL_ITEMS.map(q => ({
  question: q.q,
  options: q.more.split(','), // لو عندك خيارات مفصولة بفاصلة
  answer: q.answer || q.more.split(',')[0] // تخمين أول خيار كإجابة صحيحة إذا ما عندك
}));

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

function showQuestion(index){
  questionEl.textContent = quizQuestions[index].question;
  optionsEl.innerHTML = '';
  quizQuestions[index].options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.addEventListener('click', ()=>checkAnswer(opt));
    optionsEl.appendChild(btn);
  });
  nextBtn.style.display = 'none';
}

function checkAnswer(selected){
  const correct = quizQuestions[currentIndex].answer;
  if(selected === correct) score++;
  nextBtn.style.display = 'block';
  // Disable all buttons بعد الإجابة
  Array.from(optionsEl.children).forEach(b => b.disabled = true);
}

nextBtn.addEventListener('click', ()=>{
  currentIndex++;
  if(currentIndex < quizQuestions.length){
    showQuestion(currentIndex);
  } else {
    // نهاية الكويز
    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    nextBtn.style.display = 'none';
    scoreEl.style.display = 'block';
    scoreEl.textContent = `انتهى الاختبار! نتيجتك: ${score} / ${quizQuestions.length}`;
  }
});

// بدء الكويز
showQuestion(currentIndex);
