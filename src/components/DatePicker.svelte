<script>
    import { fade, scale } from 'svelte/transition';
    import { onMount, onDestroy } from 'svelte';

    export let selectedDate = ''; // Selected date
    export let tasks = []; // Array of tasks with `deadline` in YYYY-MM-DD

    let open = false;
    let today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();

    let months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    function daysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    function selectDate(y, m, d) {
        selectedDate = `${y}/${String(m+1).padStart(2,'0')}/${String(d).padStart(2,'0')}`;
        open = false;
    }

    function prevMonth() {
        if (month === 0) {
            month = 11;
            year--;
        } else {
            month--;
        }
    }

    function nextMonth() {
        if (month === 11) {
            month = 0;
            year++;
        } else {
            month++;
        }
    }

    let pickerRef;
    function handleClickOutside(event) {
        if (open && pickerRef && !pickerRef.contains(event.target)) {
            open = false;
        }
    }

    let removeListener = null;

    function manageListener() {
        if (open) {
            window.addEventListener('mousedown', handleClickOutside);
            removeListener = () => window.removeEventListener('mousedown', handleClickOutside);
        } else if (removeListener) {
            removeListener();
            removeListener = null;
        }
    }

    $: open, manageListener();

    onMount(() => {
        return () => {
            if (removeListener) removeListener();
        };
    });

    onDestroy(() => {
        if (removeListener) removeListener();
    });

    // Helper function to check if a date has tasks
    function hasTasks(y, m, d) {
        const target = `${y}/${String(m+1).padStart(2,'0')}/${String(d).padStart(2,'0')}`;
        return tasks.some(task => {
            if (!task.deadline) return false;
            const dl = task.deadline.replace(/-/g,'/'); // tolerate old stored hyphen dates
            return dl === target;
        });
    }
</script>

<style>
    .datepicker-container {
        position: relative;
        display: inline-block;
        width: 180px;
        font-family: inherit;
    }
    .datepicker-input {
        width: 100%;
        padding: 8px 12px;
        background: transparent;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: var(--font-size-datepicker-input);
        scale: 1.45;
        cursor: pointer;
        transition: border 0.2s;
        text-align: center;
        font-family: inherit;
        outline: none;
    }
    .datepicker-input:focus {
        outline: none;
        /* border: 1.5px solid #fff; */
    }
    .dropdown {
        position: absolute;
        top: 110%;
        left: 50%;
        transform: translateX(-50%);
        width: 260px;
        background: black;
        color: white;
        border: 1px solid white;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.7);
        z-index: 10;
        padding: 16px;
        font-family: inherit;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        text-align: center;
        font-size: var(--font-size-datepicker-header);
        font-family: inherit;
    }
    .arrow-btn {
        background: none;
        color: white;
        border: none;
        font-size: var(--font-size-datepicker-arrow);
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        border-radius: 3px;
        transition: background 0.2s;
    }
    .arrow-btn:hover {
        background: #222;
    }
    .calendar {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.25rem;
    }
    .day, .date {
        text-align: center;
        padding: 0.25rem 0;
        font-size: var(--font-size-datepicker-day-date);
        font-family: inherit;
    }
    .day {
        font-weight: bold;
        color: #bbb;
    }
    .date {
        cursor: pointer;
        border-radius: 4px;
        position: relative;
        transition: background 0.2s, color 0.2s;
    }
    .date:hover {
        background: #fff;
        color: #000;
    }
    .selected {
        background: #fff;
        color: #000;
        font-weight: bold;
    }
    .task-dot {
        position: absolute;
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%);
        width: 6px;
        height: 6px;
        background: red;
        border-radius: 50%;
    }
</style>

<div class="datepicker-container" bind:this={pickerRef}>
    <input
        class="datepicker-input"
        type="text"
        readonly
        placeholder="Pilih tanggal"
        value={selectedDate}
        on:click={() => open = !open}
    />
    {#if open}
        <div class="dropdown" transition:fade={{ duration: 180 }}>
            <div class="header">
                <button class="arrow-btn" on:click={prevMonth}>&lt;</button>
                <span>{months[month]} {year}</span>
                <button class="arrow-btn" on:click={nextMonth}>&gt;</button>
            </div>
            <div class="calendar">
                <div class="day">Mi</div>
                <div class="day">Se</div>
                <div class="day">Se</div>
                <div class="day">Ra</div>
                <div class="day">Ka</div>
                <div class="day">Ju</div>
                <div class="day">Sa</div>
                {#each Array(new Date(year, month, 1).getDay()).fill(0) as _}
                    <div></div>
                {/each}
                {#each Array(daysInMonth(year, month)).fill(0).map((_, i) => i + 1) as d}
                    <button
                        type="button"
                        class="date {selectedDate === `${year}/${String(month+1).padStart(2,'0')}/${String(d).padStart(2,'0')}` ? 'selected' : ''}"
                        on:click={() => selectDate(year, month, d)}
                        aria-label={`Select ${year}/${String(month+1).padStart(2,'0')}/${String(d).padStart(2,'0')}`}
                    >
                        {d}
                        {#if hasTasks(year, month, d)}
                            <span class="task-dot"></span>
                        {/if}
                    </button>
                {/each}
            </div>
        </div>
    {/if}
</div>
