# 🏦 TypeScript Decorator Pattern: Transaction Processor

## 📝 Overview

This repository contains a practical exercise implementing the **Decorator Design Pattern** in TypeScript, using Deno as the runtime environment. The scenario models a financial service, specifically a **Transaction Processing System**, where various cross-cutting concerns (logging, security, and data enrichment) must be added dynamically without modifying the core processing logic.

This implementation demonstrates a key principle of object-oriented design: **Open for Extension, Closed for Modification (OCP)**.

## 🛠️ Design & Architecture: The Decorator Pattern

The core problem was to enhance a `BasicPaymentProcessor` with features like auditing, fraud checks, and currency notation without touching its source code. The Decorator Pattern achieves this by structuring the components as follows:

### 1. Core Interfaces

* **`ITransactionProcessor`**: The base interface (or Abstract Component) defining the common `process(transaction)` method. All concrete processors and decorators must adhere to this contract.

### 2. Concrete Component

* **`BasicPaymentProcessor`**: The simple implementation (Concrete Component) that handles the core business logic: checking if the transaction amount is positive.

### 3. Abstract Decorator

* **`TransactionProcessorDecorator`**: An abstract class (or base Decorator) that implements `ITransactionProcessor` and holds a reference to another `ITransactionProcessor` (the component being wrapped). This ensures all decorators can wrap any component that implements the base interface.

### 4. Concrete Decorators

Three distinct decorators were created, each adding a single responsibility:

| Decorator Class | Responsibility | Execution Timing | Purpose |
| :--- | :--- | :--- | :--- |
| `AuditDecorator` | Logging start and end of processing. | Before and After | Traceability and Monitoring. |
| `FraudCheckDecorator` | Halting processing if amount > 1000. | Before | Security and Early Exit. |
| `CurrencyConversionDecorator` | Appending conversion notes to the result. | After | Data Enrichment and Formatting. |

