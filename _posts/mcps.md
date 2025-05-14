---
title: "MCP's"
excerpt: "MCP's is the big talk around town, let's have a look at what they are"
date: "2025-05-14T05:35:07.322Z"

tags: ["MCP's", "LLM's"]
---

# What are MCP's

Let’s look at the evolution of LLM’s to understand the need for MCP’s :

# Evolution of LLM’s

## Version 1 : (2022)

This was when LLM’s were composed of **just training data**. Takes in an input and gives an output based on the training data

![V1](https://i.ibb.co/pNdSj6j/1.png)

This is basically why they’d fail at tasks like _‘What is the current data/ What is the weather in Bangalore’_ etc.

Their knowledge is cut off at a specific date and time based on the last date in the training data

## Version 2 :

This is where it gets fun, the LLM’s started analyzing the question and when it requires real time data like current weather or current date, it would actually crawl the web using certain tools like (duckduckgo etc), fetch the data and return back data to the user

_This is how perplexity serves as an AI search engine_

![V2](https://i.ibb.co/wNjYQxJh/2.png)

## What’s the issue ?

Each tool will require a wrapper to connect to the tool and that is essentially gonna be a pain when you need to integrate a ton of tools across a ton of LLM’s.

**Maintaining and handling this, big pain! Imagine a single tool updating it’s API, you’ll have to update each wrapper for each LLM**

![V2 problem](https://i.ibb.co/Pv9vYfXn/3.png)

If we had a single layer that translates all of the mess for us and helps us standardise

This is basically what MCP’s are

## Version 3 :

MCP’s were developed by **Anthropic**, the creator of Claude.

This is how they defined MCP :

_MCP is an open protocol that standardizes how applications provide context to LLMs. Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools._

![V3](https://i.ibb.co/7JjBjMTW/4.png)

1. **Model** - Claude, Deepseek, Gemini
2. **Context** - This is basically everything relevant to us :
   1. **Tools** ⇒ What the model can do
   2. **Resource** ⇒ What the model can do and what files it can access etc
3. **Protocol** - Connector (just like type-c)

# MCP Architecture

An application can be something like Slack, Confluence, Google Drive etc

Each application, will have its own set of rules and its own structure for the API

Now each application, will have its own MCP server

![Architecture](https://i.ibb.co/vxqmjGQh/5.png)

MCP Servers are basically lightweight programs that will each expose specific capabilities through the standardized MCP.

- Capabilities vary from application to application.
  While slack allows send, read, edit messages; on Github it will be create, delete, update a branch and hence an individual server for each applicaiton

**The MCP client which is technically the interface will interact with these servers using the MCP Protocol [Can talk to multiple servers]**

**This basically eliminates the issue from v2**

# Average workflow of an LLM using MCP

1. The user asks the question to the MCP Client
2. The MCP Client then proceeds to ask the MCP servers what are the tools and resources they have access too along with the context they have
3. This information is then relayed to the LLM
4. The LLM then analyzes this and chooses what to use
5. The required data and tools are then fetched to do the task
6. Output is provided

![Average Workflow](https://i.ibb.co/nMzCwgqT/6.png)
