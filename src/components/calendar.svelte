<script>
    import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths, subMonths } from "date-fns";
    import { tasks } from "../stores/tasks.js"; // Import the tasks store
    import { derived } from "svelte/store";
    import { fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    let currentMonth = new Date();
    let direction = 1;
    let width;

    function nextMonth() {
        direction = 1;
        currentMonth = addMonths(currentMonth, 1);
    }

    function prevMonth() {
        direction = -1;
        currentMonth = subMonths(currentMonth, 1);
    }

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

    $: days = eachDayOfInterval({
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
</script>

<div class="calendar" bind:clientWidth={width}>
    <div class="header">
        <button class="arrow-btn" on:click={prevMonth}>&lt;</button>
        <div class="header-date">
            <span class="month">{format(currentMonth, "MMMM")}</span>
            <span class="year">{format(currentMonth, "yyyy")}</span>
        </div>
        <button class="arrow-btn" on:click={nextMonth}>&gt;</button>
    </div>
    <div class="grid-container">
        {#key currentMonth}
            <div class="grid" in:fly={{ x: width * direction, duration: 400, easing: quintOut }} out:fly={{ x: -width * direction, duration: 400, easing: quintOut }}>
                {#each eventsByDay as { day, events }}
                    <div class="day">
                        <div class="date">{format(day, "d")}</div>
                        {#each events as ev}
                            <div class="event" title={ev.title}></div>
                        {/each}
                    </div>
                {/each}
            </div>
        {/key}
    </div>
</div>

<style>
    .calendar {
        width: 100%;
        aspect-ratio: 237 / 355;
        font-family: "Rajdhani", sans-serif;
        background: black;
        border: 2.5px solid #fff;
        border-radius: 8px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        padding: 0.5rem;
        background: black;
        height: 15%;
        font-family: inherit;
        font-size: var(--font-size-calendar-header);
        z-index: 1;
    }
    .header-date {
        display: flex;
        gap: 0.25rem;
        align-items: baseline;
    }
    .month {
        font-weight: 600;
        font-size: var(--font-size-calendar-month);
    }
    .year {
        font-weight: 700;
    }
    .grid-container {
        height: 85%;
        position: relative;
        overflow: hidden;
    }
    .arrow-btn {
        background: none;
        color: white;
        border: none;
        font-size: var(--font-size-calendar-arrow);
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        border-radius: 3px;
        transition: background 0.2s;
    }
    .arrow-btn:hover {
        background: #222;
    }
    .date {
        font-size: var(--font-size-calendar-date);
        color: #fff;
        font-family: inherit;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        height: 100%;
        width: 100%;
        position: absolute;
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