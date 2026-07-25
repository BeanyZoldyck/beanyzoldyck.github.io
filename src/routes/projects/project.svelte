<script>
	let { project} = $props();
</script>
<a href={project.link} target="_blank" id={project.title.replaceAll(' ','') 
} >
<div class="border border-purple-900 p-6 transition-colors hover:border-purple-700 my-4">
	<h2 class="mb-2 text-2xl font-bold text-purple-200">{project.title}</h2>
	<p class="mb-2 text-purple-400">
		{project.desc}
	</p>
	<p class="mb-0 text-xs text-mauve-500" id='text'>{project.info}</p>
	{project.title}
<div class=" transition-colors z-10 text-purple-100 grid w-100 grid-cols-4 py-1 space-x-4 text-xs">
  {#each project.skills.split(' ') as skill}
<a href="" target="" class='' onclick={()=>{document.getElementById("tempskill").textContent = skill }}>

<div class="border border-purple-900 p-3 hover:border-purple-300">{skill}</div>
</a>
  {/each}
  </div>
</div></a>
