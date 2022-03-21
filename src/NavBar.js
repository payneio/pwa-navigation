import React from "react";
import { DefaultButton, Nav, Stack } from "@fluentui/react"
import { useNavigate, useLocation } from "react-router-dom";
  
const NavBar = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [activeKey, setActiveKey] = React.useState(0);

    // read activeKey from the URL
    React.useEffect(() => {
        const activeKeyFromUrl = location.pathname.split('/')[1];
        setActiveKey(activeKeyFromUrl);
    }, [location]);

    const pages = [
        { name: "Home", key: "", url: "/" },
        { name: "About", key: "about", url: "/about" },
        { name: "Things (CRUD)", key: "things", url: "/things" },
        { name: "Conditional", key: "conditional", url: "/conditional" },
        { name: "Multi-step Conditional", key: "multistep", url: "/multistep" },
        { name: "Multi-step Modal", key: "multistepmodal", url: "/multistepmodal" },
    ]

    return (<>
        <Stack>
            <DefaultButton onClick={() => navigate(-1)}>Back</DefaultButton>
            <Nav
                selectedKey={activeKey}
                groups={[
                    {
                        links: pages
                    }
                ]}
                onLinkClick={(event, element) => {
                    event.preventDefault();
                    navigate(element.url);
                }}
            />
        </Stack>
    </>)
}
  
export default NavBar;
