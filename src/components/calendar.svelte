<script>
    import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";
    import { tasks } from "../stores/tasks.js"; // Import the tasks store
    import { derived } from "svelte/store";

    let currentMonth = new Date();

    // Derive events from the tasks store (tasks store keeps YYYY/MM/DD)
    const events = derived(tasks, $tasks =>
        $tasks
            .filter(t => t.deadline)
            .map(t => {
                // Normalize any legacy hyphen form to slash, then create hyphen form for matching
                const slash = t.deadline.replace(/-/g,'/');
                const hyphen = slash.replace(/\//g,'-');
                return {
                    date: hyphen, // yyyy-MM-dd for comparison
                    title: t.name
                };
            })
    );

    let days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth)
    });

    // Reactive statement to filter events for each day
    $: eventsByDay = days.map(day => {
        const dayString = format(day, "yyyy-MM-dd");
        return {
            day,
            events: $events.filter(e => e.date === dayString)
        };
    });

    // Debugging logs
    $: console.log($tasks); // Log tasks store
    $: console.log($events); // Log derived events
    $: console.log(eventsByDay); // Log eventsByDay array
</script>

<div class="calendar">
    <div class="header">{format(currentMonth, "MMMM yyyy")}</div>
    <div class="grid">
        {#each eventsByDay as { day, events }}
            <div class="day">
                <div class="date">{format(day, "d")}</div>
                {#each events as ev}
                    <div class="event" title={ev.title}></div>
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    .calendar {
        width: 100%;
        height: 90%;
        font-family: "Rajdhani", sans-serif;
        background: black;
        border: 2.5px solid #fff;
        border-radius: 8px;
        overflow: hidden;
    }
    .header {
        text-align: center;
        font-weight: 700;
        padding: 0.5rem;
        background: black;
        height: 15%;
        font-family: inherit;
        font-size: 0.813rem;
    }
    .date {
        font-size: 0.65rem;
        color: #fff;
        font-family: inherit;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        height:85%;
    }
    .day {
        border: 2.5px solid #eee;
        min-height: 50px;
        padding: 2px;
        position: relative;
    }
    .event {
        width: 10px; /* Temporarily increased size for visibility */
        height: 10px;
        background: red; /* Temporarily changed to red for visibility */
        border-radius: 50%;
        position: absolute;
        bottom: 4px;
        left: 4px;
    }
</style>
