import React from 'react';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { DefaultButton, PrimaryButton, Stack } from '@fluentui/react';

const Multistep = ({firstTime, setFirstTime}) => {

  const navigate = useNavigate();
  const [params] = useSearchParams()
  const step = params.get('step') ?? '1'
 
  // If we are no longer in the exceptional condition, we don't want to respond to any `step`s in
  // the URL querystring params, so go ahead and strip them.
  React.useEffect(() => {
    if (!firstTime) {
      if (params.get('step'))
        navigate(`/multistep`, { replace: true })
    }
  }, [firstTime, params, navigate])

  // Figure out which step we should display from the `step` querystring parameter.
  if (firstTime)
    if (step === '1') return <Step1 />
    else if (step === '2') return <Step2 />
    else if (step === '3') return <Step3 setFirstTime={setFirstTime} />

  // If we are done with the steps, just show the base view.
  return (
    <div>
      <h1>Multi-step conditional view example</h1>
      <h2>Base view</h2>
      <p>
        This is the "base" view. IOW, the "real" view that you expect users to normally see except
        for exceptional conditions.
      </p>
      <p>
        If the conditional state was persisted beyond this component (e.g. via API), then you
        may never see the conditional view again.
      </p>
      <p>
        If you did persist the conditional state, and you pasted a URL with "step=#" in it, the
        step parameter is stripped automatically.
      </p>
      <p>
        <em>
          The conditional value is just saved in the root element for this example, so if you
          refresh the page it will be cleared. In a real-world scenario, you would persist the
          conditional in Local Storage, Session Storage, Redux, or your API.
        </em>
      </p>
    </div>
  )
}

const Step1 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>First step</h1>
      <p>
        This is a demonstration of two important view-management techniques.
      </p>
      <p>
        First, we have a conditional view that is only shown the first time
        the user visits the page. This is done by setting a state variable
        and checking it in the effect.
      </p>
      <p>
        Second, we have a multi-step flow that manages the history/back-stack properly.
        When finishing the flow, we remove the previous steps from the history by navigating
        back through them. We track how many we need to navigate back by incrementing the current
        depth and attaching it as state to the navigate method on each "Next" button.
      </p>
      <p> 
        The conditional pattern doesn't need to be in a modal like this. But the multi-step pattern
        does because you can really only manage the history/back-stack like you would expect When
        you are unable to navigate off to another page in the middle of it. The modal creates a
        kind of "local navigation stack" that is maintained while you are in the flow, but is
        blown away when you leave it. So, in the flow the Back buttons work to let a user jump around
        the flow, but when you leave the flow, the Back button won't take a user back into the flow.
      </p>

      <PrimaryButton text="Next" onClick={() => {
        navigate(`/multistep?step=2`, { replace: true })
      }} />
    </div>
  )
}

const Step2 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Second step</h1>
      <h3>
        One more step to go.
      </h3>
      <Stack horizontal tokens={{childrenGap: 7}}>
        <DefaultButton text="Previous" onClick={() => {
          navigate(`/multistep?step=1`, { replace: true })
        }} />
        <PrimaryButton text="Next" onClick={() => {
          navigate(`/multistep?step=3`, { replace: true })
        }} />
      </Stack>
    </div>
  )
}

const Step3 = ({setFirstTime}) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Third step</h1>
      
      <p>Ok, two cool things to note here.</p>
      <p>
        First, if you complete the flow here, the condition will be met and you will be returned
        to the "base" page by navigating back to it. This means the intermediate steps will be
        removed from your navigation stack and if you use the browser's back button, you will
        return to whatever you were doing before you entered into this flow.
      </p>
      
      <p>
        Second, if you copy this page's URL (with "step=3" in it) and paste it into a new
        tab, you will be brought here, but the navigation depth will be zero. So, if you complete 
        the flow, the correct number of previous views will be popped from the stack (none).
      </p> 
      
      <p>
        FixMe: If I pop in from somewhere else and use the back button, they should work.
      </p>      

      <Stack horizontal tokens={{childrenGap: 7}}>
        <DefaultButton text="Previous" onClick={() => {
          navigate(`/multistep?step=2`, { replace: true })
        }} />
        <PrimaryButton text="Complete" onClick={() => {
          setFirstTime(false)
          navigate(`/multistep`, { replace: true })
        }} />
      </Stack>
    </div>
  )
}

export default Multistep;
