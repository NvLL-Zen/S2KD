<script>
    import Checklist from "../components/checklist.svelte";
    import Calendar from "../components/calendar.svelte";
    import DatePicker from "../components/DatePicker.svelte";
    import Quotes from "../components/quotes.svelte";
    import "../styles/style.css";
    import { tasks, addTask, removeTask } from '../stores/tasks.js';
    import { fade, scale } from 'svelte/transition';
    import { onMount, onDestroy } from 'svelte';

    let newName = '';
    let selectedDate = '';

    function handleAdd() {
        console.log('Adding', { newName, selectedDate });
        if (!newName.trim() || !selectedDate) return;
        addTask(newName.trim(), selectedDate);
        newName = '';
        selectedDate = '';
    }
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet">

    <div class="top">
        <div class="title">
            <h1>
                S2KD
            </h1>
            <p>
                Sistem Kerjakan Sebelum Deadline
            </p>
        </div>
        <h2 id="account">
            <button id="signIn">
                Sign In
            </button>
        </h2>
    
        <div class="quotesContainer">
            <Quotes>
            </Quotes>
            <h2 class="quotesOrigin">-Seseorang</h2>
        </div>
        
        
    </div>
    <div class="main">
        <div class="events">
            <div id="inputEventsEntry" class="eventsEntry">
                <input placeholder="Nama tugas" type="text" id="inputEventsEntryName" class="eventsItem eventsLeft eventsEntryName" bind:value={newName}>
                <div class="dpContainer eventsItem">
                    <DatePicker bind:selectedDate={selectedDate} tasks={$tasks} />
                </div>
                <div class="eventButton">
                    <button type="button" on:click={handleAdd}>
                        +
                    </button>
                </div>
            </div>
            {#each $tasks as task (task.id)}
            <div class="eventsEntry" in:fade={{ duration: 200 }} out:fade={{ duration: 160 }}>
                <h4 class="eventsItem eventsLeft eventsList eventsEntryName">{task.name}</h4>
                <h4 class="eventsItem eventsList eventsEntryDL">{task.deadline}</h4>
                <div class="eventButton">
                    <button type="button" on:click={() => removeTask(task.id)}>
                        ✓
                    </button>
                </div>
                
            </div>
            {/each}
        </div>
       
        <div class="calendarContainer">
            <Calendar></Calendar>
        </div>
    </div>
