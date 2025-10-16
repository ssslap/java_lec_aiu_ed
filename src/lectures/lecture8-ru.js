/* Лекция 8 RU: Классы Object и Class (Расширенная версия) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Лекция 8: Классы Object и Class</h2>

  <h3>Класс <code>java.lang.Object</code>: Прародитель Всего</h3>
  <p>В Java каждый класс, который вы создаете, неявно наследуется от класса <code>Object</code>, если не указан другой родительский класс. Это делает <code>Object</code> корнем всей иерархии классов. Благодаря этому наследованию, каждый объект в Java "из коробки" получает набор фундаментальных методов.</p>
  
  <h4>Ключевые методы класса <code>Object</code>:</h4>
  <ul>
    <li>
      <strong><code>String toString()</code></strong>
      <p>Этот метод предназначен для получения текстового представления объекта. Стандартная реализация выводит не очень полезную информацию (имя класса + хэш-код). <strong>Хорошей практикой</strong> является переопределение этого метода в ваших классах для вывода осмысленной информации о состоянии объекта, что очень помогает при отладке.</p>
    </li>
    <li>
      <strong><code>boolean equals(Object obj)</code></strong>
      <p>Сравнивает текущий объект с другим. По умолчанию, <code>==</code> для объектов сравнивает их адреса в памяти, а не содержимое. Метод <code>equals()</code> предназначен для "логического" сравнения. Если вы хотите, чтобы два объекта считались равными при совпадении их полей (например, два объекта <code>User</code> с одинаковыми ID), вы должны переопределить этот метод.</p>
    </li>
    <li>
      <strong><code>int hashCode()</code></strong>
      <p>Возвращает целочисленное значение (хэш-код), представляющее объект. Этот метод тесно связан с <code>equals()</code>. <strong>Контракт <code>hashCode</code>-<code>equals</code></strong> гласит:
      <br>1. Если два объекта равны по <code>equals()</code>, их <code>hashCode()</code> <em>обязан</em> быть одинаковым.
      <br>2. Если <code>hashCode()</code> разный, то объекты точно не равны.
      <br>Нарушение этого контракта приводит к некорректной работе коллекций, основанных на хэшировании (<code>HashMap</code>, <code>HashSet</code>).</p>
    </li>
    <li>
      <strong><code>Class<?> getClass()</code></strong>
      <p>Возвращает объект типа <code>Class</code>, который описывает класс текущего объекта во время выполнения. Это точка входа в механизм рефлексии.</p>
    </li>
  </ul>

  <h3>Интерактивный пример: Правильная реализация <code>equals</code> и <code>hashCode</code></h3>
  <p>Рассмотрим класс <code>Point</code>. Два объекта <code>Point</code> должны считаться равными, если их координаты <code>x</code> и <code>y</code> совпадают. Посмотрите, как это реализуется.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class Point {
    private int x, y;

    public Point(int x, int y) { this.x = x; this.y = y; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Point point = (Point) o;
        return x == point.x && y == point.y;
    }

    @Override
    public int hashCode() {
        // Простое вычисление хэш-кода на основе полей
        return 31 * x + y; 
    }
}</code></pre>
      <div class="interactive-controls">
        <button class="run-java-sim">Выполнить сравнение</button>
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
      const output = container.querySelector('.result-output');
      
      btn.addEventListener('click', () => {
        let log = 'Point p1 = new Point(10, 20);\\n';
        log += 'Point p2 = new Point(10, 20);\\n';
        log += 'Point p3 = new Point(30, 40);\\n\\n';

        log += 'p1.equals(p2): ' + true + ' // Объекты равны по содержимому\\n';
        log += 'p1.equals(p3): ' + false + '\\n\\n';
        
        log += 'hashCode p1: ' + (31 * 10 + 20) + '\\n';
        log += 'hashCode p2: ' + (31 * 10 + 20) + ' // Хэш-коды равны, как и положено\\n';
        log += 'hashCode p3: ' + (31 * 30 + 40);

        output.textContent = log;
      });
    })();
  </script>

  <h3>Рефлексия и класс <code>Class</code></h3>
  <p><strong>Рефлексия (Reflection)</strong> — это механизм, который позволяет исследовать и изменять структуру и поведение классов, полей и методов во время выполнения программы. Это очень мощный, но и потенциально опасный инструмент.</p>
  <p>Класс <code>java.lang.Class</code> является отправной точкой для рефлексии. С его помощью можно:</p>
  <ul>
      <li>Получить имя класса, его модификаторы.</li>
      <li>Получить список всех полей, методов, конструкторов.</li>
      <li>Динамически создавать новые экземпляры класса.</li>
      <li>Вызывать методы и изменять значения полей, даже приватных (с определенными ограничениями).</li>
  </ul>
  <p>Рефлексия активно используется во многих фреймворках (например, Spring, Hibernate) для автоматической конфигурации, сериализации и других задач, где требуется работать с кодом как с данными.</p>
</div>
`;
  window.__LECTURES_ru_8 = html;
})();
