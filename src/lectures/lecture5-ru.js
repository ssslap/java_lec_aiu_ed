/* Лекция 5 RU: Разработка классов (Расширенная версия) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Лекция 5: Разработка классов</h2>

  <h3>Классы и Объекты: Основы ООП</h3>
  <p><strong>Класс</strong> — это чертеж или шаблон, по которому создаются объекты. Он описывает, какими данными (полями) и каким поведением (методами) будут обладать объекты этого типа.</p>
  <p><strong>Объект</strong> — это конкретный экземпляр класса, созданный по этому чертежу. Если <code>Car</code> — это класс, то конкретный красный Ferrari — это объект этого класса.</p>
  
  <pre><code class="lang-java">// Определение класса Car
public class Car {
    // 1. Поля (Fields) - хранят состояние объекта
    private String model;
    private int currentSpeed;

    // 2. Конструктор - вызывается при создании объекта
    public Car(String model) {
        this.model = model; // this.model - поле, model - параметр
        this.currentSpeed = 0;
        System.out.println("Создан автомобиль: " + this.model);
    }

    // 3. Методы (Methods) - определяют поведение
    public void accelerate(int amount) {
        this.currentSpeed += amount;
    }

    public int getCurrentSpeed() {
        return this.currentSpeed;
    }
}</code></pre>

  <h3>Инкапсуляция и Модификаторы Доступа</h3>
  <p><strong>Инкапсуляция</strong> — один из ключевых принципов ООП, который заключается в сокрытии внутреннего состояния объекта и предоставлении контролируемого доступа к нему через публичные методы (геттеры и сеттеры). Это достигается с помощью модификаторов доступа.</p>
  <ul>
    <li><code>private</code>: Доступен только внутри текущего класса. Поля почти всегда объявляются как <code>private</code> для защиты данных.</li>
    <li><code>public</code>: Доступен из любого другого класса. Методы, составляющие "публичный интерфейс" класса, обычно <code>public</code>.</li>
    <li><code>protected</code>: Доступен внутри пакета и для всех классов-наследников.</li>
    <li><em>(package-private)</em>: Если модификатор не указан, доступен только в пределах того же пакета.</li>
  </ul>

  <h3>Конструкторы</h3>
  <p>Конструктор — это специальный метод, который используется для инициализации нового объекта. Он имеет то же имя, что и класс, и не имеет возвращаемого типа.</p>
  <p>Класс может иметь несколько конструкторов с разным набором параметров (перегрузка конструкторов). Если конструктор не определен, Java предоставляет конструктор по умолчанию без параметров.</p>

  <h3>Ключевое слово <code>static</code></h3>
  <p>Модификатор <code>static</code> означает, что член класса принадлежит самому классу, а не его отдельным экземплярам (объектам).</p>
  <ul>
    <li><strong>Статические поля:</strong> Одно поле на весь класс, общее для всех объектов. Например, счетчик созданных объектов.</li>
    <li><strong>Статические методы:</strong> Вызываются через имя класса (<code>ClassName.methodName()</code>) и не могут обращаться к нестатическим полям и методам (так как у них нет доступа к <code>this</code>). Пример — <code>Math.random()</code>.</li>
  </ul>

  <h3>Интерактивный пример: Управление банковским счетом</h3>
  <p>Этот пример демонстрирует инкапсуляцию. Баланс счета (<code>balance</code>) является приватным, и изменить его можно только через публичные методы <code>deposit</code> и <code>withdraw</code>.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class BankAccount {
    private double balance; // Приватное поле
    private static int transactionsCount = 0; // Статическое поле

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            transactionsCount++;
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            transactionsCount++;
        }
    }

    public double getBalance() {
        return balance;
    }
    
    public static int getTransactionsCount() {
        return transactionsCount;
    }
}</code></pre>
      <div class="interactive-controls">
        <input type="number" class="java-input" value="50" placeholder="Сумма">
        <button class="run-java-sim" data-action="deposit">Пополнить</button>
        <button class="run-java-sim" data-action="withdraw">Снять</button>
      </div>
      <div class="output">
          <p><strong>Состояние счета:</strong></p>
          <pre class="result-output"></pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const depositBtn = container.querySelector('[data-action="deposit"]');
      const withdrawBtn = container.querySelector('[data-action="withdraw"]');
      const amountInput = container.querySelector('.java-input');
      const output = container.querySelector('.result-output');
      
      let account = { balance: 1000 };
      let transactions = 0;

      function updateDisplay() {
        output.textContent = 'Текущий баланс: ' + account.balance.toFixed(2) + '\\n' +
                             'Всего транзакций (static): ' + transactions;
      }
      
      depositBtn.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        if (amount > 0) {
          account.balance += amount;
          transactions++;
          updateDisplay();
        }
      });

      withdrawBtn.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        if (amount > 0 && account.balance >= amount) {
          account.balance -= amount;
          transactions++;
          updateDisplay();
        }
      });

      updateDisplay();
    })();
  </script>
</div>
`;
  window.__LECTURES_ru_5 = html;
})();
