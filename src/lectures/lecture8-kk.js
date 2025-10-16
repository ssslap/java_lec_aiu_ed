/* Лекция 8 KK: Object және Class сыныптары (Кеңейтілген нұсқа) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Дәріс 8: Object және Class сыныптары</h2>

  <h3><code>java.lang.Object</code> сыныбы: Барлығының атасы</h3>
  <p>Java-да сіз жасайтын әрбір сынып, егер басқа ата-аналық сынып көрсетілмесе, жасырын түрде <code>Object</code> сыныбынан мұра алады. Бұл <code>Object</code>-ті бүкіл сыныптар иерархиясының түбірі етеді. Осы мұрагерліктің арқасында Java-дағы әрбір объект "қораптан тыс" бірқатар іргелі әдістерге ие болады.</p>
  
  <h4><code>Object</code> сыныбының негізгі әдістері:</h4>
  <ul>
    <li>
      <strong><code>String toString()</code></strong>
      <p>Бұл әдіс объектінің мәтіндік көрінісін алуға арналған. Стандартты іске асыру өте пайдалы ақпарат бермейді (сынып атауы + хэш-код). <strong>Жақсы тәжірибе</strong> — бұл әдісті өз сыныптарыңызда объектінің күйі туралы мағыналы ақпаратты шығару үшін қайта анықтау, бұл жөндеу кезінде өте көмектеседі.</p>
    </li>
    <li>
      <strong><code>boolean equals(Object obj)</code></strong>
      <p>Ағымдағы объектіні басқасымен салыстырады. Әдепкі бойынша, объектілер үшін <code>==</code> олардың мазмұнын емес, жадтағы мекенжайларын салыстырады. <code>equals()</code> әдісі "логикалық" салыстыруға арналған. Егер сіз екі объектінің өрістері сәйкес келгенде тең деп саналғанын қаласаңыз (мысалы, бірдей ID-мен екі <code>User</code> объектісі), сіз бұл әдісті қайта анықтауыңыз керек.</p>
    </li>
    <li>
      <strong><code>int hashCode()</code></strong>
      <p>Объектіні білдіретін бүтін сандық мәнді (хэш-код) қайтарады. Бұл әдіс <code>equals()</code>-пен тығыз байланысты. <strong><code>hashCode</code>-<code>equals</code> келісімшарты</strong> былай дейді:
      <br>1. Егер екі объект <code>equals()</code> бойынша тең болса, олардың <code>hashCode()</code> мәндері <em>міндетті түрде</em> бірдей болуы керек.
      <br>2. Егер <code>hashCode()</code> әртүрлі болса, онда объектілер сөзсіз тең емес.
      <br>Бұл келісімшартты бұзу хэштеуге негізделген коллекциялардың (<code>HashMap</code>, <code>HashSet</code>) дұрыс жұмыс істемеуіне әкеледі.</p>
    </li>
    <li>
      <strong><code>Class<?> getClass()</code></strong>
      <p>Орындалу кезінде ағымдағы объектінің сыныбын сипаттайтын <code>Class</code> типті объектіні қайтарады. Бұл рефлексия механизміне кіру нүктесі.</p>
    </li>
  </ul>

  <h3>Интерактивті мысал: <code>equals</code> және <code>hashCode</code> дұрыс іске асыру</h3>
  <p><code>Point</code> сыныбын қарастырайық. Екі <code>Point</code> объектісі олардың <code>x</code> және <code>y</code> координаттары сәйкес келсе, тең деп саналуы керек. Бұл қалай іске асырылатынын көріңіз.</p>
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
        // Өрістер негізінде хэш-кодты қарапайым есептеу
        return 31 * x + y; 
    }
}</code></pre>
      <div class="interactive-controls">
        <button class="run-java-sim-kk">Салыстыруды орындау</button>
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
      const output = container.querySelector('.result-output-kk');
      
      btn.addEventListener('click', () => {
        let log = 'Point p1 = new Point(10, 20);\\n';
        log += 'Point p2 = new Point(10, 20);\\n';
        log += 'Point p3 = new Point(30, 40);\\n\\n';

        log += 'p1.equals(p2): ' + true + ' // Объектілер мазмұны бойынша тең\\n';
        log += 'p1.equals(p3): ' + false + '\\n\\n';
        
        log += 'hashCode p1: ' + (31 * 10 + 20) + '\\n';
        log += 'hashCode p2: ' + (31 * 10 + 20) + ' // Хэш-кодтар тиісінше тең\\n';
        log += 'hashCode p3: ' + (31 * 30 + 40);

        output.textContent = log;
      });
    })();
  </script>

  <h3>Рефлексия және <code>Class</code> сыныбы</h3>
  <p><strong>Рефлексия (Reflection)</strong> — бұл бағдарламаның орындалуы кезінде сыныптардың, өрістердің және әдістердің құрылымы мен мінез-құлқын зерттеуге және өзгертуге мүмкіндік беретін механизм. Бұл өте қуатты, бірақ сонымен бірге қауіпті құрал.</p>
  <p><code>java.lang.Class</code> сыныбы рефлексия үшін бастапқы нүкте болып табылады. Оның көмегімен:</p>
  <ul>
      <li>Сыныптың атын, оның модификаторларын алуға болады.</li>
      <li>Барлық өрістердің, әдістердің, конструкторлардың тізімін алуға болады.</li>
      <li>Сыныптың жаңа даналарын динамикалық түрде жасауға болады.</li>
      <li>Әдістерді шақыруға және өрістердің мәндерін, тіпті жеке (private) болса да, өзгертуге болады (белгілі бір шектеулермен).</li>
  </ul>
  <p>Рефлексия көптеген фреймворктерде (мысалы, Spring, Hibernate) автоматты конфигурация, сериализация және кодты деректер ретінде өңдеуді қажет ететін басқа да тапсырмалар үшін белсенді қолданылады.</p>
</div>
`;
  window.__LECTURES_kk_8 = html;
})();
