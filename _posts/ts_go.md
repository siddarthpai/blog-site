---
title: "Typescript in Go"
excerpt: "The typescript team just dropped a banger"
date: "2025-03-11T05:35:07.322Z"

tags: ["go", "typescript"]
---

# Typescript in go-lang

Well, I’ve been using TypeScript for the past year, and one thing people don’t really know about TypeScript is that

_The Typescript Compiler(tsc) is written in Typescript._ Yep, go ahead and have a look (https://github.com/microsoft/TypeScript)

![image.png](https://i.imgur.com/PQtnxVN.png)

This is actually a worse flaw than you’d expect; it meant that projects became slower when they scaled up (out of memory issues), and nothing on a low level (like compilers and system level tools) could be done efficiently, and hence, on March 11, TypeScript’s port to go-lang was released

# Intro to TypeScript :

Typescript is a superset of JavaScript, but it doesn’t have its own runtime. TS code gets transpiled to JS code and is then run on the browser

![image.png](https://i.imgur.com/yCFr0ig.png)

Now, cause the typescript compiler is written in Typescript, there is a lack of inherent support for actual low-level optimization like direct memory access and native multithreading, and that’s why they chose to re-write(actually port it, you’ll see the difference below) it in a new language.

Now, which language and why is something that was thoroughly considered by **Anders Hejlsberg (founder of typescript)**

# Language choices and considerations :

Unlike JS, Go is a compiled language. JS is dynamic and hence is **Just-In-Time compiled**. Go on the other hand, is Static, i.e. it is **Ahead-Of-Time compiled**.
Also, when you write go code, it can be compiled into optimized machine code( amd64,i386, arm,arm64, etc)

C# and Java, etc., are converted to byte code and then run on a VM (like JVM)

Before we dive deep, this sentence is really important. It’ll make all the difference, and we will see why :

**`“The TypeScript team emphasized that they were doing a port of the existing codebase, not a complete rewrite.”`**

The top contenders for the port were **Rust[or zig] and C#**

## Go vs C#

The TypeScript compiler is written in a functional style, **which emphasizes immutability and stateless operations**. While C# or other languages might offer more familiar syntax for some developers, Go's simplicity and structural similarities to JavaScript's functional style made it a better fit for **_porting_** the TypeScript codebase. Go's straightforward design, support for closures, and lightweight goroutines for concurrency aligns realllyyyy well with the functional programming paradigms often used in TypeScript's compiler code, simplifying the translation process, and this was a key reason in choosing it over C#.

C# relies on the .NET runtime, which introduces dependencies that could complicate cross-platform compatibility. **Go generates standalone binaries, making it easier to distribute and run across diverse environments**

Also, Go’s concurrency model >>> C# (yes, it does have aysnc await, but its not as light as goroutines)

**The ability to run Go code in browsers via WebAssembly was another critical factor. This ensures that tools like the TypeScript playground remain fast and accessible across platforms, an essential requirement for developers**

## Go vs Rust

A complete rewrite in Rust would have been a HUGE task, requiring **years** to achieve feature parity with the current compiler and risking incompatibilities that could disrupt the vast ecosystem of projects relying on TypeScript. In contrast, porting to Go allowed the team to adapt the existing codebase more quickly while maintaining compatibility and stability

Go also has better memory management via automatic garbage collection, which isn’t that easy on languages like C++ or Rust. Rust’s stricter and lower-level approach might have led to small incompatibilities or annoying behavior changes that would break existing workflows, making a rewrite risky and less practical.

And yes, we all know that Rust offers superior memory safety and runtime performance, **BUT** Go was seen as “extremely competitive” in terms of performance, and the team wanted to deliver a reliable, usable product faster, rather than chasing higher performance but waiting longer. [Go provides sufficient performance for this use case without the added complexity]

## And that is how they chose Go 🥳

The decision to port in Go allowed the team to maintain both the old JavaScript-based codebase and the new Go-based one concurrently. By **_porting_** to Go, TypeScript actually got 10x faster and better concurrency.

![image.png](https://i.imgur.com/uOueewc.png)

Go was chosen for its efficiency, control over data layout, memory management, and concurrency capabilities, making it suitable for a native compiler that can run on all platforms without rewriting the entire TypeScript codebase.

Also, remember how I said `it meant that projects became slower when they scaled up (out of memory issues), and nothing on a low level (like compilers and system level tools)` ⇒ JavaScript is a **single-threaded language**. The magic of V8(the main JS runtime) is that the thread can perform incredibly well, i.e. when something is blocked on I/O, like when waiting for a DB call or some file; in that case, you can do other things in the process, i.e. the user can type or something. This is the average flow for UI/ web apps.
Now, when you think low level like Compilers, you’d want it to do multiple things at once, and that it cannot do, and that’s why Go’s concurrency and parallelism comes into play.

The porting process involves translating the existing TypeScript codebase into Go, **_ensuring that all semantics are preserved._**

# Plan of Action and what changes?

We are currently on TS v5.8, and the Go **_port_** will not be out until v7

- The **JavaScript-based TypeScript** compiler will continue into the **6.x series**.

Also,

If you’ve used TS for a big project, you would’ve definitely seen suggestions taking time. This change affects not only the compiler but also the entire TypeScript toolset, including the language server, which should lead to faster IntelliSense, quicker type checking, and a smoother experience in editors like VSCode [a lot of IDE’s actually use `tsc` under the hood]

They also mentioned they would be moving to an LSP. The move to the [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) for TypeScript is a super cool step forward. It means that TypeScript will start using a standard way of communicating with development tools like IDEs and editors. This standardization will make it easier for different tools to work with TypeScript, allowing features like auto-complete and "go to definition" to work consistently across different platforms. It's like using a universal plug that fits into any socket, making it simpler for developers to use TypeScript in their favorite tools without needing custom implementations.

“`We expect to be able to preview a native implementation of tsc capable of command-line typechecking by mid-2025, with a feature-complete solution for project builds and a language service by the end of the year.`”

Definitely check out Daniel Rosenwasser's AMA from Hacker News: https://news.ycombinator.com/item?id=43332903

And this Reddit thread: https://www.reddit.com/r/typescript/comments/1j8s467/comment/mh7ni9g/

https://visualstudiomagazine.com/Articles/2025/03/11/Microsoft-Ports-TypeScript-to-Go-for-10x-Native-Performance-Gains.aspx

https://devblogs.microsoft.com/typescript/typescript-native-port/

https://github.com/microsoft/typescript-go
