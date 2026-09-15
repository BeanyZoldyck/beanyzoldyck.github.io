import{a as u,f as k,c as J}from"../chunks/UoIFF554.js";import{q as P,s as g,F as b,z as G,x as S,y as r,J as d,I as L,B as p,C as w,g as o,G as F,A as Q}from"../chunks/CUKMfxNv.js";import{p as Y}from"../chunks/m71szhXM.js";import{d as Z,a as $,s as v}from"../chunks/D5ktsEFD.js";import{i as ee}from"../chunks/BCxDEleS.js";import{e as te,i as ae}from"../chunks/BEdAIbC5.js";import{h as ne}from"../chunks/9-EtPHm6.js";import{s as l}from"../chunks/VCP1rMIm.js";import{r as oe,a as ie}from"../chunks/BNEwsuyZ.js";const se=`I finally got around to making a personal dev site. I'm no (good) frontend dev, so it may be a little underwhelming, but it's mine. 
\\n
As its a personal endeavor, I decided to make this the old fashioned way without AI (except for the template, and to remove the scrollbar [I was 3 google search results in and it still wasn't working]). It was fun doing so as I don't think I've made a front end without vibe coding in over a year.
I was captivated to make this when I was applying for grizzhacks7, and I had all the optional badges: github, devpost, linkedin, but still--no site.
\\n I needed a better place to store my ramblings anyways, so it was inevitable.
`,re=`I just visited San Francisco for the first time this last weekend. \\n
I wasn't even in SF proper, and I already felt the contrast from Michigan. In Michigan, seeing someone get around in a "tech bro" manner is somewhat head turning.
But in SF, every street had someone riding either a Tesla, Waymo, or a Lime. Usually multiple. \\n
I was already one-shotted by the Bay area on the uber trip from the airport upon seeing the various ads for tech companies and startups I recognized. For comparison, every billboard in Michigan is either about heath insurance or legal representation.\\n
My enthrallment with basic features SF was even shown in the banality event I flew out for. A similar and larger event was happening just 10 minutes away, but I had no clue about it because I couldn't imagine hackathons being that frequent. The only times in recent memory where there were two Michigan hackathons happening at once was Grizzhacks and KentHacks.\\n 
But what the Midwest would call a "significant event with serious industry bigwigs" SF would call "Saturday".\\n
But that's enough glaze for Tech-Atlantis for now. I just wanted to verbalize the correctness of how I thought the city would make me feel at first. 
`,le=`I was passively scrolling X in the hopes of magically growing my tech account when I came across this post:\\n
\\img;kbt0.png;Original twitter post I got this idea from;https://x.com/driftoperator/status/2062365779228553463?s=20
\\n In the post the idea of stack overflow for agents is facetiously proposed, given as a "unicorn idea".\\n
While I don't think the idea has *that* much merit, I definitely saw some value in there and internalized it. As luck would have it, I was able to realize this idea a few days later at the insforge hackathon in SF. Because I'm goated, you already know it had a shiest ass name, Snippet, that paralleled its efficacy. I was almost scared to talk about the principles behind this topic, because I was worried about someone stealing recognition for my only novel idea, but I quickly realized no one actually reads this blog so I might as well anyways. \\n
The inspiration is simple. Agents are expensive. With bloated harnesses, agentic loops, and frontier models still having the capability (though rarer) to hallucinate, it's a wonder that tokens are still subsidized. However, if you were to breakdown the workload of the average agent, you would end up find a lot of repeated work. \\n
\\n
For example, let's say you are the typical slop merchant of today. You want to release a profitable version of one of your side projects that, let's say, lowballs people on Facebook Marketplace. What is the most efficient way to go about this? \\n
If you're the unenlightened, your options look something like this: \\n

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
\\n\\nDEMO:\\n\\n
\\img;kbt3.png;Snippet Demo vid;https://youtu.be/EoTkwgarx9g
\\n
1. Massively bolster lower parameter models.\\n
- SLM Research implies that SOTA low parameter models have much larger knowledge gaps than intelligence gaps when compared to their gargantuan peers. A tool that gives them access to a relevant knowledge base could make your gemma-24b-e4b-heretic-Q_4_M.safetensors compete with GPT 5.6 Sol (in theory)\\n\\n
\\n
2. Reduce token spend of frontier models\\n
- The original goal for this is achieved more than satisfactorily. During my testing of the snippet tooling I made, I saw a token spend decrease of 33% for the same benchmark task of fixing a broken pandas CSV import with GPT 5.5 with opencode (~4k output tokens with snippet, ~5k output tokens on the agent without. reasoning trace). Though that may be a small example, this would add up over the time of a payment cycle, especially if you're paying API pricing. \\n
3. Faster one shots\\n
- While a lot of simple proof of concepts can be one shotted, when you try to make more intricate apps you need to get a lot more involved. Because a lot of the times, LLMs are chatting shit. They reinvent the wheel, and spend a lot of time reasoning through the steps of a problem that is already solved. With something like this, an agent can just fetch a consensus answer and move on with the task at hand.\\n\\n
\\n
4. Greater accuracy\\n
- This significantly reduces the odds of hallucinations due to reliance on deprecated or poorly documented APIs. Imagine if you have a preferred stack without much agent integration (as in, you have to manually approve things on a dashboard). Making new apps in these frameworks tends to be a nightmare. There are a plethora of deprecations, edge cases, and runtime errors that the agent just wouldn't be aware of due to their knowledge cutoff hallucinations. This is my life as I mainly use firebase due to how cheap it is. A fleshed out KBT platform could allow me to save all the errors I have ran into for the type of apps I make, and have my agents never make those mistakes again.\\n\\n
\\n
5. Cheaper than web fetch\\n
\\img;kbt1.png;Post describing ChatGPT web search usage;https://www.reddit.com/r/ChatGPT/s/eEVNciHbSL
\\n
\\img;kbt2.png;Post describing Claude Code consuming more usage when Opus ran websearch and ignored cache;https://www.reddit.com/r/ClaudeCode/s/tscymKXGRF
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
`,he=`I have a nonserious addiction. I attend a lot of hackathons.\\n
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
`;var de=k('<meta property="og:title"/> <meta property="og:description"/> <meta property="og:image"/> <meta property="og:url" content="https://chukaze.dev"/> <meta property="og:type" content="website"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title" content="chukaze.dev"/> <meta name="twitter:description" content="Personal site"/> <meta name="twitter:image" content="https://chukaze.dev"/>',1),ce=k('<a target="_blank"><img/></a> <br/>',1),me=k('<p class="text-white"> </p>'),ue=k('<section class="py-20"><h1 class="mb-8 text-4xl font-bold text-purple-300"> </h1> <div class="space-y-6"><div class="inline-flex"><p class="border-l-2 pl-1 text-xs text-mauve-500"></p> <p class="tooltip ml-1 pl-3 text-xs text-mauve-500"><button class="cursor-pointer"> </button></p></div> <div class="border-l-2 border-purple-800 pl-6"><p class="text-lg text-purple-600"> </p></div> <!></div> <div class="mt-15 border-l-2 border-purple-900 pl-6"><a class="text-lg text-purple-800">← back</a></div></section>');function ge(I,e){P(e,!0);let i=Q("");switch(e.article.link){case"site":g(i,se,!0);break;case"SF":g(i,re,!0);break;case"KBT":g(i,le,!0);break;case"bearhacks":g(i,he,!0);break;default:g(i,"");break}function x(a){let n=new Date(a-18e6).toISOString().replaceAll("-","/").replaceAll("Z","").split("T");return n[1]=n[1].split(".")[0],n.join(" @ ")}function T(a){alert("In your time: "+new Date(a).toLocaleString())}var s=ue();ne("udl200",a=>{var t=de(),n=S(t),f=r(n,2),M=r(f,2);L(12),b(()=>{l(n,"content",e.article.title),l(f,"content",e.article.header),l(M,"content",e.article.thumbnail)}),u(a,t)});var c=p(s),K=d(c,!0),A=r(c,2),_=p(A),C=r(p(_),2),j=p(C),D=d(j);w(C),w(_);var B=r(_,2),R=p(B),W=d(R,!0);w(B);var H=r(B,2);te(H,17,()=>o(i).split("\\n"),ae,(a,t)=>{var n=J(),f=S(n);{var M=h=>{var m=ce(),y=S(m),z=d(y);L(2),b((U,V,X)=>{l(y,"href",U),l(z,"src",V),l(z,"alt",X)},[()=>o(t).split(";")[3],()=>ie(`/pics/${o(t).split(";")[1]}`),()=>o(t).split(";")[2]]),u(h,m)},q=F(()=>o(t).startsWith("\\img",1)),E=h=>{var m=me(),y=d(m,!0);b(()=>v(y,o(t))),u(h,m)};ee(f,h=>{o(q)?h(M):h(E,-1)})}u(a,n)}),w(A);var N=r(A,2),O=d(N);w(s),b((a,t)=>{v(K,e.article.title),v(D,`edited ${a??""}`),v(W,e.article.header),l(O,"href",t)},[()=>x(e.article.edited),()=>oe("/blog")]),$("click",j,()=>{T(e.article.edited)}),u(I,s),G()}Z(["click"]);function Te(I,e){P(e,!0);let i=F(()=>Y.params.article||"");const x=[{link:"site",title:"personal site",header:"took me long enough",edited:1772718227084},{link:"bearhacks",title:"chuka - caffeine = fraud?",header:"hype moments and aura was not enough to bring back a win",edited:1784272609e3},{link:"SF",title:"fist time in SF",header:"got citymogged so hard I wrote this on the flight back",edited:1780889081910},{link:"KBT",title:"intro to knowledge based tooling",header:"we DONE with RAG",edited:1789420745010,thumbnail:"https://i0.wp.com/the-digital-librarian.com/wp-content/uploads/2023/01/Untitled-design-3.png?fit=1200%2C628&ssl=1"}];function T(s){for(const c of x)if(c.link==s)return c;return{link:"none",title:"Article not found!",header:"just go back to blogs using the button below",created:0,edited:Date.now()}}{let s=F(()=>T(o(i)));ge(I,{get article(){return o(s)}})}G()}export{Te as component};
