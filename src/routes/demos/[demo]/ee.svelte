<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
  import {encode, decode} from "./obfuscrypt.ts"
	import { onMount } from 'svelte';
  const getArg = (arg) => {return $page.url.searchParams.get(arg)}
	let text = $state(getArg('text') || "test");
	let seed = $state(getArg('seed') || Number.parseInt(Math.abs(Math.random())*2**64).toString(16));
  console.log(getArg('seed'))
	let counter = $state(getArg('index') || 0);
	let cipher = $state(getArg('cipher') || '');
	let errorText = $state('');
  let encrypt = $state(getArg('decrypt') ? false : true);
  function updateCipher() {
      cipher = encode(seed, counter, text).ciphertext
  }
  function updateText() {
      text = decode(seed, cipher)
  }
  onMount(()=>{
      encrypt ? updateCipher():updateText();
  })
  function handleKeyDown(event) {
    encrypt ? updateCipher():updateText();
    if (event.key === 'Enter') {
      event.shiftKey ? counter--:counter++;
    }
  }
</script>

<button class="cursor-pointer border border-purple-700 px-6 py-3 text-purple-300 transition-colors hover:border-purple-500">
  <p class='text-white border-purple-500' onclick={()=>{encrypt = !encrypt}}>{encrypt?"En":"De"}crypt</p>
</button>
<p class="text-white my-6">Input: </p>
  {#if encrypt}
<textarea
  type="text"
  bind:value={text}
  onkeydown={handleKeyDown}
  placeholder="Message to encrypt"
  class="focus;border-purple-500 w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
></textarea>
  {:else if text}
<p class="text-white my-6 break-words">{text}</p>
  {:else}
<p class="text-purple-300 my-6">Invalid!</p>
  {/if}


	<div class="flex gap-4 col my-4 row">
<p class="text-white my-6">Seed (hex): </p>
<input
  type="text"
  bind:value={seed}
  oninput={encrypt ? updateCipher:updateText}
  placeholder="Seed"
  class="focus;border-purple-500 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
/>
<p class="text-white my-6">Index: </p>
<input
  type="number"
  bind:value={counter}
  oninput={encrypt ? updateCipher:updateText}
  placeholder="Seed"
  class="focus;border-purple-500 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
/>
    </div>
<p class="text-white my-6">Output: </p>
  {#if !encrypt}
<input
  type="text"
  bind:value={cipher}
  oninput={updateText}
  placeholder="Encrypted message"
  class="focus;border-purple-500 w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
/>
  {:else}
<p class="text-white my-6 break-words">{cipher}</p>
  {/if}

		<div class="my-6">
<button class="cursor-pointer border border-purple-700 px-6 py-3 text-purple-300 transition-colors hover:border-purple-500 mb-8">
  <p class='text-white border-purple-500' onclick={()=>{navigator.clipboard.writeText(cipher)}}>copy</p>
</button>
  </div>

<button class="cursor-pointer border border-purple-700 px-4 py-1 text-purple-300 transition-colors hover:border-purple-500" onclick={()=>{goto("/blog/EE")}}>
	<div class="flex gap-5 col my-4 row">
  <p class='text-white text-small border-purple-500' >Write up</p>
<svg width="20px" height="20px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#ffffff" fill="none"><path d="M55.4,32V53.58a1.81,1.81,0,0,1-1.82,1.82H10.42A1.81,1.81,0,0,1,8.6,53.58V10.42A1.81,1.81,0,0,1,10.42,8.6H32"/><polyline points="40.32 8.6 55.4 8.6 55.4 24.18"/><line x1="19.32" y1="45.72" x2="54.61" y2="8.91"/></svg>
    </div>
</button>
<button class="cursor-pointer border border-purple-700 px-4 py-1 text-purple-300 transition-colors hover:border-purple-500" ><a href="https://github.com/BeanyZoldyck/obfuscryption/blob/main/obfuscrypt.py" target="_blank">
	<div class="flex gap-5 col my-4 row">
  <p class='text-white text-small border-purple-500' >Source</p>
<svg width="20px" height="20px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#ffffff" fill="none"><path d="M55.4,32V53.58a1.81,1.81,0,0,1-1.82,1.82H10.42A1.81,1.81,0,0,1,8.6,53.58V10.42A1.81,1.81,0,0,1,10.42,8.6H32"/><polyline points="40.32 8.6 55.4 8.6 55.4 24.18"/><line x1="19.32" y1="45.72" x2="54.61" y2="8.91"/></svg>
    </div></a>
</button>
