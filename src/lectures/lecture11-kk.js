/* Лекция 11 KK: ООП қосымша мүмкіндіктері (Кеңейтілген нұсқа) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Дәріс 11: ООП қосымша мүмкіндіктері</h2>

  <h3>Санамалар (Enums)</h3>
  <p><strong>Санама (enum)</strong> — бұл айнымалыға алдын ала анықталған тұрақтылар жиынтығының бірі болуға мүмкіндік беретін арнайы деректер типі. Enums пайдалану кодты типтер тұрғысынан қауіпсіз және өзін-өзі құжаттайтын етеді.</p>
  <p>Java-да <code>enum</code> — бұл жай ғана тұрақтылар жиынтығы емес. Бұл өз өрістері, әдістері және конструкторлары бола алатын сыныптың ерекше түрі.</p>
  <pre><code class="lang-java">public enum Planet {
    MERCURY (3.303e+23, 2.4397e6),
    VENUS   (4.869e+24, 6.0518e6),
    EARTH   (5.976e+24, 6.37814e6);

    private final double mass;   // килограмммен
    private final double radius; // метрмен

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    public double surfaceGravity() {
        // Гравитациялық үдеу формуласы
        return 6.67300E-11 * mass / (radius * radius);
    }
}

// Қолдану:
// Planet.EARTH.surfaceGravity() Жердің гравитациясын қайтарады.</code></pre>

  <h3>Үлгілер (Generics)</h3>
  <p><strong>Generics (жалпылау немесе үлгілер)</strong> — бұл компиляция кезінде типтерді қатаң тексеруді сақтай отырып, әртүрлі деректер типтерімен жұмыс істейтін икемді, қайта пайдалануға болатын код жазуға мүмкіндік беретін қуатты механизм. Негізгі идея — "параметрленген типтерді" құру.</p>
  <p>Бұл типтерді үнемі келтіру қажеттілігінен аулақ болуға және типтердің сәйкес келмеу қателерін орындалу кезінде емес, компиляция кезеңінде анықтауға көмектеседі.</p>
  <pre><code class="lang-java">// "Box" жалпыланған сыныбы
public class Box<T> {
    private T content;

    public void setContent(T content) {
        this.content = content;
    }

    public T getContent() {
        return content;
    }
}

// Әртүрлі типтермен қолдану
Box<String> stringBox = new Box<>();
stringBox.setContent("Қораптағы мәтін");

Box<Integer> integerBox = new Box<>();
integerBox.setContent(123);</code></pre>

  <h3>Ішкі сыныптар (Nested Classes)</h3>
  <p>Java басқа сыныптың ішінде сыныпты анықтауға мүмкіндік береді. Мұндай сыныптар ішкі деп аталады және инкапсуляция мен логикалық топтастыру үшін қызмет етеді.</p>
  
  <h4>Негізгі түрлері:</h4>
  <ul>
    <li><strong>Статикалық ішкі сынып (Static Nested Class):</strong> Оның данасымен емес, сыртқы сыныппен байланысты. Сыртқы сыныптың статикалық емес мүшелеріне қол жеткізе алмайды. Кәдімгі сынып сияқты қолданылады, бірақ басқасының ішінде "жасырылған".</li>
    <li><strong>Ішкі сынып (Inner Class):</strong> Сыртқы сыныптың данасымен байланысты. Өзінің "ата-аналық" объектісінің барлық (соның ішінде <code>private</code>) өрістері мен әдістеріне қол жеткізе алады.</li>
    <li><strong>Жергілікті сынып (Local Class):</strong> Әдістің ішінде анықталған сынып. Оның көріну аймағы осы әдіспен шектелген.</li>
    <li><strong>Анонимді сынып (Anonymous Class):</strong> Аты жоқ жергілікті сынып. Мінез-құлықты "аз ғана" қайта анықтаумен сынып данасын бір рет жасау үшін қолданылады (көбінесе оқиғаларды өңдеушілер үшін).</li>
  </ul>

  <h3>Интерактивті мысал: Сұрыптауға арналған анонимді сынып</h3>
  <p>Анонимді сыныптар интерфейстерді "жүре бара" іске асыру үшін жиі қолданылады. Бұл мысалда біз жолдарды ұзындығы бойынша сұрыптау үшін компаратор жасаймыз, ол үшін жеке аталған сынып құрмаймыз.</p>
  <div class="code-example">
      <pre><code class="lang-java">import java.util.Arrays;
import java.util.Comparator;

public class SortExample {
    public static void main(String[] args) {
        String[] names = {"Alice", "Bob", "Charlie", "Dave"};

        // Comparator-ды іске асыратын анонимді сынып құру
        Arrays.sort(names, new Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                return Integer.compare(a.length(), b.length());
            }
        });

        System.out.println(Arrays.toString(names));
    }
}</code></pre>
      <div class="interactive-controls">
        <button class="run-java-sim-kk">Сұрыптауды орындау</button>
      </div>
      <div class="output">
          <p><strong>Нәтиже:</strong></p>
          <pre class="result-output-kk"></pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const btn = container.querySelector('.run-java-sim-kk');
      const output = container.querySelector('.result-output-kk');
      
      btn.addEventListener('click', () => {
        const names = ["Alice", "Bob", "Charlie", "Dave"];
        names.sort((a, b) => a.length - b.length);
        output.textContent = '[' + names.join(', ') + ']';
      });
    })();
  </script>
</div>
`;
  window.__LECTURES_kk_11 = html;
})();
