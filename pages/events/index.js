import { useRouter } from "next/router";

import { getAllEvents } from "../../utils/utils";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

function AllEventsPage({events}) {
    const router = useRouter()
    
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

export async function getStaticProps() {
    const events = await getAllEvents()
    
    return {
        props: {
            events: events
        },
        revalidate: 1800
    }
}

export default AllEventsPage;