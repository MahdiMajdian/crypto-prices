import styled from "@emotion/styled"

const Card = styled.div`
position: relative;
background-color: white;
border-radius: 4px;
box-shadow: 2px 2px 4px #aaa;
flex: 1 1 15rem;
max-height: 100%;
overflow-y: auto;
&:nth-of-type(2) {
    flex: 3 1 30rem;
    padding: 16px;
}
@media (max-width: 768px) {
    &:nth-of-type(1) {
        order: 2;
    }
}
`
export default Card