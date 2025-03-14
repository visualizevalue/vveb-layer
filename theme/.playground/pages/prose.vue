<template>
  <article class="prose">
    <p class="lead">lorem ipsum dolor sit amet, consectetur adipiscing elit. integer nec odio. praesent libero. sed cursus ante dapibus diam.</p>
    <p>nulla quis sem at nibh elementum imperdiet. duis sagittis ipsum. praesent mauris. fusce nec tellus sed augue semper porta.</p>
    <p>aliquam erat volutpat. aenean quam. in scelerisque sem at dolor. maecenas mattis. sed convallis tristique sem.</p>
    <blockquote>
      <p>curabitur sodales ligula in libero. sed dignissim lacinia nunc. curabitur tortor. pellentesque nibh.</p>
    </blockquote>
    <p>vestibulum lacinia arcu eget nulla. class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    <p>integer nec odio. praesent libero. sed cursus ante dapibus diam. sed nisi. nulla quis sem at nibh elementum imperdiet.</p>
    <p>it adds a new <code>prose</code> class that you can apply to any block of text:</p>
    <pre><code class="language-html">&lt;article class="prose"&gt;
  &lt;h1&gt;lorem ipsum: a journey into placeholder text&lt;/h1&gt;
  &lt;p&gt;
    many developers and designers use lorem ipsum as a way to fill up space
    in a mockup or prototype before the real content is available.
  &lt;/p&gt;
  &lt;p&gt;
    while it may seem random, lorem ipsum has its roots in classical latin literature
    and has been used in typesetting for centuries.
  &lt;/p&gt;
&lt;/article&gt;
  </code></pre>
    <p>for more information, visit <a href="https://www.lipsum.com">this page</a>.</p>
    <hr />
    <h2>typography and readability</h2>
    <p>typography plays a crucial role in readability, accessibility, and user experience. here are some key considerations:</p>
    <ol>
      <li>font size and spacing should be carefully adjusted for comfort.</li>
      <li>contrast between text and background enhances readability.</li>
      <li>headings should be used consistently to structure content effectively.</li>
    </ol>
    <h3>improving readability</h3>
    <p>typography should be easy to understand and aesthetically pleasing.</p>
    <blockquote><p>good typography enhances user experience and conveys information effectively.</p></blockquote>
    <figure>
      <img src="https://placehold.co/600x400" alt="random image" />
      <figcaption>placeholder images can make layouts more realistic.</figcaption>
    </figure>
    <p>lists also contribute to clarity:</p>
    <ul>
      <li>bullet points help break down information.</li>
      <li>short sentences improve understanding.</li>
      <li>consistent formatting maintains readability.</li>
    </ul>
    <h2>nested lists</h2>
    <ol>
      <li>
        <strong>organizing content</strong>
        <ul>
          <li>hierarchical structures guide users.</li>
          <li>clear nesting prevents confusion.</li>
          <li>too much nesting can reduce clarity.</li>
        </ul>
      </li>
      <li>
        <strong>Usage in documents</strong>
        <ul>
          <li>Outlines and lists help in planning.</li>
          <li>They structure information logically.</li>
        </ul>
      </li>
    </ol>
    <h2>Code Blocks</h2>
    <p>Code formatting should be clear and easy to read:</p>
    <pre><code class="language-js">function greet() {
  console.log("Hello, world!");
}
greet();</code></pre>
    <h3>Inline Code</h3>
    <p>Use inline code like <code>&lt;span&gt;</code> elements or mention <code>console.log()</code> where necessary.</p>
    <p>For further information, check out <a href="https://developer.mozilla.org">MDN Web Docs</a>.</p>
    <h2>Conclusion</h2>
    <p>Typography, readability, and structured content play a vital role in effective communication. By following best practices, we can enhance user experience and information delivery.</p>
    <p>Adding a final sentence here ensures balance and smooth closure.</p>
  </article>
</template>

<style scoped>
.prose {
  max-width: var(--content-width-sm);
  margin: 0 auto;
}
</style>
