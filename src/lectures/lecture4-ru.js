/* Лекция 4 RU: Стандартные типы Java (Расширенная версия) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Лекция 4: Стандартные типы Java</h2>

  <h3>Массивы</h3>
  <p>Массив — это фундаментальная структура данных, представляющая собой контейнер фиксированного размера, который хранит последовательность элементов одного типа. Доступ к элементам осуществляется по их индексу (начиная с 0).</p>
  <pre><code class="lang-java">// Объявление массива строк на 3 элемента
String[] names = new String[3];
names[0] = "Alice";
names[1] = "Bob";
names[2] = "Charlie";

// Инициализация массива при объявлении
int[] numbers = {10, 20, 30, 40, 50};

// Получение длины массива
System.out.println("Длина массива numbers: " + numbers.length); // 5</code></pre>
  <p>Массивы полезны для хранения коллекций элементов, но их размер нельзя изменить после создания. Для динамических коллекций лучше использовать классы из Collections Framework (например, <code>ArrayList</code>).</p>

  <h3>Работа со строками: <code>String</code></h3>
  <p>Класс <code>String</code> в Java является одним из самых используемых. Важнейшая его характеристика — <strong>неизменяемость (immutability)</strong>. Это означает, что после создания объекта <code>String</code> его значение изменить нельзя. Любая операция, которая кажется изменяющей строку (например, конкатенация), на самом деле создает новый объект <code>String</code> в памяти.</p>
  
  <h4>Полезные методы класса <code>String</code>:</h4>
  <ul>
    <li><code>int length()</code>: Возвращает количество символов в строке.</li>
    <li><code>char charAt(int index)</code>: Возвращает символ по указанному индексу.</li>
    <li><code>boolean equals(Object obj)</code>: Сравнивает строки на точное совпадение с учетом регистра. Для сравнения строк всегда используйте <code>.equals()</code>, а не <code>==</code>.</li>
    <li><code>boolean startsWith(String prefix) / boolean endsWith(String suffix)</code>: Проверяет, начинается или заканчивается ли строка на указанную подстроку.</li>
    <li><code>String substring(int beginIndex, int endIndex)</code>: Извлекает подстроку.</li>
    <li><code>String trim()</code>: Удаляет пробелы в начале и в конце строки.</li>
  </ul>

  <h3><code>StringBuilder</code> и <code>StringBuffer</code></h3>
  <p>Поскольку <code>String</code> неизменяем, многократные операции с ним (например, сборка строки в цикле) могут быть неэффективными из-за создания большого количества промежуточных объектов. Для таких задач существуют изменяемые аналоги:</p>
  <ul>
    <li><strong><code>StringBuilder</code>:</strong> Быстрый, но не потокобезопасный. Идеален для использования в одном потоке.</li>
    <li><strong><code>StringBuffer</code>:</strong> Потокобезопасный (все методы синхронизированы), но медленнее. Используется в многопоточных приложениях.</li>
  </ul>
  <pre><code class="lang-java">StringBuilder builder = new StringBuilder();
builder.append("Это ");
builder.append("эффективный ");
builder.append("способ ");
builder.append("построить строку.");
String result = builder.toString(); // Преобразование в String</code></pre>

  <h3>Интерактивный пример: Переворот строки</h3>
  <p>Этот пример демонстрирует, как можно эффективно перевернуть строку с помощью <code>StringBuilder</code>.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class StringReverse {
    public static void main(String[] args) {
        String original = "Java";
        
        StringBuilder sb = new StringBuilder(original);
        String reversed = sb.reverse().toString();
        
        System.out.println("Оригинал: " + original);
        System.out.println("Перевернутая строка: " + reversed);
    }
}</code></pre>
      <div class="interactive-controls">
        <input type="text" class="java-input" value="Java" placeholder="Введите строку">
        <button class="run-java-sim">Перевернуть</button>
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
      
      function reverse() {
        const original = input.value;
        const reversed = original.split('').reverse().join('');
        output.textContent = 'Оригинал: ' + original + '\\n' +
                             'Перевернутая строка: ' + reversed;
      }
      
      btn.addEventListener('click', reverse);
      reverse();
    })();
  </script>

  <h3>Классы-оболочки (Wrapper Classes)</h3>
  <p>Для каждого из 8 примитивных типов в Java существует соответствующий класс-оболочка. Они "оборачивают" примитивное значение в объект, что позволяет использовать их там, где требуются объекты (например, в коллекциях).</p>
  <p><code>int -> Integer</code>, <code>double -> Double</code>, <code>char -> Character</code>, <code>boolean -> Boolean</code> и т.д.</p>
  <p><strong>Автоупаковка (Autoboxing)</strong> и <strong>распаковка (Unboxing)</strong> — это автоматическое преобразование между примитивными типами и их объектными оболочками.</p>
  <pre><code class="lang-java">ArrayList<Integer> list = new ArrayList<>();
list.add(10); // Автоупаковка: int 10 преобразуется в Integer.valueOf(10)

int primitive = list.get(0); // Распаковка: Integer преобразуется в int</code></pre>
</div>
`;
  window.__LECTURES_ru_4 = html;
})();
