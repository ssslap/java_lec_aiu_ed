/* Лекция 3 RU: Операции и операторы Java (Расширенная версия) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Лекция 3: Операции и операторы Java</h2>

  <h3>Арифметические операции и инкремент/декремент</h3>
  <p>Java предоставляет полный набор арифметических операций для выполнения математических вычислений. Операции инкремента (<code>++</code>) и декремента (<code>--</code>) являются удобными сокращениями для увеличения или уменьшения значения переменной на единицу.</p>
  <ul>
    <li><code>+</code>, <code>-</code>, <code>*</code>, <code>/</code> — Сложение, вычитание, умножение, деление.</li>
    <li><code>%</code> (Модуль) — Возвращает остаток от деления. Очень полезен для задач вроде проверки на четность.</li>
    <li><code>++</code> (Инкремент) — Увеличивает значение на 1.</li>
    <li><code>--</code> (Декремент) — Уменьшает значение на 1.</li>
  </ul>
  <p><strong>Важно:</strong> Различают префиксную (<code>++x</code>) и постфиксную (<code>x++</code>) формы. Префиксная сначала изменяет значение, а затем возвращает его. Постфиксная сначала возвращает старое значение, а затем изменяет его.</p>
  <pre><code class="lang-java">int a = 5;
int b = a++; // b = 5, a становится 6
int c = ++a; // a становится 7, c = 7</code></pre>

  <h3>Операции сравнения и логические операции</h3>
  <p>Эти операции являются основой для принятия решений в коде. Они всегда возвращают результат типа <code>boolean</code> (<code>true</code> или <code>false</code>).</p>
  <ul>
    <li><strong>Операции сравнения:</strong> <code>==</code> (равно), <code>!=</code> (не равно), <code>></code> (больше), <code><</code> (меньше), <code>>=</code> (больше или равно), <code><=</code> (меньше или равно).</li>
    <li><strong>Логические операции:</strong> <code>&&</code> (логическое И), <code>||</code> (логическое ИЛИ), <code>!</code> (логическое НЕ).</li>
  </ul>
  <p>Операторы <code>&&</code> и <code>||</code> являются "короткозамкнутыми" (short-circuit). Например, в выражении <code>A && B</code>, если <code>A</code> ложно, то <code>B</code> даже не будет вычисляться, так как результат уже известен.</p>

  <h3>Управляющие конструкции: <code>if-else</code> и <code>switch</code></h3>
  <p><strong><code>if-else</code></strong> — это основная конструкция для ветвления. Она позволяет направить выполнение программы по разным путям в зависимости от истинности условия.</p>
  <p><strong><code>switch</code></strong> — удобная альтернатива для <code>if-else-if</code>, когда нужно сравнить одну переменную с несколькими константными значениями (<code>byte</code>, <code>short</code>, <code>char</code>, <code>int</code>, <code>String</code> или <code>enum</code>).</p>
  <pre><code class="lang-java">int dayOfWeek = 3;
String dayName;
switch (dayOfWeek) {
    case 1: dayName = "Понедельник"; break;
    case 2: dayName = "Вторник"; break;
    case 3: dayName = "Среда"; break;
    // ...
    default: dayName = "Неизвестный день";
}</code></pre>

  <h3>Интерактивный пример: Калькулятор скидок</h3>
  <p>Этот пример использует <code>if-else-if</code> для определения размера скидки в зависимости от суммы покупки.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class DiscountCalculator {
    public static void main(String[] args) {
        double purchaseAmount = 1200; // Сумма покупки
        double discount = 0.0;

        if (purchaseAmount >= 1000) {
            discount = 0.10; // 10%
        } else if (purchaseAmount >= 500) {
            discount = 0.05; // 5%
        }
        
        double finalPrice = purchaseAmount * (1 - discount);
        System.out.println("Финальная цена: " + finalPrice);
    }
}</code></pre>
      <div class="interactive-controls">
        Сумма покупки: <input type="number" class="java-input" value="1200" style="width: 100px;">
        <button class="run-java-sim">Рассчитать</button>
      </div>
      <div class="output">
          <p><strong>Результат:</strong></p>
          <pre class="result-output"></pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const btn = container.querySelector('.run-java-sim');
      const input = container.querySelector('.java-input');
      const output = container.querySelector('.result-output');
      
      function calculate() {
        const amount = parseFloat(input.value);
        if (isNaN(amount) || amount < 0) {
          output.textContent = 'Пожалуйста, введите корректную сумму.';
          return;
        }
        let discount = 0.0;
        if (amount >= 1000) {
            discount = 0.10;
        } else if (amount >= 500) {
            discount = 0.05;
        }
        const finalPrice = amount * (1 - discount);
        output.textContent = 'Скидка: ' + (discount * 100) + '%\\n' +
                             'Финальная цена: ' + finalPrice.toFixed(2);
      }
      
      btn.addEventListener('click', calculate);
      calculate();
    })();
  </script>

  <h3>Циклы: <code>for</code>, <code>while</code>, <code>do-while</code></h3>
  <p>Циклы необходимы для многократного выполнения одного и того же блока кода.</p>
  <ul>
    <li><strong><code>for</code>:</strong> Лучше всего подходит, когда количество итераций известно заранее. Состоит из инициализации, условия и инкремента.</li>
    <li><strong><code>while</code>:</strong> Выполняется, пока условие истинно. Используется, когда количество итераций заранее неизвестно.</li>
    <li><strong><code>do-while</code>:</strong> Похож на <code>while</code>, но гарантирует, что тело цикла выполнится хотя бы один раз, так как проверка условия происходит после итерации.</li>
    <li><strong><code>for-each</code>:</strong> Упрощенный синтаксис для последовательного перебора всех элементов массива или коллекции.</li>
  </ul>
</div>
`;
  window.__LECTURES_ru_3 = html;
})();
