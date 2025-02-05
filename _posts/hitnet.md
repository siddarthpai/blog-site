---
title: "HITNet"
excerpt: "I read the HITNet paper and this is what I learnt"
date: "2025-02-04T05:35:07.322Z"

tags: ["CV", "Machine Learning", "NeuralNetworks"]
---

Well, tbh I was bored and a friend suggested reading this paper. Supposedly one of the most intuitive papers he's read so I'm going to give this a shot.
By the way, something super cool at the end so stick around :))

Okay, lets start

## What is HITNet?

Formally, according to the paper,

_HITNet represents a paradigm shift in neural network architecture for stereo vision processing, employing a sophisticated multi-resolution computational framework that abstains from traditional volumetric cost analysis in favor of an innovative differentiable 2D geometric propagation methodology. The system's architectural foundation incorporates advanced slanted plane hypothesis generation and geometric warping mechanisms, facilitating superior disparity estimation through hierarchical information propagation across multiple resolution scales. This revolutionary approach has demonstrated unprecedented performance metrics, achieving superior rankings on multiple benchmark datasets including ETH3D, Middlebury-v3, and KITTI, while maintaining exceptional computational efficiency compared to contemporary methodologies._\
[yeah nah, skip that xD]\
WELLLLL, that flew over my head on my first read as well, lemme simplify for you

Basically, HITNet is a smarter and faster way to get computers to understand depth in an image.
Instead of analyzing every possible depth value, it makes smarter guesses about depths and gradually improves them. This obviously saves compute power and makes it much faster and smarter than the conventional methods. It's currently one of the best systems for figuring out depth from pairs of images.**[pretty cool right??]**

## What really pushed them to do this ?

Recent research on depth from stereo matching is largely focused on accurate results but they end up being computationally expensive.\
Large CNN's can take upto a few seconds to process and even though that seems fine, the latency is not acceptable in cases like self driving cars\
**We require processing to happen in a few milliseconds instead!**

A common pattern in end-to-end learning based approaches to computational stereo is **utilizing a CNN** which is largely unaware of the geometric properties of the stereo matching problem.
_In fact, initial end-to-end networks were based on a generic U-Net architecture_

Approaches Tried :\
\
1.Explicit matching cost volumes encoding the cost of assigning a disparity to a pixel, in conjunction with 3D convolutions => **Provides notable improvement in terms of accuracy but significant increase in computation**\
\
2.Downsampled cost volume => **Provides a reasonable tradeoff between speed and accuracy but it comes at the price of sacrificing accuracy which is not feasible :(**\
\
3.A method to increase the efficiency of disparity estimation for active stereo while maintaining high accuracy. The intuition behind these methods are :\
i)use of **compact/sparse features** for fast high resolution matching cost computation\
ii)very **efficient disparity optimization schemes** that do not rely on the full cost volume\
iii)**iterative image warps using slanted planes** to achieve high accuracy by minimizing image dissimilarity\
\
Buttttt, why won't this work?\
These approaches achieve **very fast and accurate results for active stereo** but they do not directly generalize to **passive stereo** due to the _lack of using a powerful machine learning system_

And that's where HITNet steps in => A framework for neural network based depth estimation which overcomes the computational disadvantages of operating on a 3D volume by integrating _image warping, spatial propagation and a fast high resolution initialization step_ into the network architecture, while keeping the flexibility of a learned representation by allowing features to flow through the network.

# The main idea of the approach

1.They break each image into small tiles (like a mosaic)\
2.Treating each tile as if it were a small flat surface\
3.Giving each tile a special "label" that helps identify its characteristics

**The clever part here?**\
It starts with a rough, low-resolution version (like a blurry image) and then it starts gradually sharpening the image while keeping track of its depth.\
At each step, it keeps track of :

• What it figured from the blurry image?\
• What can it see more in detail from the current version?\
\
To put it all together,\
HITNet processes images by breaking them into planar patches - essentially flat surfaces with unique identifying features attached to them. The system uses a clever combination of high-resolution initial estimates and ongoing **spatial propagation through a convolutional neural network**, which continuously refines both the patch positions and their features. By looking at a narrow band of possible depth values (±1 disparity) around each planar patch and using image warping to minimize differences between views, the network iteratively improves its depth predictions.\
\
_The magic ✨ happens in its multi-resolution approach:_ starting with a low-resolution version and progressively working up to higher detail, while constantly checking against initial matches to ensure it doesn't miss fine details like thin structures that might be invisible at lower resolutions. This hierarchical upsampling approach, combined with the initialization module's matching data, allows HITNet to effectively handle both large featureless areas and maintain precise detail in complex scenes.

## Understanding HITNet's Architecture

### The Pipeline

The process begins with two input images - **left and right stereo pairs**.\
These images first pass through a Feature Extractor as a **U-Net like architecture i.e. an encoder-decoder with skip connections, with learnable parameters** that generates multi-scale feature maps {e₀...eₘ}, where e₀ represents features at the original resolution, and eₘ represents features at the most downsampled resolution _(2ᵐ×2ᵐ smaller)_.

At the core of HITNet is the concept of a tile hypothesis `h`, represented mathematically as:

```
h = [d, dx, dy, p]
```

where `d` represents disparity, `dx` and `dy` represent disparity gradients, and `p` is a learned feature descriptor.

## Initialization Stage

During initialization, the system computes matching costs between left and right images using the L1 distance between feature vectors:

```
ρ(l,x,y,d) = ||ẽᴸₗ,ₓ,ᵧ - ẽᴿₗ,₄ₓ₋ᵤ,ᵧ||₁
```

The initial disparity for each location is then determined by:

```
d_init(l,x,y) = argmin_{d∈[0,D]} ρ(l,x,y,d)
```

## Propagation Stage

The propagation stage refines these initial estimates using a planar warping function:

```
d'_{i,j} = d + (i-1.5)dx + (j-1.5)dy
```

The network then updates hypotheses through a CNN-based update mechanism:

```
(Δh¹ₗ, w¹, ..., Δhⁿₗ, wⁿ) = Uₗ(a¹ₗ, ..., aⁿₗ; θᵤₗ)
```

## Final Processing

Finalllyyy, the system iteratively refines these estimates across multiple resolution levels, with each level incorporating geometric information and learned features. The propagation stage uses a local cost volume and confidence predictions _to select the most reliable estimates._

This is the approach that allowed HITNet to effectively handle both large textureless areas and fine details, making it particularly efficient for real-time applications. The combination of traditional geometric understanding (through planar patches) with learned features enables robust performance across various scenarios, from indoor scenes to outdoor environments.

Now is when I bring up the cool part.This insanely cool architecture achieves state-of-the-art results while maintaining real-time performance and my dear friend _papu_ managed to one up them, refined the architecture and actually beat HITNet's stats. The project is unfortunately under an NDA and I can't reveal deatails but that's toooo cool 🙌🏻

## End Note

I wanna try running HITNet and its counterpart models and see how they work. Some cool resources to do so are mentioned below:\
1.[_https://github.com/zjjMaiMai/TinyHITNet_](https://github.com/zjjMaiMai/TinyHITNet)\
2.[_https://github.com/ibaiGorordo/HITNET-Stereo-Depth-estimation_](https://github.com/zjjMaiMai/TinyHITNet)

## References :\

1.https://arxiv.org/abs/2007.12140\ [Super cool paper. Read for the fine details 😋]
