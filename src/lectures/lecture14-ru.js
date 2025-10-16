/* Лекция 14 RU: Работа с файловой системой (Расширенная версия) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Лекция 14: Работа с файловой системой</h2>

  <h3>Legacy I/O: Класс <code>java.io.File</code></h3>
  <p>Класс <code>File</code> был первоначальным способом представления файлов и каталогов в Java. Он предоставляет методы для получения информации (размер, дата изменения, права доступа) и выполнения операций (создание, удаление, переименование).</p>
  <pre><code class="lang-java">File file = new File("data/info.txt");
if (file.exists()) {
    System.out.println("Файл существует!");
    System.out.println("Размер: " + file.length() + " байт");
}

File dir = new File("new_directory");
dir.mkdir(); // Создание каталога</code></pre>
  <p>Несмотря на свою функциональность, у <code>File</code> есть недостатки: отсутствие сообщений об ошибках (многие методы просто возвращают <code>false</code>), ограниченная работа с атрибутами файлов и не всегда предсказуемое поведение с символическими ссылками.</p>

  <h3>Современный подход: Java NIO.2</h3>
  <p>Пакет <strong>New I/O 2 (NIO.2)</strong>, представленный в Java 7, предлагает более мощный и гибкий API для работы с файловой системой. Его ключевые компоненты:</p>
  <ul>
    <li><strong><code>Path</code>:</strong> Интерфейс, представляющий путь к файлу или каталогу. Он не зависит от операционной системы и заменяет класс <code>File</code>.</li>
    <li><strong><code>Paths</code>:</strong> Утилитарный класс для создания объектов <code>Path</code> из строки или URI.</li>
    <li><strong><code>Files</code>:</strong> Утилитарный класс с богатым набором статических методов для выполнения всех необходимых файловых операций: копирование, перемещение, удаление, чтение/запись, управление атрибутами и обход дерева каталогов.</li>
  </ul>
  <p>Преимущества NIO.2: более детальная обработка ошибок через исключения, лучшая поддержка атрибутов и символических ссылок, а также более производительные операции.</p>

  <h3>Интерактивный пример: Копирование файла с помощью <code>Files</code></h3>
  <p>Этот пример симулирует копирование "файла" из одного места в другое с использованием современного подхода NIO.2.</p>
  <div class="code-example">
      <pre><code class="lang-java">import java.nio.file.*;
import java.io.IOException;

public class NioCopy {
    public static void main(String[] args) {
        Path source = Paths.get("source/report.txt");
        Path destination = Paths.get("backup/report_copy.txt");

        try {
            // Копирование файла с опцией перезаписи, если он уже существует
            Files.copy(source, destination, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Файл успешно скопирован!");
        } catch (IOException e) {
            System.err.println("Ошибка при копировании файла: " + e.getMessage());
        }
    }
}</code></pre>
      <div class="interactive-controls">
        <button class="run-java-sim">Выполнить копирование</button>
      </div>
      <div class="output">
          <p><strong>Лог симуляции:</strong></p>
          <pre class="result-output"></pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const btn = container.querySelector('.run-java-sim');
      const output = container.querySelector('.result-output');
      
      let virtualFileSystem = {
        "source/report.txt": "Содержимое отчета.",
        "backup/": {}
      };

      btn.addEventListener('click', () => {
        let log = 'Попытка скопировать "source/report.txt" в "backup/report_copy.txt"...\\n';
        if (virtualFileSystem["source/report.txt"]) {
          virtualFileSystem["backup/report_copy.txt"] = virtualFileSystem["source/report.txt"];
          log += 'Файл успешно скопирован!';
        } else {
          log += 'Ошибка: Исходный файл не найден!';
        }
        output.textContent = log;
      });
    })();
  </script>

  <h3>Чтение и запись файлов "в одну строку"</h3>
  <p>Класс <code>Files</code> предоставляет чрезвычайно удобные методы для простых операций чтения/записи, которые идеально подходят для небольших файлов:</p>
  <pre><code class="lang-java">// Прочитать все байты из файла
byte[] bytes = Files.readAllBytes(Paths.get("image.jpg"));

// Прочитать все строки из текстового файла в список
List<String> lines = Files.readAllLines(Paths.get("config.txt"));

// Записать строку в файл (перезаписывая его)
Files.write(Paths.get("log.txt"), "Это новая запись.".getBytes());</code></pre>
</div>
`;
  window.__LECTURES_ru_14 = html;
})();
