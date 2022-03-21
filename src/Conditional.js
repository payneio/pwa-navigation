import React from 'react';

import { PrimaryButton } from '@fluentui/react';

const Conditional = ({firstTime, setFirstTime}) => {

  if (firstTime) return <Condition setFirstTime={setFirstTime}/>

  return (
    <div>
      <h1>Conditional view example</h1>
      <h2>Base view</h2>
      <p>
        This is the "base" view. IOW, the "real" view that you expect users to normally see except
        for exceptional conditions.
      </p>
      <p>
        Now that the condition has been met, this is the only view you will ever see.
      </p>
      <p>
        <em>
          The conditional value is just saved in the App component for this example, so if you
          refresh the page it will be cleared. In a real-world scenario, you would persist the
          conditional in Local Storage, Session Storage, Redux, or your API.
        </em>
      </p>
    </div>
  )
}

const Condition = ({setFirstTime}) => {
  return (
    <div>
      <h1>Conditional view example</h1>
      <h2>Condition view</h2>
      <p>
        This is a demonstration of how to handle conditional views simply.
      </p>
      <p>
        This conditional view that is only shown until the condition is met.
        This is done by setting a state variable.
      </p>
      <p>
        The trick here is that there is no actual navigation. You don't want some other URL
        for the conditional view, because once the condition is met you will never want to see
        it again. You don't want to have it in your navigation history separate from the base
        view.
      </p>
      <p>
        <em>
          The conditional value is just saved in the root element for this example, so if you
          refresh the page it will be cleared. In a real-world scenario, you would persist the
          conditional in Local Storage, Session Storage, Redux, or your API.
        </em>
      </p>
      <PrimaryButton text="Complete" onClick={() => {
        setFirstTime(false)
      }} />

    </div>
  )
}

export default Conditional;
