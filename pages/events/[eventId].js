import { Fragment } from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../fake-data";
import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";

function EventDetailPage() {
    const router = useRouter();

    const eventId = router.query.eventId;
    const event = getEventById(eventId);

    if(!event) {
        return <p>No event found!</p>
    }

    return (
        <Fragment>
            <EventSummary title={event.title}/>
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAll={event.title}
            />
            <EventContent description= {
                <p>{event.description}</p>
            }/>
        </Fragment>
    );
}

export default EventDetailPage;