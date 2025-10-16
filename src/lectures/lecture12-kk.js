/* Лекция 12 KK: Коллекциялар (Collections Framework) (Кеңейтілген нұсқа) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Дәріс 12: Коллекциялар (Collections Framework)</h2>

  <h3>Collections Framework-ке кіріспе</h3>
  <p><strong>Java Collections Framework</strong> — бұл коллекцияларды, яғни объектілер топтарын ұсынуға және өңдеуге арналған бірыңғай архитектура. Ол дайын деректер құрылымдары мен алгоритмдерін ұсынады, бұл оларды қайта ойлап табу қажеттілігінен арылтады.</p>
  
  <h4>Негізгі артықшылықтары:</h4>
  <ul>
    <li><strong>Бағдарламалау күшін азайту:</strong> Қолдануға дайын деректер құрылымдары мен алгоритмдер.</li>
    <li><strong>Өнімділікті арттыру:</strong> Жоғары тиімді іске асырулар.</li>
    <li><strong>Үйлесімділік:</strong> Стандартты интерфейстер кодтың әртүрлі бөліктеріне коллекциялар арқылы өзара әрекеттесуге мүмкіндік береді.</li>
  </ul>

  <h3>Негізгі интерфейстер</h3>
  <p>Фреймворктың негізінде бірнеше негізгі интерфейстер жатыр:</p>
  <ul>
    <li><strong><code>List<E></code>:</strong> Элементтері бүтін сандық индекс бойынша қол жетімді, реттелген коллекция. Қайталанатын элементтерге рұқсат етіледі.
      <ul>
        <li><code>ArrayList</code>: Индекс бойынша жылдам қол жеткізу, бірақ ортасынан қосу/жою баяу.</li>
        <li><code>LinkedList</code>: Элементтерді жылдам қосу/жою, бірақ индекс бойынша қол жеткізу баяу.</li>
      </ul>
    </li>
    <li><strong><code>Set<E></code>:</strong> Қайталанатын элементтері жоқ коллекция.
      <ul>
        <li><code>HashSet</code>: Элементтерді хэш-кестеде сақтайды. Элементтердің ретіне кепілдік бермейді.</li>
        <li><code>TreeSet</code>: Элементтерді сұрыпталған тәртіпте сақтайды.</li>
      </ul>
    </li>
    <li><strong><code>Map<K, V></code>:</strong> Кілттерді мәндермен сәйкестендіретін объект. Кілттер бірегей.
      <ul>
        <li><code>HashMap</code>: Жұптардың ретіне кепілдік бермейді. Ең жақсы өнімділікті қамтамасыз етеді.</li>
        <li><code>TreeMap</code>: Жұптарды кілт бойынша сұрыптап сақтайды.</li>
      </ul>
    </li>
  </ul>

  <h3>Итераторлар (Iterator)</h3>
  <p>Итератор — бұл коллекцияның нақты іске асырылуына қарамастан, оның элементтерін бірізді аралап шығуға мүмкіндік беретін объект. Бұл кез келген коллекцияны аралаудың әмбебап әдісі.</p>
  <pre><code class="lang-java">List<String> list = new ArrayList<>();
list.add("A"); list.add("B"); list.add("C");

Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    String element = iterator.next();
    System.out.println(element);
    // iterator.remove(); // Итерация кезінде элементті қауіпсіз жою
}</code></pre>

  <h3>Интерактивті мысал: Бірегей сөздерді санау</h3>
  <p>Бұл мысал мәтіндегі бірегей сөздердің санын тиімді есептеу үшін <code>Set</code>-ті пайдаланады. <code>Set</code> қайталанатын элементтерді сақтамайтындықтан, әрбір сөз тек бір рет қосылады.</p>
  <div class="code-example">
      <pre><code class="lang-java">import java.util.*;

public class UniqueWords {
    public static void main(String[] args) {
        String text = "hello world hello java world";
        
        // Тыныс белгілерін алып тастап, төменгі регистрге келтіру
        String[] words = text.toLowerCase().split(" ");
        
        Set<String> uniqueWords = new HashSet<>(Arrays.asList(words));
        
        System.out.println("Барлық сөздер: " + words.length);
        System.out.println("Бірегей сөздер: " + uniqueWords.size());
        System.out.println(uniqueWords);
    }
}</code></pre>
      <div class="interactive-controls">
        <textarea class="java-input-kk" style="width:100%; height: 60px;">hello world hello java world</textarea>
        <button class="run-java-sim-kk">Санау</button>
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
      const textarea = container.querySelector('.java-input-kk');
      const output = container.querySelector('.result-output-kk');
      
      function countUnique() {
        const text = textarea.value;
        const words = text.toLowerCase().split(/\\s+/).filter(w => w.length > 0);
        const uniqueWords = new Set(words);
        
        let log = 'Барлық сөздер: ' + words.length + '\\n';
        log += 'Бірегей сөздер: ' + uniqueWords.size + '\\n';
        log += '[' + Array.from(uniqueWords).join(', ') + ']';
        output.textContent = log;
      }
      
      btn.addEventListener('click', countUnique);
      countUnique();
    })();
  </script>
</div>
`;
  window.__LECTURES_kk_12 = html;
})();
