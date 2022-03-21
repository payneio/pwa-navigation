import React from 'react';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { DefaultButton, Modal, PrimaryButton, Stack } from '@fluentui/react';

const incrementDepth = (depth) => depth + 1

const MultistepModal = ({firstTime, setFirstTime}) => {

  const navigate = useNavigate();
  const [params] = useSearchParams()
  const step = params.get('step') ?? '1'

  // effect
  React.useEffect(() => {
    if (!firstTime) {
      // If `step` is in the search params, we don't need it anymore.
      if (params.get('step'))
        navigate(`/multistepmodal`, { replace: true })
    }
  }, [firstTime, params, navigate])


  return (
    <div>
      <h1>Conditional, multi-step view example</h1>
      <p>
        This is the "base" page. IOW, the "real" page that you expect users to normally see except
        for exceptional conditions.
      </p>
      <p>
        If the conditional state was persisted beyond this component (e.g. via API), then you
        may never see the conditional page again.
      </p>
      <p>
        If you did persist the conditional state, and you pasted a URL with "step=#" in it, the
        step parameter is stripped automatically.
      </p>

      <Modal
        isOpen={firstTime}
      >
        <div style={{ padding: '2rem' }}>
          { step === '1' && <Step1 /> }
          {step === '2' && <Step2 /> }
          { step === '3' && <Step3 setFirstTime={setFirstTime} /> }
        </div>
      </Modal>

    </div>
  )
}

const Step1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const depth = location.state?.depth ?? 0;
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
      <h3>
        Current navigation depth: {depth}
      </h3>
      <p>
        Note: the navigation depth will be updated appropriately whether you use the Back button
        below or the browser's (or phone's) back button.
      </p>

      <PrimaryButton text="Next" onClick={() => {
        navigate(`/multistepmodal?step=2`, { state: { depth: incrementDepth(depth)} })
      }} />
    </div>
  )
}

const Step2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const depth = location.state?.depth ?? 0;
  return (
    <div>
      <h1>Second step</h1>
      <h3>
        Current navigation depth: {depth}
      </h3>
      <Stack horizontal tokens={{childrenGap: 7}}>
        <DefaultButton text="Previous" onClick={() => {
          navigate(`/multistepmodal?step=1`, { state: { depth: incrementDepth(depth)} })
        }} />
        <PrimaryButton text="Next" onClick={() => {
          navigate(`/multistepmodal?step=3`, { state: { depth: incrementDepth(depth)} })
        }} />
      </Stack>
    </div>
  )
}

const Step3 = ({setFirstTime}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const depth = location.state?.depth ?? 0;
  return (
    <div>
      <h1>Third step</h1>
     
      <h3>
        Current navigation depth: {depth}
      </h3>

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
        <em>
          The conditional value is just saved in the root element for this example, so if you
          refresh the page it will be cleared. In a real-world scenario, you would persist the
          conditional in Local Storage, Session Storage, Redux, or your API.
        </em>
      </p>

      <Stack horizontal tokens={{childrenGap: 7}}>
        <DefaultButton text="Previous" onClick={() => {
          navigate(`/multistepmodal?step=2`, { state: { depth: incrementDepth(depth)} })
        }} />
        <PrimaryButton text="Complete" onClick={() => {
          setFirstTime(false);
          if (depth > 0)
            navigate(-depth)
        }} />
      </Stack>
    </div>
  )
}

export default MultistepModal;
