import React from "react";
  
const About = () => {
  return (
    <div>
      <h1>About</h1>
      <p>
        This project demonstrates various techniques (patterns) of handling views and
        navigation within an app to get consistent behavior across web, mobile web, and installed
        PWA apps. 
      </p>

      <h2>Cross-platform Back buttons</h2>
      <p>
        When making a PWA that can be installed on a mobile device, your application will not have
        Back/Forward buttons like you would with a browser and will not have a location/URL bar.
      </p>
      <p>
        Android phones have a persistent Back button, but iOS phones do not. iOS lets you swipe
        right to go Back while on a web page in Safari, and also on some apps, but it isn't
        consistent enough to rely on, so many users don't imagine it would work in an app. So,
        currently, many iOS apps provide their own Back buttons.
      </p>
      <p>
        If we provide our own Back button in a PWA, we should make it work just like the browser
        Back button. This is because our app may sometimes be viewed in a browser with Back buttons
        and we don't want to introduce any inconsistencies.
      </p>
      <p>
        Mobile applications on iOS and Android have the idea of an application navigation stack
        managed by each application. It's nice in that each application has the idea of a "root"
        view and all navigation is pushing or popping from there (building up views one on top
        of another or pulling them off).
      </p>
      <p>
        Because they manage their own stacks, application on mobile can do a few things that
        browsers cannot. First, devs have a <em>popTo()</em> method that allows them to pop off all
        previous views that match a specific pattern. This method alone helps developers keep their
        stack clean for the user after, e.g. something like an Edit flow is completed. Second, apps
        can <em>synthesize</em> stack elements when a person first deep-links into their app to 
        ensure a nice default stack is available for navigation controls.
      </p>
      <p>
        Browsers don't work this way, though. To enable Back/Forward buttons, they use a global
        history stack shared between all
        pages on the Internet. This enables a graph-like navigation. While you can push or pop
        things onto the browser stack, for security reasons no individual page can read the entire
        browser history. There is no <em>popTo</em> method.
      </p>
      <p>
        When deep-linking into a website, we don't <em>synthesize</em> elements on the stack. it
        would be strange to click on a link to see a oage then click Back on your browser only to
        be taken to another page (or three) before you get back to where you were. We might provide
        an in-app navigation button that detects when our app is istalled as a PWA and detects
        whether there are previous views on our stack and, if not, show the root view instead of
        letting a user navigate out of our app. But this is a lot of work, so we are insetad going
        to assume you aren't going to deep-link a user in to a page on our site that has no means
        of navigating forward. 
      </p>

      <h2>URLs and back-links</h2>
      <p>
        Pretty much every web page has an address. However, views on native mobile devices generally don't.
        Developers need to manually specify which views get an address so they can be "deep-linked"
        from other applications, websites, and share pages.
      </p>
      <p>
        With SPAs, the developer is again in a situation where they need to specify all their own
        URLs. React apps commonly use react-router-dom to handle the mapping of routes to URLs and
        update the location bar as a person navigates your site. 
      </p>
      <p>
        This demo shows how a SPA developer can manage the location/URL in a consistent way across
        an application. Most views have unique URLs. Navigating through the site updates the URL
        as one would hope. Conditional views don't have their own URL as they ride on top of a view
        that does. We use query parameters for add and edit modals <em>?mode=add</em> and
        <em>?mode=edit</em>, respectively. We also use query paramters to specify which step you
        are on in a multi-step flow, e.g., <em>?step=2</em>. Any of these URLs can be shared, and
        pasting them into a browser (or being used as a deep-link for an installed PWA) should
        work as intended.
      </p>
    </div>
  );
};
  
export default About;
