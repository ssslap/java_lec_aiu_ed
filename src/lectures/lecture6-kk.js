/* Лекция 6 KK: Мұрагерлік және полиморфизм (Кеңейтілген нұсқа) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Дәріс 6: Мұрагерлік және полиморфизм</h2>

  <h3>Мұрагерлік (Inheritance)</h3>
  <p>Мұрагерлік — бұл бір сыныпқа (балалық) басқа сыныптың (ата-аналық) өрістері мен әдістерін мұралауға мүмкіндік беретін ООП тіректерінің бірі. Бұл кодты қайта пайдалануға және сыныптар иерархиясын құруға ықпал етеді.</p>
  <p>Java-да бұл үшін <code>extends</code> кілт сөзі қолданылады. Сынып тек бір басқа сыныптан ғана мұра ала алады (сыныптардың көптік мұрагерлігі жоқ).</p>
  
  <h4><code>super</code> кілт сөзі</h4>
  <p><code>super</code> — бұл ата-аналық сыныпқа сілтеме. Ол келесі мақсаттарда қолданылады:</p>
  <ul>
    <li><strong>Ата-ана конструкторын шақыру:</strong> <code>super(arguments);</code>. Бұл балалық сынып конструкторындағы бірінші оператор болуы керек.</li>
    <li><strong>Ата-ана әдістеріне жүгіну:</strong> <code>super.methodName();</code>. Бұл ата-ана әдісінің мінез-құлқын толығымен ауыстырмай, кеңейту қажет болғанда пайдалы.</li>
  </ul>
  <pre><code class="lang-java">// Ата-аналық сынып
public class Shape {
    protected String name;

    public Shape(String name) {
        this.name = name;
    }

    public String getInfo() {
        return "Бұл " + name + " атты фигура";
    }
}

// Балалық сынып
public class Circle extends Shape {
    private double radius;

    public Circle(String name, double radius) {
        super(name); // Ата-аналық сынып конструкторын шақыру
        this.radius = radius;
    }

    @Override // Әдісті қайта анықтап жатқанын көрсететін аннотация
    public String getInfo() {
        // Ата-ана әдісін шақырып, өз ақпаратын қосу
        return super.getInfo() + " және радиусы " + radius;
    }
}</code></pre>

  <h3>Полиморфизм (Polymorphism)</h3>
  <p>Полиморфизм сөзбе-сөз "көп форма" дегенді білдіреді. Бағдарламалауда бұл объектінің ата-аналық сыныптың әдістерін, бірақ өз типіне тән іске асырумен пайдалану қабілеті. Бұл икемді және әмбебап код жазуға мүмкіндік береді.</p>
  <p>Java-да полиморфизмнің негізгі механизмі — <strong>әдістерді қайта анықтау (method overriding)</strong>. Әдіс ата-аналық сыныпқа сілтеме арқылы шақырылғанда, JVM орындалу кезінде объектінің нақты түрін анықтап, әдістің сәйкес нұсқасын шақырады.</p>
  
  <h3>Интерактивті мысал: Полиморфты мінез-құлық</h3>
  <p>Мұнда біз <code>Shape</code> типті сілтемелер массивін жасаймыз, бірақ оған әртүрлі балалық типтердің (<code>Circle</code>, <code>Rectangle</code>) объектілерін орналастырамыз. Әрбір элемент үшін <code>getInfo()</code> әдісін шақырғанда, оның өзінің, қайта анықталған нұсқасы орындалады.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class GeometryDemo {
    public static void main(String[] args) {
        Shape[] shapes = new Shape[2];
        shapes[0] = new Circle("Шеңбер", 5.0);
        shapes[1] = new Rectangle("Тіктөртбұрыш", 4.0, 6.0);

        for (Shape shape : shapes) {
            // Объектінің нақты түріне сәйкес әдістің іске асырылуы шақырылады
            System.out.println(shape.getInfo());
        }
    }
}</code></pre>
      <div class="interactive-controls">
        <button class="run-java-sim-kk">Демонстрацияны орындау</button>
      </div>
      <div class="output">
          <p><strong>Орындалу нәтижесі:</strong></p>
          <pre class="result-output-kk">Результат: (примерный вывод)</pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const btn = container.querySelector('.run-java-sim-kk');
      const output = container.querySelector('.result-output-kk');
      
      btn.addEventListener('click', () => {
        let log = '';
        log += 'Бұл Шеңбер атты фигура және радиусы 5.0\\n';
        log += 'Бұл Тіктөртбұрыш атты фигура, ені 4.0 және биіктігі 6.0'; // Rectangle үшін болжалды іске асыру
        output.textContent = log;
      });
    })();
  </script>

  <h3><code>final</code> спецификаторы</h3>
  <p><code>final</code> кілт сөзі мұрагерлікке және қайта анықтауға шектеулер қояды:</p>
  <ul>
    <li><strong><code>final class</code>:</strong> Бұл сыныптан балалық сыныптар құруға тыйым салады. Мысалы, <code>String</code> сыныбы <code>final</code> болып табылады.</li>
    <li><strong><code>final method</code>:</strong> Осы әдісті мұрагер сыныптарда қайта анықтауға тыйым салады. Бұл иерархияда іске асырылуы өзгермеуі тиіс әдістер үшін қолданылады.</li>
  </ul>
</div>
`;
  window.__LECTURES_kk_6 = html;
})();
