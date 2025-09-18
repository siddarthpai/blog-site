---
title: "Why do LLM's Hallucinate"
excerpt: "OpenAI just dropped a crazy paper on why LLM's hallucinate !"
date: "2025-09-15T05:35:07.322Z"

tags: ["LLM"]
---

Was sent this paper, seemed absolutely cool esp considering the fact that it was released relatively recently(even after crazy models like Claude Opus 4.1 and GPT-5).

here's the science(math actually) behind why LLM's actually hallucinate.

---

If you're new to this, here's a couple of definitions that can actually help you figure out what actually is happening here.

---

## What is a hallucination ?

It's basically when AI language models produce false but belivable information (don't always trust what they generate, they make it seem real, but its not xD)

A simple example to understand this is something we do on a daily basis actually.

Say you're writting an exam with no negative marking, any student will guess the answer to a hard question rather than just skipping it, this is something what LLM's also tend to do.

Notice how GPT never says it doesn't know,
it will either agree with you (even if you're wrong) [fun fact: I was reading how GPT-5 has learnt to disagree with you if you're wrong, reduced from ~14.5% to ~9%(been a while since I read about this stat)] or will just give you random nonsense to answer you.

As a developer atleast I always factcheck what it outputs, this can be reduced if the LLM can just say it doesnt know. **Hallucination can be a pain fr :/**

---

## Why do hallucinations happen ?

The paper talks about 2 main reasons :

1. **During Training (Learning Phase)**

When there isn't enough data during the training phase, then there is a high possiblity when the encountered with a similar situation, the AI will inevitably make errors.

2. **During Testing (Evaluation Phase)**

Most AI tests are set up like school exams where guessing gives you a chance to get points, but saying "I don't know" always gives you zero points.

The LLM finds that it's always better to guess than to say that it doesnt know.

Hence, they propose we change the testing strat, we prompt the AI with something like

`Only answer if you're more than 75% confident. Wrong answers lose points, 'I don't know' gets zero points, correct answers get full points.`

_JEE kinda -ve marking trauma T~T_

In simple words,
AI lies confidently because it's trained to be a good test-taker, not a trustworthy assistant.

and to fix it, we :
change the tests to reward honesty and appropriate uncertainty, not just confident guessing.

---

## Examples of Hallucinations from the paper :

`What is Adam Tauman Kalai's birthday? If you know, just respond with DD-MM.`

notice the `If you know`

but the AI from the test still gave 3 responses :

`"03-07", "15-06", and "01-01"`and guessed even though the correct date is supposedly in `Autumn`

This is a famous example, the classic strawberry issue in GPT models
`How many R's are in STRAWBERRY?`

This is a simple counting task that AI should be able to handle, yet multiple advanced models get it wrong.

---

## Computational Learning Theory :

The researchers use computational learning theory : a branch of mathematics that studies how machines learn.

This is the math they used :

```
X = All plausible-sounding text (things that could reasonably be said)

V = Valid/correct statements

E = Error statements (hallucinations - wrong but plausible-sounding)

So: X = V + E (all plausible text = correct text + wrong but believable text)
```

and they found something absolutely crazy,
hear me out

Even if AI training data were completly perfect (no errors at all!), the AI model can still tend to hallucinate.

Why ?

Because the mathematical objectives (goals) that AI systems optimize for during training naturally lead to generating some errors.

It's not just a data quality problem - it's baked into how these systems learn xD

they talk about 2 types of training :

1. **Pretraining** : AI learning from massive amount of text data
2. **Post-training** : AI gets fine-tuned to be more helpful and safe

they also talk about 2 types of Hallucinations :

Intrinsic and Extrinsic Hallucination

| Feature             | Intrinsic Hallucinations                                                                                                                      | Extrinsic Hallucinations                                                                                                                                         |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Definition**      | Contradict information explicitly provided in the user's prompt/question.                                                                     | Contradict external reality, factual knowledge, or the AI's training data.                                                                                       |
| **Source of Error** | Misinterpretation or disregard of the immediate input from the user.                                                                          | Generation of information that is factually incorrect or inconsistent with the real world.                                                                       |
| **Example**         | User asks, "How many 'a's are in the word 'banana'?" AI responds, "There are three 'a's." (Contradicts the provided word's actual 'a' count). | User asks, "When is Isaac Newton's birthday?" AI responds, "Isaac Newton was born on June 1, 1642." (Contradicts Newton's actual birthday of December 25, 1642). |

## End Result from all the above theories ?

They basically figured out :

1. AI hallucinations aren't bugs to be fixed - they're fundamental features of how these systems work mathematically.
2. The researchers are saying hallucinations are similarly inevitable given the mathematical foundations of how AI learns and gets evaluated.

going forward, we'll look at more math that shows how current evaluation methods actually make the problem worse by rewarding confident guessing over honest uncertainty.

---

## Pretraining :

As seen before, most people think AI hallucinations happen because:

1. The training data has errors in it
2. The AI learned from bad sources
3. We need better quality control

But this paper proves that's not the main problem. **The issue is deeper and more fundamental**.

### The Mathematical Connection: Binary Classification

They created a thought experiment:

- Imagine you have to answer: "Is this a valid language model output?"
- You get examples labeled as valid or error
- You try to learn the pattern

This is more or less as we know it -> **Binary Classification**

but, the key insight here is Generating text is **harder** than just judging if text is valid. Think of it like this :

deciding what to say is much harder than actually judging if the response is valid or not. This is mainly because when you decide what to say, at each point you have to make sure to acknowledge what you're saying is actually valid.

They established the formula:

```
(generative error rate) ≳ 2 × (classification error rate)

```

not a big fan of maths, so here's what it translate's to in simple english :

_If you can't perfectly distinguish good responses from bad ones, then you'll definitely generate bad responses. And the generation errors will be at least twice as bad as your classification errors._

This is shown by the figure in the paper.

They show 3 classification fails and as seen above,
`classification fails => generation fails` :

Spelling's is an example of a **good** classifier. it's easy to tell "Greetings" from "Greatings" etc.

Letter counting is an example of a **poor** classifier. Hard to count letters correctly and hence the model is performing poorly

Random facts like birthdays is basically **impossible to classify** as such. There is literally no pattern to learn 👎🏻

![alt text](https://i.postimg.cc/d3RsTqMB/Screenshot-2025-09-18-at-11-45-51-PM.png)

### What does this mean ?

Remember that birthday example, let's consider 20% of birthday facts appear only once in training data. Then **mathematically** the model will hallucinate for **atleast** 20% of the birthday questions.

### What if we put "I don't know" in the dataset ?

The AI still can't perfectly distinguish between:

- Valid facts
- Plausible-sounding lies
- Appropriate times to say "I don't know"

### The Fundamental Problem and Counterintuitive Truth

This connects to decades of research in machine learning showing that classification errors are inevitable when:

- **Poor models:** The AI architecture isn't good enough for the task
- **No learnable patterns:** Some facts (like birthdays) are essentially random
- **Insufficient data:** Not enough examples to learn reliable patterns

Hallucinations aren't a bug to be fixed, they're a **mathematical consequence of how these systems work**. Even with:

- Perfect training data
- Unlimited computing power
- The best possible algorithms

You'll still get hallucinations because the underlying mathematical problem (distinguishing valid from invalid text) is inherently difficult.

---

## Second major cause of AI hallucinations: What happens during post-training?

Well now that we saw, hallucinations are inevitable in pre-training, what about eliminating it in post training ?

Consider this example :

When students face difficult exam questions they're uncertain about, they:

- guess on multiple-choice questions rather than leave blanks (guesses never work for me 😔)
- bluff on essay questions by writing plausible-sounding answers they're not confident about
- give specific, confident-sounding responses like "September 30" instead of cautious ones like "sometime in autumn"

Why Students Do This?
Because most exams use binary 0-1 scoring(Similar to how AI's are tested):

- Correct answer = 1 point
- Wrong answer = 0 points
- Blank/IDK = 0 points

Realize a trend here ? guessing when uncertain maximizes expected score even if you're probably wrong.

The authors argue that the issue isn't lack of good hallucination evaluations, it's that most primary evaluations actively reward hallucinating.

AI models are constantly in a "test taking" mode and always try to maximize their scores in a test.

Consider :

**Model A:** Honest model that correctly signals uncertainty and never hallucinates

**Model B:** Identical to A, except it never says "I don't know" and always makes confident guesses

Result: Model B will **consistently outperform** Model A on most current benchmarks, even though Model A is more trustworthy.

Current evaluation creates a false **right-wrong dichotomy** that:

- Awards no credit for expressing uncertainty
- Awards no credit for omitting dubious details
- Awards no credit for requesting clarification
- Maximally penalizes appropriate IDK responses
- Makes overconfident guessing the optimal strategy

Even if you create perfect hallucination-detection benchmarks:

1. They're typically a small fraction of all evaluations
2. The numerous primary evaluations still reward confident guessing
3. The honest model gets drowned out by poor performance on mainstream benchmarks

and guess what they also said 🤣, it's not just a technical problem, its a Socio-Technical problem.

### Why is it a socio-technical problem

1. **Technical**: How evaluation metrics work.
2. **Social**: Getting the AI community to adopt better benchmarks.
3. **Institutional**: Changing influential leaderboards and ranking systems.

everyone's in the race to stand up high in the leaderboards that they don't bother sacrificing reliability for higher benchmarks 😭.

The problem isn't that AI is bad at being truthful - it's that we've systematically trained it to prioritize confident guessing over honest uncertainty through our evaluation choices.

---

ok break time, let's listen to : https://open.spotify.com/track/0w4ZwKHHEkXtvHMNUjFPdB?si=40f4ae9f4b3e4c3c

ok, lets continue in the next one with all the math. don't want to make this too large.
