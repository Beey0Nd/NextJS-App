import classes from './NewsletterRegistration.module.css';
import { useRef } from 'react';

function NewsletterRegistration() {
    const emailInputRef = useRef();

    function registrationHandler(event) {
        event.preventDefault();

        const emailInput = emailInputRef.current.value

        fetch("/api/newsletter", {
            method: "POST",
            body: JSON.stringify({
                email: emailInput
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(console.log)
        // fetch user input (state or refs)
        // optional: validate input
        // send valid data to API
    }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
