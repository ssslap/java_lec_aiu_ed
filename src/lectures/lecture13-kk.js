/* Лекция 13 KK: Объектілерді сериализациялау (Кеңейтілген нұсқа) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Дәріс 13: Объектілерді сериализациялау</h2>

  <h3>Сериализация деген не және ол не үшін қажет?</h3>
  <p><strong>Сериализация</strong> — бұл объектінің күйін сақтауға (мысалы, файлға немесе дерекқорға) немесе тасымалдауға (мысалы, желі арқылы) болатын форматқа айналдыру механизмі. <strong>Десериализация</strong> — сақталған күйден объектіні қалпына келтірудің кері процесі.</p>
  <p>Негізгі қолдану салалары:</p>
  <ul>
    <li><strong>Күйді сақтау:</strong> Қосымшаның немесе жеке объектілердің күйін іске қосулар арасында сақтауға мүмкіндік береді.</li>
    <li><strong>Кэштеу:</strong> Жиі қолданылатын, жасалуы "қымбат" объектілерді сериализациялап, кэштен жылдам қалпына келтіруге болады.</li>
    <li><strong>Деректер алмасу:</strong> RPC (Remote Procedure Call), мысалы, RMI (Remote Method Invocation) сияқты технологияларда әртүрлі JVM арасында объектілерді тасымалдау үшін қолданылады.</li>
  </ul>

  <h3><code>java.io.Serializable</code> интерфейсі</h3>
  <p>Сыныпты сериализацияланатын ету үшін <code>Serializable</code> интерфейсін іске асыру жеткілікті. Бұл интерфейс "маркерлік" болып табылады, яғни іске асыруды қажет ететін әдістері жоқ. Ол тек JVM-ге осы сыныптың объектілерін қауіпсіз сериализациялауға болатынын хабарлайды.</p>
  <pre><code class="lang-java">import java.io.Serializable;

// Бұл сыныпты енді сериализациялауға болады
public class User implements Serializable {
    private String username;
    private int level;
    // ...
}</code></pre>

  <h3>Объектілік ағындар: - <code>ObjectOutputStream</code> және <code>ObjectInputStream</code></h3>
  <p>Осы операцияларды орындау үшін арнайы "объектілік" ағындар қолданылады:</p>
  <ul>
    <li><strong><code>ObjectOutputStream</code>:</strong> Басқа шығыс ағынын (мысалы, <code>FileOutputStream</code>) "орайды" және <code>writeObject(obj)</code> әдісі арқылы объектіні сериализациялайды.</li>
    <li><strong><code>ObjectInputStream</code>:</strong> Кіріс ағынын "орайды" және <code>readObject()</code> әдісі арқылы объектіні десериализациялайды. Нәтижені қажетті типке айқын келтіру керек.</li>
  </ul>

  <h3>Интерактивті мысал: Ойыншы профилін сақтау</h3>
  <p>Бұл мысал <code>PlayerProfile</code> объектісін "файлға" сақтауды және оны кейіннен жүктеуді симуляциялайды, күйдің қалпына келуін көрсетеді.</p>
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

        // Сериализация (сақтау)
        // try (ObjectOutputStream oos = ...) { oos.writeObject(player); }

        // Десериализация (жүктеу)
        // try (ObjectInputStream ois = ...) { PlayerProfile loaded = (PlayerProfile) ois.readObject(); }
    }
}</code></pre>
      <div class="interactive-controls">
        <p>Лақап ат: <input type="text" class="java-input-kk" value="Hero"></p>
        <p>Ұпай: <input type="number" class="java-input-kk" value="1500"></p>
        <button class="run-java-sim-kk">Сақтау және Жүктеу</button>
      </div>
      <div class="output">
          <p><strong>Симуляция журналы:</strong></p>
          <pre class="result-output-kk"></pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const btn = container.querySelector('.run-java-sim-kk');
      const inputs = container.querySelectorAll('.java-input-kk');
      const output = container.querySelector('.result-output-kk');
      
      let virtualFile = null;

      function runSimulation() {
        const player = {
          nickname: inputs[0].value,
          score: parseInt(inputs[1].value, 10)
        };
        
        let log = 'Объектіні сақтау: {nickname: "' + player.nickname + '", score: ' + player.score + '}\\n';
        virtualFile = JSON.stringify(player);
        log += 'Профиль "profile.sav" файлына сақталды.\\n\\n';
        
        const loaded = JSON.parse(virtualFile);
        log += '"profile.sav" файлынан профильді жүктеу...\\n';
        log += 'Жүктелген ойыншы: ' + loaded.nickname + ', ұпайы ' + loaded.score;

        output.textContent = log;
      }
      
      btn.addEventListener('click', runSimulation);
    })();
  </script>

  <h3><code>transient</code> кілт сөзі және <code>serialVersionUID</code></h3>
  <ul>
    <li><strong><code>transient</code>:</strong> Осы кілт сөзбен белгіленген өрістер сериализация процесінен алынып тасталады. Бұл сақтауды қажет етпейтін (мысалы, уақытша есептеулер) немесе сериализацияланбайтын өрістер үшін пайдалы.</li>
    <li><strong><code>serialVersionUID</code>:</strong> Бұл сынып нұсқасы ретінде әрекет ететін <code>static final long</code> өрісі. Егер сіз сыныпты өзгертсеңіз (мысалы, өріс қоссаңыз), бірақ оның ескі сериализацияланған объектілермен үйлесімді болып қалуын қаласаңыз, <code>serialVersionUID</code> бұрынғыдай қалуы керек. Егер үйлесімділікті әдейі бұзғыңыз келсе, осы ID-ді өзгертіңіз.</li>
  </ul>
  <pre><code class="lang-java">public class User implements Serializable {
    private static final long serialVersionUID = 1L; // Сынып нұсқасы
    
    private String username;
    private transient String password; // Құпия сөз сақталмайды
}</code></pre>
</div>
`;
  window.__LECTURES_kk_13 = html;
})();
