---
title: "sqlite-vec"
excerpt: "Notes from a cool lecture I attended from Bangalore System Meetups"
date: "2025-02-05T05:35:07.322Z"

tags: ["Database", "Vector Search"]
---

Vector DB's are something I'll be using soon and while going through them I was reminded of a lecture given by Alex Garcia at Bengaluru System Meetup and it was truly an amazing talk. Before we get started lets have a breif intro with what Vector Databases are 😋

## Vector Databases :

As the name suggests...\
They store and query _a lot_ of vectors.

But first, What is a Vector? 🤔

•Vector : A vector is basically a list of numbers\
\
•Embeddings : Embeddings are basically a representation of text, images, audio etc in the form of a vector\
\
Nowww, these embeddings actually let you perform calculations on these texts.
How?\
Consider these text exampeles

```
Book A: "A beginner's guide to baking bread and pastries"
Book B: "Complete cookbook for making cakes and cookies"
Book C: "Advanced quantum physics and string theory"
```

These get converted to embeddings that looks something like this :

```
Book A: [0.8, 0.9, 0.7, 0.1, ...]  # high values for cooking/baking related dimensions
Book B: [0.7, 0.8, 0.6, 0.2, ...]  # similar pattern because it's also about baking
Book C: [0.1, 0.1, 0.2, 0.9, ...]  # completely different pattern (science related)
```

Now using these vectors, we can perform multiple operations like finding related documents, finding groups/clusters or even answering questions :))\
\
**COOL RIGHT?????**

### Now, how do they actually store these ?

Consider **A single** 1024 dimension vector
The size required for this 1024 dimension vector is :\
`1024 * sizeof(float) = 1024 * 4 = 4096 bytes ~ 4KB`

Now, if we were to store 1 million of them, that'd be about 4.1 GB's!

While storing 1 million 1024-dimensional vectors takes ~4.1GB, a traditional full-text search index for similar searchable content would require dozens of megabytes just to index text data.\
**This realllyyy shows how vector storage can be more space-efficient for certain types of data retrieval**

### And, what about the querying part??

Something he covered the most during the lecture was\
_KNN Queries_

## What are KNN Queries ?

An example that made me understand this was :
Let's say we have a restaurant recommendation system:

Now, if we were using a vector DB, the original restaurant descriptions of the foods like\
`Quick burger joint with drive-through`
are converted into embeddings like:\
`restaurant1_vector = [0.2, 0.8, 0.5, ...]  # 1024 dimensions`

and now, when the user searches for something like
**"Fast food restaurants for burgers"**\
The query is:\
1.First converted into a vector\
2.KNN then finds the closest vectors by distance using something like **cosine similarity**\
3.and returns the closest, second closest values and so on ...

![Vector Search Process Flow](https://i.imgur.com/QzxTlaZ.png)

## What is sqlite-vec?

Now that we've understood all of this.\
sqlite-vec is a sqlite extension for **vector search**✨

•It works inside any custom functions and virtual tables\
•It also works inside an sqlite instance.

**💡Note :** It actually stores your vectors inside your sqlite database ! so all your backup/restore and streaming replication services actually work with sqlite-vec because all the vectors they produce are eventually stored in the DB.\

_btw, sqlite-vec doesn't generate embeddings for you but there are multiple services out there that'll do it for you. feel free to try them_

## Why sqlite-vec?

•**PURE** SQL API\
•runs everywhere\
•has different compression techniques to reduce the size of a vector index [tradeoff of quality for speed and size ].\
\
1.One example of this is **Binary Quantization :** where if the value is >0.0 store as 1 else 0. This basically stores a 32-bit floating vector as a bit vector[THATS A 32X SIZE REDUCTION!!! 🥳🥳🥳🥳].\
It uses hamming distance instead of cosine distance btw\
\
2.Another one is **Scalar Quantization :** where you basically scale a 32-bit floating point into a int8, int16, float16, etc but for now sqlite-vec supports only int8 so thats a (4x SIZE REDUCTION!! 🥳🥳)\
\
3.[<u>Matryoshka Embeddings</u>](https://arxiv.org/pdf/2205.13147)

•has [<u>Hybrid Search</u>](https://alexgarcia.xyz/blog/2024/sqlite-vec-hybrid-search/index.html) [Vector Search + Full-Text search] [read this blog plspls, really cool]\
![Hybrid Search Architecture](https://i.imgur.com/o37M8Kh.png)
•has [<u>Metadata Filtering</u>](https://alexgarcia.xyz/blog/2024/sqlite-vec-metadata-release/index.html)

## What did I learn from this ?

1.How cool sqlite actually is => I'm gonna give sqllite-vec a shot and you can too btw [<u>here</u>](https://github.com/asg017/sqlite-vec)\
2.He spoke about how cool sqlite extensions are and what they can and can't do. He listed a few cool extensions as well. Imma try them out\
•sqlite-http\
•sqlite-html\
•sqlite-lines\
•sqlite-path\
•sqlite-url\
3.Try out vector dbs and benchmark them and try building something on these

## References

1.[<u>The talk</u>](https://www.youtube.com/watch?v=GpTOsTxuLLA)\
2.[<u>What are embeddings</u>](https://vickiboykis.com/what_are_embeddings/)
