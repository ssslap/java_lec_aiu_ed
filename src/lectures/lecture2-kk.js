/* Лекция 2 KK: Java бағдарламалау тіліне кіріспе (Кеңейтілген нұсқа) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Дәріс 2: Java бағдарламалау тіліне кіріспе</h2>

  <h3>Java қосымшасының құрылымы</h3>
  <p>Әрбір Java қосымшасының кіру нүктесі бар — бұл статикалық <code>main</code> әдісі. JVM бағдарламаны орындауды дәл осы әдістен бастайды. Оның қатаң анықталған сигнатурасы болуы керек:</p>
  <pre><code class="lang-java">public class Application {
    public static void main(String[] args) {
        // args - бұл командалық жол аргументтерін қамтитын жолдар массиві
        System.out.println("Қосымша іске қосылды!");
    }
}</code></pre>
  <p>Java-дағы барлық орындалатын код сыныптардың ішінде орналасуы керек. Сынып — бұл объектіге бағытталған бағдарламалаудың негізгі құрылыс блогы.</p>

  <h3>Пакеттер (Packages)</h3>
  <p>Пакеттер — сыныптарды атаулар кеңістігіне ұйымдастыруға арналған механизм. Олар атаулар қақтығысын болдырмауға және байланысты сыныптарды логикалық топтастыруға көмектеседі. Оларды файлдық жүйедегі қалталар ретінде елестетіңіз.</p>
  <ul>
    <li><strong>Жариялау:</strong> <code>package com.mycompany.project;</code> — бұл жол файлдың бірінші жолы болуы керек.</li>
    <li><strong>Импорттау:</strong> <code>import java.util.ArrayList;</code> — <code>ArrayList</code> сыныбын толық <code>java.util.ArrayList</code> атын көрсетпестен пайдалануға мүмкіндік береді.</li>
  </ul>
  <p>Пакеттерді олардың ғаламдық бірегейлігін қамтамасыз ету үшін кері домендік атау стилінде атау қабылданған (мысалы, <code>com.google.common</code>).</p>

  <h3>Примитивті деректер типтері</h3>
  <p>Java-да объектілерге сілтемелерді емес, тікелей мәндерді сақтайтын 8 примитивті тип бар. Олар барлық күрделі деректер құрылымдарының негізі болып табылады.</p>
  <div class="table-container">
    <table>
      <thead><tr><th>Тип</th><th>Көлем</th><th>Сипаттама</th><th>Мысал</th></tr></thead>
      <tbody>
        <tr><td><code>byte</code></td><td>8 бит</td><td>Бүтін сан</td><td><code>byte b = 100;</code></td></tr>
        <tr><td><code>short</code></td><td>16 бит</td><td>Бүтін сан</td><td><code>short s = 30000;</code></td></tr>
        <tr><td><code>int</code></td><td>32 бит</td><td>Бүтін сандар үшін негізгі тип</td><td><code>int i = 1000000;</code></td></tr>
        <tr><td><code>long</code></td><td>64 бит</td><td>Өте үлкен бүтін сандар үшін</td><td><code>long l = 9000000000L;</code> (L суффиксі міндетті)</td></tr>
        <tr><td><code>float</code></td><td>32 бит</td><td>Жылжымалы нүктелі сан</td><td><code>float f = 3.14f;</code> (f суффиксі міндетті)</td></tr>
        <tr><td><code>double</code></td><td>64 бит</td><td>Жылжымалы нүктелі сандар үшін негізгі тип</td><td><code>double d = 3.14159265;</code></td></tr>
        <tr><td><code>boolean</code></td><td>1 бит</td><td>Логикалық мән</td><td><code>boolean isValid = true;</code></td></tr>
        <tr><td><code>char</code></td><td>16 бит</td><td>Бір Unicode таңбасы</td><td><code>char c = 'A';</code></td></tr>
      </tbody>
    </table>
  </div>

  <h3>Айнымалылар және тұрақтылар</h3>
  <p>Айнымалы — деректерді сақтауға арналған аталған жад аймағы. Java-да әрбір айнымалының белгілі бір типі болуы керек.</p>
  <p>Тұрақты — инициализациядан кейін мәнін өзгертуге болмайтын айнымалы. Ол <code>final</code> кілт сөзімен жарияланады.</p>
  <pre><code class="lang-java">int userScore = 0; // Қарапайым айнымалы
userScore = 10; // Өзгертуге болады

final int MAX_LIVES = 3; // Тұрақты
// MAX_LIVES = 4; // Компиляция қатесі!</code></pre>

  <h3>Интерактивті мысал: Типтерді түрлендіру</h3>
  <p>Типтерді түрлендіру екі түрлі болады: <strong>жасырын (widening)</strong>, кіші тип үлкеніне орналастырылғанда (мысалы, <code>int</code>-ті <code>double</code>-ға), және <strong>айқын (narrowing)</strong>, үлкен тип деректерді жоғалту қаупімен кішісіне орналастырылғанда.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class TypeCasting {
    public static void main(String[] args) {
        // Жасырын түрлендіру (қауіпсіз)
        int myInt = 100;
        double myDouble = myInt; 
        System.out.println("int " + myInt + " double болды " + myDouble);

        // Айқын түрлендіру (деректер жоғалуы мүмкін)
        double anotherDouble = 9.78;
        int anotherInt = (int) anotherDouble; // Бөлшек бөлігі алынып тасталады
        System.out.println("double " + anotherDouble + " int болды " + anotherInt);
    }
}</code></pre>
      <button class="run-java-sim-kk">Орындау</button>
      <div class="output">
          <p><strong>Нәтиже:</strong></p>
          <pre class="result-output-kk"></pre>
      </div>
  </div>
  <script>
    (function() {
      const btn = document.currentScript.closest('.code-example').querySelector('.run-java-sim-kk');
      const output = btn.nextElementSibling.querySelector('.result-output-kk');
      btn.addEventListener('click', () => {
        output.textContent = 'int 100 double болды 100.0\\n' +
                             'double 9.78 int болды 9';
      });
    })();
  </script>

  <h3>Объектілер және сілтемелер</h3>
  <p>Примитивтерден айырмашылығы, объектілік типтердің айнымалылары объектінің өзін емес, <strong>сілтемені</strong> — жадтағы объектінің мекенжайын сақтайды. Бір объектілік айнымалыны екіншісіне меншіктегенде, сіз объектінің өзін емес, тек сілтемені көшіресіз.</p>
  <pre><code class="lang-java">// StringBuilder - өзгертілетін жол
StringBuilder sb1 = new StringBuilder("Hello");
StringBuilder sb2 = sb1; // sb2 енді sb1 нұсқап тұрған сол объектіге нұсқайды

sb2.append(" World!"); // Екінші сілтеме арқылы объектіні өзгерту

System.out.println(sb1); // "Hello World!" деп шығарады</code></pre>
  <p>Егер сілтеме ешқандай объектіге нұсқамаса, оған <code>null</code> арнайы мәні беріледі. <code>null</code>-сілтемеден әдісті шақыру әрекеті <code>NullPointerException</code> қатесіне әкеледі.</p>
</div>
`;
  window.__LECTURES_kk_2 = html;
})();
