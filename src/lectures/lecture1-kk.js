/* Лекция 1 KK: Java технологияларына кіріспе (Кеңейтілген нұсқа) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Дәріс 1: Java технологияларына кіріспе</h2>

  <h3>Қысқаша Java туралы</h3>
  <p>Java — бұл бағдарламалау тілі және қосымшаларды жасауға арналған толық платформа. Ол 1995 жылы пайда болып, сол уақыттан бері серверлік, клиенттік және мобильді қосымшалар үшін кеңінен қолданылады. Java-ның басты артықшылығы — кодтың бір платформада жазылып, әртүрлі жүйелерде JVM арқылы жұмыс істеуі.</p>

  <h3>Неліктен Java маңызды</h3>
  <ul>
    <li>Платформадан тәуелсіз: бірдей байт-код бірнеше JVM-дерде жұмыс істейді.</li>
    <li>Кең таралған экожүйе: фреймворктер мен кітапханалар (мысалы, Spring, Hibernate).</li>
    <li>Үлкен жобаларға лайықты: қатты типтеу және сенімділік.</li>
  </ul>

  <h3>Экожүйенің негізгі құрамдастары</h3>
  <div class="diagram">
      <div class="box jdk"><strong>JDK</strong> — әзірлеу ортасы
          <div class="box jre"><strong>JRE</strong> — орындау ортасы
              <div class="box jvm"><strong>JVM</strong> — виртуалды машина</div>
          </div>
      </div>
  </div>
  <p>JDK — құралдар жинағы (компилятор <code>javac</code> және т.б.), JRE — қосымшаларды іске қосу үшін қажет кітапханалар мен JVM, JVM — байт-кодты орындайды және жадты басқарады.</p>

  <h3>Құру және іске қосу процесі</h3>
  <ol>
    <li>Кодты <code>.java</code> файлына жазамыз.</li>
    <li><code>javac</code> арқылы компиляциялаймыз, нәтижесінде <code>.class</code> файлы алынады.</li>
    <li><code>java</code> арқылы JVM іске қосылып, байт-код орындалады.</li>
  </ol>

  <h3>Тез демонстрация: "Hello, Java"</h3>
  <div class="code-example">
      <pre><code class="lang-java">public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java world!!!");
    }
}</code></pre>
      <button class="run-java-sim-kk">Орындау</button>
      <div class="output">
          <p><strong>Орындалу симуляциясы:</strong></p>
          <pre><code>> javac HelloWorld.java
> java HelloWorld</code></pre>
          <p><strong>Нәтиже:</strong></p>
          <pre class="result-output-kk"></pre>
      </div>
  </div>
  <script>
    (function() {
      const btn = document.currentScript.closest('.code-example').querySelector('.run-java-sim-kk');
      const output = btn.nextElementSibling.querySelector('.result-output-kk');
      btn.addEventListener('click', () => {
        output.textContent = 'Hello, Java world!!!';
      });
    })();
  </script>

  <h3>Тілдің негізгі элементтері</h3>
  <p>Қысқаша шолу: примитивті типтер (<code>int</code>, <code>double</code>, <code>boolean</code>, т.б.), сілтеме типтері (объектілер, массивтер), басқару конструкциялары және ООП негіздері.</p>

  <h4>Айнымалылар мен типтер:</h4>
  <p>Мысалы: <code>int n = 100;</code> — бүтін сан үшін айнымалы.</p>

  <h4>Басқару операторлары:</h4>
  <pre><code class="lang-java">for (int i = 0; i &lt; 5; i++) {
    System.out.println(i);
}</code></pre>

  <h4>Объектіге бағытталған программалау:</h4>
  <p>Класс пен объект концепциялары, инкапсуляция, мұрагерлік және полиморфизм — Java-ның негізгі қағидалары.</p>

  <h3>Құралдар мен экожүйе</h3>
  <ul>
    <li>Сборка жүйелері: Maven, Gradle.</li>
    <li>IDE: IntelliJ IDEA, Eclipse, VS Code.</li>
    <li>Фреймворктер: Spring, Jakarta EE.</li>
  </ul>

  <h3>Практикалық кеңестер</h3>
  <ul>
    <li>Автотесттер жазыңыз (JUnit).</li>
    <li>Код стильдері мен келісімдерін ұстаныңыз.</li>
    <li>Зависимостарды жүйелі түрде басқару үшін құралдарды пайдаланыңыз.</li>
  </ul>

  <h3>Тапсырмалар</h3>
  <ol>
    <li>1-ден N-ге дейінгі сандардың қосындысын есептейтін бағдарлама жазыңыз (N — командалық жол аргументі).</li>
    <li><code>Person</code> класы: <code>name</code> және <code>age</code> өрістері, конструктор және <code>toString()</code> әдісі.</li>
    <li>Бүтін сандар массивінен максимум мәнін қайтаратын әдісті іске асырыңыз.</li>
  </ol>

  <h3>Қайдан жалғастыру керек</h3>
  <p>Келесі тақырыптар: синтаксис және тілдің негіздері, түрлері және айнымалылар, басқару құрылымдары, ООП негіздері. Бұл дәріс жалпы материалға негізделген және Metanit сияқты ресурстардан шабыт алғанымен, мазмұны қайта жазылған және жаттығулар қосылды.</p>

</div>
`;
  window.__LECTURES_kk_1 = html;
})();
