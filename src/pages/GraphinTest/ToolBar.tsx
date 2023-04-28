import React from "react";
import styled from "styled-components";

const ToolBarContainer = styled.div`
    width: 100%;
    height: 35px;
    border: 1px solid rgb(134, 7, 7);
    position: absolute;
    z-index: 1;
`

export default function ToolBar(props: any) {

    return (
        <ToolBarContainer>
            <div>toolbar</div>
        </ToolBarContainer>
    )
}
