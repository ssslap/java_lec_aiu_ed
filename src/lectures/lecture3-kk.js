/* Лекция 3 KK: Java операциялары және операторлары (Кеңейтілген нұсқа) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Дәріс 3: Java операциялары және операторлары</h2>

  <h3>Арифметикалық операциялар және инкремент/декремент</h3>
  <p>Java математикалық есептеулерді орындау үшін арифметикалық операциялардың толық жиынтығын ұсынады. Инкремент (<code>++</code>) және декремент (<code>--</code>) операциялары айнымалының мәнін бірге арттыру немесе кеміту үшін ыңғайлы қысқартулар болып табылады.</p>
  <ul>
    <li><code>+</code>, <code>-</code>, <code>*</code>, <code>/</code> — Қосу, азайту, көбейту, бөлу.</li>
    <li><code>%</code> (Модуль) — Бөлуден қалдықты қайтарады. Жұптыққа тексеру сияқты тапсырмалар үшін өте пайдалы.</li>
    <li><code>++</code> (Инкремент) — Мәнді 1-ге арттырады.</li>
    <li><code>--</code> (Декремент) — Мәнді 1-ге кемітеді.</li>
  </ul>
  <p><strong>Маңызды:</strong> Префикстік (<code>++x</code>) және постфикстік (<code>x++</code>) формалары бар. Префикстік алдымен мәнді өзгертеді, содан кейін оны қайтарады. Постфикстік алдымен ескі мәнді қайтарады, содан кейін оны өзгертеді.</p>
  <pre><code class="lang-java">int a = 5;
int b = a++; // b = 5, a 6 болады
int c = ++a; // a 7 болады, c = 7</code></pre>

  <h3>Салыстыру және логикалық операциялар</h3>
  <p>Бұл операциялар кодта шешім қабылдаудың негізі болып табылады. Олар әрқашан <code>boolean</code> (<code>true</code> немесе <code>false</code>) типті нәтиже қайтарады.</p>
  <ul>
    <li><strong>Салыстыру операциялары:</strong> <code>==</code> (тең), <code>!=</code> (тең емес), <code>></code> (үлкен), <code><</code> (кіші), <code>>=</code> (үлкен немесе тең), <code><=</code> (кіші немесе тең).</li>
    <li><strong>Логикалық операциялар:</strong> <code>&&</code> (логикалық ЖӘНЕ), <code>||</code> (логикалық НЕМЕСЕ), <code>!</code> (логикалық ЕМЕС).</li>
  </ul>
  <p><code>&&</code> және <code>||</code> операторлары "қысқа тұйықталу" (short-circuit) болып табылады. Мысалы, <code>A && B</code> өрнегінде, егер <code>A</code> жалған болса, онда <code>B</code> тіпті есептелмейді, себебі нәтиже белгілі.</p>

  <h3>Басқарушы конструкциялар: <code>if-else</code> және <code>switch</code></h3>
  <p><strong><code>if-else</code></strong> — тармақталудың негізгі конструкциясы. Ол шарттың ақиқаттығына байланысты бағдарламаның орындалуын әртүрлі жолдармен бағыттауға мүмкіндік береді.</p>
  <p><strong><code>switch</code></strong> — бір айнымалыны бірнеше тұрақты мәнмен (<code>byte</code>, <code>short</code>, <code>char</code>, <code>int</code>, <code>String</code> немесе <code>enum</code>) салыстыру қажет болғанда <code>if-else-if</code>-ке ыңғайлы балама.</p>
  <pre><code class="lang-java">int dayOfWeek = 3;
String dayName;
switch (dayOfWeek) {
    case 1: dayName = "Дүйсенбі"; break;
    case 2: dayName = "Сейсенбі"; break;
    case 3: dayName = "Сәрсенбі"; break;
    // ...
    default: dayName = "Белгісіз күн";
}</code></pre>

  <h3>Интерактивті мысал: Жеңілдік калькуляторы</h3>
  <p>Бұл мысал сатып алу сомасына байланысты жеңілдік мөлшерін анықтау үшін <code>if-else-if</code> қолданады.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class DiscountCalculator {
    public static void main(String[] args) {
        double purchaseAmount = 1200; // Сатып алу сомасы
        double discount = 0.0;

        if (purchaseAmount >= 1000) {
            discount = 0.10; // 10%
        } else if (purchaseAmount >= 500) {
            discount = 0.05; // 5%
        }
        
        double finalPrice = purchaseAmount * (1 - discount);
        System.out.println("Соңғы баға: " + finalPrice);
    }
}</code></pre>
      <div class="interactive-controls">
        Сатып алу сомасы: <input type="number" class="java-input-kk" value="1200" style="width: 100px;">
        <button class="run-java-sim-kk">Есептеу</button>
      </div>
      <div class="output">
          <p><strong>Нәтиже:</strong></p>
          <pre class="result-output-kk">Результат: (примерный вывод)</pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const btn = container.querySelector('.run-java-sim-kk');
      const input = container.querySelector('.java-input-kk');
      const output = container.querySelector('.result-output-kk');
      
      function calculate() {
        const amount = parseFloat(input.value);
        if (isNaN(amount) || amount < 0) {
          output.textContent = 'Дұрыс соманы енгізіңіз.';
          return;
        }
        let discount = 0.0;
        if (amount >= 1000) {
            discount = 0.10;
        } else if (amount >= 500) {
            discount = 0.05;
        }
        const finalPrice = amount * (1 - discount);
        output.textContent = 'Жеңілдік: ' + (discount * 100) + '%\\n' +
                             'Соңғы баға: ' + finalPrice.toFixed(2);
      }
      
      btn.addEventListener('click', calculate);
      calculate();
    })();
  </script>

  <h3>Циклдер: <code>for</code>, <code>while</code>, <code>do-while</code></h3>
  <p>Циклдер бір код блогын бірнеше рет орындау үшін қажет.</p>
  <ul>
    <li><strong><code>for</code>:</strong> Итерациялар саны алдын-ала белгілі болғанда өте ыңғайлы. Инициализация, шарт және инкременттен тұрады.</li>
    <li><strong><code>while</code>:</strong> Шарт ақиқат болғанша орындалады. Итерациялар саны алдын-ала белгісіз болғанда қолданылады.</li>
    <li><strong><code>do-while</code>:</strong> <code>while</code>-ға ұқсас, бірақ цикл денесінің кем дегенде бір рет орындалуына кепілдік береді, себебі шарт итерациядан кейін тексеріледі.</li>
    <li><strong><code>for-each</code>:</strong> Массивтің немесе коллекцияның барлық элементтерін бірізді аралап шығуға арналған жеңілдетілген синтаксис.</li>
  </ul>
</div>
`;
  window.__LECTURES_kk_3 = html;
})();
