import { ControlPanel, Logo } from './components'
import styled from 'styled-components'

const Description = styled.div`
    font-style: italic;
    margin-top: 5px;
`

const HeaderContainer = ({ className }) => (
    <header className={className}>
        <Logo />
        <Description> 
            Веб-технологии
            <br /> 
            Написание кода
            <br /> 
            Разбор ошибок
        </Description>
        <ControlPanel />
    </header>
)

export const Header = styled(HeaderContainer)`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 1000px;
  height: 120px;
  padding: 20px 40px;
  box-shadow: 0 -2px 17px #000;
  background-color: #fff;
`