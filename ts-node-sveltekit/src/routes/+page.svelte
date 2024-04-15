<script lang="ts">
    import "../app.css";

    export let data;

    let realCenter = data.config.realCenter;
    let imagCenter = data.config.imagCenter;
    let realWidth = data.config.realWidth;

    const sectionOptions = {
        original: {
            name: "Original",
            realCenter: -0.7,
            imagCenter: 0,
            realWidth: 3.076_9,
        },
        seahorseValley: {
            name: "Seahorse Valley",
            realCenter: -0.875_91,
            imagCenter: 0.204_64,
            realWidth: 0.531_84,
        },
    };

    function onSectionSelect(
        event: Event & { currentTarget: HTMLSelectElement },
    ) {
        const id = event.currentTarget.value as
            | keyof typeof sectionOptions
            | "custom";

        if (id !== "custom") {
            realCenter = sectionOptions[id].realCenter;
            imagCenter = sectionOptions[id].imagCenter;
            realWidth = sectionOptions[id].realWidth;
        }
    }
</script>

<svelte:head>
    <title>Mandelbrot</title>
</svelte:head>

<main>
    {#await data.mandelbrotImage}
        <div>Loading...</div>
    {:then imageUrl}
        <img src={imageUrl} alt="Generated Mandelbrot set" />
    {/await}
    <aside>
        <form method="POST">
            <div>
                <label>
                    Image Width
                    <input
                        type="number"
                        name="imageWidth"
                        min={100}
                        max={2000}
                        value={data.config.imageWidth}
                    />
                </label>
                <span>&times;</span>
                <label>
                    Image Height
                    <input
                        type="number"
                        name="imageHeight"
                        min={100}
                        max={2000}
                        value={data.config.imageHeight}
                    />
                </label>
            </div>
            <hr />
            <select
                name="section"
                value={data.config.section}
                on:change={onSectionSelect}
            >
                {#each Object.entries(sectionOptions) as [id, options]}
                    <option value={id}>{options.name}</option>
                {/each}
                <option value="custom">Custom</option>
            </select>
            <label>
                Real Center
                <input
                    type="number"
                    name="realCenter"
                    bind:value={realCenter}
                    step={0.000_001}
                />
            </label>
            <label>
                Imaginary Center
                <input
                    type="number"
                    name="imagCenter"
                    bind:value={imagCenter}
                    step={0.000_001}
                />
            </label>
            <label>
                Real Width
                <input
                    type="number"
                    name="realWidth"
                    bind:value={realWidth}
                    step={0.000_001}
                />
            </label>
            <hr />
            <label>
                Max Iterations
                <input
                    type="number"
                    name="maxIterations"
                    min={1}
                    max={10000}
                    value={data.config.maxIterations}
                />
            </label>
            <label>
                Thread Count
                <input
                    type="number"
                    name="threadCount"
                    min={1}
                    max={1000}
                    value={data.config.threadCount}
                />
            </label>
            <button type="submit">Generate</button>
        </form>
    </aside>
</main>
