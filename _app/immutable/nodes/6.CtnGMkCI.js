import{a as l,f as u,c as le}from"../chunks/BnlBESuq.js";import{p as R,i as y,t as v,a as j,f as S,s as h,o as c,c as k,av as F,r as b,e as t,b4 as I,au as de}from"../chunks/Cy5nAd-J.js";import{p as ce}from"../chunks/BDYPybOj.js";import{d as me,a as ue,s as m}from"../chunks/DnGix9df.js";import{i as pe}from"../chunks/hIPtvL3h.js";import{e as O,i as z}from"../chunks/D4heeUEx.js";import{h as ge}from"../chunks/uQe-IyfP.js";import{s as d}from"../chunks/DRgFwExb.js";import{r as fe,a as we}from"../chunks/CKL2hc-b.js";const ye=`I finally got around to making a personal dev site. I'm no (good) frontend dev, so it may be a little underwhelming, but it's mine. 
\\n
As its a personal endeavor, I decided to make this the old fashioned way without AI (except for the template, and to remove the scrollbar [I was 3 google search results in and it still wasn't working]). It was fun doing so as I don't think I've made a front end without vibe coding in over a year.
I was captivated to make this when I was applying for grizzhacks7, and I had all the optional badges: github, devpost, linkedin, but still--no site.
\\n I needed a better place to store my ramblings anyways, so it was inevitable.
`,be=`I just visited San Francisco for the first time this last weekend. \\n
I wasn't even in SF proper, and I already felt the contrast from Michigan. In Michigan, seeing someone get around in a "tech bro" manner is somewhat head turning.
But in SF, every street had someone riding either a Tesla, Waymo, or a Lime. Usually multiple. \\n
I was already one-shotted by the Bay area on the uber trip from the airport upon seeing the various ads for tech companies and startups I recognized. For comparison, every billboard in Michigan is either about heath insurance or legal representation.\\n
My enthrallment with basic features SF was even shown in the banality event I flew out for. A similar and larger event was happening just 10 minutes away, but I had no clue about it because I couldn't imagine hackathons being that frequent. The only times in recent memory where there were two Michigan hackathons happening at once was Grizzhacks and KentHacks.\\n 
But what the Midwest would call a "significant event with serious industry bigwigs" SF would call "Saturday".\\n
But that's enough glaze for Tech-Atlantis for now. I just wanted to verbalize the correctness of how I thought the city would make me feel at first. 
`,ve=`I was passively scrolling X in the hopes of magically growing my tech account when I came across this post:\\n
\\img;kbt0.png;Original twitter post I got this idea from;https://x.com/driftoperator/status/2062365779228553463?s=20\\n
\\n In the post the idea of stack overflow for agents is facetiously proposed, given as a "unicorn idea".\\n
While I don't think the idea has *that* much merit, I definitely saw some value in there and internalized it. As luck would have it, I was able to realize this idea a few days later at the insforge hackathon in SF. Because I'm goated, you already know it had a shiest ass name, Snippet, that paralleled its efficacy. I was almost scared to talk about the principles behind this topic, because I was worried about someone stealing recognition for one of my only novel ideas, but I quickly realized no one actually reads this blog so I might as well anyways. \\n
The inspiration is simple. Agents are expensive. With bloated harnesses, agentic loops, and frontier models still having the capability (though rarer) to hallucinate, it's a wonder that tokens are still subsidized. However, if you were to breakdown the workload of the average agent, you would end up find a lot of repeated work. \\n
\\n
For example, let's say you are the typical slop merchant of today. You want to release a profitable version of one of your side projects that, let's say, lowballs people on Facebook Marketplace. What is the most efficient way to go about this? \\n
If you're the unenlightened, your options look something like this: \\n
\\n
\\n
1. Reprompt Kimi K3 (or Claude Fable 5 if your trash can is hard to find) on max thinking to make sure you don't miss a single detail while making "Tinder for bartering"\\n\\n
\\n
2. Point your agent at your old project, and tell it what changes you want made\\n\\n
\\n
3. Copy the project yourself and *manually* change the variables, naming, and branding to the target project to make sur--yea I'm just kidding\\n\\n
\\n
There are express problems between 1 and 2. In 1, you are wasting reasoning tokens relearning lessons that were prompted away ages ago. Option 2 is still not as optimal as possible, since the agent is crawling the entire codebase, learning too much about the old project, given that the task is to make a different one. We are spoiled by generous coding plans and massive context windows to the point that we never check our agent's reasoning trace and see how many useless "thoughts" they generate. \\n
\\n
My solution to this was a lot more generalizable to problems besides one shotting React slop. The idea was that Snippet was a tool that would refer to modular, documented code (thought the same principles apply to any agentic context) that agents would not have to generate from scratch. Before I go into some intricacies that make this useful, let me mention some of the benefits behind an idea like this:\\n
\\n\\nDEMO:\\n
\\img;kbt3.png;Snippet Demo vid;https://youtu.be/EoTkwgarx9g\\n
\\n
1. Massively bolster lower parameter models.\\n
- SLM Research implies that SOTA low parameter models have much larger knowledge gaps than intelligence gaps when compared to their gargantuan peers. A tool that gives them access to a relevant knowledge base could make your gemma-24b-e4b-heretic-Q_4_M.safetensors compete with GPT 5.6 Sol (in theory)\\n\\n
\\n
2. Reduce token spend of frontier models\\n
- The original goal for this is achieved more than satisfactorily. During my testing of the snippet tooling I made, I saw a token spend decrease of 33% for the same benchmark task of fixing a broken pandas CSV import with GLM-4.5-Air on opencode (~4k output tokens with snippet, ~6k output tokens on the agent without. reasoning trace). Though that may be a small example, this would add up over the time of a payment cycle, especially if you're paying API pricing. \\n
3. Faster one shots\\n
- While a lot of simple proof of concepts can be one shotted, when you try to make more intricate apps you need to get a lot more involved. Because a lot of the times, LLMs are chatting shit. They reinvent the wheel, and spend a lot of time reasoning through the steps of a problem that is already solved. With something like this, an agent can just fetch a consensus answer and move on with the task at hand.\\n\\n
\\n
4. Greater accuracy\\n
- This significantly reduces the odds of hallucinations due to reliance on deprecated or poorly documented APIs. Imagine if you have a preferred stack without much agent integration (as in, you have to manually approve things on a dashboard). Making new apps in these frameworks tends to be a nightmare. There are a plethora of deprecations, edge cases, and runtime errors that the agent just wouldn't be aware of due to their knowledge cutoff hallucinations. This is my life as I mainly use firebase due to how cheap it is. A fleshed out KBT platform could allow me to save all the errors I have ran into for the type of apps I make, and have my agents never make those mistakes again.\\n\\n
\\n
5. Cheaper than web fetch\\n
\\img;kbt1.png;Post describing ChatGPT web search usage;https://www.reddit.com/r/ChatGPT/s/eEVNciHbSL\\n\\n
\\img;kbt2.png;Post describing Claude Code consuming more usage when Opus ran websearch and ignored cache;https://www.reddit.com/r/ClaudeCode/s/tscymKXGRF\\n
\\n
- As other agent-conscious reddit users have pointed out, webfetch is expensive. Most of the results the agent gets back will be irrelevant, or worse: misleading. The only proposed solution I've seen on Reddit, which is the amalgamate of humanity's applicable knowledge, is to use cheaper websearch tooling... KBT solves this by using vector embeddings (cosine similarity, similar to RAG) to fetch only relevant results thus not polluting your context window\\n
\\n
6. More efficient than finetuning, works with larger datasets than CAG\\n
- KBT takes significantly less time and data than finetuning an LLM for a specific task. However, it can also use much larger datasets than CAG, as the database would not be bottlenecked by a 1M context window.\\n
\\n
7. More detailed than MCP\\n
- Admittedly, there is a lot of overlap between a MCP and KBT. Although there is a key difference: specificity. For example, a coding KBT can catch runtime errors not visible to the LLM simply checking syntax with an MCP. This is useful for bleeding edge libraries that may have bugs the LLM would be unable to properly fix everytime.\\n
\\n
\\n
\\n
since this is already my longest blogpost, I’ll wrap this up with some details on a correct implementation of KBT. For one you need a contract for each “snippet” (general term for example of applicable solution). If it’s code you need a type-safe signature, if it’s microcontrollers you need a predetermined pinout format, etc. The idea is that if you promise “I return/apply to/do this” your agent doesn’t have to waste time verifying or testing that every time. Next is you want the knowledge base to have an exact description to be embedded for agent retrieval later. I choose raw cosine similarity (sometimes L2). All in all, KBT is an itemized agentic RAG format that comes with plenty of benefits.\\n
`,ke=`C0ONeqUl4gjUIMJJMIOakNqe4wxVLzf0myHJNqenKC3QAwNzKnCNqenCKQ3AZwrr7uqeNrwZur7LzVYJlnKCqNeKygeeRqshMe9kqWt3SuaP1ufZMJf5HsqhauP5fHqWkuvtvQckLQkWquPaLk0pS3tXPMZJkQLg3zhqsMe9fu1fRIuPafDacvQXEXVa0GINdGxGINUO09OQl3kGIN1aNJUkLyYGIN12FQO98XJdWFLyY7MhIGN0VaOU0WdFNsSIGNOQ9LyY3lkING0UOq0DZZlOTX06dAerW4cqbKvRBreA60dPUvDrSKbqW4crAex4qPSWd06erASP106d1SgTn3AerEw9BmV \\n\\n
\\a;DEMO;/demos/EE?decrypt=true&seed=89&cipher=C0ONeqUl4gjUIMJJMIOakNqe4wxVLzf0myHJNqenKC3QAwNzKnCNqenCKQ3AZwrr7uqeNrwZur7LzVYJlnKCqNeKygeeRqshMe9kqWt3SuaP1ufZMJf5HsqhauP5fHqWkuvtvQckLQkWquPaLk0pS3tXPMZJkQLg3zhqsMe9fu1fRIuPafDacvQXEXVa0GINdGxGINUO09OQl3kGIN1aNJUkLyYGIN12FQO98XJdWFLyY7MhIGN0VaOU0WdFNsSIGNOQ9LyY3lkING0UOq0DZZlOTX06dAerW4cqbKvRBreA60dPUvDrSKbqW4crAex4qPSWd06erASP106d1SgTn3AerEw9BmV;\\n\\n
It may seem as if that is a random mash of characters, which it is, but I assure you it has meaning. Though, that is not the only block of character which means that. I made a particular algorithm to answer the question, “How can you randomly encrypt text?” The methodology behind the algorithm includes such concepts from dictionaries to the Fundamental Theorem of Arithmetic. The data presented is translated exactly as\\n\\n
 Ezeoke Encryption takes in a limited range of ASCII characters, those useful in communication, and outputs encrypted data that can’t be interpreted. The output itself is 100% ASCII as well. The quirk of this algorithm is that it is nondeterministic: the same input text doesn't output the same encrypted data. However, that ciphertext can always decrypt to the same input.\\n\\n
The first hurdle when making an algorithm like this is deciding which characters to include. I settled on the upper and lowercase alphabet, punctuation marks, and every symbol I deemed useful or common enough to be included. For the sake of simplicity, the set of possible inputs to the algorithm will be referred to as P.\\n\\n
Method\\n\\n
The first task is to generate values for each element in P (with cryptographically safe random number generation of course). These values are what our input text will be converted to. We will call the set of possible characters in the ciphertext R. Example showing a some possible inputs P mapping to valid outputs:\\n\\n
\\img;ee1.png;figure showing how inputs can be mapped to random outputs;\\n
or X -> Q s.t. X ⊂ P, Q = {(i,j,k) i,j,k ∈ R}, |Q| = |X|\\nWe will continue use Q to mean an example instantiation of cipher text.\\n 
We must also define a mapping for these values of Q. We always use a=2, b=3, c=5 and so on, mapping every possible output (ASCII lowercase, uppercas, then digits) to a prime number. The algorithm is essentially impossible without some type of constant.\\n\\n
\\img;ee2.png;showing prime mappings;\\n



Encryption\\n\\n
So far, the algorithm has generated two dictionaries: elements of P to three random characters (Q), such that each character is an element of R, and elements of R to prime numbers. The algorithm goes through the P -> Q mapping, and using each of the three characters, plugs them into the prime number dictionary (see Figure 2.), and multiples them before returning the product of the three prime numbers. Like so: \\n\\n
\\img;ee3.png;showing keygen;\\n

These products make up the key. Each product, according to the \\a;Fundamental Theorem of Arithmetic;https://en.wikipedia.org/wiki/Fundamental_theorem_of_arithmetic; can only be written in terms of the three unique prime numbers that were multiplied to get it.\\n\\n
We append the complete key to the message, using character delimiters for the products, that have the ordered products for every elemnent of P (possible inputs). By assembling the map from every character in P to the random triplet like so\\n\\n
\\img;ee4.png;showing keygen;\\n\\n
We can now take the random output back to our plaintext!\\n
\\br\\n\\n

Thus far is the (altered) write up I made a few years back when I didn’t have a direction for this project. You may have noticed that we algorithm described is closer to obfuscation considering you send the key with the message. This means that with knowledge of the algorithm, you could easily decrypt messages.\\n\\n
Recently, though, I made some additions to the algorithm that’s solve this problem so it can actually be called encryption:\\n 
For one, instead of randomly generating, the triplet set Q, the two messengers share a private key that the RNG is seeded from. After sending a message you increment the seed so that the next exchange is not the same as last. \\n\\n
This is mediated using the message metadata. Since the ordering of the triplets doesn’t matter, we use the lexicographical ordering permutation to encode a secret message that stores this index:\\n
\\img;ee5.png;ciphertext -> ascii triplet -> ordinal ranking -> lexicographical encoding -> base 6 number;\\n
 The meta number is the truncated SHA256 hash of the mutual seed, multiplied by the message index. Two mutual parties with the same seed can recover this index by hashing the seed, dividing the Meta number by this hash to retrieve the message index, and add that to the seed to generate the correct Q set. Note that you don't need the seed to recover this meta number, it is just derived from the ciphertext triplet ordering.\\n\\n
 One more addition to this algorithm, for every 30 characters a message has, we increment the index once more and regenerate the key dictionary so that the algorithm is resistant to frequency attacks. This is all in the demo as well.\\n YkQgjUwrZCKn6F0Nqe7ruA3QwZr06Fur7KnCs24eqNCO0Neq4wxzVLf0mJHyRV1RiR8iTn8ksZEe2fE7QQvGRO2GGL
`,Ie=`I have a nonserious addiction. I attend a lot of hackathons.\\n
\\n
This affliction became terminal when I attended BearHacks in Canada. A whole 3 hour drive just to get the chance to LARP as a 30u30 visionary and not the spiritually unemployed autist I am.\\n
This trip marks a turning point, as before BearHacks, the longest I traveled for a hackathon was about an hour. But this sets a precedent that there is little that can get between me and a reason to whip out the sidtop and flex on some claudelets with opencode.\\n
\\n
This is somewhat worrying, but not for the reason you think: it's because I didn't win...\\n
Now this may come as a surprise to the 3 visitors (me, Nitin, and me refreshing the page) of this "blog", but yes. There are hackathons that I cannot win. The reason this is alarming is that it shows I am willing to go the extra mile to showcase mediocrity. Like, you would expect someone spending hundreds to attend a hackathon to *atleast* put their best foot forward, but I seem to prove a counterexample to that rule of thumb. \\n
Is this due to my lackadaisical worldview? The masking of my own ineptitude? Perhaps the myriad excuses I have at any of these long-distance hackathons are more valid than I thought...\\n
I don't have an answer just yet, which makes this all the more terrifying...\\n
\\n\\n
(addendum)\\n
Although, If I were to stop beating around the bush, I don't even think that poorly of the event / project that made me feel this way.\\n

At Bearhacks, Nitin and I made Gridlock. It was the coolest idea I ever came up with, and my only regret was that we didn't think of it sooner. The crux of the idea was memory dumping a program and continuing it elsewhere when it crashed. It had integrations with the distributive computing sponsor, a solana marketplace, and was just a cool ass idea.\\n

Sadly, though, we trolled the submission as we worked on it well past our agreed finish time and couldn't shoot a video in time (this is half of the reason I bought a new phone) and we went home with nothing.\\n

The 3 hour ride back was almost baptismal. This was the first time I lost a hackathon in 2026, and I honestly forgot what that even felt like at the time. Being somewhat of an absolutist, I kinda liked the feeling. There is no point in reveling in your wins if you can't accept your losses (though me and Nitin vacated the premises at record speeds, we aurafarmed way too much to fraud out like that and stay for questioning)\\n

So With this last part, I can confidently say (having got back into my groove with Berkeley's AI Hackathon) that I don't regret BearHacks. It was a great lesson and even greater experience overall. Although like I said this is probably contingent on the fact I did infact start winning hackathons outside of the midwest.
`;var xe=u('<meta property="og:title"/> <meta property="og:description"/> <meta property="og:image"/> <meta property="og:url" content="https://chukaze.dev"/> <meta property="og:type" content="website"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title" content="chukaze.dev"/> <meta name="twitter:description" content="Personal site"/> <meta name="twitter:image" content="https://chukaze.dev"/>',1),Te=u('<a target="_blank"><img/></a> <br/>',1),Ae=u(' <a class="text-purple-500" target="_blank"> </a> ',1),Se=u('<p class="text-white"></p>'),Ne=u('<hr class="border-t border-purple-800 my-12"/>'),_e=u('<p class="text-white break-words"> </p>'),qe=u('<section class="py-20"><h1 class="mb-8 text-4xl font-bold text-purple-300"> </h1> <div class="space-y-6"><div class="inline-flex"><p class="border-l-2 pl-1 text-xs text-mauve-500"></p> <p class="tooltip ml-1 pl-3 text-xs text-mauve-500"><button class="cursor-pointer"> </button></p></div> <div class="border-l-2 border-purple-800 pl-6"><p class="text-lg text-purple-600"> </p></div> <!></div> <div class="mt-15 border-l-2 border-purple-900 pl-6"><a class="text-lg text-purple-800">← back</a></div></section>');function Me(N,o){R(o,!0);let s=de("");switch(o.article.link){case"site":y(s,ye,!0);break;case"SF":y(s,be,!0);break;case"EE":y(s,ke,!0);break;case"KBT":y(s,ve,!0);break;case"bearhacks":y(s,Ie,!0);break;default:y(s,"");break}function _(a){let r=new Date(a-18e6).toISOString().replaceAll("-","/").replaceAll("Z","").split("T");return r[1]=r[1].split(".")[0],r.join(" @ ")}function q(a){alert("In your time: "+new Date(a).toLocaleString())}function p(a,e){return a.startsWith(e,1)||a.startsWith(e,0)}var g=qe();ge("udl200",a=>{var e=xe(),r=S(e),x=h(r,2),C=h(x,2);F(12),v(()=>{d(r,"content",o.article.title),d(x,"content",o.article.header),d(C,"content",o.article.thumbnail)}),l(a,e)});var Q=k(g),E=c(Q,!0),M=h(Q,2),P=k(M),K=h(k(P),2),B=k(K),H=c(B);b(K),b(P);var L=h(P,2),D=k(L),J=c(D,!0);b(L);var U=h(L,2);O(U,17,()=>t(s).split("\\n"),z,(a,e)=>{var r=le(),x=S(r);{var C=n=>{var i=Te(),f=S(i),w=c(f);F(2),v((G,T,A)=>{d(f,"href",G),d(w,"src",T),d(w,"alt",A)},[()=>t(e).split(";")[3],()=>we(`/pics/${t(e).split(";")[1]}`),()=>t(e).split(";")[2]]),l(n,i)},V=I(()=>p(t(e),"\\img")),Y=n=>{var i=Se();O(i,21,()=>t(e).split("\\a"),z,(f,w,G)=>{F();var T=Ae(),A=S(T),W=h(A),ne=c(W,!0),oe=h(W);v((ie,se,re,he)=>{m(A,`${ie??""} `),d(W,"href",se),m(ne,re),m(oe,` ${he??""}`)},[()=>G==0?t(e).split(";")[0].substring(0,t(e).split(";")[0].length-3):"",()=>t(w).split(";")[2],()=>t(w).split(";")[1],()=>t(w).split(";")[3]]),l(f,T)}),b(i),l(n,i)},$=I(()=>t(e).includes("\\a")),ee=n=>{var i=Ne();l(n,i)},te=I(()=>p(t(e),"\\br")),ae=n=>{var i=_e(),f=c(i,!0);v(()=>m(f,t(e))),l(n,i)};pe(x,n=>{t(V)?n(C):t($)?n(Y,1):t(te)?n(ee,2):n(ae,-1)})}l(a,r)}),b(M);var Z=h(M,2),X=c(Z);b(g),v((a,e)=>{m(E,o.article.title),m(H,`edited ${a??""}`),m(J,o.article.header),d(X,"href",e)},[()=>_(o.article.edited),()=>fe("/blog")]),ue("click",B,()=>{q(o.article.edited)}),l(N,g),j()}me(["click"]);function Oe(N,o){R(o,!0);let s=I(()=>ce.params.article||"");const _=[{link:"site",title:"personal site",header:"took me long enough",edited:1772718227084},{link:"bearhacks",title:"chuka - caffeine = fraud?",header:"hype moments and aura was not enough to bring back a win",edited:1784272609e3},{link:"SF",title:"fist time in SF",header:"got citymogged so hard I wrote this on the flight back",edited:1780889081910},{link:"KBT",title:"intro to knowledge based tooling",header:"we DONE with RAG",edited:1789420745010,thumbnail:"https://i0.wp.com/the-digital-librarian.com/wp-content/uploads/2023/01/Untitled-design-3.png?fit=1200%2C628&ssl=1"},{link:"EE",title:"ezeoke encryption",header:"synopsis of a peculiar encryption algorithm I first made 7 years ago.",edited:1789932765704,thumbnail:""}];function q(p){for(const g of _)if(g.link==p)return g;return{link:"none",title:"Article not found!",header:"just go back to blogs using the button below",created:0,edited:Date.now()}}{let p=I(()=>q(t(s)));Me(N,{get article(){return t(p)}})}j()}export{Oe as component};
