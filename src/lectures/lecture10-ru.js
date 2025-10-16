/* Лекция 10 RU: Потоки данных в Java (Ввод/Вывод) (Расширенная версия) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Лекция 10: Потоки данных в Java (Ввод/Вывод)</h2>

  <h3>Концепция потоков (Streams)</h3>
  <p>В Java операции ввода-вывода (I/O) абстрагированы с помощью потоков. <strong>Поток</strong> — это последовательность данных, поступающих из источника (например, файл, клавиатура, сетевое соединение) или направляемых в приемник.</p>
  <p>Эта абстракция позволяет работать с разными источниками данных единообразно. Основные типы потоков:</p>
  <ul>
    <li><strong>Байтовые потоки (Byte Streams):</strong> Работают с данными на уровне байтов (числа от 0 до 255). Они подходят для любых типов файлов: изображений, аудио, исполняемых файлов и т.д. Базовые классы: <code>InputStream</code> и <code>OutputStream</code>.</li>
    <li><strong>Символьные потоки (Character Streams):</strong> Работают с текстовыми данными на уровне символов (Unicode). Они автоматически обрабатывают кодировки. Базовые классы: <code>Reader</code> и <code>Writer</code>.</li>
  </ul>

  <h3>Работа с файлами: Основные классы</h3>
  <p>Для файлового ввода-вывода чаще всего используются следующие классы:</p>
  <ul>
    <li><code>FileInputStream</code> / <code>FileOutputStream</code>: Для чтения и записи <strong>байтов</strong> в файл.</li>
    <li><code>FileReader</code> / <code>FileWriter</code>: Для чтения и записи <strong>символов</strong> (текста) в файл.</li>
    <li><strong>Декораторы потоков:</strong> Часто базовые потоки "оборачивают" в другие для добавления функциональности:
      <ul>
        <li><code>BufferedInputStream</code> / <code>BufferedReader</code>: Добавляют буферизацию, что значительно ускоряет чтение за счет уменьшения количества обращений к физическому устройству.</li>
        <li><code>DataInputStream</code> / <code>DataOutputStream</code>: Позволяют читать и записывать примитивные типы Java (<code>int</code>, <code>double</code>, <code>boolean</code>) в бинарном формате.</li>
      </ul>
    </li>
  </ul>

  <h3>Конструкция <code>try-with-resources</code></h3>
  <p>Потоки являются системными ресурсами, которые необходимо закрывать после использования, чтобы избежать утечек. Начиная с Java 7, для этого используется удобная конструкция <code>try-with-resources</code>, которая автоматически закрывает ресурсы, объявленные в скобках <code>try()</code>.</p>
  <pre><code class="lang-java">// Ресурс 'reader' будет автоматически закрыт после выполнения блока try
try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
    String line = reader.readLine();
    System.out.println(line);
} catch (IOException e) {
    // Обработка ошибки
}</code></pre>

  <h3>Интерактивный пример: Чтение и запись в текстовый "файл"</h3>
  <p>Этот пример симулирует запись нескольких строк в текстовый файл и их последующее чтение с использованием буферизованных потоков.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class FileDemo {
    public static void main(String[] args) {
        // Запись в файл
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("notes.txt"))) {
            writer.write("Первая строка.");
            writer.newLine(); // Добавляет перенос строки
            writer.write("Вторая строка.");
        } catch (IOException e) { e.printStackTrace(); }

        // Чтение из файла
        try (BufferedReader reader = new BufferedReader(new FileReader("notes.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) { e.printStackTrace(); }
    }
}</code></pre>
      <div class="interactive-controls">
        <textarea class="java-input" style="width: 100%; height: 60px;">Первая строка.\nВторая строка.</textarea>
        <button class="run-java-sim">Выполнить</button>
      </div>
      <div class="output">
          <p><strong>Симуляция вывода в консоль:</strong></p>
          <pre class="result-output"></pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const btn = container.querySelector('.run-java-sim');
      const textarea = container.querySelector('.java-input');
      const output = container.querySelector('.result-output');
      
      function runSimulation() {
        const content = textarea.value;
        let log = 'Запись в "notes.txt"...\\n';
        log += 'Чтение из "notes.txt"...\\n';
        log += '--- Вывод --- \\n';
        log += content.replace(/\\n/g, '\\n'); // Эмулируем построчное чтение
        log += '\\n--- Конец вывода ---';
        output.textContent = log;
      }
      
      btn.addEventListener('click', runSimulation);
      runSimulation();
    })();
  </script>
</div>
`;
  window.__LECTURES_ru_10 = html;
})();
