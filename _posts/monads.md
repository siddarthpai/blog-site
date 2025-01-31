---
title: "MONAD"
excerpt: "Heard of a new design pattern we didn't hear off in college. Had to dive deep :)"
date: "2025-01-28T05:35:07.322Z"
tags: ["funcitonal programming", "design pattern"]
---

## MONADS

firstly, holy shit this doesn't seem like something that's easy to grasp.
I had to get into a functional programming language to briefly understand what was going on.
But hopefully, I can explain this to y'all

### maps vs flatmaps[an intro]

lets consider *```arr.map((x) => x*2);```\* \
Now if the input is [1,2,3] the output will come out as [2,4,6]

This is because the signature of a map function is\
Array<T> -> (T->U) -> Array<U>\
**which basically means:**\
\
Array<T> => Takes in an array\
(T->U) => Function applied\
Array<U> => arr.map((x) => x\*2); returns an array

Now, if we wrote\
*```arr.flatmap((x) => x*2);```\*\
Now if the input is [1,2,3] the output will come out as [1,2,2,4,3,6]

Why?
This is cause the signature for a flatmap function is as follows\
Array<T> -> (T->Array<U>) -> Array<U>\
\
which basically means it will take each element in the array, apply the function on it and then return an array with [element,output of function] and then flat it out onto a single list.

- flatmaps are more powerful than maps because what a map can do can be done by a flatmap but not vice verse
- *[arr.flatmap((x) => [x*2])]

### so, what exactly is a monad?

A monad is a design pattern that allows us to chain operations while handling complexity like:

**• Null values**\
**• Side effects**\
**• Asynchronous operations**\
**• Error handling**

Think of it as a wrapper around a value that provides a consistent way to:

• Wrap a value (constructor)\
• Transform that value (map)\
• Chain operations (flatMap)

ever heard of javascripts promises? they're basically monads[not technically, but they're almost there!]\
if you're curious why,[_this_](https://rybicki.io/blog/2023/12/23/promises-arent-monads.html) may actually help you

### Promise Monad :

It helps us handle asynchronous operations elegantly
how you ask?

When we don't use a promise monad, it will look something like this :

```
fetchUser(id, (user) => {
  fetchProfile(user.profileId, (profile) => {
    fetchPosts(profile.id, (posts) => {
      // Callback hell!
    });
  });
});
```

Butttt, with a promise monad, we can fix that callback hell :)

```
fetchUser(id)
  .then(user => fetchProfile(user.profileId))
  .then(profile => fetchPosts(profile.id))
  .catch(error => console.error(error));
```

There are 3 monad laws, but technically you wouldn't need them to understand this design pattern, so you can just read up on what the laws are from [_here_](https://courses.cs.cornell.edu/cs3110/2021sp/textbook/adv/monad_laws.html)

### Why Use Monads?

**• Cleaner Code:** They help avoid nested if-statements and callback hell\
**• Better Error Handling:** They provide a structured way to handle errors and edge cases\
**• Composition:** They make it easier to combine and chain operations\
**• Side Effect Management:** They help contain and manage side effects in a predictable way

### Common Monads in Practice

1.**Maybe/Optional:** Handles null checks

This is how code would look if you didn't use a maybe monad

```
const user = getUser(id);  // might be null
if (user) {
  const address = user.address;  // might be null
  if (address) {
    const street = address.street;
    // ... more nested checks
  }
}
```

But with the maybe monad, it'd look like this :

```
Maybe.of(getUser(id))
.map(user => user.address)
.map(address => address.street)
.getOrElse("No street found");
```

2.**Either:** Handles error cases with success/failure paths\
3.**Promise:** As seen above, it helps manage asynchronous operations\
4.**List:** Handles collections and list operations\
5.**IO:** Manages input/output operations

### Final Thoughts

It'd be funny to say you prolly worked on monads without even knowing in Java/Kotlin in the form of **Optional** and in JS in the form of **Promises**
but, they're really just a pattern for handling complexity in a structured way.
This is a new pattern I came across and phew it wasn't as easy as the other patterns (there's even a joke that once you understand monads, you lose the ability to explain them xD), but hopefully gradually I'll get to see see how powerful they can be in making my code more maintainable and robust.
