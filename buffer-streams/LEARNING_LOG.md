# 📚 Streams Architecture & Learning Log (Q&A)

This document serves as an academic learning log and Architecture Decision Record (ADR) for the Cryptocurrency Order Processing Challenge. It is designed for both human reference and to provide deep architectural context to future **AI Agents** collaborating on this repository.

---

## 📌 [001] Decorator Pattern in I/O Architectures: Why inherit from `Transform Stream`?
* **Date:** 2026-07-08
* **Related Files:** [README.MD](file:///Users/rodrandres/Personal/Projects/deno-examples/denoExamples/buffer-streams/README.MD), [OrderProcessorStream.js](file:///Users/rodrandres/Personal/Projects/deno-examples/denoExamples/buffer-streams/node/streams/OrderProcessorStream.js)

### ❓ Original Question / Doubt
In traditional Object-Oriented Programming (OOP), the Decorator Pattern is implemented as a wrapper class around another instance to add behavior dynamically without altering the original code. Why must decorators in this challenge (such as `PriceNormalizerDecorator` or `HighValueAlertDecorator`) inherit from the `Transform` stream class? Are they actual streams?

### 📖 Architectural Explanation
1. **Yes, they are true Streams:** In event-driven and data-intensive I/O architectures (such as continuous data streams or large file processing), the Decorator Pattern is adapted to the medium by implementing it via **chaining Transform Streams**.
2. **Compatibility with `pipeline()`:** In Node.js, the standard mechanism for composing streams is `stream.pipeline()`. This tool only knows how to pipe Streams to Streams. You cannot insert a standard class or plain function in the middle of a pipeline; every intermediate component must implement both `Readable` and `Writable` interfaces (which the base `Transform` class provides).
3. **The Decorator Role in an Assembly Line:**
   * **Base Stream:** Manufactures or parses the initial data object (e.g., parsing raw CSV text into a JavaScript object in [OrderProcessorStream.js](file:///Users/rodrandres/Personal/Projects/deno-examples/denoExamples/buffer-streams/node/streams/OrderProcessorStream.js)).
   * **Decorator as a Transform Stream:** Intercepts the object from the previous stream, enriches or modifies its behavior/properties (e.g., rounding price decimals or emitting alerts), and pushes it back into the stream flow toward the next step using `this.push(data)`.

### 🌟 Golden Rule / Takeaway
> In Stream (I/O) architectures, the Decorator Pattern is implemented by creating intermediate **Transform Streams**. This adheres to the Open/Closed Principle (OCP from SOLID), allowing modular pieces to be plugged or unplugged in `pipeline(...)` without modifying the core producer or consumer logic.

---

## 📌 [002] The Behind-the-Scenes of `objectMode` in Intermediate Streams
* **Date:** 2026-07-08
* **Related Files:** [OrderProcessorStream.js](file:///Users/rodrandres/Personal/Projects/deno-examples/denoExamples/buffer-streams/node/streams/OrderProcessorStream.js#L6-L10), [index.js](file:///Users/rodrandres/Personal/Projects/deno-examples/denoExamples/buffer-streams/node/index.js)

### ❓ Original Question / Doubt
If the base stream ([OrderProcessorStream.js](file:///Users/rodrandres/Personal/Projects/deno-examples/denoExamples/buffer-streams/node/streams/OrderProcessorStream.js)) already emits a JavaScript object and the final consumer successfully receives it, why do intermediate decorators need to be explicitly configured for objects (`objectMode`) if their only job is to receive and return that exact same object?

### 📖 Architectural Explanation
1. **Node.js Default Behavior:** By design, all streams in Node.js (`Readable`, `Writable`, and `Transform`) are initialized to handle **binary or text data exclusively** (`Buffer` or `string`, i.e., `objectMode: false`).
2. **Why the Base Stream Works:** The constructor of the base processor explicitly specifies `readableObjectMode: true` and `writableObjectMode: false`. This instructs Node.js: *"I will receive text Buffers on my writable input, but my readable output will emit pure JS objects."*
3. **The Trap with New Decorators:** When you create a new decorator extending `Transform`, it is an entirely new, independent stream instance. If `objectMode` is omitted in its constructor, it defaults to expecting Buffers on both its input and output. As soon as the upstream processor pushes a JavaScript object `{ id: '1001', ... }` into it, Node.js halts the pipeline with a fatal runtime error: `TypeError: Invalid non-string/buffer chunk`.

### 🌟 Golden Rule / Takeaway
> Every intermediate Transform Stream positioned between components that exchange JavaScript objects must be initialized with **`{ objectMode: true }`** in its constructor (`super({ objectMode: true })`). This enables object reception and emission on both the readable and writable sides without Node.js attempting Buffer coercion or throwing type errors.

---

## 📌 [003] Anatomy of `pipeline()` and the Role of the Sink (Destination)
* **Date:** 2026-07-08
* **Related Files:** [index.js](file:///Users/rodrandres/Personal/Projects/deno-examples/denoExamples/buffer-streams/node/index.js#L27-L41)

### ❓ Original Question / Doubt
In [index.js](file:///Users/rodrandres/Personal/Projects/deno-examples/denoExamples/buffer-streams/node/index.js), the `orderDestinyFunc` function receiving objects at the end of the pipeline is merely an async function executing a `console.log()` and does not inherit from `Transform`. Why is it valid inside `pipeline(...)`, and how does it differ from decorators?

### 📖 Architectural Explanation
1. **The 3 Pipeline Roles:** In any data pipeline or stream architecture, there are three distinct roles:
   * **Source (Readable Stream):** Originates the data flow (e.g., `fs.createReadStream`).
   * **Transformers (Transform / Duplex Streams):** Intercept, modify/decorate, and forward data (`this.push()`).
   * **Sink / Destination (Writable Stream or Consumer):** The end of the line. Because it does not forward data to another stream component, **it does not need to be a Transform Stream**.
2. **Flexibility in Modern Node.js:** Modern versions of Node.js allow the **final argument (the destination/sink)** in `stream.pipeline()` to be an **async generator function** or an async consumer (`async (source) => { for await... }`). Node.js internally wraps and consumes it safely as the stream destination.
3. **Projection for the Final Challenge:** Currently, `orderDestinyFunc` acts as a temporary debugging sink for visual inspection. To fulfill the challenge requirements (`C-001` to `C-004`), the final sink will be responsible for taking the decorated objects, converting them back into CSV text format, and writing them to a physical file (`processed_orders.csv`).

### 🌟 Golden Rule / Takeaway
> The final argument of a Node.js `pipeline(...)` is the **Sink (Destination)**. It is not a `Transform` stream because it consumes data rather than re-emitting it. Modern Node.js allows this sink to be an async consumer function (`for await...of`), which is ideal for inspection or final data persistence.
