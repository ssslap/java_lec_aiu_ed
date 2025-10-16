/* Лекция 1 RU: Введение в Java-технологии (Расширенная версия) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Лекция 1: Введение в Java-технологии</h2>

  <h3>Коротко о Java</h3>
  <p>Java — это язык программирования и одновременно большая платформа для создания приложений: от небольших консольных утилит до распределённых серверных систем и мобильных приложений. Появившийся в 1995 году, Java остаётся популярной благодаря переносимости кода (JVM), богатой библиотеке и сильной экосистеме инструментов.</p>

  <h3>Почему Java важна</h3>
  <ul>
    <li>Платформенная независимость: байт-код выполняется на любой JVM.</li>
    <li>Широкая экосистема: фреймворки, библиотеки и инструменты (Spring, Jakarta EE, Maven/Gradle и др.).</li>
    <li>Подходит для крупных проектов: строгая типизация и понятная модель памяти упрощают поддержку.</li>
  </ul>

  <h3>Основные компоненты экосистемы</h3>
  <div class="diagram">
      <div class="box jdk"><strong>JDK</strong> — разработка
          <div class="box jre"><strong>JRE</strong> — среда выполнения
              <div class="box jvm"><strong>JVM</strong> — виртуальная машина</div>
          </div>
      </div>
  </div>
  <p>Коротко: JDK содержит инструменты для разработки (включая компилятор <code>javac</code>), JRE позволяет запускать приложения, а JVM исполняет байт-код и управляет памятью.</p>

  <h3>Как создаётся и запускается Java-программа</h3>
  <ol>
    <li>Создаём файл <code>.java</code> с исходным кодом.</li>
    <li>Компилируем <code>javac</code> → получаем <code>.class</code> (байт-код).</li>
    <li>Запускаем байт-код через <code>java</code> (JVM загружает и исполняет классы).</li>
  </ol>

  <h3>Быстрая демонстрация: "Hello, Java"</h3>
  <p>Пример показывает структуру программы: класс, метод <code>main</code> и вывод в консоль.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java world!!!");
    }
}</code></pre>
      <button class="run-java-sim">Выполнить</button>
      <div class="output">
          <p><strong>Симуляция компиляции и запуска:</strong></p>
          <pre><code>> javac HelloWorld.java
> java HelloWorld</code></pre>
          <p><strong>Результат:</strong></p>
          <pre class="result-output"></pre>
      </div>
  </div>
  <script>
    (function() {
      const btn = document.currentScript.closest('.code-example').querySelector('.run-java-sim');
      const output = btn.nextElementSibling.querySelector('.result-output');
      btn.addEventListener('click', () => {
        output.textContent = 'Hello, Java world!!!';
      });
    })();
  </script>

  <h3>Базовые элементы языка</h3>
  <p>Ниже — краткий обзор синтаксиса и основных понятий, с которыми вы столкнётесь в первых главах любого курса по Java.</p>
  <h4>Переменные и типы:</h4>
  <p>Java имеет примитивные типы (<code>int</code>, <code>long</code>, <code>double</code>, <code>boolean</code>, <code>char</code>) и ссылочные типы (объекты и массивы). Объявление переменной выглядит как <code>int x = 10;</code>.</p>

  <h4>Операторы управления:</h4>
  <p>Стандартные конструкции: <code>if/else</code>, <code>switch</code>, циклы <code>for</code>, <code>while</code>, <code>do-while</code>. Пример:</p>
  <pre><code class="lang-java">for (int i = 0; i &lt; 5; i++) {
    System.out.println(i);
}</code></pre>

  <h4>Объектно-ориентированность (очень кратко)</h4>
  <p>Классы и объекты — основа Java. Класс описывает состояние и поведение (поля и методы). Принципы: инкапсуляция, наследование, полиморфизм и абстракция.</p>

  <h3>Инструменты и экосистема</h3>
  <ul>
    <li>Maven/Gradle — системы сборки и управления зависимостями.</li>
    <li>IDE: IntelliJ IDEA, Eclipse, VS Code (с плагинами).</li>
    <li>Популярные фреймворки: Spring (для серверных приложений), Jakarta EE, Hibernate (ORM).</li>
  </ul>

  <h3>Практические советы</h3>
  <ul>
    <li>Пишите тесты (JUnit) — они облегчают рефакторинг.</li>
    <li>Используйте систему сборки для управления зависимостями.</li>
    <li>Следуйте соглашениям об именовании: классы — CamelCase, методы/переменные — camelCase.</li>
  </ul>

  <h3>Упражнения</h3>
  <ol>
    <li>Напишите программу, выводящую сумму чисел от 1 до N (N считывается из аргументов командной строки).</li>
    <li>Создайте класс <code>Person</code> с полями <code>name</code> и <code>age</code>, добавьте конструктор и метод <code>toString()</code>.</li>
    <li>Реализуйте метод, который принимает массив целых чисел и возвращает максимальное значение.</li>
  </ol>

  <h3>Дальше читать</h3>
  <p>Рекомендуется продолжить изучение из следующих разделов: синтаксис Java, примитивные типы и переменные, операции и управление потоком, основы ООП. Материал этой лекции основан на общепринятой подаче Java и вдохновлён тематикой обучающих ресурсов (например, Metanit), но приведён в авторской форме с практическими задачами.</p>

</div>
`;
  window.__LECTURES_ru_1 = html;
})();
