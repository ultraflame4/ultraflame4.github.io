<script lang="ts">
    import Navbar from "$lib/blocks/Navbar.svelte";
    import StartBanner from "$lib/blocks/StartBanner.svelte";
    import { TextTyper } from "$lib/components/others/typewriter";
    import Typewriter from "$lib/components/others/Typewriter.svelte";
    const delay = 400;

    const greeting = new TextTyper()
        .wait(200)
        .seq("Hello, ")
        .wait(300)
        .seq("I'm ")
        .styled_seq("Chester", { class: "greeting-name" })
        .ins("<br/>")
        .wait(300)
        .seq("I'm a ")
        .styled_seq("Self-taught", { style: "color:#86EFAC" })
        .wait(delay)
        .autoprev()
        .styled_seq("Programmer", { style: "color:#4f39f6" })
        .wait(delay)
        .autoprev()
        .styled_seq("builder", { style: "color:#ff8904" })
        .wait(delay)
        .autoprev()
        .styled_seq("maker", { style: "color: var(--color-rainbow)" })
        .wait(8000)
        .autoprev()
        .tti_goto(10) // Magic value: found through repeated tries. Cannot just count because some steps contains more than one tti!
        .build();
</script>

<StartBanner>
    {#snippet children()}
        <div class="size-full flex justify-center">
            <div class="top-0 my-auto sticky py-8">
                <p class="w-100 h-32 border p-4 font-fancy text-3xl bg-background">
                    <Typewriter inputs={greeting} />
                </p>
            </div>
        </div>
    {/snippet}
</StartBanner>
<Navbar />
<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
