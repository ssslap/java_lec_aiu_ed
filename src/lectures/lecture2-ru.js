/* Лекция 2 RU: Введение в язык программирования Java (Расширенная версия) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Лекция 2: Введение в язык программирования Java</h2>

  <h3>Структура Java-приложения</h3>
  <p>Каждое Java-приложение имеет точку входа — это статический метод <code>main</code>. JVM начинает выполнение программы именно с этого метода. Он должен иметь строго определенную сигнатуру:</p>
  <pre><code class="lang-java">public class Application {
    public static void main(String[] args) {
        // args - это массив строк, который содержит аргументы командной строки
        System.out.println("Приложение запущено!");
    }
}</code></pre>
  <p>Весь исполняемый код в Java должен находиться внутри классов. Класс — это основной строительный блок объектно-ориентированного программирования.</p>

  <h3>Пакеты (Packages)</h3>
  <p>Пакеты — это механизм для организации классов в пространства имен. Они помогают избежать конфликтов имен и логически сгруппировать связанные классы. Представьте их как папки в файловой системе.</p>
  <ul>
    <li><strong>Объявление:</strong> <code>package com.mycompany.project;</code> — эта строка должна быть первой в файле.</li>
    <li><strong>Импорт:</strong> <code>import java.util.ArrayList;</code> — позволяет использовать класс <code>ArrayList</code> без указания полного имени <code>java.util.ArrayList</code>.</li>
  </ul>
  <p>Принято называть пакеты в стиле перевернутого доменного имени (например, <code>com.google.common</code>), чтобы обеспечить их глобальную уникальность.</p>

  <h3>Примитивные типы данных</h3>
  <p>В Java есть 8 примитивных типов, которые хранят непосредственно значения, а не ссылки на объекты. Они являются основой для всех более сложных структур данных.</p>
  <div class="table-container">
    <table>
      <thead><tr><th>Тип</th><th>Размер</th><th>Описание</th><th>Пример</th></tr></thead>
      <tbody>
        <tr><td><code>byte</code></td><td>8 бит</td><td>Целое число</td><td><code>byte b = 100;</code></td></tr>
        <tr><td><code>short</code></td><td>16 бит</td><td>Целое число</td><td><code>short s = 30000;</code></td></tr>
        <tr><td><code>int</code></td><td>32 бита</td><td>Основной тип для целых чисел</td><td><code>int i = 1000000;</code></td></tr>
        <tr><td><code>long</code></td><td>64 бита</td><td>Для очень больших целых чисел</td><td><code>long l = 9000000000L;</code> (суффикс L обязателен)</td></tr>
        <tr><td><code>float</code></td><td>32 бита</td><td>Число с плавающей точкой</td><td><code>float f = 3.14f;</code> (суффикс f обязателен)</td></tr>
        <tr><td><code>double</code></td><td>64 бита</td><td>Основной тип для чисел с плавающей точкой</td><td><code>double d = 3.14159265;</code></td></tr>
        <tr><td><code>boolean</code></td><td>1 бит</td><td>Логическое значение</td><td><code>boolean isValid = true;</code></td></tr>
        <tr><td><code>char</code></td><td>16 бит</td><td>Один символ Unicode</td><td><code>char c = 'A';</code></td></tr>
      </tbody>
    </table>
  </div>

  <h3>Переменные и константы</h3>
  <p>Переменная — это именованная область памяти для хранения данных. В Java каждая переменная должна иметь определенный тип.</p>
  <p>Константа — это переменная, значение которой нельзя изменить после инициализации. Она объявляется с помощью ключевого слова <code>final</code>.</p>
  <pre><code class="lang-java">int userScore = 0; // Обычная переменная
userScore = 10; // Можно изменить

final int MAX_LIVES = 3; // Константа
// MAX_LIVES = 4; // Ошибка компиляции!</code></pre>

  <h3>Интерактивный пример: Преобразование типов</h3>
  <p>Преобразование типов бывает двух видов: <strong>неявное (widening)</strong>, когда меньший тип помещается в больший (например, <code>int</code> в <code>double</code>), и <strong>явное (narrowing)</strong>, когда больший тип помещается в меньший с возможной потерей данных.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class TypeCasting {
    public static void main(String[] args) {
        // Неявное преобразование (безопасное)
        int myInt = 100;
        double myDouble = myInt; 
        System.out.println("int " + myInt + " стал double " + myDouble);

        // Явное преобразование (может быть потеря данных)
        double anotherDouble = 9.78;
        int anotherInt = (int) anotherDouble; // Дробная часть отбрасывается
        System.out.println("double " + anotherDouble + " стал int " + anotherInt);
    }
}</code></pre>
      <button class="run-java-sim">Выполнить</button>
      <div class="output">
          <p><strong>Результат:</strong></p>
          <pre class="result-output">int 100 стал double 100.0
double 9.78 стал int 9</pre>
      </div>
  </div>
  

  <h3>Объекты и Ссылки</h3>
  <p>В отличие от примитивов, переменные объектных типов хранят не сам объект, а <strong>ссылку</strong> — адрес объекта в памяти. Когда вы присваиваете одну объектную переменную другой, вы копируете только ссылку, а не сам объект.</p>
  <pre><code class="lang-java">// StringBuilder - изменяемая строка
StringBuilder sb1 = new StringBuilder("Hello");
StringBuilder sb2 = sb1; // sb2 теперь указывает на тот же объект, что и sb1

sb2.append(" World!"); // Изменяем объект через вторую ссылку

System.out.println(sb1); // Выведет "Hello World!"</code></pre>
  <p>Если ссылка не указывает ни на какой объект, ей присваивается специальное значение <code>null</code>. Попытка вызвать метод у <code>null</code>-ссылки приведет к ошибке <code>NullPointerException</code>.</p>
</div>
`;
  window.__LECTURES_ru_2 = html;
})();
