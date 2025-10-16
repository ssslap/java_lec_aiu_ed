/* Лекция 13 RU: Сериализация объектов (Расширенная версия) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Лекция 13: Сериализация объектов</h2>

  <h3>Что такое сериализация и зачем она нужна?</h3>
  <p><strong>Сериализация</strong> — это механизм преобразования состояния объекта в формат, который можно сохранить (например, в файл или базу данных) или передать (например, по сети). <strong>Десериализация</strong> — это обратный процесс, восстанавливающий объект из сохраненного состояния.</p>
  <p>Основные применения:</p>
  <ul>
    <li><strong>Сохранение состояния:</strong> Позволяет сохранять состояние приложения или отдельных объектов между запусками.</li>
    <li><strong>Кэширование:</strong> Часто используемые, "дорогие" в создании объекты можно сериализовать и быстро восстанавливать из кэша.</li>
    <li><strong>Обмен данными:</strong> Используется в RPC (Remote Procedure Call), например, в RMI (Remote Method Invocation), для передачи объектов между разными JVM.</li>
  </ul>

  <h3>Интерфейс <code>java.io.Serializable</code></h3>
  <p>Чтобы сделать класс сериализуемым, достаточно реализовать интерфейс <code>Serializable</code>. Этот интерфейс является "маркерным", то есть не содержит методов для реализации. Он просто сообщает JVM, что объекты этого класса можно безопасно сериализовать.</p>
  <pre><code class="lang-java">import java.io.Serializable;

// Этот класс теперь можно сериализовать
public class User implements Serializable {
    private String username;
    private int level;
    // ...
}</code></pre>

  <h3>Процесс сериализации и десериализации</h3>
  <p>Для выполнения этих операций используются специальные "объектные" потоки:</p>
  <ul>
    <li><strong><code>ObjectOutputStream</code>:</strong> "Оборачивает" другой поток вывода (например, <code>FileOutputStream</code>) и с помощью метода <code>writeObject(obj)</code> сериализует объект.</li>
    <li><strong><code>ObjectInputStream</code>:</strong> "Оборачивает" поток ввода и с помощью метода <code>readObject()</code> десериализует объект. Результат нужно явно приводить к нужному типу.</li>
  </ul>

  <h3>Интерактивный пример: Сохранение профиля игрока</h3>
  <p>Этот пример симулирует сохранение объекта <code>PlayerProfile</code> в "файл" и его последующую загрузку, демонстрируя восстановление состояния.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class PlayerProfile implements Serializable {
    public String nickname;
    public int score;
    public int health;
}

public class Game {
    public static void main(String[] args) {
        PlayerProfile player = new PlayerProfile();
        player.nickname = "Hero";
        player.score = 1500;
        player.health = 95;

        // Сериализация (сохранение)
        // try (ObjectOutputStream oos = ...) { oos.writeObject(player); }

        // Десериализация (загрузка)
        // try (ObjectInputStream ois = ...) { PlayerProfile loaded = (PlayerProfile) ois.readObject(); }
    }
}</code></pre>
      <div class="interactive-controls">
        <p>Ник: <input type="text" class="java-input" value="Hero"></p>
        <p>Счет: <input type="number" class="java-input" value="1500"></p>
        <button class="run-java-sim">Сохранить и Загрузить</button>
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
      const inputs = container.querySelectorAll('.java-input');
      const output = container.querySelector('.result-output');
      
      let virtualFile = null;

      function runSimulation() {
        const player = {
          nickname: inputs[0].value,
          score: parseInt(inputs[1].value, 10)
        };
        
        let log = 'Сохранение объекта: {nickname: "' + player.nickname + '", score: ' + player.score + '}\\n';
        virtualFile = JSON.stringify(player);
        log += 'Профиль сохранен в "profile.sav".\\n\\n';
        
        const loaded = JSON.parse(virtualFile);
        log += 'Загрузка профиля из "profile.sav"...\\n';
        log += 'Загружен игрок: ' + loaded.nickname + ' со счетом ' + loaded.score;

        output.textContent = log;
      }
      
      btn.addEventListener('click', runSimulation);
    })();
  </script>

  <h3>Ключевое слово <code>transient</code> и <code>serialVersionUID</code></h3>
  <ul>
    <li><strong><code>transient</code>:</strong> Поля, помеченные этим ключевым словом, исключаются из процесса сериализации. Это полезно для полей, которые не нужно сохранять (например, временные вычисления) или которые нельзя сериализовать.</li>
    <li><strong><code>serialVersionUID</code>:</strong> Это <code>static final long</code> поле, которое действует как версия класса. Если вы изменили класс (например, добавили поле), но хотите, чтобы он оставался совместимым со старыми сериализованными объектами, <code>serialVersionUID</code> должен остаться прежним. Если вы хотите явно прервать совместимость, измените это ID.</li>
  </ul>
  <pre><code class="lang-java">public class User implements Serializable {
    private static final long serialVersionUID = 1L; // Версия класса
    
    private String username;
    private transient String password; // Пароль не будет сохраняться
}</code></pre>
</div>
`;
  window.__LECTURES_ru_13 = html;
})();
