import { Fragment } from "react";
import { getFeaturedEvents, getEventById } from "../../utils/utils";
import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";
import ErrorAlert from "../../components/events/ErrorAlert";

function EventDetailPage({event}) {

    if(!event) {
        return (
            <ErrorAlert>
                <p>No event found!</p>
            </ErrorAlert>
        )
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
            <EventContent description={
                <p>{event.description}</p>
            }/>
        </Fragment>
    );
}

export async function getStaticProps(context) {
    console.log(context)
    console.log(context.params);

    const eventId = context.params.eventId
    const event = await getEventById(eventId)

    return {
        props: {
            event: event
        },
        revalidate: 60
    }
}

export async function getStaticPaths() {
    // Fetching only featured events instead of all events is more appropriate despite the fact we are showing all the events, as otherwise we would have fetched a huge list of events, which could cause performance issues. In case of using featured events we should set fallback value to true, to generate some pages on the fly instead of generating during build time.
    const allEvents = await getFeaturedEvents();

    const paths = allEvents.map(event => ({
        params: {
            eventId: event.id
        }
    }))

    return {
        paths,
        fallback: true //fallback is set to true in case of featured events.
    }
}

export default EventDetailPage;