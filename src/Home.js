import React from 'react';
import { Link } from 'react-router-dom';
  
const Home = () => {
  return (
    <div>
      <h1>Navigation demo</h1>

      <p>
        Maintaining good back-state navigation is a discipline. This demo is intended to show some
        patterns for how to do that. The "Back" navigation button in the upper left and the
        browser's Back button word exactly the same. You can use either at any time and the views
        will move as expected.
      </p>

      <h3>Typical List, Create, View, Edit, Delete flows</h3>
      <p>
        Adding and editing items should drop you off where you expect when you complete them. To
        accomplish this, we put a modal Add on a list view, and a modal Edit on a view view. Modals
        are not put in the history stack, so you can't navigate back to them once completed.
      </p>
      <p>
        Check out the <Link to="/things">Things</Link> section to see how this works.
      </p>
  
      <h3>Conditional views</h3>
      <p>
        Sometimes you want to show a view only under certain conditions. The pattern, then, is to
        think of these conditional views as riding on top of a non-conditional view. The conditional
        view, then, doesn't have an URL different than the base view. Once the condition is met,
        the view will change and the history stack (back button functionality) will be just as you
        expect. 
      </p>
      <p>
        Check out the <Link to="/conditional">Conditional</Link> section to see how this works.
      </p>

      <h3>Multi-step conditional views</h3>
      <p>
        You can extend the Conditional view pattern with mult-steps. In this case, though, it
        becomes very difficult to know how to pop views off the stack because someone could navigate
        in to a middle step, navigate to another page (because the nav is accessible) and then
        navigate back. To ensure none of the interim steps are on the stack after we the condition
        is satisfied, we just don't put <em>any</em> of the steps on the history stack.
      </p>
      <p>
        Check out the <Link to="/multistep">Multistep Conditonal</Link> section to see how this works.
      </p>

      <h3>Multi-step modal flows</h3>
      <p>
        When presenting a multi-step flow, though, we can totally manage the stack. When in the
        modal, you can prevent the flow from being interrupted and your back and forward buttons
        can work within the flow (a type of "local navigation stack"). Once you are done with the
        flow, you can pop all the modal steps so your back button won't take you back into them.
      </p>
      <p>
        See this pattern in the <Link to="/multistepmodal">Multi-step Modal</Link> section.
      </p>

    </div>
  );
};
  
export default Home;
