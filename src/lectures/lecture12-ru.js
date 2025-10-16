/* Лекция 12 RU: Коллекции (Collections Framework) (Расширенная версия) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Лекция 12: Коллекции (Collections Framework)</h2>

  <h3>Введение в Collections Framework</h3>
  <p><strong>Java Collections Framework</strong> — это унифицированная архитектура для представления и обработки коллекций, то есть групп объектов. Он предоставляет готовые структуры данных и алгоритмы, что избавляет от необходимости изобретать их заново.</p>
  
  <h4>Основные преимущества:</h4>
  <ul>
    <li><strong>Сокращение усилий на программирование:</strong> Готовые к использованию структуры данных и алгоритмы.</li>
    <li><strong>Повышение производительности:</strong> Высокоэффективные реализации.</li>
    <li><strong>Совместимость:</strong> Стандартные интерфейсы позволяют различным частям кода взаимодействовать через коллекции.</li>
  </ul>

  <h3>Ключевые интерфейсы</h3>
  <p>В основе фреймворка лежат несколько ключевых интерфейсов:</p>
  <ul>
    <li><strong><code>List<E></code>:</strong> Упорядоченная коллекция, элементы которой доступны по целочисленному индексу. Допускает дубликаты.
      <ul>
        <li><code>ArrayList</code>: Быстрый доступ по индексу, но медленное добавление/удаление в середине.</li>
        <li><code>LinkedList</code>: Быстрое добавление/удаление элементов, но медленный доступ по индексу.</li>
      </ul>
    </li>
    <li><strong><code>Set<E></code>:</strong> Коллекция, не содержащая дубликатов.
      <ul>
        <li><code>HashSet</code>: Хранит элементы в хэш-таблице. Не гарантирует порядок элементов.</li>
        <li><code>TreeSet</code>: Хранит элементы в отсортированном порядке.</li>
      </ul>
    </li>
    <li><strong><code>Map<K, V></code>:</strong> Объект, который сопоставляет ключи со значениями. Ключи уникальны.
      <ul>
        <li><code>HashMap</code>: Не гарантирует порядок пар. Обеспечивает наилучшую производительность.</li>
        <li><code>TreeMap</code>: Хранит пары отсортированными по ключу.</li>
      </ul>
    </li>
  </ul>

  <h3>Итераторы (Iterator)</h3>
  <p>Итератор — это объект, который позволяет последовательно перебирать элементы коллекции, независимо от ее конкретной реализации. Это универсальный способ обхода любой коллекции.</p>
  <pre><code class="lang-java">List<String> list = new ArrayList<>();
list.add("A"); list.add("B"); list.add("C");

Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    String element = iterator.next();
    System.out.println(element);
    // iterator.remove(); // Безопасное удаление элемента во время итерации
}</code></pre>

  <h3>Интерактивный пример: Подсчет уникальных слов</h3>
  <p>Этот пример использует <code>Set</code> для эффективного подсчета количества уникальных слов в тексте. Так как <code>Set</code> не хранит дубликатов, каждое слово будет добавлено только один раз.</p>
  <div class="code-example">
      <pre><code class="lang-java">import java.util.*;

public class UniqueWords {
    public static void main(String[] args) {
        String text = "hello world hello java world";
        
        // Убираем знаки препинания и приводим к нижнему регистру
        String[] words = text.toLowerCase().split(" ");
        
        Set<String> uniqueWords = new HashSet<>(Arrays.asList(words));
        
        System.out.println("Всего слов: " + words.length);
        System.out.println("Уникальных слов: " + uniqueWords.size());
        System.out.println(uniqueWords);
    }
}</code></pre>
      <div class="interactive-controls">
        <textarea class="java-input" style="width:100%; height: 60px;">hello world hello java world</textarea>
        <button class="run-java-sim">Подсчитать</button>
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
      const textarea = container.querySelector('.java-input');
      const output = container.querySelector('.result-output');
      
      function countUnique() {
        const text = textarea.value;
        const words = text.toLowerCase().split(/\\s+/).filter(w => w.length > 0);
        const uniqueWords = new Set(words);
        
        let log = 'Всего слов: ' + words.length + '\\n';
        log += 'Уникальных слов: ' + uniqueWords.size + '\\n';
        log += '[' + Array.from(uniqueWords).join(', ') + ']';
        output.textContent = log;
      }
      
      btn.addEventListener('click', countUnique);
      countUnique();
    })();
  </script>
</div>
`;
  window.__LECTURES_ru_12 = html;
})();
