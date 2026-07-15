# 📚 Agent Context: Cryptocurrency Order Processing Challenge

**Agent Role (Instruction for your IA):**
> **You are now my Code Reviewer and Consultant.**
> 
> **Your primary role is to evaluate my code submissions against the requirements and the Test Plan defined below. You must NOT write any code for me. Only provide feedback, point out architectural errors, or confirm if the requirements (C-001 to C-004) are met.**

---

## 💎 Practical Exercise: Cryptocurrency Order Processing (Streams, Decorator, and Observer)

**Context:** You are building the backend for a cryptocurrency exchange. You receive a continuous stream of historical orders (`orders.csv`). You need to process these orders using complex rules (Decorators) and, if a critical condition is detected (such as a high-value order), you must notify other systems (Observers) without stopping or coupling the main processing flow.

### 🎯 Core Objectives
* **Stream Handling (I/O):** Process a large CSV file using Streams to ensure memory efficiency.
* **Decorator Pattern:** Chain validation/transformation rules via Transform Streams.
* **Observer Pattern:** Decouple event reactions (Risk alerts/Logging) from the processing logic.
* **Portability:** Implement the solution in Node.js (using `stream.pipeline()`) and Deno (using Web Streams API).

### 📝 Architecture Requirements

#### 1. Data Structure
* **Input:** `orders.csv` containing `id, asset, quantity, price, status`.
* **Events:** `IOrderEvent` data object representing the transaction.

#### 2. Observer System (Already Implemented)
* **`IObserver` & `OrderEventEmitter`**: Manages a list of subscribers and notifies them when an event occurs.
* **`RiskManagerNotifier`**: Observer that reacts if order value > $100k USD.
* **`DatabaseLogger`**: Observer that audits every high-value event.

#### 3. Stream Pipeline & Decorators (Pending Implementation)
* **`OrderProcessorStream`**: The base component (Transform stream) that parses the CSV lines.
* **`PriceNormalizerDecorator`**: A decorator that rounds the `price` field to two decimal places.
* **`HighValueAlertDecorator`**: A dual-role component:
    * **Decorator:** Passes the stream flow.
    * **Subject (EventEmitter):** If `quantity * price > 100,000`, it emits an event to the observers.

### ✅ Test Plan (Success Criteria)

| Test ID | Input Condition | Applied Logic | Expected `processed_orders.csv` | Expected Observer Console Output |
| :--- | :--- | :--- | :--- | :--- |
| **C-001** | Order < $100k | Normalizer → Alert | Price rounded to 2 decimals | **None** |
| **C-002** | Order > $100k | Normalizer → Alert | Price rounded to 2 decimals | Risk + DB Alert messages |
| **C-003** | Decimal prices | Normalizer → Alert | Correctly rounded decimals | **None** |
| **C-004** | Large File | Pipeline | Full processing | Memory usage remains low |