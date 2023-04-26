import { useRouter } from "next/router";

import { getAllEvents } from "../../fake-data";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

function AllEventsPage() {
    const router = useRouter()
    const events = getAllEvents();
    
    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`

        router.push(fullPath);   
    }

    return (
        <div>
            <EventsSearch onSearch={findEventsHandler}/>
            <EventList items={events}/>
        </div>
    );
}

export default AllEventsPage;