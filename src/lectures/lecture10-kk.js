/* Лекция 10 KK: Java-дағы деректер ағындары (Енгізу/Шығару) (Кеңейтілген нұсқа) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Дәріс 10: Java-дағы деректер ағындары (Енгізу/Шығару)</h2>

  <h3>Ағындар тұжырымдамасы (Streams)</h3>
  <p>Java-да енгізу-шығару (I/O) операциялары ағындар арқылы абстракцияланады. <strong>Ағын</strong> — бұл дереккөзден (мысалы, файл, пернетақта, желілік қосылым) келетін немесе қабылдағышқа бағытталған деректер тізбегі.</p>
  <p>Бұл абстракция әртүрлі дереккөздермен біркелкі жұмыс істеуге мүмкіндік береді. Ағындардың негізгі түрлері:</p>
  <ul>
    <li><strong>Байттық ағындар (Byte Streams):</strong> Деректермен байт деңгейінде (0-ден 255-ке дейінгі сандар) жұмыс істейді. Олар кез келген файл түріне жарамды: суреттер, аудио, орындалатын файлдар және т.б. Негізгі сыныптар: <code>InputStream</code> және <code>OutputStream</code>.</li>
    <li><strong>Символдық ағындар (Character Streams):</strong> Мәтіндік деректермен символдар деңгейінде (Unicode) жұмыс істейді. Олар кодтауларды автоматты түрде өңдейді. Негізгі сыныптар: <code>Reader</code> және <code>Writer</code>.</li>
  </ul>

  <h3>Файлдармен жұмыс: Негізгі сыныптар</h3>
  <p>Файлдық енгізу-шығару үшін көбінесе келесі сыныптар қолданылады:</p>
  <ul>
    <li><code>FileInputStream</code> / <code>FileOutputStream</code>: Файлға <strong>байттарды</strong> оқу және жазу үшін.</li>
    <li><code>FileReader</code> / <code>FileWriter</code>: Файлға <strong>символдарды</strong> (мәтінді) оқу және жазу үшін.</li>
    <li><strong>Ағын декораторлары:</strong> Жиі негізгі ағындар функционалдылықты қосу үшін басқаларына "оралады":
      <ul>
        <li><code>BufferedInputStream</code> / <code>BufferedReader</code>: Физикалық құрылғыға жүгіну санын азайту арқылы оқуды едәуір жылдамдататын буферлеуді қосады.</li>
        <li><code>DataInputStream</code> / <code>DataOutputStream</code>: Java-ның примитивті типтерін (<code>int</code>, <code>double</code>, <code>boolean</code>) екілік форматта оқуға және жазуға мүмкіндік береді.</li>
      </ul>
    </li>
  </ul>

  <h3><code>try-with-resources</code> конструкциясы</h3>
  <p>Ағындар — бұл жүйелік ресурстар, оларды пайдаланғаннан кейін ағып кетуді болдырмау үшін жабу керек. Java 7-ден бастап, бұл үшін <code>try()</code> жақшаларында жарияланған ресурстарды автоматты түрде жабатын ыңғайлы <code>try-with-resources</code> конструкциясы қолданылады.</p>
  <pre><code class="lang-java">// 'reader' ресурсы try блогы орындалғаннан кейін автоматты түрде жабылады
try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
    String line = reader.readLine();
    System.out.println(line);
} catch (IOException e) {
    // Қатені өңдеу
}</code></pre>

  <h3>Интерактивті мысал: Мәтіндік "файлға" оқу және жазу</h3>
  <p>Бұл мысал бірнеше жолды мәтіндік файлға жазуды және оларды буферленген ағындарды пайдаланып кейіннен оқуды симуляциялайды.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class FileDemo {
    public static void main(String[] args) {
        // Файлға жазу
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("notes.txt"))) {
            writer.write("Бірінші жол.");
            writer.newLine(); // Жол ауыстыруды қосады
            writer.write("Екінші жол.");
        } catch (IOException e) { e.printStackTrace(); }

        // Файлдан оқу
        try (BufferedReader reader = new BufferedReader(new FileReader("notes.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) { e.printStackTrace(); }
    }
}</code></pre>
      <div class="interactive-controls">
        <textarea class="java-input-kk" style="width: 100%; height: 60px;">Бірінші жол.\nЕкінші жол.</textarea>
        <button class="run-java-sim-kk">Орындау</button>
      </div>
      <div class="output">
          <p><strong>Консольге шығару симуляциясы:</strong></p>
          <pre class="result-output-kk"></pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const btn = container.querySelector('.run-java-sim-kk');
      const textarea = container.querySelector('.java-input-kk');
      const output = container.querySelector('.result-output-kk');
      
      function runSimulation() {
        const content = textarea.value;
        let log = '"notes.txt" файлына жазу...\\n';
        log += '"notes.txt" файлынан оқу...\\n';
        log += '--- Шығару --- \\n';
        log += content.replace(/\\n/g, '\\n'); // Жолма-жол оқуды эмуляциялау
        log += '\\n--- Шығару соңы ---';
        output.textContent = log;
      }
      
      btn.addEventListener('click', runSimulation);
      runSimulation();
    })();
  </script>
</div>
`;
  window.__LECTURES_kk_10 = html;
})();
