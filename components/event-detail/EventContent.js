import classes from './EventContent.module.css';

function EventContent({description}) {
  return (
    <section className={classes.content}>
      {description}
    </section>
  );
}

export default EventContent;