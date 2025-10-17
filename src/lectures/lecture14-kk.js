/* Лекция 14 KK: Файлдық жүйемен жұмыс (Кеңейтілген нұсқа) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Дәріс 14: Файлдық жүйемен жұмыс</h2>

  <h3>Legacy I/O: <code>java.io.File</code> сыныбы</h3>
  <p><code>File</code> сыныбы Java-ның ескі нұсқаларында файлдар мен каталогтарды ұсынудың бастапқы әдісі болды. Ол ақпарат алуға (көлемі, өзгертілген күні, қол жеткізу құқықтары) және негізгі операцияларды орындауға (құру, жою, атын өзгерту) арналған әдістерді ұсынады.</p>
  <pre><code class="lang-java">File file = new File("data/info.txt");
if (file.exists()) {
    System.out.println("Файл бар!");
    System.out.println("Көлемі: " + file.length() + " байт");
}

File dir = new File("new_directory");
dir.mkdir(); // Каталог құру</code></pre>
  <p>Өзінің функционалдығына қарамастан, <code>File</code>-дың кемшіліктері бар: қателер туралы хабарламалардың болмауы (көптеген әдістер жай ғана <code>false</code> қайтарады), файл атрибуттарымен шектеулі жұмыс істеу және символдық сілтемелермен әрдайым болжамды әрекет етпеуі.</p>

  <h3>Заманауи тәсіл: Java NIO.2</h3>
  <p>Java 7-де ұсынылған <strong>New I/O 2 (NIO.2)</strong> пакеті файлдық жүйемен жұмыс істеуге арналған анағұрлым қуатты және икемді API ұсынады. Оның негізгі компоненттері:</p>
  <ul>
    <li><strong><code>Path</code>:</strong> Файлдық жүйедегі файлға немесе каталогқа жолды білдіретін интерфейс. Ол операциялық жүйеге тәуелді емес және <code>File</code> сыныбын алмастырады.</li>
    <li><strong><code>Paths</code>:</strong> Жолдан немесе URI-ден <code>Path</code> объектілерін жасауға арналған <code>get()</code> фабрикалық әдісі бар утилиталық сынып.</li>
    <li><strong><code>Files</code>:</strong> Барлық қажетті файлдық операцияларды орындауға арналған статикалық әдістердің бай жиынтығы бар утилиталық сынып: көшіру, жылжыту, жою, оқу/жазу, атрибуттарды басқару және каталогтар ағашын аралау.</li>
  </ul>
  <p>NIO.2 артықшылықтары: ерекше жағдайлар арқылы қателерді неғұрлым егжей-тегжейлі өңдеу, атрибуттар мен символдық сілтемелерді жақсырақ қолдау, сондай-ақ өнімділігі жоғары операциялар.</p>

  <h3>Интерактивті мысал: <code>Files</code> көмегімен файлды көшіру</h3>
  <p>Бұл мысал заманауи NIO.2 тәсілін пайдаланып, "файлды" бір жерден екінші жерге көшіруді симуляциялайды.</p>
  <div class="code-example">
      <pre><code class="lang-java">import java.nio.file.*;
import java.io.IOException;

public class NioCopy {
    public static void main(String[] args) {
        Path source = Paths.get("source/report.txt");
        Path destination = Paths.get("backup/report_copy.txt");

        try {
            // Файлды, егер ол бар болса, қайта жазу опциясымен көшіру
            Files.copy(source, destination, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Файл сәтті көшірілді!");
        } catch (IOException e) {
            System.err.println("Файлды көшіру кезінде қате: " + e.getMessage());
        }
    }
}</code></pre>
      <div class="interactive-controls">
        <button class="run-java-sim-kk">Көшіруді орындау</button>
      </div>
      <div class="output">
          <p><strong>Симуляция журналы:</strong></p>
          <pre class="result-output-kk">Результат: (примерный вывод)</pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const btn = container.querySelector('.run-java-sim-kk');
      const output = container.querySelector('.result-output-kk');
      
      let virtualFileSystem = {
        "source/report.txt": "Есеп мазмұны.",
        "backup/": {}
      };

      btn.addEventListener('click', () => {
        let log = '"source/report.txt" файлын "backup/report_copy.txt" файлына көшіру әрекеті...\\n';
        if (virtualFileSystem["source/report.txt"]) {
          virtualFileSystem["backup/report_copy.txt"] = virtualFileSystem["source/report.txt"];
          log += 'Файл сәтті көшірілді!';
        } else {
          log += 'Қате: Бастапқы файл табылмады!';
        }
        output.textContent = log;
      });
    })();
  </script>

  <h3>Файлдарды "бір жолмен" оқу және жазу</h3>
  <p><code>Files</code> сыныбы шағын файлдар үшін өте ыңғайлы, қарапайым оқу/жазу операцияларына арналған өте ыңғайлы әдістерді ұсынады:</p>
  <pre><code class="lang-java">// Файлдан барлық байттарды оқу
byte[] bytes = Files.readAllBytes(Paths.get("image.jpg"));

// Мәтіндік файлдан барлық жолдарды тізімге оқу
List<String> lines = Files.readAllLines(Paths.get("config.txt"));

// Жолды файлға жазу (оны қайта жазады)
Files.write(Paths.get("log.txt"), "Бұл жаңа жазба.".getBytes());</code></pre>
</div>
`;
  window.__LECTURES_kk_14 = html;
})();
