---
title: "Zanzibar"
excerpt: "No, not the island. Google's Scalable Authentication System xD"
date: "2025-07-12T05:35:07.322Z"

tags: ["Systems", "Auth", "Case Study"]
---

## Prologue — how I got into this (mess)

Basically I had to build an auth sytem at work, this paper was an amazing case study for the same. Started reading it and yapped to my boss during my 1:1. He loves papers as well (I didn't know) and told me to schedule a meet for my team (I thought my sub-team of 4) and I gladly said yes :D

He meant the 20 member bigger team + the Principle Engineer for Auth at my company. I LOST IT but it held me responsible to ensure that I actually read it properly and understand it fully.

Let me tell you, it's one of THE MOST FUCKING TECHNICAL papers i've read. Loved it being a part of System's team and a major in Cloud and Distributed Systems. This paper, though hard to understand is a beautiful learning.

Let's get started then, imma try to explain this without sounding like a nerd.
(looks like i've still not stopped yapping T~T)

---

## Introduction

Sooo, if you’ve ever shared a Google Drive document, watched a private YouTube video, or accessed a file in Google Cloud, you've interacted with one of the most critical systems at Google: **Zanzibar**. This is Google's globally consistent authorization system, designed to answer one fundamental question **billions** of times a second: "Can this user access this digital object?" (THATS CRAZY RIGHT?? 🤯)

This paper goes into depth on how they actually pulled this off and scaled this beauty to be acessible to unimaginable numbers. ITS ACTUALLY MAD

Zanzibars Goals? (remember, its global handling multiple google services at once) :

- **Correctness:** Respect the causal ordering of user actions
- **Flexibility:** Support a rich variety of access control policies
- **Low Latency:** Respond quickly, as checks are often in the critical path of user interactions
- **High Availability:** Remain reliable, as a failure would force clients to deny all access
- **Large Scale:** Protect billions of objects for billions of users across the globe

Now, if you actually like reading paper's, (thanks to my yapping), I actually read the full paper and put down the full annotated paper below. Make sure to read that cause it's really technical and huge. Here I'll cover only some of their crazy out-of-box optimizations and innovative systems that blew my mind xD

## The Zanzibar Data Model :

Zanzibar's genius begins with a deceptively simple data model built on **relation tuples**. A tuple is a permission statement that follows a clear, uniform structure:

`(object) # (relation) @ (user)`

Let's break this down with some examples:

### Example 1: Direct User Permission

![relation tuple](https://i.postimg.cc/qvSmRnYm/Screenshot-2025-08-02-at-9-24-14-PM.png)

- **Tuple:** `presentation:budget_report#viewer@user:bob`
- **Meaning:** "User Bob has `viewer` access to the `budget_report` presentation."
- This is the most basic form, directly assigning a permission to an individual user.

### Example 2: Group Membership

- **Tuple:** `team:marketing#member@user:charlie`
- **Meaning:** "User Charlie is a `member` of the `marketing` team."
- This tuple defines a group and its members. A "group" is just an object with a `member` relation.
- This will basically assign users to a group so that a document like the presentation can be shared with an entire group instead of each individual.

### Example 3: Chained Relations (Indirect Access)

- **Tuple:** `project:alpha#editor@team:marketing#member`
- **Meaning:** "Members of the `marketing` team have `editor` access to `project:alpha`."
- This basically makes use of group memberships like I mentioned above.

Zanzibar allows these powerful, nested permission chains. This is a core part of its flexibility, allowing permissions to refer to other permissions.

## The "New Enemy" Problem:

A major challenge for any distributed authorization system is ensuring **consistency**. Imagine this scenario, known as the "new enemy" problem:

1.  Alice removes Bob's access to a document.
2.  Alice then adds new, sensitive content to that document.
3.  If the authorization system is slow to process the first change, Bob might still be able to see the new content, even though his access was revoked.

Zanzibar solves this with an ingenious protocol that leverages Google's globally distributed database, **Spanner**, and its external consistency guarantees.

Now, before going ahead, you will notice, alot of zanzibar's magic is actually dependent on Spanner and Slicer. Both super cool and you must read about them soon!! (I shall too)

### The "Zookie" Protocol: A Freshness Guarantee

To ensure checks are always performed on data that is up-to-date with a user's actions, Zanzibar uses a token called a **zookie**👻 (sorry, it always reminds me of that emoji 😭).

- When a client is about to modify a digital object, it first gets a zookie from Zanzibar.
- This zookie contains a globally consistent timestamp, provided by Spanner's TrueTime mechanism(magic credits to Spanner!).
- The client stores this zookie with the new object content.
- When a user tries to access this content later, the client sends the zookie with the authorization request.
- Zanzibar then guarantees the check is performed on a database snapshot that is **at least as fresh as the timestamp in the zookie**.

This simple protocol ensures that any permission changes made before the content was updated are reflected in the access check, completely eliminating the "new enemy" problem

Example that I used to explain :

```
Monday 9:00 AM: Alice shares "Salary-Review.xlsx" with Bob
Monday 9:05 AM: Alice adds salary data to document
- Zanzibar: "This content change needs authorization"
- Zanzibar: Performs check at time T=9:05:00.123
- Zanzibar: "Approved. Here's zookie representing T=9:05:00.123"
- Drive: Stores content + zookie together atomically

Monday 9:10 AM: Bob gets fired, Alice revokes his access
- Zanzibar: Assigns timestamp T=9:10:00.456 to permission removal

Monday 9:11 AM: Bob tries to view the document
- Drive: "This content has zookie T=9:05:00.123"
- Drive: "Check Bob's access at time ≥T=9:05:00.123"
- Zanzibar: Uses snapshot at current time T=9:11:00.789 (which is ≥9:05:00.123)
- Zanzibar: Snapshot includes Bob's removal at T=9:10:00.456
- Zanzibar: "Access denied - Bob was removed before current time"
- Drive: Shows "You don't have permission to view this file"
```

## The Architecture: Powering a Global System

Zanzibar's architecture is absolutely sensational. This is what is behind the scale it can handle. Reading about the architecture is actually a paper requirement, but heres an example

![arch](https://i.postimg.cc/3wGtDNQ3/Screenshot-2025-08-02-at-9-25-31-PM.png)

- **ACL Servers:** These are the workhorse servers organized in clusters. They handle all client requests and fan out work for complex checks like nested group memberships(distribution, observe the cross arrows among the ACL Servers).
- **Spanner Database:** The foundation of Zanzibar, providing globally consistent, low-latency storage for relation tuples, changelogs, and namespace configurations.
- **Watch Servers:** A dedicated cluster that streams real-time permission changes to clients, enabling them to maintain secondary indices.
- **Leopard Indexing System:** A specialized, separate system for optimizing checks on large and deeply nested groups. Instead of recursively "pointer chasing" through a hierarchy every time, Leopard pre-computes reachability, turning a complex graph traversal problem into a fast set intersection query. (This will be spoken of next but Zanzibar always, I mean always keeps the data normalized apart from in Leopard.)

## What is Leopard?

Leopard is a specialized indexing system designed to handle the performance bottleneck of `pointer chasing` in deeply nested or widely branching group hierarchies. It supports efficient set computations, which is a form of denormalization used to optimize these complex operations.

**WTF WAS THAT RIGHT???**

This is a better way
Leopard is a super-fast family tree expert for Zanzibar. Instead of chasing every single link in the permission chain, Leopard has a magic map that lets it find the answer almost instantly

**Example: A "Deep Nesting" Problem**
A check for a user in a deeply nested group (e.g., `user -> Junior Dev Group -> Engineering Team -> Full-Time Staff -> Company Employees`) would require multiple sequential database reads, leading to high latency. [the slides make this clear]

**Example: A "Wide Group" Problem**
Checking membership in a very large group (e.g., "Company Employees" with 50,000 individuals and thousands of sub-groups) is also extremely expensive for a traditional system.

**Leopard's Solution: The Set-Based Approach**
Leopard flattens these complex relationships into optimized sets(denormalized data). It uses a three-part system:

1.  **The Data Model:** Leopard represents group membership with two set types:

    1. `GROUP2GROUP(s) -> {e}`: A set that maps the parent group (`s`) to all its descendent groups (`e`).

    2. `MEMBER2GROUP(s) -> {e}`: A set that maps an individual user (`s`) to all the parent groups (`e`) they are a direct member of.

2.  **The Check Expression:** To determine if `user U` is a member of `group G`, Zanzibar uses a single, fast set intersection check:
    `MEMBER2GROUP(U) ∩ GROUP2GROUP(G) ≠ ∅`

    **Explanation:** This transforms a recursive reachability problem into an efficient set operation, which is much faster.

        Example :

        Question: "Is Alice (5001) in Company Employees (1000)?"

        Step 1: Get Alice's direct memberships
        MEMBER2GROUP(5001) = {3000, 4000} // Alice is directly in Team A and Team X

        Step 2: Get all groups that Company contains
         GROUP2GROUP(1000) = {2000, 2001, 3000, 3001, 3002} // Company contains A,B,X,Y,C

        Step 3: Find intersection
        {3000, 4000} ∩ {2000, 2001, 3000, 3001, 3002} = {3000}

        Step 4: Non-empty intersection → Alice IS in Company Employees!

## What are Hot Spots?

**Easiest way to think of it :** Imagine a viral video or a document shared with a huge company. When millions of people try to check permissions for that one thing at the same time, it can overload the database. Handling these 'huge inflows of data' is a critical challenge for Zanzibar to stay fast and reliable.

**The technical way?** "In a normalized data model, a single popular ACL(Access Control List) or group can create a hot spot, overwhelming the underlying database servers with a high volume of concurrent reads. This is a critical production issue that Zanzibar must mitigate to maintain low latency and high availability."

**Zanzibar's Multi-Layered Solutions:**

- **Timestamp Quantization: (This is such a small solve for such a big problem, jaw dropping for real)** To make caching effective, Zanzibar rounds up evaluation timestamps to a coarse granularity (e.g., 10-second boundaries). This allows many requests to share the same cache entry, increasing the cache hit rate and reducing database reads. This relies on Spanner's(again, another system's magic, helping zanzibar out :P ) promise to wait and provide data up to a given (even future) timestamp.
- **Cache Stampede with Lock Tables:** When a hot item's cache is empty, many concurrent requests could hit the database simultaneously. To prevent this "cache stampede" , Zanzibar uses a lock table. The first request gets a "processing ticket" while others wait in a queue. Once the first request populates the cache, all waiting requests get their answer instantly.
- **Hot Object Optimization:** Zanzibar dynamically detects hot objects by tracking outstanding reads. For these objects, it proactively reads and caches _all_ their relation tuples, trading a single large read for the cacheability of thousands of entries.**(This is a perfect example to show that they didnt optimize the system for just single object performance, rather for global performance)**
- **Delayed Eager Cancellation:** In a check evaluation, Zanzibar uses eager cancellation to stop work once an answer is found. This is efficient but can leave a cache key unpopulated. When a check is a hot spot and other requests are waiting via the lock table, Zanzibar delays this cancellation until the results are cached, ensuring that all waiting requests benefit.

Examples for above are in the slides, check them out :D

These were the coolest takeaways from the paper as a part of the case study, but if you're actually curious, read how they implemented Performance Isolation and Tail Latency Mitigation, all of these contribute to the below stats!!

## Zanzibar Stats

(the coolest fucking part!!)

- **In Production:** > 5 years.
- **Clients:** > 1,500 namespaces defined by hundreds of clients.
- **Scale:** > 2 trillion relation tuples occupying nearly 100 terabytes of data.
- **Traffic:** > 10 million client queries per second.
- **Infrastructure:** > 10,000 servers in dozens of clusters worldwide.
- **Performance:**
  - 95th-percentile latency < 10 milliseconds.
  - 99.9th-percentile latency < 100 milliseconds.
- **Availability:** > 99.999% over the past 3 years, translating to less than 2 minutes of global downtime per quarter.

---

## Resources

[Slides](https://www.dropbox.com/scl/fi/n4w77vnx9ia2tgn0mxrtu/Google-Zanzibar.pdf?rlkey=e2yrspzlznejpcxlfgwkhsgrd&st=m9vnmpd4&dl=0)
[Paper](https://www.dropbox.com/scl/fi/sb15cavchbr4sxl2xbwnz/zanzibar_annotated.pdf?rlkey=l4fusue1kplrmie2cd0cgsg6w&st=anccypb2&dl=0)
