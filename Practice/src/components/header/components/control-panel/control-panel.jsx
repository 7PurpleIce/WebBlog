import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Icon } from '../../../../components'
import { selectUserRole, selectUserLogin, selectUserSession } from '../../../../selectors'
import { ROLE } from '../../../../constants'
import { logout } from '../../../../actions/'
import styled from 'styled-components'

const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const StyledIcon = styled.div`
    &:hover {
        cursor: pointer;
    }
`

const UserName = styled.div`
    font-size: 17px;
    font-weight: bold;
`

const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const roleId = useSelector(selectUserRole)
    const login = useSelector(selectUserLogin)
    const session = useSelector(selectUserSession)
    
    return(
        <div className={className}>
            <RightAligned>
            {roleId === ROLE.GUEST ? (
                    <Button>
                        <Link to="/login">Войти</Link>
                    </Button>
                    ) : ( 
                    <>
                        <UserName>{login}</UserName> 
                        <StyledIcon>
                            <Icon 
                                id="fa-sign-out" 
                                margin='0 0 0 10px' 
                                onClick={() => dispatch(logout(session))} 
                            />
                        </StyledIcon>
                    </>
                )}
            </RightAligned>
            <RightAligned>
                <StyledIcon onClick={() => navigate(-1)}><Icon id="fa-backward" margin="10px 0 0 0" /></StyledIcon>
                <Link to="/post"><Icon id="fa-file-text-o" margin="10px 0 0 16px" /></Link>
                <Link to="/users"><Icon id="fa-users" margin="10px 0 0 16px" /></Link>
            </RightAligned>
        </div>
    )
}

export const ControlPanel = styled(ControlPanelContainer)`
    margin-top: 5px
`