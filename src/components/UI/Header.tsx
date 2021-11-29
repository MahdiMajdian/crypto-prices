import styled from "@emotion/styled"

const Header = styled.header`
	position: fixed;
	height: 6rem;
	width: 100%;
	display: flex;
	align-items: center;
	background: #ffffff;
	padding: 0 4rem;
	@media (max-width: 768px) {
		position: relative;
	}
`
export default Header
