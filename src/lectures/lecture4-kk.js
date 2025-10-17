/* Лекция 4 KK: Java стандартты типтері (Кеңейтілген нұсқа) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Дәріс 4: Java стандартты типтері</h2>

  <h3>Массивтер</h3>
  <p>Массив — бұл бір типті элементтердің тізбегін сақтайтын, өлшемі бекітілген контейнерді білдіретін негізгі деректер құрылымы. Элементтерге қол жеткізу олардың индексі (0-ден бастап) арқылы жүзеге асырылады.</p>
  <pre><code class="lang-java">// 3 элементтен тұратын жолдар массивін жариялау
String[] names = new String[3];
names[0] = "Alice";
names[1] = "Bob";
names[2] = "Charlie";

// Жариялау кезінде массивті инициализациялау
int[] numbers = {10, 20, 30, 40, 50};

// Массив ұзындығын алу
System.out.println("numbers массивінің ұзындығы: " + numbers.length); // 5</code></pre>
  <p>Массивтер элементтер жинағын сақтау үшін пайдалы, бірақ олардың өлшемін жасалғаннан кейін өзгертуге болмайды. Динамикалық коллекциялар үшін Collections Framework сыныптарын (мысалы, <code>ArrayList</code>) пайдаланған дұрыс.</p>

  <h3>Жолдармен жұмыс: <code>String</code></h3>
  <p>Java-дағы <code>String</code> сыныбы ең көп қолданылатын сыныптардың бірі болып табылады. Оның ең маңызды сипаттамасы — <strong>өзгермейтіндігі (immutability)</strong>. Бұл <code>String</code> объектісі жасалғаннан кейін оның мәнін өзгерту мүмкін еместігін білдіреді. Жолды өзгертетін болып көрінетін кез келген операция (мысалы, конкатенация) шын мәнінде жадта жаңа <code>String</code> объектісін жасайды.</p>
  
  <h4><code>String</code> сыныбының пайдалы әдістері:</h4>
  <ul>
    <li><code>int length()</code>: Жолдағы таңбалар санын қайтарады.</li>
    <li><code>char charAt(int index)</code>: Көрсетілген индекс бойынша таңбаны қайтарады.</li>
    <li><code>boolean equals(Object obj)</code>: Жолдарды регистрді ескере отырып, дәл сәйкестікке салыстырады. Жолдарды салыстыру үшін әрқашан <code>.equals()</code> әдісін пайдаланыңыз, <code>==</code> емес.</li>
    <li><code>boolean startsWith(String prefix) / boolean endsWith(String suffix)</code>: Жолдың көрсетілген ішкі жолмен басталатынын немесе аяқталатынын тексереді.</li>
    <li><code>String substring(int beginIndex, int endIndex)</code>: Ішкі жолды шығарып алады.</li>
    <li><code>String trim()</code>: Жолдың басындағы және соңындағы бос орындарды жояды.</li>
  </ul>

  <h3><code>StringBuilder</code> және <code>StringBuffer</code></h3>
  <p><code>String</code> өзгермейтін болғандықтан, онымен бірнеше рет операция жасау (мысалы, циклде жолды құрастыру) көптеген аралық объектілердің жасалуына байланысты тиімсіз болуы мүмкін. Мұндай тапсырмалар үшін өзгертілетін аналогтар бар:</p>
  <ul>
    <li><strong><code>StringBuilder</code>:</strong> Жылдам, бірақ ағынға қауіпсіз емес. Бір ағында пайдалануға өте ыңғайлы.</li>
    <li><strong><code>StringBuffer</code>:</strong> Ағынға қауіпсіз (барлық әдістер синхрондалған), бірақ баяуырақ. Көп ағынды қосымшаларда қолданылады.</li>
  </ul>
  <pre><code class="lang-java">StringBuilder builder = new StringBuilder();
builder.append("Бұл ");
builder.append("жолды ");
builder.append("құрудың ");
builder.append("тиімді жолы.");
String result = builder.toString(); // String-ке түрлендіру</code></pre>

  <h3>Интерактивті мысал: Жолды кері айналдыру</h3>
  <p>Бұл мысал <code>StringBuilder</code> көмегімен жолды қалай тиімді түрде кері айналдыруға болатынын көрсетеді.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class StringReverse {
    public static void main(String[] args) {
        String original = "Java";
        
        StringBuilder sb = new StringBuilder(original);
        String reversed = sb.reverse().toString();
        
        System.out.println("Бастапқы: " + original);
        System.out.println("Кері айналдырылған: " + reversed);
    }
}</code></pre>
      <div class="interactive-controls">
        <input type="text" class="java-input-kk" value="Java" placeholder="Жолды енгізіңіз">
        <button class="run-java-sim-kk">Кері айналдыру</button>
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
      
      function reverse() {
        const original = input.value;
        const reversed = original.split('').reverse().join('');
        output.textContent = 'Бастапқы: ' + original + '\\n' +
                             'Кері айналдырылған: ' + reversed;
      }
      
      btn.addEventListener('click', reverse);
      reverse();
    })();
  </script>

  <h3>Қабық-сыныптар (Wrapper Classes)</h3>
  <p>Java-дағы 8 примитивті типтің әрқайсысы үшін сәйкес қабық-сынып бар. Олар примитивті мәнді объектіге "орайды", бұл оларды объектілер қажет жерлерде (мысалы, коллекцияларда) пайдалануға мүмкіндік береді.</p>
  <p><code>int -> Integer</code>, <code>double -> Double</code>, <code>char -> Character</code>, <code>boolean -> Boolean</code> және т.б.</p>
  <p><strong>Автоматты қаптау (Autoboxing)</strong> және <strong>қаптан шығару (Unboxing)</strong> — бұл примитивті типтер мен олардың объектілік қабықтары арасындағы автоматты түрлендіру.</p>
  <pre><code class="lang-java">ArrayList<Integer> list = new ArrayList<>();
list.add(10); // Автоматты қаптау: int 10 Integer.valueOf(10) болып түрленеді

int primitive = list.get(0); // Қаптан шығару: Integer int-ке түрленеді</code></pre>
</div>
`;
  window.__LECTURES_kk_4 = html;
})();
