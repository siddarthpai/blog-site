---
title: "Introduction to Snowflake "
excerpt: "Snowflake was the first DB I worked on. Here's a few cool things I learnt about it :))"
date: "2025-01-28T05:35:07.322Z"
tags: ["Databases"]
---

WEEEEEE

Snowflake’s gonna be the first database I work with and this blog will cover everything I understood and learnt from what snowflake is and where it's used.

Well, I could directly start of with the features of Snowflake but what fascinated me more is how they came up with this particular architecture of Snowflake.

Keep this in mind when you go ahead xD\
\
_"By seeking and blundering we learn." ~Johann Wolfgang von Goethe_

## Historical Evolution of Databases :

**1.Shared Storage Architecture (Example: Oracle):**

- **What is this Architecture 🤔?**\
  \
   •Multiple compute nodes share the same storage system\
   •All processors can access all disks\
   •Centralized storage approach\
   \
   **Whats the issue 😞?**\
   \
   •Concurrency : When mutliple users/processes try to access the same data, it creates a bottleneck at the storage level and hence storage becomes the single point of contention.\
   •This will lead to performance degradation once the number of users increases.

**2.Share Nothing Architecture (Examples: IBM DB2, Vertica):**

- **What is this Architecture 🤔?**\
   \
   •Each node has its own dedicated storage\
   •Data is partitioned across nodes\
   •Each processor has exclusive access to its data\
   \
  **What’s the issue 😞?** \
   \
   •It ends up becoming difficult to update data across partitions and there is complex data redistribution during scaling.\
   •It becomes hard to maintain data consistency and complex rebalancing when adding/removing nodes.

**3.NoSQL Architecture (Examples: Cassandra, MongoDB):**

- **What is the architecture 🤔?**\
  \
   •Designed for specific use cases\
   •Sacrifices ACID properties for scalability\
   •Different data models (document, column-family, etc.)\
   \
  **What’s the issue 😞?**\
  \
  •Doesn’t support complex queries and often requires specialised skills

ANDDD NOWWW, Snowflake’s architecture combines the benefits of all three while addressing their limitations ✨

**How?**\
Snowflake's hybrid approach provides a solution by combining the strengths of :

1.centralized storage for simplicity[liked shared storage]\
2.independent compute for concurrency[like share nothing]\
3.multi-format support for flexibility, and [like nosql]\
4.multi-cluster architecture for scalability.

## Lets look at Snowflakes architecture now 😋 :

Snowflake has a **three layer architecture** :\
\
1.**The Cloud Services Layer [aka the global services layer or "The Brain"🧠]**

•All interactions with data in a Snowflake instance begin in the cloud services layer\
•It manages data security, functions for handling infra and metadata\
•It also has services that coordinate activities like auth, encryption etc\
\
**2.The Compute Layer [Virtual Warehouse]**

Wellll, first lets look at\
\
_What is a Virtual Warehouse?_

•It is a **dynamic cluster** of compute resources consisting of CPU memory and temporary storage.\
•Guess what??? It has **auto suspend and auto resume** [and can be resized at any time, even while running 😳] {I personally found that really cool, sorry}\
•Warehouses are required for queries, as well as all the DML operations, including loading data into tables.\
•Rather than making one warehouse bigger (vertical), Snowflake adds more warehouses (horizontal) to handle concurrent users, which is more efficient and flexible.\
\
Well if it isn't obvious already,\
**Snowflake’s unique architecture allows for separation of storage and compute.**\
Cool right? Anyhoo, lets go ahead to the third part

3.**The Storage Layer [Centralized(Hybrid Columnar) Database]**

•Holds all data, including structured and semi-structured data.\
•Optimally reorganized into a compressed, columnar format\
•It’s always compressed and encrypted [AES-256 encryption]

## Couple of technical DB terms I learnt along the way

**1. Zero-copy cloning :** allows user to snapshot a snowflake DB,schema or table along with its associated data.

Best part?\
There is no additional storage charge until changes are made to the cloned object, because zero-copy data cloning is a **metadata-only operation**.

**2. Time Travel** allows you to restore a previous version of a database, table, or schema.\
\
**3. Fail-safe** data and the data retained for data recovery using Time Travel are also considered in the calculation of data storage costs.

## Caching in Snowflake

Snowflake also uses the cached result set instead of re-executing the query.\
Snowflake provides 3 types of caching :

**1. Query Result Cache** [24 hrs]\
**2. Metadata Cache** - Holds metadata like count, min, max, NULLS, size, file references, versions\
**3. Virtual Warehouse Local Disk Cache** - used to process the query Uses SSD storage

## What does Snowflake support ?

**1. Data Lake :** A data lake is a centralized repository that allows you to store all your structured and unstructured data at any scale.\
You can store your data as-is, without having to first structure the data, and run different types of analytics—from dashboards and visualizations to big data processing, real-time analytics, and machine learning to guide better decisions.\
\
**Key features:**\
\
•External tables for querying data directly from cloud storage\
•Schema evolution to handle changing data structures\
•Support for semi-structured data using VARIANT data type\
•Integration with data lake tools and formats

**Use cases:**\
\
•Raw data storage before processing\
•Historical data archival\
•Multi-format data analysis\
•Big data processing\

**2.Data Collaboration :** Enables secure data sharing and exchange between organizations

- Four main approaches:\
   \
   **1.Direct sharing:** Account-to-account data sharing\
   **2.Snowflake Marketplace:** Public data exchange platform\
   **3.Private Data Exchange:** For select group sharing\
   **4.Data Clean Rooms:** Privacy-protected data collaboration\
   \
  **Key features:**\
  \
  1.Zero-copy data sharing (no data movement needed)\
  2.Granular access controls\
  3.Cross-region and cross-cloud sharing\
  4.Real-time data updates

**3.Data Analytics Workloads :** Supports complex analytics and business intelligence operations

**4.Data Applications :** Enables building data-intensive applications directly on Snowflake

**5. Data Science :** Supports machine learning and advanced analytics\
\
**Key features:**\
\
1.Integration with Python, R, and other data science tools\
2.Large-scale data processing

**Capabilities:**

1.Machine learning pipelines\
2.Statistical analysis\
3.Predictive modeling\
4.Deep learning support

**6.Cybersecurity :** Enables security analytics and threat detection\
\
**Key features:**\
\
1.Real-time security monitoring\
2.Threat detection and analysis\
3.Security data integration\
4.Compliance reporting

**7.Unistore workloads :** Combines transactional and analytical processing\
\
**Key features:**\
\
1.Hybrid tables for OLTP and OLAP\
2.Transactional consistency\
3.High performance for mixed workloads\
4.Real-time data access

**Capabilities:**\
\
1.Transaction processing\
2.Real-time analytics\
3.Hybrid data operations\
4.Consistent data views\
\
Well this is the end. Another blog on actually using snowflake and it's advanced tools\
[And oooo, i think dynamoDB is next 🎉]

## References :

1. [http://aws.amazon.com/what-is/data-lake/](http://aws.amazon.com/what-is/data-lake/)
2. [https://docs.snowflake.com/en/user-guide/warehouses](https://docs.snowflake.com/en/user-guide/warehouses)

## 🎧 Music I listened to when composing this article :
