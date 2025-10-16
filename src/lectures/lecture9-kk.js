/* Лекция 9 KK: Қателерді өңдеу (Кеңейтілген нұсқа) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Дәріс 9: Қателерді өңдеу</h2>

  <h3>Ерекше жағдайлар: Бұл не және не үшін қажет?</h3>
  <p><strong>Ерекше жағдай (Exception)</strong> — бұл бағдарламаның орындалуы кезінде пайда болып, оның қалыпты жұмыс барысын бұзатын "ерекше" жағдай. Бағдарлама апатты түрде аяқталудың орнына, қате туралы ақпаратты қамтитын арнайы объектіні "лақтыра" алады.</p>
  <p>Ерекше жағдайлар механизмі қателерді өңдеу кодын негізгі бизнес-логикадан бөлуге мүмкіндік береді, бұл бағдарламаны таза және сенімді етеді.</p>

  <h3>Java-дағы ерекше жағдайлар иерархиясы</h3>
  <p>Java-да барлық қателер <code>Throwable</code> сыныбынан мұра алатын объектілер түрінде ұсынылған. Иерархия келесідей:</p>
  <ul>
    <li><strong><code>Error</code>:</strong> Қосымша әдетте өңдей алмайтын күрделі мәселелер. Мысалы, <code>OutOfMemoryError</code> (жадтың жетіспеушілігі) немесе <code>StackOverflowError</code> (стектің толып кетуі). Оларды "ұстау" қабылданбаған.</li>
    <li><strong><code>Exception</code>:</strong> Қосымша өңдей алатын және өңдеуі тиіс қателер. Екі түрге бөлінеді:
      <ul>
        <li><strong>Checked Exceptions (Тексерілетін):</strong> <code>Exception</code> мұрагерлері (<code>RuntimeException</code>-нан басқа). Компилятор сізді оларды <code>try-catch</code> арқылы өңдеуге немесе <code>throws</code> арқылы әдіс сигнатурасында жариялауға мәжбүр етеді. Мысалдар: <code>IOException</code> (енгізу-шығару қатесі), <code>SQLException</code> (ДҚ-мен жұмыс істеу кезіндегі қате).</li>
        <li><strong>Unchecked Exceptions (Тексерілмейтін):</strong> <code>RuntimeException</code> мұрагерлері. Бұл әдетте бағдарламалау қателері (логикалық ақаулар), мысалы, <code>NullPointerException</code>, <code>ArrayIndexOutOfBoundsException</code>. Компилятор оларды міндетті түрде өңдеуді талап етпейді.</li>
      </ul>
    </li>
  </ul>

  <h3>Ерекше жағдайларды өңдеу: <code>try-catch-finally</code></h3>
  <p>Бұл ерекше жағдайлармен жұмыс істеуге арналған негізгі конструкция:</p>
  <ul>
    <li><strong><code>try</code>:</strong> Бұл блокқа ерекше жағдай тудыруы мүмкін "қауіпті" код орналастырылады.</li>
    <li><strong><code>catch (ExceptionType e)</code>:</strong> Егер <code>try</code> блогында көрсетілген типтегі ерекше жағдай лақтырылса, орындалатын блок. Әртүрлі ерекше жағдай типтері үшін бірнеше <code>catch</code> блогы болуы мүмкін.</li>
    <li><strong><code>finally</code>:</strong> Ерекше жағдай болмаса да, ол ұсталса да, тіпті ұсталмаса да, <strong>әрдайым</strong> орындалатын міндетті емес блок. Ресурстарды босату үшін (файлдарды, қосылыстарды жабу) тамаша орын.</li>
  </ul>

  <h3>Интерактивті мысал: Жолдан санды талдау</h3>
  <p><code>Integer.parseInt()</code> әдісі, егер оған санға түрлендіру мүмкін емес жолды берсе, <code>NumberFormatException</code> (тексерілмейтін ерекше жағдай) лақтырады. Осы жағдайды өңдеп көрейік.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class Parser {
    public static void main(String[] args) {
        String str = "123a";
        try {
            int number = Integer.parseInt(str);
            System.out.println("Сіз енгізген сан: " + number);
        } catch (NumberFormatException e) {
            System.err.println("Қате: '" + str + "' сан емес.");
        } finally {
            System.out.println("Талдау әрекеті аяқталды.");
        }
    }
}</code></pre>
      <div class="interactive-controls">
        <input type="text" class="java-input-kk" value="123a" placeholder="Жолды енгізіңіз">
        <button class="run-java-sim-kk">Талдау</button>
      </div>
      <div class="output">
          <p><strong>Нәтиже:</strong></p>
          <pre class="result-output-kk"></pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const btn = container.querySelector('.run-java-sim-kk');
      const input = container.querySelector('.java-input-kk');
      const output = container.querySelector('.result-output-kk');
      
      function parse() {
        const str = input.value;
        let log = '';
        if (/^-?\\d+$/.test(str)) {
          log += 'Сіз енгізген сан: ' + str;
        } else {
          log += "Қате: '" + str + "' сан емес.";
        }
        log += '\\nТалдау әрекеті аяқталды.';
        output.textContent = log;
      }
      
      btn.addEventListener('click', parse);
      parse();
    })();
  </script>

  <h3>Өз ерекше жағдайларыңызды құру</h3>
  <p>Қосымшаңызға тән және ақпараттылығы жоғары қателер жасау үшін сіз өз ерекше жағдай сыныптарыңызды жасай аласыз. Ол үшін өз сыныбыңызды <code>Exception</code> (тексерілетін үшін) немесе <code>RuntimeException</code> (тексерілмейтін үшін) сыныбынан мұраландырыңыз.</p>
  <pre><code class="lang-java">public class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

// Қолдану
public void withdraw(double amount) throws InsufficientFundsException {
    if (balance < amount) {
        throw new InsufficientFundsException("Шотта қаражат жеткіліксіз.");
    }
    // ...
}</code></pre>
</div>
`;
  window.__LECTURES_kk_9 = html;
})();
