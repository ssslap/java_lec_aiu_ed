/* Лекция 5 KK: Сыныптарды әзірлеу (Кеңейтілген нұсқа) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Дәріс 5: Сыныптарды әзірлеу</h2>

  <h3>Сыныптар мен Объектілер: ООП негіздері</h3>
  <p><strong>Сынып</strong> — бұл объектілерді құруға арналған сызба немесе үлгі. Ол осы типтегі объектілердің қандай деректерге (өрістерге) және қандай мінез-құлыққа (әдістерге) ие болатынын сипаттайды.</p>
  <p><strong>Объект</strong> — бұл сол сызба бойынша жасалған сыныптың нақты данасы. Егер <code>Car</code> — сынып болса, онда нақты қызыл Ferrari — осы сыныптың объектісі.</p>
  
  <pre><code class="lang-java">// Car сыныбын анықтау
public class Car {
    // 1. Өрістер (Fields) - объектінің күйін сақтайды
    private String model;
    private int currentSpeed;

    // 2. Конструктор - объектіні құру кезінде шақырылады
    public Car(String model) {
        this.model = model; // this.model - өріс, model - параметр
        this.currentSpeed = 0;
        System.out.println("Автомобиль жасалды: " + this.model);
    }

    // 3. Әдістер (Methods) - мінез-құлықты анықтайды
    public void accelerate(int amount) {
        this.currentSpeed += amount;
    }

    public int getCurrentSpeed() {
        return this.currentSpeed;
    }
}</code></pre>

  <h3>Инкапсуляция және Қол жеткізу модификаторлары</h3>
  <p><strong>Инкапсуляция</strong> — объектінің ішкі күйін жасыру және оған жалпыға ортақ әдістер (геттерлер мен сеттерлер) арқылы басқарылатын қол жеткізуді қамтамасыз етуден тұратын ООП-ның негізгі принциптерінің бірі. Бұл қол жеткізу модификаторлары арқылы жүзеге асырылады.</p>
  <ul>
    <li><code>private</code>: Тек ағымдағы сынып ішінде қол жетімді. Деректерді қорғау үшін өрістер әрқашан дерлік <code>private</code> деп жарияланады.</li>
    <li><code>public</code>: Кез келген басқа сыныптан қол жетімді. Сыныптың "жалпыға ортақ интерфейсін" құрайтын әдістер әдетте <code>public</code> болады.</li>
    <li><code>protected</code>: Пакет ішінде және барлық мұрагер сыныптар үшін қол жетімді.</li>
    <li><em>(package-private)</em>: Егер модификатор көрсетілмесе, тек сол пакеттің ішінде ғана қол жетімді.</li>
  </ul>

  <h3>Конструкторлар</h3>
  <p>Конструктор — жаңа объектіні инициализациялау үшін қолданылатын арнайы әдіс. Оның атауы сынып атауымен бірдей және оның қайтару типі жоқ.</p>
  <p>Сыныпта әртүрлі параметрлер жиынтығы бар бірнеше конструктор болуы мүмкін (конструкторларды шамадан тыс жүктеу). Егер конструктор анықталмаса, Java параметрлері жоқ әдепкі конструкторды ұсынады.</p>

  <h3><code>static</code> кілт сөзі</h3>
  <p><code>static</code> модификаторы сынып мүшесінің оның жеке даналарына (объектілеріне) емес, сыныптың өзіне тиесілі екенін білдіреді.</p>
  <ul>
    <li><strong>Статикалық өрістер:</strong> Бүкіл сынып үшін бір өріс, барлық объектілерге ортақ. Мысалы, жасалған объектілердің санаушысы.</li>
    <li><strong>Статикалық әдістер:</strong> Сынып атауы арқылы шақырылады (<code>ClassName.methodName()</code>) және статикалық емес өрістер мен әдістерге қол жеткізе алмайды (өйткені оларда <code>this</code>-ке қол жетімділік жоқ). Мысал — <code>Math.random()</code>.</li>
  </ul>

  <h3>Интерактивті мысал: Банк шотын басқару</h3>
  <p>Бұл мысал инкапсуляцияны көрсетеді. Шот балансы (<code>balance</code>) жеке болып табылады, және оны тек <code>deposit</code> және <code>withdraw</code> жалпыға ортақ әдістері арқылы өзгертуге болады.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class BankAccount {
    private double balance; // Жеке өріс
    private static int transactionsCount = 0; // Статикалық өріс

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
        <input type="number" class="java-input-kk" value="50" placeholder="Сома">
        <button class="run-java-sim-kk" data-action="deposit">Толықтыру</button>
        <button class="run-java-sim-kk" data-action="withdraw">Шығару</button>
      </div>
      <div class="output">
          <p><strong>Шот күйі:</strong></p>
          <pre class="result-output-kk"></pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const depositBtn = container.querySelector('[data-action="deposit"]');
      const withdrawBtn = container.querySelector('[data-action="withdraw"]');
      const amountInput = container.querySelector('.java-input-kk');
      const output = container.querySelector('.result-output-kk');
      
      let account = { balance: 1000 };
      let transactions = 0;

      function updateDisplay() {
        output.textContent = 'Ағымдағы баланс: ' + account.balance.toFixed(2) + '\\n' +
                             'Барлық транзакциялар (static): ' + transactions;
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
  window.__LECTURES_kk_5 = html;
})();
