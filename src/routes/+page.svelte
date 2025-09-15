<script>
    import Layout from "./+layout.svelte";
    import Checklist from "./checklist.svelte";
    import "../styles/style.css"
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Red+Hat+Text:ital,wght@0,300..700;1,300..700&family=Share+Tech&display=swap" rel="stylesheet">

<Layout>
    <div class="mainTitle">
        <h1>SKSD</h1>
        <h5>Sistem Kerjakan Sebelum Deadline</h5>
    </div>
    <div class="tasks">
        <div class="taskEntry">
            <h1 class="taskName taskEntryItems">Tugas 1</h1>
            <h2 class="taskEntryItems">HH:BB:TT</h2>
            <h2 class="taskEntryItems">DD:MM:JJ</h2>
            <button class="taskEntryItems">
                <Checklist>
                </Checklist>
            </button>
            
        </div>
    </div>
</Layout>