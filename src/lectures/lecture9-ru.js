/* Лекция 9 RU: Обработка ошибок (Расширенная версия) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Лекция 9: Обработка ошибок</h2>

  <h3>Исключения: Что это и зачем они нужны?</h3>
  <p><strong>Исключение (Exception)</strong> — это "исключительная" ситуация, возникающая во время выполнения программы, которая нарушает нормальный ход ее работы. Вместо того чтобы аварийно завершиться, программа может "выбросить" исключение — специальный объект, содержащий информацию об ошибке.</p>
  <p>Механизм исключений позволяет отделить код обработки ошибок от основной бизнес-логики, делая программу более чистой и надежной.</p>

  <h3>Иерархия исключений в Java</h3>
  <p>В Java все ошибки представлены в виде объектов, наследующихся от класса <code>Throwable</code>. Иерархия выглядит так:</p>
  <ul>
    <li><strong><code>Error</code>:</strong> Серьезные проблемы, которые приложение обычно не может обработать. Например, <code>OutOfMemoryError</code> (нехватка памяти) или <code>StackOverflowError</code> (переполнение стека). Их не принято "ловить".</li>
    <li><strong><code>Exception</code>:</strong> Ошибки, которые приложение может и должно обрабатывать. Делятся на два типа:
      <ul>
        <li><strong>Checked Exceptions (Проверяемые):</strong> Наследники <code>Exception</code> (кроме <code>RuntimeException</code>). Компилятор заставляет вас обрабатывать их с помощью <code>try-catch</code> или объявлять в сигнатуре метода с помощью <code>throws</code>. Примеры: <code>IOException</code> (ошибка ввода-вывода), <code>SQLException</code> (ошибка при работе с БД).</li>
        <li><strong>Unchecked Exceptions (Непроверяемые):</strong> Наследники <code>RuntimeException</code>. Обычно это ошибки программирования (дефекты логики), такие как <code>NullPointerException</code>, <code>ArrayIndexOutOfBoundsException</code>. Компилятор не требует их обязательной обработки.</li>
      </ul>
    </li>
  </ul>

  <h3>Обработка исключений: <code>try-catch-finally</code></h3>
  <p>Это основная конструкция для работы с исключениями:</p>
  <ul>
    <li><strong><code>try</code>:</strong> Блок, в который помещается "опасный" код, способный выбросить исключение.</li>
    <li><strong><code>catch (ExceptionType e)</code>:</strong> Блок, который выполняется, если в блоке <code>try</code> было выброшено исключение указанного типа. Можно иметь несколько блоков <code>catch</code> для разных типов исключений.</li>
    <li><strong><code>finally</code>:</strong> Необязательный блок, который выполняется <strong>всегда</strong> — и если исключения не было, и если оно было поймано, и даже если оно не было поймано. Идеальное место для освобождения ресурсов (закрытия файлов, соединений).</li>
  </ul>

  <h3>Интерактивный пример: Разбор числа из строки</h3>
  <p>Метод <code>Integer.parseInt()</code> выбрасывает <code>NumberFormatException</code> (непроверяемое исключение), если ему передать строку, которую нельзя преобразовать в число. Давайте обработаем эту ситуацию.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class Parser {
    public static void main(String[] args) {
        String str = "123a";
        try {
            int number = Integer.parseInt(str);
            System.out.println("Вы ввели число: " + number);
        } catch (NumberFormatException e) {
            System.err.println("Ошибка: '" + str + "' не является числом.");
        } finally {
            System.out.println("Попытка разбора завершена.");
        }
    }
}</code></pre>
      <div class="interactive-controls">
        <input type="text" class="java-input" value="123a" placeholder="Введите строку">
        <button class="run-java-sim">Разобрать</button>
      </div>
      <div class="output">
          <p><strong>Результат:</strong></p>
          <pre class="result-output">Результат: (примерный вывод)</pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const btn = container.querySelector('.run-java-sim');
      const input = container.querySelector('.java-input');
      const output = container.querySelector('.result-output');
      
      function parse() {
        const str = input.value;
        let log = '';
        if (/^-?\\d+$/.test(str)) {
          log += 'Вы ввели число: ' + str;
        } else {
          log += "Ошибка: '" + str + "' не является числом.";
        }
        log += '\\nПопытка разбора завершена.';
        output.textContent = log;
      }
      
      btn.addEventListener('click', parse);
      parse();
    })();
  </script>

  <h3>Создание собственных исключений</h3>
  <p>Для создания более информативных и специфичных для вашего приложения ошибок, вы можете создавать собственные классы исключений. Просто унаследуйте свой класс от <code>Exception</code> (для проверяемого) или <code>RuntimeException</code> (для непроверяемого).</p>
  <pre><code class="lang-java">public class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

// Использование
public void withdraw(double amount) throws InsufficientFundsException {
    if (balance < amount) {
        throw new InsufficientFundsException("Недостаточно средств на счете.");
    }
    // ...
}</code></pre>
</div>
`;
  window.__LECTURES_ru_9 = html;
})();
