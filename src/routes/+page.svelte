<script>
    import Checklist from "../components/checklist.svelte";
    import Calendar from "../components/calendar.svelte";
    import DatePicker from "../components/DatePicker.svelte";
    import "../styles/style.css"

    let tugass = ["Tugas bahasa arab", "U TE BE KA LANDOLWBOWA"]
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Red+Hat+Text:ital,wght@0,300..700;1,300..700&family=Share+Tech&display=swap" rel="stylesheet">

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
    
        <h2>
            "Quotes penyemangat hidup" - Ojan
        </h2>
        
    </div>
    <div class="main">
        <div class="events">
            <div id="inputEventsEntry" class="eventsEntry">
                <input placeholder="Insert task name" type="text" id="inputEventsEntryName" class="eventsItem eventsLeft eventsEntryName">
                <div class="dpContainer eventsItem">
                    <DatePicker></DatePicker>
                </div>
                <div class="eventButton">
                    <button >
                        +
                    </button>
                </div>
            </div>
            {#each tugass as tugas}
            <div class="eventsEntry">
                <h4 class="eventsItem eventsLeft eventsList eventsEntryName">{tugas}</h4>
                <h4 class="eventsItem eventsList eventsEntryDL">TAHUN/BULAN/HARI</h4>
                <div class="eventButton">
                    <button >
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
    
    
